// @ts-ignore
// * No declaration file for less-vars-to-js
import lessToJS from 'less-vars-to-js';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';
import { ViteAliases } from 'vite-aliases';
import Inspect from 'vite-plugin-inspect';
import reactJsx from 'vite-react-jsx';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import fs from 'fs';

const pathResolver = (path: string) => resolve(__dirname, path);
const themeVariables = lessToJS(
  fs.readFileSync(pathResolver('./config/variables.less'), 'utf8'),
);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 8888,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}/api`,
        // changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/mock': {
        target: `http://39.105.131.47:3000/mock`,
        // changeOrigin: true,
        rewrite: path => path.replace(/^\/mock/, ''),
      },
      '/data_manager_server': {
        target: `http://123.56.42.228:30000`,
        // changeOrigin: true,
      },
      '/data_manager_server/case': {
        target: `http://123.56.42.228:30000`,
        // changeOrigin: true,
      },
      '/data_manager_server/common': {
        target: `http://123.56.42.228:30000`,
        // changeOrigin: true,
      },
      '/data_manager_server/annotation': {
        target: `http://10.11.100.89:30000`,
        // changeOrigin: true,
      },
      '/data_user_center': {
        target: `http://123.56.42.228:30001`,
        // changeOrigin: true,
      },
    },
  },
  plugins: [
    Inspect(),
    ViteAliases({}),
    reactJsx(),
    reactRefresh(),
    svgr(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: name => {
            if (name === 'col' || name === 'row') {
              return 'antd/lib/style/index.less';
            }
            return `antd/es/${name}/style/index.less`;
          },
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
      // ....
    },
  },
});
