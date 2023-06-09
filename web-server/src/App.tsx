import {FC, useMemo} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "@/routes";
import {App as AntdApp, ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {ProComponentsProvider} from "@/features";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useTheme} from "@/hooks/useTheme";

export const App: FC = () => {
  const basename = import.meta.env.BASE_URL;
  const router = createBrowserRouter(routes, {basename});

  const {themeMode, themeColors} = useTheme();
  const theme = useMemo(() => {
    console.log('themeMode', themeMode)
    return {
      token: {
        colorPrimary: themeColors.colorPrimary
      }
    }
  }, [themeMode])

  return (
    <>
      <ConfigProvider locale={zhCN} theme={theme}>
        <AntdApp>
          <ProComponentsProvider>
            <RouterProvider router={router}/>
          </ProComponentsProvider>
        </AntdApp>
      </ConfigProvider>
      <ReactQueryDevtools/>
    </>
  )
}
