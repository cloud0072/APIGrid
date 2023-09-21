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
}


