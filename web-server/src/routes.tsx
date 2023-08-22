import {RouteError} from '@/components';
import Layouts from '@/layouts';
import {lazyLoad} from '@/utils';
import type {RouteObject} from 'react-router-dom';

export const routes: RouteObject[] = [
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
          {
            path: 'role',
            element: lazyLoad('system/role'),
          },
        ]
      },
      {
        path: 'datasheet',
        children: [
          {
            path: ':dstId?',
            element: lazyLoad('datasheet/table'),
          },
        ]
      },
    ],
  },
  {
    path: 'login',
    element: lazyLoad('login'),
  },
];
