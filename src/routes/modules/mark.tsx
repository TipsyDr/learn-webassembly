import { MenuItem } from '@/types/menu';
import WrapperRouteComponent from '../config';

import Mark from '@/pages/mark';
import VersionPage from '@/pages/mark/version';

const routeList: MenuItem = {
  path: 'mark',
  meta: {
    icon: 'mark',
    label: '标注管理',
  },
  children: [
    {
      path: 'list',
      meta: {
        label: '标注管理',
      },
      element: <WrapperRouteComponent element={<Mark />} titleId="版本管理" />,
    },
    {
      path: 'version',
      meta: {
        label: '版本管理',
      },
      element: (
        <WrapperRouteComponent element={<VersionPage />} titleId="版本管理" />
      ),
    },
  ],
};

export default routeList;
