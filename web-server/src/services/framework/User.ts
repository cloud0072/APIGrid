import {ContentType, request} from "@/utils";

export const getUserList = (query: any, params: any = {}) =>
  request<any>({
    path: `/user/page`,
    method: 'GET',
    query,
    secure: true,
    type: ContentType.Json,
    skipErrorHandler: false,
    ...params,
  });
