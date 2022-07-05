import { FC, ReactElement } from 'react';
import { WrapperRouteProps } from '@/types/router';
import PrivateRoute from './pravateRoute';

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
  titleId,
  auth,
  ...props
}) => {
  document.title = titleId ? titleId : '';

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
