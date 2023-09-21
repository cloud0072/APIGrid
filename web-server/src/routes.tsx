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
        path: 'flow',
        children: [
          {
            path: 'config',
            element: lazyLoad('flow/config'),
          },
          {
            path: 'instance',
            element: lazyLoad('flow/instance'),
          },
        ]
      },
      {
        path: 'datasheet/:nodeId',
        element: lazyLoad('workspace/datasheet'),
      },
      {
        path: 'dashboard/:nodeId',
        element: lazyLoad('workspace/dashboard'),
      },
      {
        path: 'form/:nodeId',
        element: lazyLoad('workspace/form'),
      },
      {
        path: 'folder/:nodeId',
        element: lazyLoad('workspace/folder'),
      },
    ],
  },
  {
    path: 'login',
    element: lazyLoad('login'),
  },
];
