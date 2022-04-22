import { FC } from 'react';
import { Menu } from 'antd';
import { MenuList } from '@/types/menu';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/Icon';

const { SubMenu, Item } = Menu;

interface MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = props => {
  const {
    menuList,
    openKey,
    onChangeOpenKey,
    selectedKey,
    onChangeSelectedKey,
  } = props;
  const navigate = useNavigate();

  const getTitie = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CustomIcon type={menu.meta?.icon!} color="#fff" />
        <span>{menu.meta?.label}</span>
      </span>
    );
  };

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    onChangeOpenKey(key);
  };

  const getMenuItem = (menuList: MenuList, pubPath: string | undefined) => {
    return menuList.map(menu => {
      if (menu.children && !menu.meta?.hideChildrenInMenu) {
        return (
          <SubMenu
            key={pubPath + '/' + menu.path?.replace(/\/\:.*$/, '')}
            title={getTitie(menu)}
          >
            {getMenuItem(menu.children, menu.path)}
          </SubMenu>
        );
      } else if (menu.meta?.hideMenu) {
        return null;
      } else {
        return (
          <Item key={pubPath + '/' + menu.path?.replace(/\/\:.*$/, '')}>
            {getTitie(menu)}
          </Item>
        );
      }
    });
  };

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={k => onMenuClick(k.key)}
      className="layout-page-sider-menu text-2"
    >
      {getMenuItem(menuList, '')}
    </Menu>
  );
};

export default MenuComponent;
