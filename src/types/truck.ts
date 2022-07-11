export interface TruckInfo {
  // 车牌号
  vehicleLicense: string;
  // 车辆vic码
  vehicleVinId: string;
  // 车辆ID
  vehicleId: string;
  // 车辆型号
  vehicleModel: string;
  // 车辆颜色
  vehicleColor: string;
  // 车辆属性
  vehicleProperty: string;
  // 创建时间
  createDate: string;
}

export interface TruckData {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  pageNumber: number;
  list: TruckInfo[];
}

export interface TruckParams {
  pageSize?: number;
  currPage?: number;
  pageNumber?: number;
  vehicleLicense?: string;
  vehicleId?: string;
}

export interface TrunkResult extends API.ApiResponse {
  data: TruckInfo;
}
