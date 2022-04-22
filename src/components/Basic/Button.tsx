import { FC } from 'react';
import { FormButton } from '@/styled/Form';
import { ButtonProps, Popconfirm, PopconfirmProps } from 'antd';
import CustomIcon from '../Icon';
import { IconTypes } from '@/types';

interface ConfirmProps {
  useConfirm: boolean;
  confirmProps?: PopconfirmProps;
}

export interface BtnProps extends ButtonProps {
  text?: string;
  icon?: IconTypes;
  confirm?: ConfirmProps;
}

const BasicButton: FC<BtnProps> = props => {
  const { text, icon, confirm } = props;
  return confirm?.useConfirm ? (
    <Popconfirm title="确认？" {...confirm}>
      <FormButton {...props} icon={icon ? <CustomIcon type={icon} /> : ''}>
        {text}
      </FormButton>
    </Popconfirm>
  ) : (
    <FormButton {...props} icon={icon ? <CustomIcon type={icon} /> : ''}>
      {text}
    </FormButton>
  );
};

export default BasicButton;
