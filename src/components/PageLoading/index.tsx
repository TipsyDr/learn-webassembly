import { FC } from 'react';
import { FullFlexCenter } from '@/styled/Basic';
import { Spin } from 'antd';

type Size = 'small' | 'large' | 'default' | undefined;

interface Props {
  size?: Size;
  tip?: string;
}

const Loading: FC<Props> = (props: Props) => {
  const { size, tip } = props;
  return (
    <FullFlexCenter>
      <Spin tip={tip || '加载中...'} size={size || 'large'} />
    </FullFlexCenter>
  );
};

export default Loading;
