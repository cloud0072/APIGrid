import {RouteError} from '@/components';
import Layouts from '@/layouts';
import {lazyLoad} from '@/utils';
import type {RouteObject} from 'react-router-dom';

export const menus: any[] = [
  {
    name: 'home',
    path: '/',
    component: '',
    meta: {title: '首页', icon: '', noCache: false},
    hidden: true,
    alwaysShow: false,
    children: undefined
  },
  {
    name: 'system',
    path: '/system',
    component: '',
    meta: {title: '系统管理', icon: 'ant-setting', noCache: false},
    hidden: false,
    alwaysShow: false,
    children: [
      {
        name: 'test',
        path: '/system/test',
        component: '',
        meta: {title: '测试列表', icon: 'ant-code', noCache: false},
        hidden: false,
        alwaysShow: false,
        children: undefined
      },
      {
        name: 'user',
        path: '/system/user',
        component: '',
        meta: {title: '成员列表', icon: 'ant-user', noCache: false},
        hidden: false,
        alwaysShow: false,
        children: undefined
      },
      {
        name: 'role',
        path: '/system/role',
        component: '',
        meta: {title: '角色列表', icon: 'ant-role', noCache: false},
        hidden: false,
        alwaysShow: false,
        children: undefined
      },
    ]
  },
]

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
            path: 'test',
            element: lazyLoad('system/test'),
          },
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
    ],
  },
  {
    path: 'login',
    element: lazyLoad('login'),
  },
];
