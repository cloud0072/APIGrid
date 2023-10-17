import {ContentType, request} from "@/utils";
import {getBaseApi} from "@/services/BaseApi";
import {FileAsset} from "@/components/BjhAgGrid/cell/FileAssetEditor";

const prefix = 'upload'

export const FileUploadApi = {
  // ...getBaseApi(prefix),
  getPreSignedPutUrl: (query: any, options: any = {}) =>
    request<any>({
      path: `/${prefix}/getPreSignedPutUrl`,
      method: 'GET',
      query,
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
      ...options,
    }),
  getFileAssetByIds: (id: any, options: any = {}) => {
    const ids = id instanceof Array ? id.join(',') : id;
    return request<any>({
      path: `/${prefix}/getFileAssetByIds/${ids}`,
      method: 'GET',
      secure: true,
      type: ContentType.Json,
      skipErrorHandler: false,
      ...options,
    })
  },
  upload: (url: string, file: File, options: any = {}) =>
    fetch(url, {
      method: "PUT",
      body: file
    }),
}


