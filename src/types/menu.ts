import { RouteObject } from 'react-router-dom';
import { IconTypes } from '@/types';

export interface MenuItem extends RouteObject {
  label?: string;
  /** 图标名称
   *
   * 子子菜单不需要图标
   */
  icon?: IconTypes;
  children?: MenuItem[];
  meta?: {
    hideMenu?: boolean;
    hideChildrenInMenu?: boolean;
    label: string;
    icon?: IconTypes;
  };
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];
