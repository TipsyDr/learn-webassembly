import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { StyleContent } from '@/styled/Layout';
import { useLoginContext } from '@/context';

const RightContent: FC = () => {
  const { userInfo } = useLoginContext();
  const [image, setImage] = useState('');
  const drawCanvas = () => {
    const canvasContext = document.createElement('canvas');
    canvasContext.width = 140;
    canvasContext.height = 80;
    var canvasContexts = canvasContext.getContext('2d')!;
    canvasContexts.rotate((-20 * Math.PI) / 180);
    canvasContexts.font = '18px Vedana';
    canvasContexts.fillStyle = 'rgba(200, 200, 200, 0.30)';
    canvasContexts.textAlign = 'left';
    canvasContexts.textBaseline = 'middle';
    canvasContexts.fillText(userInfo?.userName || '数据平台', 50, 60); //绘制水印文案
    const img = canvasContext.toDataURL('image/png');
    return img;
  };

  useEffect(() => {
    setImage(drawCanvas());
  }, [image]);

  return (
    <StyleContent>
      <div style={{ background: `url(${image}) #fff` }}>
        <Outlet />
      </div>
    </StyleContent>
  );
};

export default RightContent;
