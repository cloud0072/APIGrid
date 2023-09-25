import {Dropdown, theme} from "antd";
import IconFont from "@/components/IconFont";
import React from "react";
import styles from './style.module.less';
import {FileExcelOutlined} from "@ant-design/icons";
import {t} from "@/utils/i18n";
import {MenuActionKey, MenuLabel} from "@/layouts/components/MenuNodePanel/MenuContext";

const GridFieldHeader = ({api, column, displayName}: any) => {
  const {useToken} = theme;
  const {token} = useToken();

  const menus = {
    items: [
      {
        key: MenuActionKey.Export,
        label: <MenuLabel icon={<FileExcelOutlined/>} title={t.menu_node_export}/>,
      },
    ]
  }

  return (
    <div style={{width: '100%'}}>
      <Dropdown trigger={['click', 'contextMenu']} menu={menus}>
        <div className={styles.fieldHeader}>
          <div className={styles.fieldHeaderTitle}>
            {displayName}
          </div>
          <div className={styles.fieldHeaderIcon}>
            <IconFont type="yun-gengduo" className={styles.filterIcon} style={{color: token.colorTextSecondary}}/>
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

export default GridFieldHeader;
