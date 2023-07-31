import {ContentType, request} from "@/utils";
import {getBaseApi} from "@/services/BaseApi";

const prefix = 'unitMember'

export const UnitMemberApi = {
  ...getBaseApi(prefix),
  insertMemberUser: (data: any) =>
    request<any>({
      path: `/${prefix}/insertMemberUser`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  updateMemberUser: (data: any) =>
    request<any>({
      path: `/${prefix}/updateMemberUser`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  getMemberUserById: (id: any) =>
    request<any>({
      path: `/${prefix}/getMemberUserById/${id}`,
      method: 'GET',
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
}


