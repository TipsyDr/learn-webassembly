import { FC } from 'react';
import { BasicButton } from '@/components';
import { IconTypes } from '@/types';

interface Props {
  title?: string;
  icon?: IconTypes;
  btnProps?: any;
  style?: any;
  onClick?: () => void;
}

const EditBtn: FC<Props> = props => {
  const { title, icon, style, onClick, btnProps } = props;

  return (
    <BasicButton
      type="primary"
      style={style}
      onClick={onClick}
      size="small"
      cicon={icon || 'edit'}
      icolor="#fff"
      text={title || '编辑'}
      {...btnProps}
    />
  );
};

export default EditBtn;
