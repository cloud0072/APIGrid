import axios from "axios";

/** 响应信息主体 */
export interface AppConfig {
  /**
   * 启用扫码登陆
   */
  qrCodeEnable: boolean;
  /**
   * 启用短信登陆
   */
  smsEnable: boolean;
  /**
   * 启用密码登陆
   */
  usernameEnable: boolean;
  ftpURL: string;
  baseURL: string;
  uploadURL: string;
  zbxFileUploadURL: string;
  appId: string;
  agentId: number;
  redirectUri: string;
  icp: string;
  title: string;
  favicon: string;
  logo: string;
  loginBack: string;
  loginLogo: string;
}

export const getAppConfig = () => {
  return axios.get('/config.json').then(response => response?.data)
}
