import React, {useCallback, useContext, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Field, GridContext, View} from "@/components/BjhAgGrid";
import styles from "@/components/BjhAgGrid/header/style.module.less";
import EditFieldPopover from "@/components/BjhAgGrid/header/EditFieldPopover";

const AddFieldHeader = () => {
  const {views, setViews, fieldMap, setFieldMap} = useContext(GridContext)

  const createFieldMap = useCallback((fieldInfo: Field) => {
    setFieldMap(Object.assign(fieldMap, fieldInfo))
    setViews(views?.map((v: View) => {
      v.columns.push({fieldId: fieldInfo.id})
      return v;
    }))
  }, [views, fieldMap])
  const updateFieldMap = useCallback((fieldInfo: Field) => {
    setFieldMap(Object.assign(fieldMap, fieldInfo))
  }, [fieldMap])
  const removeFieldMap = useCallback((fieldId: string) => {
    delete fieldMap[fieldId]
    setFieldMap(fieldMap)
    setViews(views?.map((v: View) => {
      v.columns = v.columns?.filter(f => f.fieldId != fieldId)
      return v;
    }))
  }, [views, fieldMap])

  const [open, setOpen] = useState(false);
  const handleChange = (e: any) => {
    setOpen(e)
  }

  return (
    <div style={{width: '100%', textAlign: 'center'}}>
      <EditFieldPopover open={open} onChange={(e: any) => setOpen(e)}>
        <div className={styles.fieldHeader} onClick={() => setOpen(!open)}>
          <PlusOutlined/>
        </div>
      </EditFieldPopover>
    </div>
  )
}

export default AddFieldHeader;
