import {AppConfig} from "@/services";

const apiUrl = import.meta.env.VITE_API_HOST;
const ftpUrl = 'http://192.168.4.234:9000';

const appConfig = {
  qrCodeEnable: false,
  smsEnable: false,
  usernameEnable: true,
  ftpURL: ftpUrl,
  baseURL: apiUrl,
  icp: '',
  title: 'APIGrid',
  favicon: '',
  logo: '',
  loginBack: '',
  loginLogo: '',
}

export const useAppConfig = () => {
  return appConfig
}

export const setAppConfig = (initState: AppConfig) => {
  Object.assign(appConfig, initState);
}
