import { FC } from 'react';
import { Form, Input } from 'antd';
import { Wave } from './PointWave';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Circle,
  LeftDesc,
  Entry,
  Title,
  FormWrapper,
  FormItem,
  StyleButton,
} from '@/pages/login/styled';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginParams, LoginResult } from '@/types';
import { notice } from '@/components';
import { useLogin } from '@/api';

const username = localStorage.getItem('username') || '';
const initialValues: LoginParams = {
  userName: username,
  password: '',
};

const LoginPage: FC = () => {
  // const loginMutation = useLogin();
  const location = useLocation() as { state: { from: string } };

  const onFinish = async (values: any) => {
    // const result: LoginResult = await loginMutation.mutateAsync(values);
    // const { data } = result;
    // if (+result.code === 100000) {
    //   localStorage.setItem('username', values.userName);
    //   notice({
    //     type: 'success',
    //     mes: '登录',
    //     desc: '登录成功',
    //   });
    //   if (data.token) {
    //     localStorage.setItem('token', data.token);

    //     const from = location.state?.from || '/bagset';
    //     window.location.href = from;
    //   }
    // } else {
    //   notice({
    //     type: 'error',
    //     mes: result.message,
    //   });
    // }
    localStorage.setItem('token', 'login');
    const from = location.state?.from || '/';
    window.location.href = from;
  };

  const onFinishFailed = (errorInfo: any) => {
    notice({
      type: 'error',
      mes: 'Failed',
      desc: errorInfo,
    });
  };
  return (
    <Container>
      <Wave />
      <Entry>
        <Circle />
        <LeftDesc>
          <h1>Welcome!</h1>
          <h3>主线科技数据管理系统</h3>
        </LeftDesc>
        <FormWrapper>
          <Title>数据平台</Title>
          <Form
            name="basic"
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <FormItem
              name="userName"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                placeholder="请输入用户名"
                prefix={<UserOutlined />}
                bordered={false}
                allowClear
              />
            </FormItem>
            <FormItem
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                placeholder="请输入密码"
                prefix={<LockOutlined />}
                bordered={false}
                allowClear
              />
            </FormItem>
            <FormItem>
              <StyleButton type="primary" htmlType="submit" block>
                登录
              </StyleButton>
            </FormItem>
          </Form>
          <span>
            忘记账号？ <a href="#">请联系管理员</a>
          </span>
        </FormWrapper>
      </Entry>
    </Container>
  );
};

export default LoginPage;
