import { useGetList, useGetOne, useCreate } from './request';
import {
  CreateVersion,
  CreateVersionResult,
  CreateMarkTask,
  CreateMarkTaskResult,
  Version,
  MarkListParams,
} from '@/types';

export const useGetMarkList = (
  pagination?: API.Pagination,
  filters?: MarkListParams,
) => {
  return useGetList<any>(
    'markList',
    '/data_manager_server/annotation/getPositiveResult',
    pagination,
    filters,
  );
};

export const useGetPutMarkList = (
  pagination?: API.Pagination,
  filters?: MarkListParams,
) => {
  return useGetList<any>(
    'getAnnotationList',
    '/data_manager_server/annotation/getAnnotationList',
    pagination,
    filters,
  );
};

export const useGetMarkVersionList = (
  pagination?: API.Pagination,
  filters?: Version,
) => {
  return useGetList<any>(
    'markVersionList',
    '/data_manager_server/annotation/version/list',
    pagination,
    filters,
  );
};

export const useCreateAnnotationVersion = () => {
  return useCreate<CreateVersion, CreateVersionResult>(
    '/data_manager_server/annotationVersionInfo/createAnnotationVersion',
  );
};

export const useGetAnnotationVersion = () => {
  return useGetOne<any>(
    'getAnnotationVersion',
    '/data_manager_server/annotationVersionInfo/getVersionList',
  );
};

export const useGetAnnotationType = () => {
  return useGetOne<any>(
    'getAnnotationType',
    '/data_manager_server/annotation/getAnnotationType',
  );
};

export const useCreateAnnotationTask = () => {
  return useCreate<CreateMarkTask, CreateMarkTaskResult>(
    '/data_manager_server/annotation/annotation',
  );
};
