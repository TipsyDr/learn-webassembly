import { useGetOne, usePut, get, usePost } from './request';
import { LbsParams } from '@/types';

export const useGetSceneDescription = () => {
  return useGetOne<any>(
    'getScence',
    '/data_manager_server/annotation/getScence',
  );
};

export const getTrackLbs = (params: LbsParams) => {
  return get<any>('/data_manager_server/bagMetaData/getTrackHistory', params);
};

export const useGetTaskType = () => {
  return useGetOne<any>(
    'getTaskType',
    '/data_manager_server/common/taskType/constants',
  );
};

export const useUpdateTags = () => {
  return usePut<any>('/data_manager_server/case/updateSceneFeature');
};

export const useUpdateBagTags = () => {
  return usePut<any>('/data_manager_server/bagMetaData/updateSceneFeature');
};

export const useUpdateScence = () => {
  return usePost<{ annotationId?: string; sceneFeatures?: string }, any>(
    '/data_manager_server/annotation/updateScence',
  );
};

export const downLoadFile = (params: { ossAddr: string; source: string }) => {
  return get<any>(
    '/data_manager_server/annotationVersionInfo/download',
    params,
  );
};

export const previewImg = (params: {
  annotationId: string;
  source: string;
}) => {
  return get<any>('/data_manager_server/annotation/previewImg', params);
};
