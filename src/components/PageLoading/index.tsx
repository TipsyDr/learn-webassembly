import { FC } from 'react';
import { FullFlexCenter, LoadingModal } from '@/styled/Basic';
import { Spin } from 'antd';

type Size = 'small' | 'large' | 'default' | undefined;

interface Props {
  size?: Size;
  tip?: string;
  style?: any;
  modalStyle?: any;
}

const Loading: FC<Props> = (props: Props) => {
  const { size, tip, style, modalStyle } = props;

  return (
    <FullFlexCenter style={style}>
      <LoadingModal style={modalStyle}></LoadingModal>
      <Spin tip={tip} size={size || 'large'} />
    </FullFlexCenter>
  );
};

export default Loading;
