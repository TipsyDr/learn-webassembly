import { MenuItem } from '@/types/menu';
import { Outlet } from 'react-router-dom';
import WrapperRouteComponent from '../config';

import Case from '@/pages/bagcase';
import Detail from '@/pages/bagcase/detail';

const routeList: MenuItem = {
  path: 'bagcase',
  meta: {
    label: 'case 管理',
    icon: 'case',
    hideChildrenInMenu: true,
  },
  element: <WrapperRouteComponent element={<Outlet />} titleId="bag 集合" />,
  children: [
    {
      index: true,
      element: <WrapperRouteComponent element={<Case />} titleId="case 列表" />,
    },
    {
      path: 'detail',
      meta: {
        label: 'case 详情',
      },
      element: (
        <WrapperRouteComponent element={<Detail />} titleId="case 详情" />
      ),
    },
  ],
};

export default routeList;
