import {sysUserLogout} from '@/services/framework/Login';
import {clearToken} from '@/utils';

export const useLogout = () => {
  return async () => {
    await sysUserLogout();
    clearToken();
    window.location.replace('/login');
  };
};
