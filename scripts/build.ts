import path from 'node:path'; 
import { createServer } from 'vite';
import pluginReact from '@vitejs/plugin-react'; 
import { build } from 'vite';
import type { InlineConfig } from 'vite';

function resolve(...args) {
  return path.join(__dirname, '..', ...args);
}

const config: InlineConfig = {
  root: resolve(),
  base: './',
  publicDir: resolve('public'), 
  plugins: [pluginReact()],
}

build(config).then(() => {
  console.log('Build success!')
}).catch(console.log)