export const baseThemeConfig = {
  token: {
    borderRadius: 6,
    colorBgBase: '#fff',
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorTextBase: '#000',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    fontSize: 14,
    lineType: 'solid',
    lineWidth: 1,
    sizeUnit: 4,
    sizeStep: 4,
    sizePopupArrow: 16,
    controlHeight: 32,
    zIndexBase: 0,
    zIndexPopupBase: 1000,
    opacityImage: 1,
    motionUnit: 0.1,
    motionBase: 0,
    motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
    motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
    wireframe: false,
  },
}

export enum ThemeModeType {
  blue,
  cyan,
  deeporange,
  deeppurple,
  gray,
  green,
  indigo,
  lightblue,
  lightgreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
}

export type themeColorType = {
  mode: string;
  colorBgMenuItemSelected: string;  // 最暗
  colorBgMenu: string;
  colorSecondary: string;
  colorPrimary: string;
  colorPrimaryHover: string;
  colorPrimaryBorder: string; // 最亮
  primaryHoverColor?: string; // rgba
  primaryActiveColor?: string;
  primaryShadowColor?: string;
}

export const layoutThemeList: themeColorType[] = [
  {
    "mode": "pink",
    "colorBgMenuItemSelected": "#a61744",
    "colorBgMenu": "#c9325e",
    "colorSecondary": "#db446c",
    "colorPrimary": "#fc3d6d",
    "colorPrimaryHover": "#ff7595",
    "colorPrimaryBorder": "#ffa6b8",
  },
  {
    "mode": "red",
    "colorBgMenuItemSelected": "#a61a17",
    "colorBgMenu": "#c9372e",
    "colorSecondary": "#db4a40",
    "colorPrimary": "#f55442",
    "colorPrimaryHover": "#ff7e70",
    "colorPrimaryBorder": "#ffada1"
  },
  {
    "mode": "deeporange",
    "colorBgMenuItemSelected": "#bf360c",
    "colorBgMenu": "#e06822",
    "colorSecondary": "#f07c35",
    "colorPrimary": "#ff7919",
    "colorPrimaryHover": "#ffa463",
    "colorPrimaryBorder": "#ffc799"
  },
  {
    "mode": "orange",
    "colorBgMenuItemSelected": "#e09d00",
    "colorBgMenu": "#e09d00",
    "colorSecondary": "#ffcf40",
    "colorPrimary": "#fa9e00",
    "colorPrimaryHover": "#ffcf40",
    "colorPrimaryBorder": "#ffe27a"
  },
  {
    "mode": "yellow",
    "colorBgMenuItemSelected": "#e0bf00",
    "colorBgMenu": "#e0bf00",
    "colorSecondary": "#f7e439",
    "colorPrimary": "#f7c600",
    "colorPrimaryHover": "#f7e439",
    "colorPrimaryBorder": "#d6b300"
  },
  {
    "mode": "lime",
    "colorBgMenuItemSelected": "#b9c902",
    "colorBgMenu": "#b9c902",
    "colorSecondary": "#d4eb42",
    "colorPrimary": "#b9d433",
    "colorPrimaryHover": "#d4eb42",
    "colorPrimaryBorder": "#e1f57d"
  },
  {
    "mode": "lightgreen",
    "colorBgMenuItemSelected": "#4b8500",
    "colorBgMenu": "#5d9e13",
    "colorSecondary": "#72ab22",
    "colorPrimary": "#82b51b",
    "colorPrimaryHover": "#8ec44d",
    "colorPrimaryBorder": "#b5de8a"
  },
  {
    "mode": "green",
    "colorBgMenuItemSelected": "#077309",
    "colorBgMenu": "#1a8a20",
    "colorSecondary": "#299931",
    "colorPrimary": "#42b33e",
    "colorPrimaryHover": "#58b862",
    "colorPrimaryBorder": "#94d69d"
  },
  {
    "mode": "teal",
    "colorBgMenuItemSelected": "#00784c",
    "colorBgMenu": "#069667",
    "colorSecondary": "#14a678",
    "colorPrimary": "#40bd93",
    "colorPrimaryHover": "#3dc49e",
    "colorPrimaryBorder": "#7be3c9"
  },
  {
    "mode": "cyan",
    "colorBgMenuItemSelected": "#008096",
    "colorBgMenu": "#119fbf",
    "colorSecondary": "#24b1d4",
    "colorPrimary": "#44c1e3",
    "colorPrimaryHover": "#5ad5fa",
    "colorPrimaryBorder": "#96e3ff"
  },
  {
    "mode": "lightblue",
    "colorBgMenuItemSelected": "#006bb3",
    "colorBgMenu": "#1887db",
    "colorSecondary": "#2e98f0",
    "colorPrimary": "#3ea1f7",
    "colorPrimaryHover": "#61b3ff",
    "colorPrimaryBorder": "#9cccff"
  },
  {
    "mode": "blue",
    "colorBgMenuItemSelected": "#1345b0",
    "colorBgMenu": "#3060d9",
    "colorSecondary": "#4572ed",
    "colorPrimary": "#5283ff",
    "colorPrimaryHover": "#7595ff",
    "colorPrimaryBorder": "#abbcff"
  },
  {
    "mode": "indigo",
    "colorBgMenuItemSelected": "#2f1094",
    "colorBgMenu": "#512abd",
    "colorSecondary": "#673dd1",
    "colorPrimary": "#6647ff",
    "colorPrimaryHover": "#9e73fa",
    "colorPrimaryBorder": "#c8abff"
  },
  {
    "mode": "deeppurple",
    "colorBgMenuItemSelected": "#58148f",
    "colorBgMenu": "#7a29b3",
    "colorSecondary": "#8d39c4",
    "colorPrimary": "#ab19ff",
    "colorPrimaryHover": "#b866e8",
    "colorPrimaryBorder": "#e0a1ff"
  },
  {
    "mode": "purple",
    "colorBgMenuItemSelected": "#74147d",
    "colorBgMenu": "#9b28a1",
    "colorSecondary": "#ae37b3",
    "colorPrimary": "#d23ce6",
    "colorPrimaryHover": "#d663d6",
    "colorPrimaryBorder": "#faa2f7"
  },
  {
    "mode": "gray",
    "colorBgMenuItemSelected": "#0d1217",
    "colorBgMenu": "#2b3a4a",
    "colorSecondary": "#3c4e63",
    "colorPrimary": "#405870",
    "colorPrimaryHover": "#657996",
    "colorPrimaryBorder": "#9daec9"
  },
]

// export const layoutThemeConfig = {
//   'blue': [
//     '#1345b0',
//     '#3060d9',
//     '#4572ed',
//     '#5283ff',  // primary
//     '#7595ff',
//     '#abbcff',
//   ],
//   'cyan': [
//     '#008096',
//     '#119fbf',
//     '#24b1d4',
//     '#44c1e3',  // primary
//     '#5ad5fa',
//     '#96e3ff',
//   ],
//   'deeporange': [
//     '#bf360c',
//     '#e06822',
//     '#f07c35',
//     '#ff7919',
//     '#ffa463',
//     '#ffc799',
//   ],
//   'deeppurple': [
//     '#58148f',
//     '#7a29b3',
//     '#8d39c4',
//     '#ab19ff',
//     '#b866e8',
//     '#e0a1ff',
//   ],
//   'gray': [
//     '#0d1217',
//     '#2b3a4a',
//     '#3c4e63',
//     '#405870',
//     '#657996',
//     '#9daec9',
//   ],
//   'green': [
//     '#077309',
//     '#1a8a20',
//     '#299931',
//     '#42b33e',
//     '#58b862',
//     '#94d69d',
//   ],
//   'indigo': [
//     '#2f1094',
//     '#512abd',
//     '#673dd1',
//     '#6647ff',
//     '#9e73fa',
//     '#c8abff',
//   ],
//   'lightblue': [
//     '#006bb3',
//     '#1887db',
//     '#2e98f0',
//     '#3ea1f7',
//     '#61b3ff',
//     '#9cccff',
//   ],
//   'lightgreen': [
//     '#4b8500',
//     '#5d9e13',
//     '#72ab22',
//     '#82b51b',  // primary
//     '#8ec44d',
//     '#b5de8a',
//   ],
//   'lime': [
//     '#b9c902',
//     '#b9c902',
//     '#d4eb42',
//     '#b9d433',
//     '#d4eb42',
//     '#e1f57d',
//   ],
//   'orange': [
//     '#e09d00',
//     '#e09d00',
//     '#ffcf40',
//     '#fa9e00',
//     '#ffcf40',
//     '#ffe27a',
//   ],
//   'pink': [
//     '#a61744',
//     '#c9325e',
//     '#db446c',
//     '#fc3d6d',
//     '#ff7595',
//     '#ffa6b8',
//   ],
//   'purple': [
//     '#74147d',
//     '#9b28a1',
//     '#ae37b3',
//     '#d23ce6',
//     '#d663d6',
//     '#faa2f7',
//   ],
//   'red': [
//     '#a61a17',
//     '#c9372e',
//     '#db4a40',
//     '#f55442',
//     '#ff7e70',
//     '#ffada1',
//   ],
//   'teal': [
//     '#00784c',
//     '#069667',
//     '#14a678',
//     '#40bd93',
//     '#3dc49e',
//     '#7be3c9',
//   ],
//   'yellow': [
//     '#e0bf00',
//     '#e0bf00',
//     '#f7e439',
//     '#f7c600',
//     '#f7e439',
//     '#d6b300',
//   ],
// }
