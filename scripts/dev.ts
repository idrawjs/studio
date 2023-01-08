import path from 'node:path'; 
import { createServer } from 'vite';
import pluginReact from '@vitejs/plugin-react'; 
import type { InlineConfig } from 'vite';
 
dev();

async function dev() {
  const viteConfig = getViteConfig();
  const server = await createServer(viteConfig)
  await server.listen()
  server.printUrls();
  const { port, host = '127.0.0.1' } = server.config?.server || {}
  const targetPage = `http://${host}:${port}/index.html`;
  console.log(
    `Open: ` + targetPage
  );
}

function getViteConfig(): InlineConfig {
  const viteConfig: InlineConfig = {
    root: resolve(),
    publicDir: resolve('public'),
    server: {
      port: 8080,
      host: '127.0.0.1',
      open: true,
    },
    plugins: [pluginReact()],
  };
  return viteConfig;
}

function resolve(...args) {
  return path.join(__dirname, '..', ...args);
}