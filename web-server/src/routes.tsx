import {RouteError} from '@/components';
import Layouts from '@/layouts';
import {lazyLoad} from '@/utils';
import type {RouteObject} from 'react-router-dom';

const customRoutes: RouteObject[] = [
  {
    path: 'demo',
    children: [
      {
        path: 'demo',
        element: lazyLoad('demo/demo'),
      },
      {
        path: 'tree',
        element: lazyLoad('demo/tree'),
      },
    ],
  },
];

export const layoutRoutes: RouteObject[] = [
  {
    path: '/',
    errorElement: <RouteError/>,
    element: <Layouts/>,
    children: [
      {
        index: true,
        element: lazyLoad('home'),
      },
      {
        path: 'system',
        children: [
          {
            path: 'user',
            element: lazyLoad('system/user'),
          },
        ]
      },
      ...customRoutes,
    ],
  },
];

export const routes: RouteObject[] = [
  ...layoutRoutes,
  {
    path: 'login',
    element: lazyLoad('login'),
  },
];
