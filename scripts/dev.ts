import process from 'node:process';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import { createServer } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';
import { joinPackagePath } from './util/project';

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
    root: joinPackagePath(pkgName),
    publicDir: joinPackagePath(pkgName, 'demo', 'public'),
    server: {
      port: 8080,
      host: '127.0.0.1',
      open: openPage
    },
    plugins: [pluginReact()],
    resolve: {
      alias: {
        '@idraw/studio-base': joinPackagePath('base', 'src', 'index.ts'),
        '@idraw/studio': joinPackagePath('studio', 'src', 'index.ts')
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
