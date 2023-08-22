import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import TabBarExtraContent from "@/layouts/components/TabBarExtraContent";
import {useContext} from "react";
import {LayoutContext} from "@/layouts";
import {useTheme} from "@/hooks/useTheme";

const HeaderContent = () => {
  const {collapsed, setCollapsed} = useContext(LayoutContext);
  const {layoutToken} = useTheme();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: layoutToken.colorSecondary,
      color: layoutToken?.sider?.colorTextMenu
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{
            cursor: 'pointer',
            fontSize: '16px',
            width: '44px',
            textAlign: 'center'
          }}
        >
          {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </div>
      </div>
      <TabBarExtraContent/>
    </div>
  )
}

export default HeaderContent;
