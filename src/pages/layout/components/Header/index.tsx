import { FC, useCallback, useState } from 'react';
import { Dropdown, Avatar, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { CustomIcon, Loading } from '@/components';
import { StyleHeader, User } from '@/styled';
import { notice, Logo } from '@/components';
import { useLoginContext } from '@/context';

const TopHeader: FC = () => {
  const avatar = <CustomIcon type="user" />;
  const [loading, setLoading] = useState<boolean>(false);
  const { userInfo } = useLoginContext();
  const onMenuClick = useCallback(event => {
    const { key } = event;
    if (key === 'logout') {
      notice({
        type: 'success',
        mes: '登出',
        desc: '登出成功',
      });
      setTimeout(() => {
        setLoading(false);
        localStorage.removeItem('token');
        window.location.href = '/login';
      }, 1000);
      return;
    }
  }, []);

  const menuHeaderDropdown = (
    <Menu className={'menu'} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <StyleHeader>
      <Logo path="/bagset" title="TRUNK" subTitle=" 主线科技" />
      {loading ? <Loading /> : ''}
      <Dropdown overlay={menuHeaderDropdown}>
        <User>
          <Avatar size="small" src={avatar} alt="avatar" />
          <span>{userInfo?.userName || userInfo?.roleName || '用户'}</span>
        </User>
      </Dropdown>
    </StyleHeader>
  );
};

export default TopHeader;
