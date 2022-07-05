import { FC, useEffect, useState, useRef } from 'react';
import { notice, CustomIcon, TipIcon } from '@/components';
import { Typography, Tag } from 'antd';
import {
  ProgressWrapper,
  ProgressBar,
  ProgressLine,
  ProgressPoint,
  FrameInfo,
  Toolbar,
  Play,
  Speed,
  SpeedSelect,
} from './styled';
import { FrameBasicData } from '@/types';
import moment from 'moment';
import { debounce, copyHandle } from '@/utils';

const getFrames = (data: any[], dom: Element, targetDom: any) => {
  if (!data || data.length <= 0) return;
  const length = +data.length - 1;
  const { width, height } = dom.getBoundingClientRect();

  // 计算有多少格子
  let total = Math.floor(width / 3);

  total = total < length ? total : length;
  const itemWidth = width / total;

  const ctx = targetDom.getContext('2d');

  ctx.canvas.width = width;
  ctx.canvas.height = height;
  if (targetDom) {
    data.forEach((item, index) => {
      ctx.fillStyle = +item?.status ? '#1f8736' : '#f70e0e';
      ctx.fillRect((index / length) * (width - itemWidth), 0, itemWidth, 10);
    });
  }
};
const debounceGetFrames = debounce(getFrames, 300);

const { Text } = Typography;

const speedList = [
  { label: 8 / 1, value: 1 / 8 },
  { label: 4 / 1, value: 1 / 4 },
  { label: 2 / 1, value: 1 / 2 },
  { label: 3 / 2, value: 2 / 3 },
  { label: 1 / 1, value: 1 / 1 },
  { label: 1 / 2, value: 2 / 1 },
];

const getStatus = (status: string) => {
  let dom = <CustomIcon type="play" />;

  switch (status) {
    case 'playing':
      dom = <CustomIcon type="pause" />;

      break;
    case 'pause':
      dom = <CustomIcon type="play" />;

      break;
    case 'replay':
      dom = <CustomIcon type="replay" />;

      break;
  }

  return dom;
};

interface Props {
  current: number | string;
  preloadSize?: number;
  totalElements?: number | string;
  frameInfo?: FrameBasicData[];
  frameInfoConfig?: { key: string; label: string }[];
  onChange: (val: number) => void;
}

const Progress: FC<Props> = props => {
  const {
    current,
    preloadSize = 20,
    frameInfo,
    totalElements,
    onChange,
  } = props;

  const processRef: any = useRef(null);
  const line: any = useRef(null);
  const player: any = useRef(null);

  const [status, setStatus] = useState<
    'pause' | 'playing' | 'replay' | 'jumping'
  >('pause');
  const [jump, setJump] = useState<boolean>(false);
  const [speed, setSpeed] = useState({ label: 1, value: 1 });
  const [step, setStep] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [editSpeed, setEditSpeed] = useState<boolean>(false);
  const [isShowFrameInfo, setIsShowFrameInfo] = useState<boolean>(false);
  const [currentFrameInfo, setCurrentFrameInfo] = useState<FrameBasicData>();
  const [frameInfoPosition, setFrameInfoPosition] = useState<number>(0);
  const [processLength, setProcessLength] = useState<number | string>(0);

  const debounceSetCurrentFrameInfo = debounce(setCurrentFrameInfo, 10);

  const next = () => {
    if (step > +current || +current - step > preloadSize * 2) {
      pause();
      notice({
        type: 'warning',
        mes: '正在加载中',
      });

      return;
    }
    if (!jump) {
      setStep(step + 1);
    }
  };

  const play = () => {
    if (step === count - 1) {
      pause();
      setStatus('replay');

      return;
    }
    player.current && clearTimeout(player.current);
    const _player = setTimeout(() => {
      next();
    }, 1000 * speed.value);

    player.current = _player;
  };

  const replay = () => {
    setStep(0);
    play();
    setStatus('playing');
  };

  const pause = () => {
    player.current && clearTimeout(player.current);
    player.current = null;
    setStatus('pause');
  };

  const isPlay = () => {
    switch (status) {
      case 'replay':
        replay();

        return;
      case 'playing':
        pause();

        return;
      case 'pause':
        setStatus('playing');
        play();

        return;
    }
  };

  const handleEditSpeed = (value: { label: number; value: number }) => {
    setSpeed(value);
    setEditSpeed(false);
    if (status === 'playing') {
      pause();
      play();
      setStatus('playing');
    }
  };

  const getIndex = (e: any, jumpX?: string) => {
    const length = jumpX ? jumpX : e.layerX || 0;
    const { width } =
      processRef.current && processRef.current.getBoundingClientRect();
    let index = Math.floor((length / width) * count);

    if (index >= count) {
      index = count - 1;
    }

    return index;
  };

  const jumpCount = (e: any, jumpX?: number) => {
    if (count <= 0) return;
    if (e.target.className.indexOf('progressBar') === -1) {
      return;
    }
    pause();
    let index = getIndex(e, jumpX + '');

    if (index < 0) {
      index = 0;
    }
    if (index >= count) {
      index = count - 1;
    }
    setStep(index);
    if (index >= current || +current - index > preloadSize) {
      notice({
        type: 'warning',
        mes: '正在加载中...',
      });
    }
    if (status === 'pause' && index === count - 1) {
      setStatus('replay');
    }

    return index;
  };

  const movePoints = (e: any) => {
    if (count <= 0) return;
    if (e.target.className.indexOf('progressBar') === -1) {
      return;
    }

    e.preventDefault();
    const { width } =
      processRef.current && processRef.current.getBoundingClientRect();
    const dom = document.getElementsByTagName('body')[0];
    const { pageX: startX } = e;
    let x = 0;

    dom.onmousemove = function (ev: any) {
      const { pageX: nowX } = ev;

      x = nowX - startX + e.layerX;
      if (x < 0) {
        x = 0;
      } else if (x > width) {
        x = width;
      }
      setProcessLength(x);
    };
    dom.onmouseup = function (ev) {
      setJump(true);
      dom.onmousemove = null;
      const { pageX: nowX } = ev;

      x = nowX - startX + e.layerX;
      if (x < 0) {
        x = 0;
      } else if (x > width) {
        x = width;
      }
      setProcessLength(x);
      const index = jumpCount(e, x);

      if (index && Math.abs(index - count) > preloadSize) {
        window.stop();
      }

      dom.onmouseup = null;
      setJump(false);
    };
  };

  const gotoStep = (num: number) => {
    if (count <= 0) return;
    let _count = step + num;

    if (_count < count - 1 && status === 'replay') {
      setStatus('pause');
    } else if (_count >= count - 1 && status === 'pause') {
      setStatus('replay');
    }
    if (_count > count - 1) {
      _count = count - 1;
    }
    if (_count < 0) {
      _count = 0;
    }

    setStep(_count);
  };

  const getFrameInfoPosition = (e: any) => {
    e.preventDefault();
    const { frameInfo, frameInfoConfig } = props;

    if (!frameInfoConfig || frameInfoConfig.length < 0) {
      return;
    }
    const { width } =
      processRef.current && processRef.current.getBoundingClientRect();
    const max = width - 50;
    const min = 0 - 50;
    let x = 0;
    const { pageX: startX } = e;
    const dom = e.target;
    const lineOffsetLeft = e.target.offsetLeft;

    if (e.nativeEvent.layerX - lineOffsetLeft < min) {
      setFrameInfoPosition(0);
    } else if (e.nativeEvent.layerX - lineOffsetLeft > max) {
      setFrameInfoPosition(max);
    }
    setIsShowFrameInfo(true);
    dom.onmousemove = function (ev: any) {
      const { pageX: nowX } = ev;

      x = nowX - startX + e.nativeEvent.layerX - lineOffsetLeft - 50;
      if (x < min) {
        x = min;
      } else if (x > max) {
        x = max;
      } else {
        setFrameInfoPosition(x);
      }
      let currentFrameInfo = {};
      const index = getIndex(e, x + 50 + '');

      if (frameInfo) {
        currentFrameInfo = { ...frameInfo[index], index: index };
      } else {
        currentFrameInfo = { index: index };
      }
      debounceSetCurrentFrameInfo(currentFrameInfo);
    };
    dom.onmouseleave = function (ev: any) {
      dom.onmousemove = null;
      const { pageX: nowX } = ev;

      x = nowX - startX + e.layerX - lineOffsetLeft;
      if (x < min) {
        x = 0;
      } else if (x > max) {
        x = max;
      } else {
        setFrameInfoPosition(x);
      }
      dom.onmouseleave = null;
      setIsShowFrameInfo(false);
    };
  };

  const keyboard = (ev: KeyboardEvent) => {
    switch (ev.key || String.fromCharCode(ev.keyCode || ev.charCode)) {
      case 'a':
        gotoStep(-1);

        break;

      case 'd':
        gotoStep(1);

        break;
    }
  };

  const resize = () => {
    debounceGetFrames(frameInfo, processRef.current, line.current);
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      const { width } =
        processRef.current && processRef.current.getBoundingClientRect();

      if (status === 'playing') {
        play();
      }
      if (!jump) {
        setProcessLength((step / (count - 1)) * width);
      }
      onChange(step);
    });
  }, [step]);

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  useEffect(() => {
    window.addEventListener('keypress', keyboard);

    return () => {
      window.removeEventListener('keypress', keyboard);
    };
  });

  useEffect(() => {
    resize();
    setCount(
      (frameInfo && frameInfo.length) || (totalElements && +totalElements) || 0,
    );
  }, [frameInfo, totalElements]);

  return (
    <ProgressWrapper>
      <Toolbar>
        <TipIcon
          tipProps={{
            title: step <= 0 ? '没有了哦！' : '往后 10 帧',
          }}
          type="fb"
          onClick={() => gotoStep(-10)}
        />
        <TipIcon
          tipProps={{
            title: step <= 0 ? '没有了哦！' : '往后 1 帧',
          }}
          type="retreat"
          onClick={() => gotoStep(-1)}
        />
        <Play style={{ margin: '0 8px 0 10px' }} onClick={isPlay}>
          {getStatus(status)}
        </Play>
        <TipIcon
          tipProps={{
            title: step >= count - 1 ? '没有了哦！' : '往前 1 帧',
          }}
          type="forward"
          onClick={() => gotoStep(1)}
        />
        <TipIcon
          tipProps={{
            title: step >= count - 1 ? '没有了哦！' : '往前 10 帧',
          }}
          type="ff"
          onClick={() => gotoStep(10)}
        />
        <Speed
          onMouseOver={() => setEditSpeed(true)}
          onMouseLeave={() => setEditSpeed(false)}
        >
          <span>{speed.label}</span>
          <CustomIcon type="x" />
          {editSpeed ? (
            <SpeedSelect
              onMouseEnter={() => setEditSpeed(true)}
              onMouseLeave={() => setEditSpeed(false)}
            >
              {speedList.map(item => {
                return (
                  <div
                    key={item.value}
                    onClick={() => {
                      handleEditSpeed(item);
                    }}
                  >
                    <span>{item.label}</span>
                    <CustomIcon type="x" color="#fff" />
                  </div>
                );
              })}
            </SpeedSelect>
          ) : (
            ''
          )}
        </Speed>
      </Toolbar>
      <ProgressBar
        className="progressBar"
        ref={processRef}
        onMouseDown={() => movePoints(event)}
        onMouseEnter={e => getFrameInfoPosition(e)}
      >
        <ProgressLine ref={line} />
        <ProgressPoint style={{ left: `${+processLength}px` }} />
        {isShowFrameInfo ? (
          <FrameInfo style={{ left: `${+frameInfoPosition}px` }}>
            {props?.frameInfoConfig?.map(item => {
              const info: any = currentFrameInfo;
              let value = currentFrameInfo && info[item.key];

              if (item.key === 'smallestUnitTimestamp') {
                value = (
                  <a>
                    {moment(
                      currentFrameInfo && info[item.key] / 1000000,
                    ).format('HH:mm:ss')}
                  </a>
                );
              } else if (item.key === 'status') {
                value = (
                  <Tag
                    color={
                      currentFrameInfo && +info[item.key] ? 'success' : 'error'
                    }
                  >
                    {currentFrameInfo && +info[item.key] === 1
                      ? '有效'
                      : '无效'}
                  </Tag>
                );
              }

              return (
                <Text
                  key={item.key}
                  ellipsis={{ tooltip: value }}
                  onClick={() => {
                    if (item.key !== 'smallestUnitTimestamp') {
                      return;
                    }
                    copyHandle(currentFrameInfo && info[item.key]);
                    notice({ type: 'info', mes: '复制当前帧时间' });
                  }}
                >
                  {`${item.label}: `}
                  {value}
                </Text>
              );
            })}
          </FrameInfo>
        ) : null}
      </ProgressBar>
    </ProgressWrapper>
  );
};

export default Progress;
