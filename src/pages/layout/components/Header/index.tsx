import { FC, useCallback, useState } from 'react';
import { Dropdown, Avatar, Menu, MenuProps } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { CustomIcon, Loading } from '@/components';
import { StyleHeader, User } from '@/styled';
import { notice, Logo } from '@/components';
import { useLoginContext } from '@/context';

type MenuItem = Required<MenuProps>['items'][number];

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

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('退出登录', 'logout', <LogoutOutlined />)
  ];

  const menuHeaderDropdown = (
    <Menu className={'menu'} onClick={onMenuClick} items={items}></Menu>
  );

  return (
    <StyleHeader>
      <Logo path="/bagset" title="数据管理平台（DMP）" subTitle="" />
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
