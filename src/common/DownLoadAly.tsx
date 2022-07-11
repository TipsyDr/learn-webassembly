import { FC } from 'react';
import { notice, BasicButton } from '@/components';
import { IconTypes } from '@/types';
import { downLoadFile } from '@/api';
import { downloadRes } from '@/utils';

interface Props {
  data: DownloadParams;
  text?: string;
  icon?: IconTypes;
  style?: any;
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
    notice({
      type: 'success',
      mes: '正在下载中',
    });
    downloadRes(result.data);
  } else {
    notice({
      type: 'error',
      mes: result.message,
    });
  }
};

const DownLoadAly: FC<Props> = props => {
  const { text, icon, type, style } = props;

  return (
    <BasicButton
      style={style}
      type={type || 'link'}
      text={text || '下载'}
      icon={icon}
      onClick={() => {
        download(props?.data);
      }}
    />
  );
};

export { DownLoadAly };
