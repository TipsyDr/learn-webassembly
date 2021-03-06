import { FC } from 'react';
import { Tag } from 'antd';
import CustomIcon from '../Icon';
import { IconTypes } from '@/types';

interface Props {
  title?: string;
  icon?: IconTypes;
  style?: any;
  onClick?: () => void;
}

const CancelBtn: FC<Props> = props => {
  const { title, icon, style, onClick } = props;

  return (
    <Tag
      style={{ cursor: 'pointer', ...style }}
      className="site-tag-plus"
      color="#0A4A9F"
      onClick={onClick}
    >
      <CustomIcon type={icon} color="#fff" /> {title || '取消'}
    </Tag>
  );
};

export default CancelBtn;
