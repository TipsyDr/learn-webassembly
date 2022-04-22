import { LoginParams, LoginResult, UserResult } from '@/types';
import { useCreate, useGetUser } from './request';

export const useLogin = () => {
  return useCreate<LoginParams, LoginResult>('/data_user_center/user/login');
};

export const useGetUserInfo = () => {
  return useGetUser<UserResult>(
    'CurrentUser',
    '/data_user_center/user/getUserInfo',
  );
};

export const useGetPermission = () => {
  return useGetUser<LoginParams>(
    'Permission',
    '/data_user_center/user/getPermission',
  );
};
