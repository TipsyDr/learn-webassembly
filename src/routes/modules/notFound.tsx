import { Suspense, lazy } from 'react';
import { MenuItem } from '@/types/menu';
import WrapperRouteComponent from '../config';
import Loading from '@/components/PageLoading';

const NotFound = lazy(() => import('@/pages/404'));

const notFoundRoute: MenuItem = {
  path: '*',
  meta: {
    label: 'Not Found',
    hideMenu: true,
  },
  element: (
    <WrapperRouteComponent
      element={
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      }
      titleId="NotFound"
    />
  ),
};

export default notFoundRoute;
