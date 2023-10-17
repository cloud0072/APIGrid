import {ICellRendererParams} from "ag-grid-community";
import React, {useEffect, useState} from "react";
import {FileAsset} from "@/components/BjhAgGrid/cell/FileAssetEditor";
import {FileUploadApi} from "@/services/framework/FileUpload";
import {Image, Space} from "antd";
import {toUrl} from "@/utils/fileUtils";

const FileAssetCell = React.forwardRef((props: ICellRendererParams, ref) => {
  const [fileAssets, setFileAssets] = useState<FileAsset[]>([]);

  useEffect(() => {
    const ids = props.value;
    if (!ids || ids.length < 1) {
      return
    }
    FileUploadApi.getFileAssetByIds(ids).then(response => {
      const {data} = response;
      if (data) {
        setFileAssets(data)
      }
    })
  }, [])
  return (
    <div>
      <Space>
        {fileAssets.map(f =>
          <Image
            key={f.id}
            height={30}
            src={toUrl(f.token)}
            preview={false}
          />
        )}
      </Space>
    </div>
  )
})

export default FileAssetCell;
