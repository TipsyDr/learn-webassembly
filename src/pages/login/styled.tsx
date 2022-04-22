import styled from 'styled-components';
import { Button, Form } from 'antd';
import CoverImg from '@/assets/login/cover.png';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(100deg, #01000e 0%, #01014b 47%, #0052d2 75%);
`;

export const Cover = styled.div`
  float: left;
  width: 60%;
  height: 100%;
  background: #fff url(${CoverImg}) no-repeat;
  background-size: cover;
  background-position: center;
`;

export const Entry = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  width: 1200px;
  height: 540px;
  border-radius: 50px;
  overflow: hidden;
`;

export const Circle = styled.div`
  position: absolute;
  left: -30px;
  bottom: -105px;
  width: 750px;
  height: 750px;
  border-radius: 100%;
  background: #000;
`;

export const LeftDesc = styled.div`
  position: absolute;
  left: 0;
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
  color: #fff;
  background: #000;
  h1 {
    font-size: 72px;
    margin-top: 0;
  }
  h1,
  h3 {
    color: #fff;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-top: 70px;
  margin-bottom: 80px;
`;

export const FormWrapper = styled.div`
  padding-left: 100px;
  float: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  background: #fff;
`;

export const FormItem = styled(Form.Item)`
  border-bottom: 1px solid #eee;
  width: 300px;
`;

export const StyleButton = styled(Button)`
  margin-top: 30px;
  background: #000;
  height: 45px;
  border-radius: 8px;
`;
