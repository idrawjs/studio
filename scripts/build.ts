import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { Project } from 'ts-morph';
import type { CompilerOptions as TsMorphCompilerOptions } from 'ts-morph';
import type { CompilerOptions } from 'typescript';
import * as glob from 'glob';
import less from 'less';
import { packages } from './config';
import { joinPackagePath, joinProjectPath } from './util/project';
import { removeFullDir } from './util/file';

function write(filePath, content) {
  const fileDir = path.dirname(filePath);
  if (!(fs.existsSync(fileDir) && fs.statSync(fileDir).isDirectory())) {
    fs.mkdirSync(fileDir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

async function buildLess(dirName: string) {
  // bundle css
  const lessPath = joinPackagePath(dirName, 'src', 'index.less');
  const lessInput = fs.readFileSync(lessPath, { encoding: 'utf8' });

  const { css } = await less.render(lessInput, {
    filename: lessPath,
    plugins: []
  });
  write(joinPackagePath(dirName, 'dist', 'index.css'), css);

  // single less
  const pattern = '**/*.less';
  const cwd = joinPackagePath(dirName, 'src', 'css');
  const files = glob.sync(pattern, { cwd });
  files.forEach((file) => {
    const css = fs.readFileSync(joinPackagePath(dirName, 'src', 'css', file), {
      encoding: 'utf8'
    });
    write(joinPackagePath(dirName, 'dist', 'css', file), css);
  });
}

async function build() {
  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    const { dirName } = pkg;
    const pkgDir = path.resolve(`packages/${dirName}`);
    console.log(`Start to build ESM for ${dirName}`);
    console.log(`Remove packages/${dirName}/dist/`);
    removeFullDir(`${pkgDir}/dist`);
    buildPackage(dirName);
    console.log(`Build ESM of ${dirName} successfully!`);
    await buildLess(dirName);
    console.log(`Build CSS of ${dirName} successfully!`);
  }
}

function buildPackage(dirName: string) {
  const pattern = '**/*.{ts,tsx}';
  const cwd = joinPackagePath(dirName, 'src');
  const files = glob.sync(pattern, { cwd });

  const targetFiles = files.map((file) => {
    return joinPackagePath(dirName, 'src', file);
  });

  // build ts -> esm
  {
    // const tsConfig = getTsConfig();
    // const compilerOptions = tsConfig.compilerOptions;
    const compilerOptions: CompilerOptions = {
      noUnusedLocals: true,
      declaration: true,
      sourceMap: false,
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES2015,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      allowJs: false,
      strict: true,
      experimentalDecorators: true,
      resolveJsonModule: true,
      esModuleInterop: true,
      removeComments: true,
      // lib: ['ES2016', 'dom'],
      outDir: joinPackagePath(dirName, 'dist'),
      rootDir: joinPackagePath(dirName, 'src'),
      skipLibCheck: true
    };
    const project = new Project({
      compilerOptions: compilerOptions as TsMorphCompilerOptions
      // tsConfigFilePath: joinProjectPath('tsconfig.web.json')
    });

    const program = ts.createProgram(targetFiles, compilerOptions);

    // const diagnostics = ts.getPreEmitDiagnostics(program);
    // if (diagnostics.length) {
    //   console.error(diagnostics);
    //   for (const diagnostic of diagnostics) {
    //     console.log(JSON.stringify(diagnostic.messageText, null, 2));
    //   }
    //   throw Error('TS build error!');
    // }
    const diagnostics = project.getPreEmitDiagnostics();
    if (diagnostics.length > 0) {
      console.error(project.formatDiagnosticsWithColorAndContext(diagnostics));
      throw Error('TS build error!');
    }

    program.emit();
  }
}

build();
