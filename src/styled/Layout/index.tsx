import styled from 'styled-components';
import { Layout } from 'antd';
import LogoImg from '@/assets/logo/logo.png';

const { Header, Content, Sider } = Layout;

export const StyleHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Logo = styled.div`
  width: 100px;
  height: 50px;
  background: url(${LogoImg}) no-repeat center center;
  background-size: contain;
`;

export const LogoText = styled.div`
  width: 60px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: normal;
  align-items: center;
  color: #fff;
  font-weight: bold;
`;

export const User = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-weight: 600;
  span {
    vertical-align: middle;
  }
`;

export const StyleContent = styled(Content)`
  position: relative;
  margin: 12px;
  margin-top: 76px;
  overflow-y: auto;
`;

export const ContentWrapper = styled.div`
  background: #fff;
  padding: 16px;
  height: 100%;
  border-radius: 8px;
  overflow-x: auto;
`;

export const Watermark = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 8888;
  pointer-events: none;
`;

export const StyleSider = styled(Sider)`
  width: 200px;
  margin-top: 64px;
`;
