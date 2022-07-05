import { FC } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';
import { MenuList } from '@/types/menu';
import WrapperRouteComponent from './config';

import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';

const modules = import.meta.globEager('./modules/**/*.tsx');
const routeModuleList: MenuList = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];

  routeModuleList.push(...modList);
});

export const routeList: MenuList = [
  {
    path: '',
    meta: {
      label: '重定向',
      hideMenu: true,
    },
    element: <Navigate to={'bagset'} />,
  },
  {
    path: 'login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="登录" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [...routeModuleList],
  },
];

const routers = routeList.filter(r => r.path === '/')[0];

export const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export const baseRoute: MenuList = routers.children!;
