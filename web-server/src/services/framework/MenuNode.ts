import {getBaseApi} from "@/services/BaseApi";
import {ContentType, request} from "@/utils";

const prefix = 'menuNode'

export const MenuNodeApi = {
  ...getBaseApi(prefix),
  getNodeTree: (query?: any, options: any = {}) =>
    request<any>({
      path: `/${prefix}/getNodeTree`,
      method: 'GET',
      query,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
      ...options,
    }),
  updateByNodeId: (data: any) =>
    request<any>({
      path: `/${prefix}/updateByNodeId`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  updatePositionByNodeId: (data: any) =>
    request<any>({
      path: `/${prefix}/updatePositionByNodeId`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  deleteByNodeIds: (id: any) => {
    const ids = id instanceof Array ? id.join(',') : id;
    return request<any>({
      path: `/${prefix}/deleteByNodeIds/${ids}`,
      method: 'DELETE',
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    })
  }
}


