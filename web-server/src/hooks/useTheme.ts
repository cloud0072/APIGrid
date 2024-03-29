import {useMemo} from "react";
import {layoutThemeList, themeColorType} from "@/utils/theme";
import {atom, useAtomValue, useSetAtom} from "jotai";
// @ts-ignore
import tinycolor2 from "tinycolor2";

const THEME_MODE_KEY = 'THEME_MODE_KEY';
// 全局变量
const atomThemeMode = atom<string>(localStorage.getItem(THEME_MODE_KEY) || 'lightgreen')
export const useSetAtomThemeMode = () => useSetAtom(atomThemeMode);
export const useAtomValueThemeMode = () => useAtomValue(atomThemeMode);

export const useTheme = () => {
  const themeMode = useAtomValueThemeMode();
  const setAtomThemeMode = useSetAtomThemeMode();
  const setThemeMode = (mode: string) => {
    localStorage.setItem(THEME_MODE_KEY, mode)
    setAtomThemeMode(mode)
  };

  const themeColors: themeColorType = useMemo(() => {
    const theme = layoutThemeList.find(item => item.mode === themeMode) || layoutThemeList[8];
    const rgb = tinycolor2(theme.colorPrimary).toRgb()
    const extend = {
      "primaryHoverColor": tinycolor2({...rgb, a: 0.08}),
      "primaryActiveColor": tinycolor2({...rgb, a: 0.16}),
      "primaryShadowColor": tinycolor2({...rgb, a: 0.2}),
    }
    // console.log('update themeMode', themeMode)
    return Object.assign(theme, extend)
  }, [themeMode]);

  const layoutToken = useMemo(() => {
    return {
      colorPrimary: themeColors.colorPrimary,
      colorSecondary: themeColors.colorSecondary,
      bgLayout: '#f5f5f5',
      pageContainer: {
        paddingBlockPageContainerContent: 0,
        paddingInlinePageContainerContent: 0,
      },
      header: {
        colorBgHeader: themeColors.colorBgMenu,
        colorHeaderTitle: 'hsla(0,0%,100%,.85)',
      },
      sider: {
        // 展开时样式
        colorMenuBackground: themeColors.colorBgMenu,
        colorBgMenuItemSelected: themeColors.colorBgMenuItemSelected,
        // 折叠时的样式
        colorBgMenuItemCollapsedElevated: themeColors.colorBgMenu,
        colorBgMenuItemCollapsedSelected: themeColors.colorBgMenuItemSelected,
        colorBgMenuItemCollapsedHover: 'hsla(0,0%,100%,.85)',
        colorMenuItemDivider: 'hsla(0,0%,100%,.08)',
        colorTextMenu: 'hsla(0,0%,100%,.85)',
        colorTextMenuActive: 'hsla(0,0%,100%,.85)',
        colorTextMenuItemHover: 'hsla(0,0%,100%,.85)',
        colorTextMenuSelected: 'hsla(0,0%,100%,.85)',
      }
    }
  }, [themeMode])

  return {
    themeMode,
    setThemeMode,
    themeColors,
    layoutToken
  }
}
