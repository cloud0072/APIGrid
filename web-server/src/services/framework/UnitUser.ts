import {getBaseApi} from "@/services/BaseApi";
import {ContentType, request} from "@/utils";

const prefix = 'unitUser'

export const UnitUserApi = {
  ...getBaseApi(prefix),
  registerUnitUser: (data: any) =>
    request<any>({
      path: `/${prefix}/registerUnitUser`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  updateUnitUser: (data: any) =>
    request<any>({
      path: `/${prefix}/updateUnitUser`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  getTeamUserById: (id: any) =>
    request<any>({
      path: `/${prefix}/getTeamUserById/${id}`,
      method: 'GET',
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
}


