import { FC } from 'react';
import { LoadingModal, PointLoadingCss } from '@/styled/Basic';
import { Spin } from 'antd';

type Size = 'small' | 'large' | 'default' | undefined;

interface Props {
  size?: Size;
  tip?: string;
  style?: any;
  modalStyle?: any;
}

const PointLoading: FC<Props> = (props: Props) => {
  const { size, tip, style, modalStyle } = props;

  return (
    <PointLoadingCss style={style}>
      <LoadingModal style={modalStyle}></LoadingModal>
      <Spin tip={tip || '加载中...'} size={size || 'large'} />
    </PointLoadingCss>
  );
};

export default PointLoading;
