import { FC, useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { DmpBreadcrumb } from '@/styled';
import { baseRoute } from '@/routes';

interface RoutesItem {
  path: string;
  name?: string;
  breadcrumbName?: string;
  element?: any;
  order?: number;
}

interface Props {
  keyRoutes?: RoutesItem[];
  style?: {};
}

const Breadcrumb: FC<Props> = (props) => {
  const { keyRoutes, style } = props;

  const [routes, setRoutes] = useState([{
    path: '/',
    breadcrumbName: '首页'
  }])

  const location = useLocation();
  let paths: string[] = location.pathname.split('/');
  const [indexPath, ...currentPath] = paths;

  const baseRoutes = baseRoute.filter((item, index) => {
    return item.path === currentPath[0];
  });

  const transRoutesToList = () => {
    const list: any = [];
    const addRoute = (data: any, lastPath: string) => {
      data.forEach((item: any) => {
        if (item.path) {
          list.push({
            path: `${lastPath}/${item.path}`,
            breadcrumbName: item?.meta?.label,
            element: item.element && true,
          });

          if (item?.children?.length > 0) {
            addRoute(item.children, `${lastPath}/${item.path}`);
          }
        }
      });
    };
    addRoute(baseRoutes, '');

    return list;
  };

  const getSinglePathList = () => {
    const list: any = [];
    const addRoute = (data: any, lastPath: string) => {
      data.forEach((item: any) => {
        if (item.path) {
          list.push(item.path);
          if (item?.children?.length > 0) {
            addRoute(item.children, `${lastPath}/${item.path}`);
          }
        }
      });
    };
    addRoute(baseRoutes, '');
    return list;
  }

  const getLocationRoutesPath = () => {
    const singleListInfo = getSinglePathList();
    const path: string[] = [];
    const index = singleListInfo.findIndex((item: string) => {
      return item.indexOf(':')>-1
    });

    let lastPath = '';
    currentPath.forEach((item: string) => {
      path.push(`${lastPath}/${item}`);
      lastPath = `${lastPath}/${item}`;
    });
    path.splice(index, 1);
    return path;
  };

  const itemRender = (
    route: any,
    params: any,
    routes: string | any[],
    paths: any[],
  ) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <NavLink to={route.path}>{route.breadcrumbName}</NavLink>
    );
  };

  const getLocalRoutes = () => {
    const locationRoutesInfo = transRoutesToList();
    const locationRoutesPath = getLocationRoutesPath();

    const routes = locationRoutesInfo.filter((item: RoutesItem, i: number) => {
      const isParams = item.path.indexOf(':');
      if (isParams !== -1) {
        const splitPath = item.path.split('/');
        const index = splitPath.findIndex((it) => {
          return it.indexOf(':') > -1
        });
        const target = splitPath[index];
        const targetValue = locationRoutesPath[index-2].split('/')[index];
        item.path = item.path.replace(`${target}`, targetValue);
      }
      return (
        locationRoutesPath.indexOf(item.path) !== -1 && item?.element
      );
    });

    return routes;
  }

  useEffect(() => {
    const localRoutes = getLocalRoutes();
    const _route = [...routes, ...localRoutes];
    keyRoutes?.forEach((item: RoutesItem) => {
      _route.splice(item.order || 1, 0, item)
    })
    setRoutes(_route);
  }, []);

  return (
    <>
      <DmpBreadcrumb style={style} itemRender={itemRender} routes={routes} />
    </>
  );
};

export default Breadcrumb;
