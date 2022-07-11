import { FC, useState, useRef, useEffect } from 'react';
import { Image as AntdImage } from 'antd';
import { ImageWrapper, Controller, ImageWay } from './styled';
import emptyPng from '@/assets/images/empty.png';
import Loading from '@/components/PageLoading';
import { FrameBasicData, ImageInfo } from '@/types';

interface Props {
  step: number;
  preloadSize?: number;
  ids: string[];
  margin?: string;
  width?: string;
  height?: string;
  totalPages?: number;
  frameList?: ImageInfo;
  nextFrameList?: ImageInfo;
  getCounter?: (step: number) => void;
}

const Slideshow: FC<Props> = props => {
  const {
    preloadSize = 20,
    step = 0,
    ids,
    margin,
    width,
    height,
    frameList: _frameList,
    nextFrameList: _nextFrameList,
    getCounter,
  } = props;

  const slideRef: any = useRef(null);
  const [currentCamera, setCurrentCamera] = useState<number>(4);
  const [currentImage, setCurrentImage] = useState<string>();
  const [counter, setCounter] = useState<number>(0);

  const getImagesTask = (data: FrameBasicData[]) => {
    const pageNumber = Math.floor((step + 1) / preloadSize);
    let _counter = preloadSize * (pageNumber + 1);

    data.forEach(item => {
      const src = item?.picOssAddress && item?.picOssAddress[currentCamera];

      if (src) {
        const image = new Image();

        image.src = src;
        image.onload = function (err) {
          if (err.isTrusted) {
            _counter += 1;
            setCounter(_counter);
            image.onload = null;
          }
        };
      }
    });
  };

  useEffect(() => {
    getCounter && getCounter(counter);
  }, [counter]);

  useEffect(() => {
    if (_frameList?.content?.length) {
      getImagesTask(_frameList?.content);
    }
  }, [_frameList]);

  useEffect(() => {
    if (_nextFrameList?.content?.length) {
      getImagesTask(_nextFrameList?.content);
    }
  }, [_nextFrameList]);

  useEffect(() => {
    const pageNumber = Math.floor(step / preloadSize) + 1;
    const imageIndex = step % preloadSize;
    const playList =
      pageNumber % 2 === 0 ? _nextFrameList?.content : _frameList?.content;

    if (
      !playList ||
      !playList.length ||
      !playList[imageIndex]?.picOssAddress?.length
    ) {
      return;
    }
    const list = playList[imageIndex]?.picOssAddress || [];

    setCurrentImage(list[currentCamera]);
  }, [step, currentCamera, _frameList, _nextFrameList]);

  return (
    <ImageWrapper margin={margin} width={width} height={height} ref={slideRef}>
      <AntdImage
        src={currentImage}
        preview={false}
        placeholder={<Loading />}
        fallback={emptyPng}
      />
      <ImageWay>{ids[currentCamera]}</ImageWay>
      <Controller>
        {ids.map((item, index) => {
          return (
            <span
              style={
                currentCamera === index
                  ? { background: '#1f8736', color: '#fff' }
                  : {}
              }
              key={item + index}
              onClick={() => setCurrentCamera(index)}
            >
              {index + 1}
            </span>
          );
        })}
      </Controller>
    </ImageWrapper>
  );
};

export default Slideshow;
