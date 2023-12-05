import {Dropdown, theme} from "antd";
import IconFont from "@/components/IconFont";
import React, {useState} from "react";
import styles from './style.module.less';
import {DeleteOutlined, EditOutlined, EyeInvisibleOutlined, PushpinOutlined} from "@ant-design/icons";
import {t} from "@/utils/i18n";
import {MenuActionKey, MenuLabel} from "@/layouts/components/MenuNodePanel/MenuContext";
import EditFieldPopover from "@/components/BjhAgGrid/header/EditFieldPopover";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {View} from "@/components/BjhAgGrid/constants";

const items = [
  {
    key: MenuActionKey.EditField,
    label: <MenuLabel icon={<EditOutlined/>} title={t.field_edit}/>,
  },
  {
    key: MenuActionKey.FrozenField,
    label: <MenuLabel icon={<PushpinOutlined/>} title={t.field_frozen}/>,
  },
  {
    key: MenuActionKey.HideField,
    label: <MenuLabel icon={<EyeInvisibleOutlined/>} title={t.field_hide}/>,
  },
  {
    key: MenuActionKey.DeleteField,
    label: <MenuLabel icon={<DeleteOutlined/>} title={t.field_delete}/>,
  },
]

const GridFieldHeader = ({api, column, displayName}: any) => {
  const {useToken} = theme;
  const {token} = useToken();

  const {setFieldVisible, setDatasheet, fieldMap, views} = useGrid();
  const removeFieldMap = (fieldId: string) => {
    if (fieldId) {
      delete fieldMap[fieldId]
      const nViews = views?.map((v: View) => {
        v.columns = v.columns?.filter(f => f.fieldId != fieldId)
        return v;
      });
      setDatasheet((prev: any) => Object.assign({}, prev, {fieldMap, views: nViews}))
    }
  }

  const onClick = ({key}: any) => {
    console.log(`onClick key`, key)
    const fieldId = column?.colDef?.field;
    switch (key) {
      case MenuActionKey.EditField:
        setOpen(true);
        break;
      case MenuActionKey.HideField:
        setFieldVisible(fieldId, true)
        break;
      case MenuActionKey.DeleteField:
        removeFieldMap(fieldId);
        break;
      default:
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <div style={{width: '100%', height: '100%'}}>
      <EditFieldPopover open={open} onChange={(e: any) => setOpen(e)} column={column}>
        <Dropdown trigger={['contextMenu']} menu={{items, onClick}}>
          <div className={styles.fieldHeader}>
            <div className={styles.fieldHeaderTitle}>
              {displayName}
            </div>
            <div className={styles.fieldHeaderIcon}>
              <IconFont type="yun-gengduo" className={styles.filterIcon} style={{color: token.colorTextSecondary}}/>
            </div>
          </div>
        </Dropdown>
      </EditFieldPopover>
    </div>
  )
}

export default GridFieldHeader;
