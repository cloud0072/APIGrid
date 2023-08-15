import type {RequestParams} from '@/utils';
import {ContentType, request} from '@/utils';

/**
 * @description 用户名登录方法
 *
 * @tags SysLoginService
 * @name sysUserLogin
 * @request POST:/login
 * @secure
 */
export const sysUserLogin = (data: any, params: RequestParams = {}) =>
  request<any>({
    path: `/login`,
    method: 'POST',
    body: data,
    secure: true,
    type: ContentType.Json,
    skipErrorHandler: false,
    ...params,
  });


/**
 * @description 登出方法
 *
 * @tags SysLoginService
 * @name sysUserLogout
 * @request POST:/logout
 * @secure
 */
export const sysUserLogout = (params: RequestParams = {}) =>
  request<any>({
    path: `/logout`,
    method: 'POST',
    secure: true,
    skipErrorHandler: false,
    ...params,
  });

/**
 * @description 获取已登录用户信息
 *
 * @tags SysLoginService
 * @name sysGetUserInfo
 * @request GET:/getUserInfo
 * @secure
 */
export const sysGetUserInfo = (params: RequestParams = {}) =>
  request<any>({
    path: `/getUserInfo`,
    method: 'GET',
    secure: true,
    skipErrorHandler: false,
    ...params,
  });
