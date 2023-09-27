import {getBaseApi} from "@/services/BaseApi";

const prefix = 'datasheet'
const api = getBaseApi(prefix);

export const DatasheetApi = {
  getPage: api.getPage,
  getList: api.getList,
  getByDstId: api.getById,
  insert: api.insert,
  updateByDstId: api.updateById,
  deleteByDstIds: api.deleteByIds,
}


