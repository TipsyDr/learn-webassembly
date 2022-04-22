import { Pagination, TruckParams, TrunkResult } from '@/types';
import { useGetList, get, usePost } from './request';

export const useGetTruckList = (
  pagination?: Pagination,
  filters?: TruckParams,
) => {
  return useGetList<any>(
    'getVehicleList',
    '/data_manager_server/vehicle/list',
    pagination,
    filters,
  );
};

export const getTruckInfo = (params?: TruckParams) => {
  return get<TrunkResult>(
    '/data_manager_server/vehicle/getVehicleInfoById',
    params,
  );
};

export const useUpdateTruck = () => {
  return usePost<API.ApiResponse, API.ApiResponse>(
    '/data_manager_server/vehicle/saveOrUpdateVehicle',
  );
};
