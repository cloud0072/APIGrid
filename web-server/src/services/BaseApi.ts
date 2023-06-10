import {ContentType, request} from "@/utils";

export const getBaseApi = (prefix: string) => ({
  getPage: (query: any, options: any = {}) =>
    request<any>({
      path: `/${prefix}/page`,
      method: 'GET',
      query,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
      ...options,
    }),
  getList: (query: any, options: any = {}) =>
    request<any>({
      path: `/${prefix}/list`,
      method: 'GET',
      query,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
      ...options,
    }),
  getById: (id: any) =>
    request<any>({
      path: `/${prefix}/${id}`,
      method: 'GET',
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  insert: (data: any) =>
    request<any>({
      path: `/${prefix}/`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  updateById: (data: any) =>
    request<any>({
      path: `/${prefix}/`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  deleteByIds: (id: any) => {
    const ids = id instanceof Array ? id.join(',') : id;
    return request<any>({
      path: `/${prefix}/${ids}`,
      method: 'DELETE',
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    })
  },
})
