import { PaginationProps } from 'antd';

export type IconTypes =
  | 'account'
  | 'bag'
  | 'baseInfo'
  | 'case'
  | 'create'
  | 'dashboard'
  | 'documentation'
  | 'download'
  | 'file'
  | 'guide'
  | 'mark'
  | 'permission'
  | 'replay'
  | 'reset'
  | 'search'
  | 'tag'
  | 'truck'
  | 'user'
  | 'edit'
  | 'goback'
  | 'error'
  | 'startPoint'
  | 'endPoint';

export interface MapProps {
  key?: string;
  height?: string;
  width?: string;
  mapData: LbsParams;
}

export interface MapPoint {
  driving: string;
  lat: string;
  lng: string;
}

interface TripStatistics {
  autopilotMileage: number;
  averageSpeed: number;
  totalMileage: number;
}

export type MapData = {
  caseList?: MapPoint[];
  path?: MapPoint[];
  tripStatistics?: TripStatistics;
};

export interface CheckboxOptions {
  label: string;
  value: string;
}

export interface Option {
  id?: number;
  code: number;
  name: string;
}

export interface TaskTypeApi extends API.ApiResponse {
  data?: {
    list?: Option[];
  };
}

export interface Pagination extends PaginationProps {
  page?: number;
  total?: number;
  pageSize?: number;
  totalCount?: number;
  totalPage?: number;
  currPage?: number;
  current?: number;
  pageNumber?: number;
  totalElements?: number;
}

export interface SelectOption {
  label: string;
  value: number;
}

export interface LbsParams {
  carLicense: string;
  startTime: string;
  endTime: string;
  bagSetId: string;
}
