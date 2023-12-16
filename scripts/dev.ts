import process from 'node:process';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import { createServer } from 'vite';
// import pluginReact from '@vitejs/plugin-react';
import pluginReact from '@vitejs/plugin-react-swc';
import type { UserConfig } from 'vite';
import { joinPackagePath, joinProjectPath } from './util/project';

dotenv.config();

const pkgName = process.env.DEV_IDRAW_MODULE || 'idraw';
console.log(chalk.green(`Dev package [${pkgName}]`));

const openPage = '/examples/index.html';

async function dev() {
  const viteConfig = getViteConfig();
  const server = await createServer({
    configFile: false,
    ...viteConfig
  });
  await server.listen();
  server.printUrls();
  const { port, host = '127.0.0.1' } = server.config?.server || {};

  console.log(`Open: ` + chalk.green(`http://${host}:${port}${openPage}`));
}

function getViteConfig(): UserConfig {
  const viteConfig: UserConfig = {
    root: joinProjectPath(),
    publicDir: joinProjectPath('public'),
    server: {
      port: 8080,
      host: '127.0.0.1',
      open: openPage
    },
    plugins: [pluginReact()],
    resolve: {
      alias: {
        react: joinProjectPath('node_modules', 'react'),
        'react-dom': joinProjectPath('node_modules', 'react-dom'),
        antd: joinProjectPath('node_modules', 'antd'),
        '@ant-design/icons': joinProjectPath('node_modules', '@ant-design/icons'),
        '@idraw/studio-base/dist/css': joinPackagePath('studio-base', 'src', 'css'),
        '@idraw/studio-base': joinPackagePath('studio-base', 'src'),
        '@idraw/studio': joinPackagePath('studio', 'src')
      }
    },
    esbuild: {
      include: [/\.(ts|tsx|js|jsx)$/],
      exclude: [/\.html$/]
    },
    optimizeDeps: {}
  };
  return viteConfig;
}

dev();
