import { FC } from 'react';
import { FormButton } from '@/styled/Form';
import { ButtonProps, Popconfirm, PopconfirmProps } from 'antd';
import CustomIcon from '../Icon';
import { IconTypes } from '@/types';

interface ConfirmProps extends PopconfirmProps {
  useConfirm: boolean;
}

export interface BtnProps extends ButtonProps {
  text?: string;
  cicon?: IconTypes;
  icolor?: string;
  confirm?: ConfirmProps;
}

const BasicButton: FC<BtnProps> = props => {
  const { text, cicon, confirm, icolor, disabled } = props;

  return confirm?.useConfirm ? (
    <Popconfirm {...confirm} disabled={disabled}>
      <FormButton {...props} icon={cicon ? <CustomIcon type={cicon} /> : ''}>
        {text}
      </FormButton>
    </Popconfirm>
  ) : (
    <FormButton
      icon={cicon ? <CustomIcon type={cicon} color={icolor} /> : null}
      {...props}
    >
      {text}
    </FormButton>
  );
};

export default BasicButton;
