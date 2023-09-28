import React, {useCallback, useContext} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Field, GridContext, View} from "@/components/BjhAgGrid";

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

  return (
    <div style={{width: '100%', textAlign: 'center'}}>
      <PlusOutlined/>
    </div>
  )
}

export default AddFieldHeader;
