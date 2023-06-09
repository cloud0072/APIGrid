import type {RouteSetting} from '@/utils';
import {Dropdown, Space, theme} from 'antd';
import type {FC} from 'react';
import {useEffect, useState} from 'react';
import type {useOutlet} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';
import {CloseOutlined, MenuOutlined} from "@ant-design/icons";

export type KeepAliveElements = Record<string, ReturnType<typeof useOutlet>>;

interface HeaderTabsProps {
  currRouteSettings?: RouteSetting;
  removeElementByKey: (key: string) => void;
  refreshElementByKey: (key: string) => void;
}

interface TabItem {
  key: string;
  label: string;
  pathname: string;
  search: string;
  closable: boolean;
  keepAlive: boolean;
}

const defaultTabs: TabItem[] = [
  {
    key: '/',
    label: '首页',
    pathname: '/',
    search: '',
    closable: false,
    keepAlive: true,
  },
];

const TabsHeader: FC<HeaderTabsProps> = ({currRouteSettings, refreshElementByKey, removeElementByKey}) => {
  const {pathname, search} = useLocation();
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState<string>();
  const [items, setItems] = useState<TabItem[]>(defaultTabs);
  const {useToken} = theme;
  const {token} = useToken();

  const handleChange = (key: string) => {
    const {pathname, search} = items.find((item) => item.key === key)!;
    navigate(`${pathname}${search}`);
  };

  const handelRefreshTab = (targetKey: string) => {
    refreshElementByKey(targetKey);
  };

  const handleRemoveTab = (targetKey: string) => {
    const currActiveKeyIndex = items.findIndex(({key}) => key === targetKey);

    const {pathname, search} =
      items[currActiveKeyIndex < items.length - 1 ? currActiveKeyIndex + 1 : currActiveKeyIndex - 1];

    navigate(`${pathname}${search}`);

    setItems((v) => v.filter(({key}) => key !== targetKey));

    removeElementByKey(targetKey);
  };

  const handleRemoveOtherTabs = (targetKey: string, url: string) => {
    setItems((e) => {
      e.filter((i) => i.closable && i.key !== targetKey).forEach(({key}) => {
        removeElementByKey(key);
      });

      return e.filter((i) => !i.closable || i.key === targetKey);
    });

    navigate(url);
  };

  const handelRemoveLeftTabs = (targetKey: string, currActiveKeyIndex: number, url: string) => {
    setItems((e) => {
      const removeKeys = e.filter((i, index) => i.closable && index < currActiveKeyIndex).map((i) => i.key);

      removeKeys.forEach((key) => {
        removeElementByKey(key);
      });

      return e.filter((i) => !removeKeys.includes(i.key));
    });

    navigate(url);
  };

  const handelRemoveRightTabs = (targetKey: string, currActiveKeyIndex: number, url: string) => {
    setItems((e) => {
      const removeKeys = e.filter((i, index) => i.closable && index > currActiveKeyIndex).map((i) => i.key);

      removeKeys.forEach((key) => {
        removeElementByKey(key);
      });

      return e.filter((i) => !removeKeys.includes(i.key));
    });

    navigate(url);
  };

  const handleRemoveAllTabs = () => {
    navigate('/');

    setItems((e) => {
      e.filter((i) => i.closable && i.keepAlive).forEach(({key}) => {
        removeElementByKey(key);
      });

      return defaultTabs;
    });
  };

  useEffect(() => {
    if (currRouteSettings === undefined) {
      setActiveKey(undefined);
      return;
    }

    const {name: label, closableTab: closable, key, isKeepAlive} = currRouteSettings;

    setItems((v = []) => {
      // 如果当前路由不在标签页中，向标签页中添加当前路由
      if (v.every((i) => i.key !== key)) {
        return [...v, {key, label, pathname, search, closable, keepAlive: isKeepAlive}];
      }

      // 如果当前路由已经在标签页中，并且 pathname 与 search 与缓存中的一致，则直接返回
      if (v.some((i) => i.key === key && i.pathname === pathname && i.search === search)) return v;

      return v.map((i) => {
        if (i.key !== key) {
          return i;
        }

        return {
          ...i,
          search: i.search === search ? i.search : search,
          pathname: i.pathname === pathname ? i.pathname : pathname,
        };
      });
    });

    setActiveKey(key);
  }, [pathname]);

  const itemStyles = (isActive: boolean) => ({
    color: isActive ? token.colorPrimary : token.colorTextBase,
    backgroundColor: isActive ? token.colorPrimaryBg : token.colorBgBase
  })

  return (
    <div className="bjh-tab-bar">
      <Space>
        {items.map((item, index) => {
          const {pathname, search} = items[index];
          const url = `${pathname}${search}`;
          const isFirst = index === 0;
          const isFirstLeft = index === 1;
          const isLastRight = index === items.length - 1;
          return (
            <Dropdown
              key={item.key}
              menu={{
                items: [
                  {
                    label: '重新加载',
                    key: 'refresh',
                    disabled: item.key !== activeKey,
                    onClick: () => handelRefreshTab(item.key as string),
                  },
                  {
                    type: 'divider',
                  },
                  {
                    label: '关闭左侧',
                    key: 'closeLeft',
                    disabled: isFirst || isFirstLeft,
                    onClick: () => handelRemoveLeftTabs(item.key as string, index, url),
                  },
                  {
                    label: '关闭右侧',
                    key: 'closeRight',
                    disabled: isLastRight,
                    onClick: () => handelRemoveRightTabs(item.key as string, index, url),
                  },
                  {
                    type: 'divider',
                  },
                  {
                    label: '关闭其他',
                    key: 'closeOther',
                    disabled: isFirst,
                    onClick: () => handleRemoveOtherTabs(item.key as string, url),
                  },
                  {
                    label: '关闭全部',
                    key: 'closeAll',
                    disabled: isFirst,
                    onClick: () => handleRemoveAllTabs(),
                  },
                ],
              }}
              trigger={['contextMenu']}
            >
              <div
                className={`bjh-tab-bar-item ${activeKey === item.key ? 'bjh-tab-bar-selected' : ''}`}
                style={itemStyles(activeKey === item.key)}
                key={item.key}
                onClick={() => handleChange(item.key)}>
                <MenuOutlined style={{fontSize: '12px', marginRight: '4px'}}/>{item.label}
                {item.closable && <CloseOutlined
                  style={{fontSize: '12px', marginLeft: '4px'}}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveTab(item.key)
                  }}/>
                }
              </div>
            </Dropdown>
          )
        })}
      </Space>
    </div>
  );
};

export default TabsHeader;
