import {Transition} from "react-transition-group";
import {NodeIndexOutlined, SettingOutlined, TableOutlined} from "@ant-design/icons";
import {useTheme} from "@/hooks/useTheme";
import {Tooltip} from "antd";
import styled from 'styled-components';
import {useContext, useEffect} from "react";
import {LayoutContext} from "@/layouts";
import {useLocation} from "react-router-dom";

const menuTypeOptions = [
  {
    label: '表格',
    value: 'datasheet',
    icon: <TableOutlined/>
  },
  // {
  //   label: '仪表盘',
  //   value: 'dashboard',
  //   icon: <DashboardOutlined/>
  // },
  {
    label: '审批',
    value: 'flow',
    icon: <NodeIndexOutlined/>
  },
  {
    label: '系统',
    value: 'system',
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

  const {pathname} = useLocation();
  useEffect(() => {
    const opt = menuTypeOptions.find(opt => pathname.indexOf(`/${opt.value}/`) === 0);
    setMenuType(opt ? opt.value : 'datasheet');
  }, [pathname])

  return (
    <Transition in={collapsed} timeout={300}>
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
  )
}

export default MenuHeader;
