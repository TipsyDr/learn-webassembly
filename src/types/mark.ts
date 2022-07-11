import { TagType } from './tags';

export interface MarkType {
  id?: number;
  projectId?: number;
  resultId?: string;
  jobStatus?: string;
  annotationId?: string;
  resultSetId?: string;
  chooseFrameId?: string;
  totalFrames?: string;
  projectName?: string;
  sceneFeaturesList?: TagType[];
  sceneFeatures?: TagType[];
  framesCount?: number;
  annotationCount?: number;
  finishedTime?: string;
  ossAddr?: string;
  source?: string;
  tagPlatformCode?: string;
  effectiveDataQuantity?: string;
  annotationStatus?: string;
}

export interface Version {
  index?: string;
  versionId?: string;
  versionName?: string;
  url?: string;
}

export interface CreateVersion {
  versionName: string;
  addr: string;
}

export interface CreateVersionResult extends API.ApiResponse {
  data: string;
}

export interface MarkListParams {
  versionName?: string;
  id?: string;
  chooseFrameId?: string;
  annotationType?: string;
  resultDataName?: string;
  start?: string;
  end?: string;
}

export interface CreateMarkTask {
  annotationId?: string[];
  tagPlatformCode?: string;
  ids?: any[];
  annotationType?: number;
  annotationVersionId?: number;
  annotationName?: string;
  annotationVersionName?: string;
  sceneFeaturesList?: TagType[];
  source?: string;
  caseVos?: string;
  bagsVos?: string;
  bagSetId?: string;
  ossUrl?: string;
  turnMarkInfo?: MarkType;
}

export interface CreateMarkTaskResult extends API.ApiResponse {
  data: string;
}

export interface ResultMarkInfo {
  annotationId: string;
  annotationName: string;
  annotationPlatform: string;
  annotationType: string;
  annotationVersion: string;
  completionTime: string;
  createTime: string;
  dimensionFrame: string;
  dimensionQuantity: string;
  id: string;
  jobStatus: string;
  ossAddress: string;
  resultId: string;
  totalFrame: string;
}

export interface GetResultMarkListResult extends API.ApiResponse {
  data: ResultMarkInfo;
}
