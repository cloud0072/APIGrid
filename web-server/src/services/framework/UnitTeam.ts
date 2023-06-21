import {ContentType, request} from "@/utils";
import {getBaseApi} from "@/services/BaseApi";

const prefix = 'unitTeam'

export const UnitTeamApi = {
  ...getBaseApi(prefix),
}


