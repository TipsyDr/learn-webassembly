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

export interface PermissionVo {
  editBag: boolean;
  editCase: boolean;
  convertLable: boolean;
  createAccount: boolean;
  createCase: boolean;
  editCar: boolean;
  query: boolean;
  search: boolean;
}

export interface UserInfo {
  userId?: number;
  userName?: string;
  roleId?: number;
  roleName?: string;
  permissionVo?: PermissionVo;
}

export interface UserResult extends API.ApiResponse {
  data?: UserInfo;
}
