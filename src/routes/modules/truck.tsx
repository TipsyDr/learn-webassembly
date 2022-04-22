import { MenuItem } from '@/types/menu';
import WrapperRouteComponent from '../config';

import Truck from '@/pages/truck';

const routeList: MenuItem = {
  path: 'truck',
  meta: {
    label: '车辆管理',
    icon: 'truck',
  },
  element: <WrapperRouteComponent element={<Truck />} titleId="bag 管理" />,
};

export default routeList;
