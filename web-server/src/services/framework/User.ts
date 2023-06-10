import {ContentType, request} from "@/utils";
import {getBaseApi} from "@/services/BaseApi";

const prefix = 'user'

export const UserApi = {
  ...getBaseApi(prefix),
}


