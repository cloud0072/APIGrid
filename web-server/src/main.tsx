import '@/styles/nprogress.css';
import '@/styles/tailwind.css';
import 'antd/dist/reset.css';
import 'mac-scrollbar/dist/mac-scrollbar.css';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {createRoot} from 'react-dom/client';
import {setAppConfig} from "@/models";
import {checkToken, redirectToLoginPage} from '@/utils';
import {App} from "@/App";
import {Provider} from "jotai";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from 'react';
import env from "@/models/env";

export const bootstrap = () => {

  setAppConfig({})
  // useQueryInitialState()

  const basename = env.VITE_PUBLIC_PATH;
  // 不存在 token 时跳转到登录页
  const currBasename = window.location.pathname.replace(basename, '/');
  if (currBasename !== '/login' && !checkToken()) {
    redirectToLoginPage();
    return;
  }

  dayjs.locale('zh-cn');

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

    const root = createRoot(document.getElementById('root') as HTMLElement);
    root.render(
      // <React.StrictMode>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </Provider>
      // </React.StrictMode>,
    );

};

bootstrap()
