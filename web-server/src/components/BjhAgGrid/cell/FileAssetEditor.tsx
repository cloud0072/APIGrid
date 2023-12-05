import React, {useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {Image} from "antd";
import styles from './style.module.less';
import BjhDropdown from "@/components/BjhDropdown";
import {DefaultImage, isImage, toUrl} from "@/utils/fileUtils";
import {ICellEditorParams} from "ag-grid-community";
import ReactDOM from "react-dom";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import useFileAsset from "@/components/BjhAgGrid/hooks/useFileAsset";

const FileAssetEditor = React.forwardRef((props: ICellEditorParams, ref) => {
  const [editing, setEditing] = useState<boolean>(true);
  const refContainer = useRef<HTMLDivElement>(null);

  const {
    localValue,
    UploadRender,
    getValue
  } = useFileAsset({
    value: props.value,
    onOk: () => {
      setEditing(false)
    },
    onCancel: () => {
      // setLocalValue(props.value && props.value instanceof Array ? props.value : [])
      setEditing(false)
    }
  })

  const {rowHeight} = useGrid()
  const fileStyle = useMemo(() => {
    return {
      height: rowHeight - 6
    }
  }, [rowHeight])

  const focus = () => {
    window.setTimeout(() => {
      let container: any = ReactDOM.findDOMNode(refContainer.current);
      if (container) {
        container.click();
      }
    });
  };

  useEffect(() => {
    focus()
  }, [])

  useEffect(() => {
    if (!editing) {
      props.stopEditing();
    }
  }, [editing]);

  useImperativeHandle(ref, () => {
    return {
      getValue,
    };
  });

  return (
    <BjhDropdown
      trigger={['click']}
      titleRender={<div>{'上传文件'}</div>}
      dropdownRender={UploadRender}
      width={600}
    >
      <div ref={refContainer} className={styles.uploadContainer} style={{padding: '0 2px'}}>
        {localValue.map(f =>
          <div className={styles.uploadFile} style={fileStyle}>
            <Image
              key={f.id}
              height={fileStyle.height}
              src={isImage(f.mimeType) ? toUrl(f.token) : DefaultImage}
              preview={false}
            />
          </div>
        )}
      </div>
    </BjhDropdown>
  )
})

export default FileAssetEditor;
