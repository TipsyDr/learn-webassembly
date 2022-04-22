import { FC } from 'react';
import { IconTypes } from '@/types';

const modules = import.meta.globEager('/src/assets/Icons/**/*.svg');
const icons: any = {};
const iconNames: string[] = Object.keys(modules);
iconNames.forEach(key => {
  const type: IconTypes = key as IconTypes;
  const icon: unknown = modules[type].ReactComponent;
  const name: IconTypes = key.match(/\/Icons\/(\S*).svg/)![1] as IconTypes;
  icons[name] = icon;
});

interface CustomIconProps {
  type?: IconTypes;
  color?: string;
}

const CustomIcon: FC<CustomIconProps> = props => {
  const { type, color } = props;
  if (!type) return <span className="anticon"></span>;

  const Icon = icons[type];

  return (
    <span className="anticon">
      <Icon style={{ fill: color }} />
    </span>
  );
};

export default CustomIcon;
