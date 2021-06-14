/* eslint-disable no-console */
const { getProjectPath, injectRequire } = require('./utils/project-helper');

injectRequire();

// const install = require('./install')
const runCmd = require('./utils/run-cmd');
const getBabelCommonConfig = require('./utils/get-babel-common-config');
const merge2 = require('merge2');
const { execSync } = require('child_process');
const through2 = require('through2');
const transformLess = require('./utils/transform-less');
const webpack = require('webpack');
const babel = require('gulp-babel');
const argv = require('minimist')(process.argv.slice(2));
const { Octokit } = require('@octokit/rest');

// const getNpm = require('./getNpm')
// const selfPackage = require('../package.json')
const chalk = require('chalk');
// const getNpmArgs = require('./utils/get-npm-args');
// const getChangelog = require('./utils/getChangelog');
const path = require('path');
const ts = require('gulp-typescript');
const gulp = require('gulp');
const fs = require('fs');
const rimraf = require('rimraf');
const tsConfig = require('./utils/get-ts-common-config')();
const replaceLib = require('./utils/replace-lib');
const stripCode = require('gulp-strip-code');
const compareVersions = require('compare-versions');

const packageJson = require(getProjectPath('package.json'));
const tsDefaultReporter = ts.reporter.defaultReporter();
const cwd = process.cwd();
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

function dist(done) {
  rimraf.sync(path.join(cwd, 'dist'));
  process.env.RUN_ENV = 'PRODUCTION';
  const webpackConfig = require(getProjectPath('scripts/webpack.prod.config.js'));
  // const webpackConfig = require('./../scripts/webpack.prod.config.js');
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false,
    });
    console.log(buildInfo);
    done(0);
  });
}

const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts'];

function compileTs(stream) {
  return stream
    .pipe(ts(tsConfig))
    .js.pipe(
      through2.obj(function(file, encoding, next) {
        // console.log(file.path, file.base);
        file.path = file.path.replace(/\.[jt]sx$/, '.js');
        this.push(file);
        next();
      }),
    )
    .pipe(gulp.dest(process.cwd()));
}

gulp.task('tsc', () =>
  compileTs(
    gulp.src(tsFiles, {
      base: cwd,
    }),
  ),
);

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  babelConfig.babelrc = false;
  delete babelConfig.cacheDirectory;
  if (modules === false) {
    babelConfig.plugins.push();
  }
  let stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/\/style\/index\.(js|jsx|ts|tsx)$/)) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(
          content
            .replace(/\/style\/?'/g, "/style/css'")
            .replace(/\/style\/?"/g, '/style/css"')
            .replace(/\.less/g, '.css'),
        );
        file.path = file.path.replace(/index\.(js|jsx|ts|tsx)$/, 'css.js');
        this.push(file);
        next();
      } else {
        next();
      }
    }),
  );
  if (modules === false) {
    stream = stream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end',
      }),
    );
  }
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

function compile(modules) {
  rimraf.sync(modules !== false ? libDir : esDir);
  const less = gulp
    .src(['src/**/*.less'])
    .pipe(
      through2.obj(function(file, encoding, next) {
        this.push(file.clone());
        if (
          file.path.match(/\/style\/index\.less$/) ||
          file.path.match(/\/style\/v2-compatible-reset\.less$/)
        ) {
          transformLess(file.path)
            .then(css => {
              file.contents = Buffer.from(css);
              file.path = file.path.replace(/\.less$/, '.css');
              this.push(file);
              next();
            })
            .catch(e => {
              console.error(e);
            });
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));
  const assets = gulp
    .src(['src/**/*.@(png|svg)'])
    .pipe(gulp.dest(modules === false ? esDir : libDir));
  let error = 0;
  const source = [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.tsx',
    'src/**/*.ts',
    'typings/**/*.d.ts',
    '!src/*/__tests__/*',
  ];

  const tsResult = gulp.src(source).pipe(
    ts(tsConfig, {
      error(e) {
        tsDefaultReporter.error(e);
        error = 1;
      },
      finish: tsDefaultReporter.finish,
    }),
  );

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1);
    }
  }

  tsResult.on('finish', check);
  tsResult.on('end', check);
  const tsFilesStream = babelify(tsResult.js, modules);
  const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
  return merge2([less, tsFilesStream, tsd, assets]);
}



// function githubRelease(done) {
//   const changlogFiles = [
//     path.join(cwd, 'CHANGELOG.en-US.md'),
//     path.join(cwd, 'CHANGELOG.zh-CN.md'),
//   ];
//   console.log('creating release on GitHub');
//   if (!process.env.GITHUB_TOKEN) {
//     console.log('no GitHub token found, skip');
//     return;
//   }
//   if (!changlogFiles.every(file => fs.existsSync(file))) {
//     console.log('no changelog found, skip');
//     return;
//   }
//   const github = new Octokit({
//     auth: process.env.GITHUB_TOKEN,
//   });
//   const date = new Date();
//   const { version } = packageJson;
//   const enChangelog = getChangelog(changlogFiles[0], version);
//   const cnChangelog = getChangelog(changlogFiles[1], version);
//   const changelog = [
//     `\`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}\``,
//     enChangelog,
//     '\n',
//     '---',
//     '\n',
//     cnChangelog,
//   ].join('\n');
//   const [_, owner, repo] = execSync('git remote get-url origin') // eslint-disable-line
//     .toString()
//     .match(/github.com[:/](.+)\/(.+)\.git/);
//   github.repos
//     .createRelease({
//       owner,
//       repo,
//       tag_name: version,
//       name: version,
//       body: changelog,
//     })
//     .then(() => {
//       done();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// gulp.task(
//   'tag',
//   gulp.series(done => {
//     tag();
//     githubRelease(done);
//   }),
// );

gulp.task(
  'check-git',
  gulp.series(done => {
    runCmd('git', ['status', '--porcelain'], (code, result) => {
      if (/^\?\?/m.test(result)) {
        return done(`There are untracked files in the working tree.\n${result}
      `);
      }
      if (/^([ADRM]| [ADRM])/m.test(result)) {
        return done(`There are uncommitted changes in the working tree.\n${result}
      `);
      }
      return done();
    });
  }),
);



gulp.task(
  'compile-with-es',
  gulp.series(done => {
    compile(false).on('finish', function() {
      done();
    });
  }),
);

gulp.task(
  'compile',
  gulp.series('compile-with-es', done => {
    compile().on('finish', function() {
      done();
    });
  }),
);

gulp.task(
  'dist',
  gulp.series('compile', done => {
    dist(done);
  }),
);

