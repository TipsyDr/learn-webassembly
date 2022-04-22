import { FC } from 'react';
import { BasicButton, BtnProps, notice } from '@/components';
import { downLoadFile } from '@/api';

interface Props {
  ds: string;
  url: string;
  time: string;
  layoutId?: string;
  btn?: BtnProps;
  source: string;
}

const PREVIEW_URL = 'http://39.105.131.47:8088';

export const DataPreview: FC<Props> = props => {
  const { ds, url, time, btn, source } = props;
  const layoutId = props?.layoutId || '';

  const getUrlToPreview = async function () {
    let path = '';
    const result = await downLoadFile({
      ossAddr: url,
      source: source,
    });
    if (+result.code === 100000) {
      notice({
        type: 'success',
        mes: '正在跳转foxglove预览',
      });
      path = result.data;
      window.open(
        `${PREVIEW_URL}?ds=${ds}&ds.url=${encodeURIComponent(
          path,
        )}&time=${time}&ds.layoutId=${layoutId}`,
      );
    } else {
      notice({
        type: 'error',
        mes: result.message,
      });
    }
  };

  return <BasicButton {...btn} onClick={getUrlToPreview} />;
};
