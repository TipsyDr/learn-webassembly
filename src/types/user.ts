import { MenuChild } from '@/types/menu';

/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  /** 用户名 */
  userName: string;
  /** 用户密码 */
  password: string;
}

export interface LoginResult {
  code: string;
  message?: string;
  success?: boolean;
  /** auth token */
  data: {
    token: string;
  };
}

export interface LogoutParams {
  token: string;
}

export interface PermissionVoList {
  editBag: boolean;
  editCase: boolean;
}

export interface UserInfo {
  userId?: number;
  userName?: string;
  roleId?: number;
  roleName?: string;
  permissionVoList?: PermissionVoList;
}

export interface UserResult extends API.ApiResponse {
  data?: UserInfo;
}
