import { FC } from 'react';
import { notice, BasicButton } from '@/components';
import { IconTypes } from '@/types';
import { downLoadFile } from '@/api';
import { copyHandle } from '@/utils/helper';
interface Props {
  data: DownloadParams;
  text?: string;
  icon?: IconTypes;
  style?: {};
  type?:
    | 'text'
    | 'link'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined;
}

interface DownloadParams {
  ossAddr: string | undefined;
  source: string;
}

const download = async function (data: DownloadParams) {
  if (!data || !data.ossAddr || !data.source) {
    return notice({
      type: 'error',
      mes: '缺少参数',
    });
  }
  const result = await downLoadFile({
    ossAddr: data.ossAddr,
    source: data.source,
  });
  if (+result.code === 100000) {
    // navigator.clipboard.writeText(result.data);
    copyHandle(result.data);
    notice({
      type: 'success',
      mes: '复制成功',
    });
  } else {
    notice({
      type: 'error',
      mes: result.message,
    });
  }
};

const CopyAlyOss: FC<Props> = props => {
  const { text, icon, type, style } = props;
  return (
    <BasicButton
      style={style}
      type={type || 'link'}
      text={text || '复制Bag地址'}
      icon={icon}
      onClick={() => {
        download(props?.data);
      }}
    />
  );
};

export { CopyAlyOss };
