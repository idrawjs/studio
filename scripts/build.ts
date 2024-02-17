import path from 'node:path';
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'lib/react': ['react', 'react-dom'],
          'lib/antd': ['antd'],
          'lib/draw': ['idraw', '@idraw/studio']
        },
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash].[ext]',
        chunkFileNames: () => {
          // const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
          // const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/[name].[hash].js`;
        }
      }
    }
  }
};

build(config)
  .then(() => {
    console.log('Build success!');
  })
  .catch(console.log);
