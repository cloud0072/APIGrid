import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import styles from "@/components/BjhAgGrid/header/style.module.less";
import EditFieldPopover from "@/components/BjhAgGrid/header/EditFieldPopover";

const AddFieldHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
      <EditFieldPopover open={open} onChange={(e: any) => setOpen(e)}>
        <div className={styles.fieldHeader} onClick={() => setOpen(!open)}>
          <PlusOutlined/>
        </div>
      </EditFieldPopover>
    </div>
  )
}

export default AddFieldHeader;
