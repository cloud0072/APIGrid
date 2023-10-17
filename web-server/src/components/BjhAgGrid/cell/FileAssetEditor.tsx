import React, {useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {Button, Image, Space, Table, Upload, UploadFile, UploadProps} from "antd";
import styles from './style.module.less';
import BjhDropdown from "@/components/BjhDropdown";
import {DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import {FileUploadApi} from "@/services/framework/FileUpload";
import {DefaultImage, getFileMd5, isImage, toUrl} from "@/utils/fileUtils";
import {ICellEditorParams} from "ag-grid-community";
import ReactDOM from "react-dom";

export type FileAsset = {
  id?: string;
  fileName?: string;
  fileUrl?: string;
  token?: string;
  md5?: string;
  mimeType: string;
  size: number;
}

const FileAssetEditor = React.forwardRef((props: ICellEditorParams, ref) => {
  const [editing, setEditing] = useState<boolean>(true);
  const [fileList] = useState<UploadFile[]>([]);
  const [fileAssets, setFileAssets] = useState<FileAsset[]>([]);
  const refContainer = useRef<HTMLDivElement>(null);

  const focus = () => {
    window.setTimeout(() => {
      let container: any = ReactDOM.findDOMNode(refContainer.current);
      if (container) {
        container.click();
      }
    });
  };

  const getValue = (): any => {
    return fileAssets.map((f: any) => f.id);
  }

  const handleOk = () => {
    setEditing(false)
  }

  const handleCancel = () => {
    // setFileAssets(props.value && props.value instanceof Array ? props.value : [])
    setEditing(false)
  }

  const handleDeleted = (id: string) => {
    setFileAssets(prev => prev.filter(f => f.id != id))
  }

  const columns: any = useMemo(() => [
    {
      title: '图片',
      dataIndex: 'token',
      key: 'token',
      width: 150,
      render: (token: string, record: FileAsset) => (
        <Image
          src={isImage(record.mimeType) ? toUrl(token) : DefaultImage}
          height={60}
          fallback={DefaultImage}
          alt=""
        />
      )
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
      width: 120
    },
    {
      title: '类型',
      dataIndex: 'mimeType',
      key: 'mimeType',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <div>
          <Button
            type={'text'}
            icon={<DeleteOutlined/>}
            onClick={() => handleDeleted(id)}
            danger
          >
            删除
          </Button>
        </div>
      )
    }
  ], [])

  useEffect(() => {
    focus()
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

  const uploadProps: UploadProps = {
    onRemove: () => {
    },
    /**
     *
     * @param file
     */
    beforeUpload: async (file) => {
      const {name, type, size} = file
      const md5 = await getFileMd5(file) as string;
      const params: FileAsset = {
        fileName: name,
        mimeType: type,
        md5,
        size
      }
      const response = await FileUploadApi.getPreSignedPutUrl(params);
      const {code, token, putUrl, id} = response;
      if (code == 200 && putUrl) {
        await FileUploadApi.upload(putUrl, file)
        setFileAssets((prev: FileAsset[]) => prev.concat([{...params, id, token}]))
      }
      return false;
    },
    fileList,
    showUploadList: false,
  }

  const titleRender = () => (
    <div>{'上传文件'}</div>
  )

  const dropdownRender = () => (
    <div className={styles.fileDropdown}>
      <div className={styles.fileUpload}>
        <Table
          dataSource={fileAssets}
          columns={columns}
          rowKey={'id'}
          size={'small'}
          virtual
          pagination={false}
          scroll={{x: 600, y: 270}}
        />
      </div>
      <div className={styles.fileBottom}>
        <div className={styles.fileBottomLeft}>
          <Space>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined/>}>上传</Button>
            </Upload>
          </Space>
        </div>
        <div className={styles.fileBottomRight}>
          <Space>
            <Button onClick={handleOk} type={'primary'}>确认</Button>
            <Button onClick={handleCancel}>取消</Button>
          </Space>
        </div>
      </div>
    </div>
  )

  return (
    <BjhDropdown
      trigger={['click']}
      titleRender={titleRender}
      dropdownRender={dropdownRender}
      width={600}
    >
      <div ref={refContainer} className={styles.uploadContainer}>
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
    </BjhDropdown>
  )
})

export default FileAssetEditor;
