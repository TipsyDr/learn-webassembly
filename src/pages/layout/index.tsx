import { FC, Suspense } from 'react';
import { Layout } from 'antd';
import TopHeader from './components/Header';
import LeftSider from './components/Sider';
import RightContent from './components/Content';
import { Loading } from '@/components';
import { LoginContextProvider } from '@/context';

const LayoutPage: FC = () => {
  return (
    <LoginContextProvider>
      <Layout>
        <TopHeader />
        <Layout>
          <LeftSider />
          <Suspense fallback={<Loading />}>
            <RightContent />
          </Suspense>
        </Layout>
      </Layout>
    </LoginContextProvider>
  );
};

export default LayoutPage;
