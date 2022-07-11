import { FC, useState } from 'react';
import { StyleSider } from '@/styled/Layout';
import MenuComponent from './menu';
import { baseRoute } from '@/routes';

const LeftSider: FC = () => {
  const pathLevel = location.pathname.split('/').length;
  let defaultRoute = '';

  if (location.pathname === '/') {
    defaultRoute = `/${baseRoute[1].path}`;
  } else if (pathLevel > 2) {
    defaultRoute = location.pathname.substring(1, location.pathname.length);
  } else {
    defaultRoute = location.pathname;
  }

  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(defaultRoute);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = function (collapsed: boolean) {
    setCollapsed(collapsed);
  };

  return (
    <StyleSider
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <MenuComponent
        menuList={baseRoute}
        openKey={openKey}
        onChangeOpenKey={k => setOpenkey(k)}
        selectedKey={selectedKey}
        onChangeSelectedKey={k => setSelectedKey(k)}
      />
    </StyleSider>
  );
};

export default LeftSider;
