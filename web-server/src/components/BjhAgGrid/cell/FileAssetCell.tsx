import {ICellRendererParams} from "ag-grid-community";
import React, {useEffect, useMemo, useState} from "react";
import {FileAsset} from "@/components/BjhAgGrid/cell/FileAssetEditor";
import {FileUploadApi} from "@/services/framework/FileUpload";
import {Image, Space} from "antd";
import {DefaultImage, isImage, toUrl} from "@/utils/fileUtils";
import styles from "@/components/BjhAgGrid/cell/style.module.less";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";

const FileAssetCell = React.forwardRef((props: ICellRendererParams, ref) => {
  const [localValue, setLocalValue] = useState<FileAsset[]>([]);
  const {rowHeight} = useGrid();

  const fileStyle = useMemo(() => {
    return {
      height: rowHeight - 6
    }
  }, [rowHeight])
  useEffect(() => {
    const ids = props.value;
    if (!ids || ids.length < 1) {
      return
    }
    FileUploadApi.getFileAssetByIds(ids).then(response => {
      const {data} = response;
      if (data) {
        setLocalValue(data)
      }
    })
  }, [])
  return (
    <div className={styles.uploadContainer} style={{margin: '0 -5px'}}>
      {localValue.map(f =>
        <div className={styles.uploadFile} style={fileStyle}>
          <Image key={f.id} height={fileStyle.height} src={isImage(f.mimeType) ? toUrl(f.token) : DefaultImage}
                 preview={false}/>
        </div>
      )}
    </div>
  )
})

export default FileAssetCell;
