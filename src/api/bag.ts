import { useGetList, useGet } from './request';
import {
  BagListParams,
  Pagination,
  BagSetInfo,
  BagSetInfoListResult,
  BagListResult,
} from '@/types';

export const useGetBagSetList = (
  pagination?: Pagination,
  filters?: BagSetInfo,
) => {
  return useGetList<BagSetInfoListResult>(
    'bagSetList',
    '/data_manager_server/bagSet/list',
    pagination,
    filters,
  );
};

export const useGetBagSetInfo = (filters?: BagSetInfo) => {
  return useGet<BagSetInfoListResult>(
    'bagSetInfo',
    '/data_manager_server/bagSet/list',
    { pageSize: 10, pageNumber: 1, ...filters },
  );
};

export const useGetBagList = (params: BagListParams) => {
  return useGet<BagListResult>(
    'bagList',
    '/data_manager_server/bagMetaData/fileList',
    params,
  );
};
