import {ContentType, request} from "@/utils";
import {getBaseApi} from "@/services/BaseApi";

const prefix = 'unitMember'

export const UnitMemberApi = {
  ...getBaseApi(prefix),
}


