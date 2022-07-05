import { useEffect } from 'react';
import { RenderRouter } from '@/routes';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const App = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    history.push('/login');
  }

  useEffect(() => {
    moment.locale('zh-cn');
  });

  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
