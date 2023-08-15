import {getBaseApi} from "@/services/BaseApi";
import {ContentType, request} from "@/utils";

const prefix = 'unitRole'

export const UnitRoleApi = {
  ...getBaseApi(prefix),
  getRoleMemberPage: ({roleId, pageInfo}: any) =>
    request<any>({
      path: `/${prefix}/${roleId}/members`,
      method: 'GET',
      query: pageInfo,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  insertRoleMember: ({roleId, roleMembers}: any) =>
    request<any>({
      path: `/${prefix}/${roleId}/members`,
      method: 'POST',
      body: roleMembers,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    }),
  deleteByUnitIds: ({roleId, unitIds}: any) => {
    return request<any>({
      path: `/${prefix}/${roleId}/members`,
      method: 'DELETE',
      body: unitIds,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
    })
  },
}


