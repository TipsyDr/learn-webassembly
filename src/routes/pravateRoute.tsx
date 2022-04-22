import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { RouteProps, useLocation } from 'react-router';

const PrivateRoute: FC<RouteProps> = props => {
  const logged = true;
  const navigate = useNavigate();
  const location = useLocation();

  return logged ? (
    (props.element as React.ReactElement)
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="未经授权的"
      extra={
        <Button
          type="primary"
          onClick={() => navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })}
        >
          去登录
        </Button>
      }
    />
  );
};

export default PrivateRoute;
