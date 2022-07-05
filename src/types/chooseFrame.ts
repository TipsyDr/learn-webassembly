export interface GetChooseFrameBasicDataParams {
  batch: string;
  type?: '0' | '1';
}
export interface FrameBasicData {
  index?: number;
  strictDateOptionalTimeNanos?: string;
  status: string;
  pcdOssAddress?: string;
  picOssAddress?: string[];
  picOssAddressId?: string[];
  gid?: string;
  gtime?: string;
  smallestUnitTimestamp?: string;
}
export interface ImageInfo {
  content: FrameBasicData[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
interface BaseDataItem {
  smallestUnitTimestamp: string;
  status: string;
}
export interface ChooseFrameBasicDataResult extends API.ApiResponse {
  data: BaseDataItem[];
}

export interface AnnotationResult {
  pic: any[];
  pcd: any[]
}
export interface AnnotationResultInfo {
  content: AnnotationResult[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
export interface GetChooseFrameListParams {
  batch?: string;
  gId?: string;
  type?: '0' | '1';
  chooseFrameId?: string;
  startTime?:string;
  endTime?:string;
  pageNumber?: number;
  pageSize?: number;
}
export interface ChooseFrameListResult extends API.ApiResponse {
  data: {
    chooseFrameId: string;
    imageInfo: ImageInfo;
    count: number | string;
  };
}

export interface GetAnnotationResultListParams {
  resultId: string;
  pageNumber?: number;
  pageSize?: number;
}
export interface GetAnnotationResultListResult extends API.ApiResponse {
  data: any
}

export interface SaveFrameStatusParams {
  batch: string;
  startTime: string;
  endTime?: string;
  isValid: 0 | 1;
  chooseFrameProportion?: string | number;
  chooseFrameRadix?: string | number;
}
export interface SaveFrameStatusResult extends API.ApiResponse {
  data: number | string;
}

export interface CountFrameStatusParams {
  batch?: string;
  chooseFrameId?: string;
  isRealtime?: string;
  chooseFrameProportion: number | string;
  chooseFrameRadix?: string | number;
  startTime: string;
  endTime?: string;
}
export interface CountFrameStatusResult extends API.ApiResponse {
  data: {
    total: number | string;
  };
}

// 查询挑帧数据列表结果
export interface FrameListItem {
  batch?: string;
  batchStatus?: string;
  chooseFrameId: string;
  totalFrames: string;
  uncompleteRate?: string;
  batchQuantity: string;
  undoneQuantity: string;
  dataStartTime: string;
  startTime?: string;
  endTime?: string;
  dataEndTime: string;
  createTime: string;
}
export interface FrameListResult extends API.ApiResponse {
  data: {
    totalElements?: number | string;
    totalPages?: number | string;
    pageNumber?: number | string;
    pageSize?: number | string;
    numberOfElements?: number | string;
    content?: FrameListItem[];
  };
}

// 查询挑帧数据列表结果
export interface BatchListItem {
  batch: string;
  batchDataStartTime: string;
  batchDataEndTime: string;
  validFramesTotal: number | string;
  batchStatus: string;
  createTime: string;
  duration: string;
  executor: string;
  qualityinspectors: string;
}