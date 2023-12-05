import React, {useEffect, useMemo, useState} from "react";
import {Button, Image, Space, Table, Upload, UploadFile, UploadProps} from "antd";
import {DefaultImage, getFileMd5, isImage, toUrl} from "@/utils/fileUtils";
import {DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import {FileAsset} from "@/components/BjhAgGrid/constants";
import {FileUploadApi} from "@/services/framework/FileUpload";
import styles from "@/components/BjhAgGrid/cell/style.module.less";

const useFileAsset = (props?: any) => {

  const [localValue, setLocalValue] = useState<FileAsset[]>([]);
  const [fileList] = useState<UploadFile[]>([]);

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
        setLocalValue((prev: FileAsset[]) => {
          const result = prev.concat([{...params, id, token}]);
          props.onChange && props.onChange(result.map(f => f.id));
          return result;
        })
      }
      return false;
    },
    fileList,
    showUploadList: false,
  }

  const getValue = () => {
    return localValue.map((f: any) => f.id);
  }

  const handleDeleted = (id: string) => {
    setLocalValue(prev => {
      const result = prev.filter(f => f.id != id);
      props.onChange && props.onChange(result.map(f => f.id));
      return result;
    })
  }

  useEffect(() => {
    focus()
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

  const UploadRender = () => (
    <div className={styles.fileContainer}>
      <div className={styles.fileUpload}>
        <Table
          dataSource={localValue}
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
          {
            props.hideAction ? null :
              <Space>
                <Button onClick={() => props.onOk()} type={'primary'}>确认</Button>
                <Button onClick={() => props.onCancel()}>取消</Button>
              </Space>
          }
        </div>
      </div>
    </div>
  )

  return {
    fileList,
    localValue, setLocalValue,
    getValue,
    UploadRender
  }
}

export default useFileAsset;
