import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import {visualizer} from 'rollup-plugin-visualizer';
import {defineConfig} from 'vite';
import {createHtmlPlugin} from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const baseMap = {
    development: '/',
    staging: '/',
    production: '/',
  };

  return {
    base: baseMap[mode],
    server: {
      port: 8000
    },
    plugins: [
      // reactRefresh(),
      react({babel: {plugins: [jotaiDebugLabel, jotaiReactRefresh]}}),
      {
        ...visualizer({
          open: true,
        }),
        apply: () => !!process.env.vis,
      },
      createHtmlPlugin({
        inject: {
          data: {
            injectScript: '',
          },
        },
      }),
    ],
    resolve: {
      alias: [{find: '@/', replacement: '/src/'}, {find: '~@/', replacement: '/src/'}],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
