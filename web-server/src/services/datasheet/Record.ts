import {ContentType, request} from "@/utils";

const prefix = 'record'

export const RecordApi = (dstId: string) => ({
  getPage: (query?: any, options: any = {}) =>
    request<any>({
      path: `/${prefix}/${dstId}/page`,
      method: 'GET',
      query,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
      ...options,
    }),
  getList: (query?: any, options: any = {}) =>
    request<any>({
      path: `/${prefix}/${dstId}/list`,
      method: 'GET',
      query,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
      ...options,
    }),
  getByRecId: (recId: any) =>
    request<any>({
      path: `/${prefix}/${dstId}/${recId}`,
      method: 'GET',
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  insertBatch: ({type, records}: any) =>
    request<any>({
      path: `/${prefix}/${dstId}?type=${type}`,
      method: 'POST',
      body: records,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  updateBatch: ({type, records}: any) =>
    request<any>({
      path: `/${prefix}/${dstId}?type=${type}`,
      method: 'PUT',
      body: records,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  deleteByRecIds: (recId: any) => {
    const ids = recId instanceof Array ? recId.join(',') : recId;
    return request<any>({
      path: `/${prefix}/${dstId}/${ids}`,
      method: 'DELETE',
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    })
  },
})


