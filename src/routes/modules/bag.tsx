import { MenuItem } from '@/types/menu';
import { Outlet } from 'react-router-dom';
import WrapperRouteComponent from '../config';

import Webassembly from '@/pages/webassembly';

const routeList: MenuItem[] = [
  {
    path: 'webassembly',
    meta: {
      icon: 'bag',
      label: 'webassembly',
      hideChildrenInMenu: true,
    },
    element: <WrapperRouteComponent element={<Outlet />} titleId="bag 集合" />,
    children: [
      {
        index: true,
        element: (
          <WrapperRouteComponent
            element={<Webassembly />}
            titleId="bag 集合列表"
          />
        ),
      },
    ],
  },
];

export default routeList;
