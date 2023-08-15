import {ContentType, request} from "@/utils";
import {getBaseApi} from "@/services/BaseApi";

const prefix = 'unitTeam'

export const UnitTeamApi = {
  ...getBaseApi(prefix),
  getTeamTree: (query: any, options: any = {}) =>
    request<any>({
      path: `/${prefix}/getTeamTree`,
      method: 'GET',
      query,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
      ...options,
    }),
  getSubUnitList: (query: any, options: any = {}) =>
    request<any>({
      path: `/${prefix}/getSubUnitList`,
      method: 'GET',
      query,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
      ...options,
    }),
}


