const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const babel = require('@babel/core');
const glob = require('glob');
const less = require('less');

build();

async function build() {
  remove('dist');
  buildTS();
  tranformES();
  await buildLess();
}

function tranformES() {
  const pattern = '**/*.js';
  const cwd = resolve('dist');
  const files = glob.sync(pattern, { cwd, });
  files.forEach((file) => {
    const filePath = resolve('dist', file);
    const code = fs.readFileSync(filePath, { encoding: 'utf8' });
    const result = babel.transformSync(code, {
      filename: filePath,
      ast: false,
      code: true,
      babelrc: false,
      presets: [
        [
          '@babel/preset-env', 
          {
            modules: false,
            targets: false
          }
        ],
        '@babel/preset-react',
        // '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-object-rest-spread',
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
            version: '^7.10.4',
          },
        ],
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true,
          },
        ],
        '@babel/plugin-proposal-class-properties'
      ]
    })
    fs.writeFileSync(filePath, result.code);
  })
}

function buildTS() {
  const pattern = '**/*.{ts,tsx}';
  const cwd = resolve('src');
  const files = glob.sync(pattern, { cwd, });

  const targetFiles = [];

  files.forEach((file) => {
    if (!(file.startsWith('css/') || ['demo.tsx'].includes(file))) {
      targetFiles.push(resolve('src', file))
    }
  });

  // build ts -> esm
  {
    const tsConfig = getTsConfig();
    const compilerOptions = tsConfig.compilerOptions;
    compilerOptions.target = ts.ScriptTarget.ES2015;
    compilerOptions.moduleResolution = ts.ModuleResolutionKind.NodeJs;
    compilerOptions.declaration = true;
    compilerOptions.outDir = resolve('dist', 'esm');
    compilerOptions.rootDir  = resolve('src');
    const program = ts.createProgram(targetFiles, compilerOptions);
    program.emit();
  }

  // build ts -> cjs
  {
    const tsConfig = getTsConfig();
    const compilerOptions = tsConfig.compilerOptions;
    compilerOptions.target = ts.ScriptTarget.ES5;
    compilerOptions.moduleResolution = ts.ModuleResolutionKind.NodeJs;
    compilerOptions.declaration = true;
    compilerOptions.outDir = resolve('dist', 'cjs');
    compilerOptions.rootDir  = resolve('src');
    const program = ts.createProgram(targetFiles, compilerOptions);
    program.emit();
  }

  // console.log('files ===', files);
}

async function buildLess() {
  const lessPath = resolve('src', 'index.less');
  const lessInput = fs.readFileSync(lessPath, { encoding: 'utf8' })
  const { css } = await less.render(lessInput, {
    filename: lessPath,
  });
  write(resolve('dist', 'css', 'index.css'), css);

  const pattern = '**/*.less';
  const cwd = resolve('src');
  const files = glob.sync(pattern, { cwd, });
  files.forEach((file) => {
    const css = fs.readFileSync(resolve('src', file), { encoding: 'utf8' });
    write(resolve('dist', 'css', file), css);
  });
}

function resolve(...args) {
  return path.join(__dirname, '..', ...args);
}

function write(filePath, content) {
  const fileDir = path.dirname(filePath);
  if (!(fs.existsSync(fileDir) && fs.statSync(fileDir).isDirectory())) {
    fs.mkdirSync(fileDir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

function remove(dirPath) {
  let files = [];
  if (fs.existsSync(dirPath)) {
    files = fs.readdirSync(dirPath);
    files.forEach((filename) => {
      let curPath = path.join(dirPath, filename);
      const stat = fs.statSync(curPath);
      if(stat.isDirectory()) {
        remove(curPath);
      } else if (stat.isFile()) {
        // fs.unlinkSync(curPath);
        fs.rmSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

function getTsConfig() {
  const configPath = resolve('tsconfig.json')
  // const configStr = fs.readFileSync(configPath, { encoding: 'utf8' });
  // const config = JSON.parse(configStr);
  const config = require(configPath)
  return config;
}


