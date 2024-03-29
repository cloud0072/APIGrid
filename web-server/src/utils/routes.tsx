import type {MenuDataItem} from '@ant-design/pro-components';
import IconFont from "@/components/IconFont";

export interface RouteSetting {
  /**
   * @description: 路由名称，用做 tab 标签页的标题
   */
  name: string;
  /**
   * @description: 是否可关闭 tab 标签页, 默认为 true
   */
  closableTab: boolean;
  /**
   * @description: 是否缓存页面, 默认为 false
   */
  isKeepAlive: boolean;
  /**
   * @description: 当前路径
   */
  key: string;
}

export const convertUserRoutesToMenus = (userRoutes: any[] = []): MenuDataItem[] => {
  const menus: MenuDataItem[] = [];

  userRoutes.forEach((item) => {
    const {path, meta, hidden} = item;

    let children: MenuDataItem[] = [];

    if (item.children && item.children.length > 0) {
      children = convertUserRoutesToMenus(item.children);
    }

    menus.push({
      path: path,
      name: meta?.title ?? path,
      type: meta?.type ?? 'datasheet',
      hideInMenu: hidden,
      icon: <IconFont type={meta?.icon || '#'}/>,
      link: meta?.link,
      children,
    });
  });

  return menus;
};

export const getRouteSettingMap = (userMenus: any[] = []): Record<string, RouteSetting> => {
  const settingMap: Record<string, RouteSetting> = {};

  userMenus.forEach((menu) => {
    const {path, meta} = menu;

    if (menu.children === undefined) {
      settingMap[path] = {
        key: path,
        name: meta?.title ?? path,
        isKeepAlive: !meta?.noCache,
        closableTab: true,
      };
      return;
    }

    Object.assign(settingMap, getRouteSettingMap(menu.children));
  });

  return settingMap;
};
