import {ContentType, request} from "@/utils";
import {getBaseApi} from "@/services/BaseApi";

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
  upload: (url: string, file: File, options: any = {}) =>
    fetch(url, {
      method: "PUT",
      body: file
    })
}


