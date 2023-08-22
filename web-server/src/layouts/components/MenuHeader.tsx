import {Transition} from "react-transition-group";
import {DashboardOutlined, NodeIndexOutlined, SettingOutlined, TableOutlined} from "@ant-design/icons";
import {useTheme} from "@/hooks/useTheme";
import {Tooltip} from "antd";
import styled from 'styled-components';
import {useContext} from "react";
import {LayoutContext} from "@/layouts";

const menuTypeOptions = [
  {
    label: '仪表盘',
    value: 'dashboard',
    icon: <DashboardOutlined/>
  }, {
    label: '表格',
    value: 'datasheet',
    icon: <TableOutlined/>
  }, {
    label: '流程',
    value: 'flowable',
    icon: <NodeIndexOutlined/>
  }, {
    label: '设置',
    value: 'setting',
    icon: <SettingOutlined/>
  },
]
const MenuTypeWrapper: any = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    line-height: 40px;
    background: ${(props: any) => props.$bg};

    &:hover {
      background: hsla(0,0%,100%,.08);
    }
  `;

const MenuHeader = () => {
  const {collapsed, menuType, setMenuType} = useContext(LayoutContext);
  const {themeColors} = useTheme();
  //    background: ${menuType == props.typeItem.value ? themeColors.colorBgMenuItemSelected : themeColors.colorBgMenu},

  return <Transition in={collapsed} timeout={300}>
    {(state: string) => (
      <div className={`bjh-menu-header`} style={{borderColor: themeColors.colorPrimary}}>
        {menuTypeOptions.filter(typeItem => !collapsed || menuType == typeItem.value).map(typeItem => (
          <Tooltip title={typeItem.label} key={typeItem.value}>
            <MenuTypeWrapper
              $bg={typeItem.value == menuType ? themeColors.colorBgMenuItemSelected : themeColors.colorBgMenu}
              onClick={() => setMenuType(typeItem.value)}>
              <span className={'bjh-menu-header-type-icon'}>{typeItem.icon}</span>
            </MenuTypeWrapper>
          </Tooltip>
        ))}
      </div>
    )}
  </Transition>
}

export default MenuHeader;
