export interface BagSetInfo {
  bagSetId?: string;
  carLicense?: string;
  startTime?: string;
  endTime?: string;
  fileNum?: number;
  size?: number;
  id?: number;
  fileSize?: number;
  duration?: number;
  installVersion?: string;
  hdMapVersion?: string;
  sceneFeatures?: TagType[];
  taskType?: string[];
}

export interface BagSetInfoListResult extends API.ApiResponse {
  data: {
    content: BagSetInfo[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}

import { TagType } from './tags';

export interface CaseInfo {
  caseID?: string;
  caseId?: string;
  fileType?: string;
  fileId?: string;
  priority?: string;
  taskType?: string[];
  sceneFeatures?: TagType[];
  sceneFeaturesList?: TagType[];
  start?: string;
  end?: string;
  ossAddr?: string;
  issue?: string;
  bagSetId?: string;
  informant?: string;
  duration?: string;
  dateTime?: string;
  carLicense?: string;
  hdMapVersion?: string;
  installVersion?: string;
  comment?: string;
}

export interface BagInfo {
  fileType?: string;
  fileId?: string;
  priority?: string;
  taskType?: string[];
  sceneFeatures?: TagType[];
  start?: string;
  end?: string;
  fileAddr?: string;
}

export interface BagList {
  bagSetId?: string;
  ossAddr?: string;
  files?: BagInfo[];
}

export interface BagListParams {
  bagSetId?: string;
  fileType?: number;
  taskType?: number;
}

export interface BagListResult extends API.ApiResponse {
  data: BagList;
}

export interface CreateCaseParams {
  bagSetId?: string;
  userId?: string;
  dateTime: number | string;
  carLicense?: string;
  informant?: string;
  priority?: string;
  taskType?: string;
  sceneFeatures?: TagType[];
  bagIds?: string[];
  remark?: string;
}

export interface UpdateCaseInfoParams {
  caseId: string;
  priority?: string;
  issue?: string;
  comment?: string;
}
