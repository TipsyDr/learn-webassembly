import { FC } from 'react';
import { Tooltip, TooltipProps } from 'antd';
import CustomIcon from '../Icon';
import { IconTypes } from '@/types';

interface Props {
  type?: IconTypes;
  tipProps?: TooltipProps;
  onClick?: (event: any) => void;
}

const TipIcon: FC<Props> = props => {
  const { type, tipProps, onClick } = props;

  return (
    <Tooltip title={''} {...tipProps}>
      <span style={{ cursor: 'pointer' }} onClick={onClick}>
        <CustomIcon type={type} />
      </span>
    </Tooltip>
  );
};

export default TipIcon;
