import {getBaseApi} from "@/services/BaseApi";
import {ContentType, request} from "@/utils";

const prefix = 'unitRole'

export const UnitRoleApi = {
  ...getBaseApi(prefix),
  getRoleUserPage: ({roleId, pageInfo}: any) =>
    request<any>({
      path: `/${prefix}/${roleId}/users`,
      method: 'GET',
      query: pageInfo,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  insertRoleUser: ({roleId, roleUsers}: any) =>
    request<any>({
      path: `/${prefix}/${roleId}/users`,
      method: 'POST',
      body: roleUsers,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  deleteByUnitIds: ({roleId, unitIds}: any) => {
    return request<any>({
      path: `/${prefix}/${roleId}/users`,
      method: 'DELETE',
      body: unitIds,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    })
  },
}


