import { FC } from 'react';
import { Menu, MenuProps } from 'antd';
import { MenuList } from '@/types/menu';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '@/components/Icon';

const { SubMenu, Item } = Menu;

interface MenusProps extends MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

type MenuItem = Required<MenusProps>['items'][number];

const MenuComponent: FC<MenusProps> = props => {
  const {
    menuList,
    openKey,
    onChangeOpenKey,
    selectedKey,
    onChangeSelectedKey,
  } = props;
  const navigate = useNavigate();

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    onChangeOpenKey(key);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key | undefined,
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

  const getItems = (menuList: MenuList, pubPath: string)=> {
    return menuList.map(menu => {
      const label = menu?.meta?.label;
      const icon = menu?.meta?.icon;
      const hideChildrenInMenu = menu?.meta?.hideChildrenInMenu;
      const hideMenu = menu.meta?.hideMenu;
      const key = pubPath + '/' + menu.path?.replace(/\/\:.*$/, '');
      const children: any =
        menu?.children?.length && !hideChildrenInMenu
          ? getItems(menu?.children, menu?.path || '')
          : null;
      const item =
        menu?.path && !hideMenu
          ? getItem(
              label,
              key,
              <CustomIcon type={icon} color="#fff" />,
              children,
            )
          : null;
      return item;
    });
  };

  const items = getItems(menuList, '');

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={k => onMenuClick(k.key)}
      className="layout-page-sider-menu text-2"
      items={items}
    />
  );
};

export default MenuComponent;
