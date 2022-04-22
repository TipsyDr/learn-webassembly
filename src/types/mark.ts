import { TagType } from './tags';

export interface ResultsType {
  id?: number;
  projectId?: number;
  annotationId?: string;
  projectName?: string;
  sceneFeaturesList?: TagType[];
  sceneFeatures?: TagType[];
  framesCount?: number;
  annotationCount?: number;
  finishedTime?: string;
  ossAddr?: string;
  source?: string;
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
}

export interface CreateMarkTask {
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
}

export interface CreateMarkTaskResult extends API.ApiResponse {
  data: string;
}
