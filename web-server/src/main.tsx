import '@/styles/nprogress.css';
import '@/styles/tailwind.css';
import 'antd/dist/reset.css';
import 'mac-scrollbar/dist/mac-scrollbar.css';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {createRoot} from 'react-dom/client';
import {getAppConfig} from "@/services";
import {setAppConfig, useAppConfig} from "@/models";
import {checkToken, redirectToLoginPage} from '@/utils';
import {App} from "@/App";
import {Provider} from "jotai";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from 'react';

export const bootstrap = () => {

  getAppConfig().then(data => {

    setAppConfig(data)
    const appConfig = useAppConfig()
    console.log('appConfig', appConfig)

  }).then(() => {

    const basename = import.meta.env.BASE_URL;
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
  })
};

bootstrap()
