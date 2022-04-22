import { FC } from 'react';
import { StyleTitle } from '@/styled/Basic';
import CustomIcon from '../Icon';
import { IconTypes } from '@/types';

interface Props {
  title: string;
  icon?: IconTypes;
  fontSize?: string;
  fontWeight?: string | number;
  display?: string;
  style?: {};
}

const Title: FC<Props> = props => {
  const { title, icon, ...style } = props;

  return (
    <StyleTitle {...style}>
      {icon ? <CustomIcon type={icon} /> : ''}
      <b>{title}</b>
    </StyleTitle>
  );
};

export default Title;
