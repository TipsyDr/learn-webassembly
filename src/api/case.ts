import { CaseInfo } from '@/types';
import { useGetList, usePut, useCreate, useGet } from './request';

export const useGetCaseList = (
  pagination?: API.Pagination,
  filters?: CaseInfo,
) => {
  return useGetList<any>(
    'caseList',
    '/data_manager_server/case/list',
    pagination,
    filters,
  );
};

export const useGetCaseInfo = (params?: CaseInfo) => {
  return useGet<any>('caseInfo', '/data_manager_server/case/info', params);
};

export const useUpdateCaseInfo = () => {
  return usePut<API.ApiResponse>('/data_manager_server/case/updateCaseInfo');
};

export const useCreateCase = () => {
  return useCreate<API.ApiResponse, API.ApiResponse>(
    '/data_manager_server/case/createCase',
  );
};
