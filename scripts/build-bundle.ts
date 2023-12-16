import PluginReact from '@vitejs/plugin-react-swc';
import { defineConfig, build } from 'vite';
import { packages } from './config';
import { joinPackagePath } from './util/project';

const createConfig = (dirName: string, globalName: string) => {
  return defineConfig({
    plugins: [PluginReact()],

    build: {
      minify: false,
      lib: {
        name: globalName,
        fileName: () => 'index.umd.js',
        entry: joinPackagePath(dirName, 'src', 'bundle.ts'),
        formats: ['umd']
      },
      outDir: joinPackagePath(dirName, 'dist'),
      emptyOutDir: false,
      rollupOptions: {
        external: ['react', 'react-dom', 'antd'],
        output: {
          globals: {
            react: 'window.React',
            'react-dom': 'window.ReactDOM',
            antd: 'window.antd'
          },
          assetFileNames: () => {
            return 'index.css';
          }
        }
      }
    }
  });
};

async function run() {
  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    const config = createConfig(pkg.dirName, pkg.globalName);
    await build(config);
  }
}

run();
