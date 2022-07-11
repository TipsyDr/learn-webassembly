import { FC, useState } from 'react';
import { notice, BasicButton } from '@/components';
import { Image, message } from 'antd';
import { IconTypes } from '@/types';
import { previewImg } from '@/api';

interface Props {
  data: Params;
  text?: string;
  icon?: IconTypes;
  type?:
    | 'text'
    | 'link'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined;
}

interface Params {
  annotationId?: string;
  source?: string;
}

const PreviewImg: FC<Props> = props => {
  const { text, icon, type } = props;
  const [visible, setVisible] = useState(false);
  const [imageList, setImageList] = useState([]);

  const preview = async function (data: Params) {
    if (!data || !data.annotationId || !data.source) {
      return notice({
        type: 'error',
        mes: '缺少参数',
      });
    }
    const hide = success();
    const result = await previewImg({
      annotationId: data.annotationId,
      source: data.source,
    });

    if (+result.code === 100000) {
      if (result.data.length) {
        setImageList(result.data);
        setVisible(true);
      } else {
        notice({
          type: 'warning',
          mes: '接口数据为空不可预览',
        });
      }
    } else {
      setImageList([]);
      notice({
        type: 'error',
        mes: result.message,
      });
    }
    hide();
  };

  const success = function () {
    const Height = window.innerHeight;
    const width = window.innerWidth;
    const Style = {
      position: 'absolute',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#b9b2b297',
      pointerEvents: 'all',
    };
    const hide = message.loading({
      content: '正在加载图片...',
      duration: 0,
      style: { width: width, height: Height, ...Style },
    });

    return hide;
  };

  return (
    <>
      <BasicButton
        type={type || 'link'}
        text={text || '预览'}
        icon={icon}
        onClick={() => {
          preview(props?.data);
        }}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: vis => setVisible(vis) }}
        >
          {imageList.map((url: string) => (
            <Image key={url} src={url} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export { PreviewImg };
