import { FC, useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ImageWrapper, ImageContent, Controller, ImageWay } from './styled';
import { Loading } from '@/components';
import emptyPng from '@/assets/images/empty.png';

let _render: any = null;
let _scene: any = null;
const width = 1280; // 画布的宽度
const height = 720; // 画布的高度

//设置背景颜色
const initRender = (dom: Element) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  // renderer.setClearColor(0xffffff, 0.1);
  dom && dom.appendChild(renderer.domElement);
  return renderer;
};

const initScene = () => {
  const scene = new THREE.Scene();
  scene.autoUpdate = true;
  // addAxisHelper(scene);
  return scene;
};

const initCamera = () => {
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
  camera.position.set(0, 0, 880);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
};

// TODO辅助线
const addAxisHelper = (scene: any) => {
  var axisHelper = new THREE.AxesHelper(360);
  scene && scene.add(axisHelper);
};

const drawLabel = (position: any, label: string, color?: string) => {
  let canvas: any = document.createElement('canvas');
  canvas.width = 40;
  canvas.height = 14;
  let ctx: any = canvas.getContext('2d');
  ctx.fillStyle = color || '#fe0101';
  ctx.font = 'Bold 14px 宋体';
  ctx.fillText(label, 0, 14);
  let texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.SpriteMaterial({ map: texture });
  let text = new THREE.Sprite(material);
  text.position.set(position.x - 640, -position.y + 360 - 10, 0);
  text.scale.set(40, 20, 1);
  canvas = null;
  return text;
};

const drawBox = (position: any, dimension: any, color?: string, label?: string) => {
  const geometry = new THREE.PlaneGeometry(dimension.x, dimension.y);
  const edges = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: color || 0xff0000,
  });
  const plane = new THREE.LineSegments(edges, edgesMaterial);

  plane.position.set(position.x - 640, -position.y + 360, 0);

  _scene && _scene.add(plane);

  if (label) {
    const text = drawLabel(position, label, color);
    _scene && _scene.add(text);
  }
};

const drawPoints = (data: { points: string; label: string; color: string }) => {
  const { points: _points, label, color } = data;
  if (!_points) {
    return;
  }
  const position = {
    x: +_points.split(',')[0],
    y: +_points.split(',')[1],
  };

  const geometry = new THREE.CircleGeometry(5, 32);
  const material = new THREE.MeshBasicMaterial({ color: color || 0xff0000 });

  var points = new THREE.Mesh(geometry, material);
  points.position.set(position.x - 640, -position.y + 360, 0);

  if (label) {
    const text = drawLabel(position, label, color);
    _scene && _scene.add(text);
  }
  _scene && _scene.add(points);
};

const drawPolyline = (points: any, color?: string) => {
  if (!points) {
    return;
  }
  const curveArr = points.map((item: any) => {
    return new THREE.Vector2(
      +item.split(',')[0] - 640,
      +item.split(',')[1] - 360,
    );
  });
  const curve = new THREE.SplineCurve(curveArr);
  const _points = curve.getPoints(30);

  const geometry = new THREE.BufferGeometry().setFromPoints(_points);

  const material = new THREE.LineBasicMaterial({ color: color || 0xff0000 });
  const splineObject = new THREE.Line(geometry, material);
  _scene && _scene.add(splineObject);
};

const drawMarker = (data: any) => {
  // _scene && addAxisHelper(_scene);
  if (!data) return;
  const { location, points, box, polyline } = data;
  points && drawPoints(points);
  box && box.forEach((item: any) => {
    const { xbr, xtl, ybr, ytl, color, label } = item;
    const position = {
      x: (+xtl+ +xbr)/2,
      y: (+ytl+ +ybr)/2,
    };
    const dimension = {
      x: Math.abs(xbr - xtl),
      y: Math.abs(ybr - ytl),
    };

    drawBox(position, dimension, color, label);
  });
  polyline && polyline.forEach((item: any) => {
    const { points, color } = item;
    drawPolyline(points, color);
  });
  location && location.forEach((item: any) => {
    const { position, dimension, color, label } = item;
    const _position = {
      x: position.x - dimension.x / 2,
      y: position.y - dimension.y / 2,
    };
    drawBox(_position, dimension, color, label);
  });
  _render && _render();
};

interface Props {
  step: number;
  preloadSize?: number;
  margin?: string;
  width?: string;
  height?: string;
  totalPages?: number;
  frameList?: any;
  nextFrameList?: any;
  getCounter?: (step: number) => void;
}

const SlideshowResult: FC<Props> = props => {
  const {
    preloadSize = 20,
    step = 0,
    margin,
    width,
    height,
    frameList: _frameList,
    nextFrameList: _nextFrameList,
    getCounter,
  } = props;

  const slideRef: any = useRef(null);
  const [currentCamera, setCurrentCamera] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [ids, setIds] = useState<string[]>([]);

  const getImage2D = (path: string) => {
    const planeGeometry = new THREE.PlaneBufferGeometry(1280, 720);
    new THREE.TextureLoader().load(path, texture => {
      const planeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.renderOrder = -10;
      _scene && _scene.add(plane);
      _render && _render();
      setIsLoading(false);
    });
  };

  const getImagesTask = (data: any[], type: string) => {
    const pageNumber = Math.floor((step + 1) / preloadSize);
    let _counter = preloadSize * (pageNumber + 1);
    data.forEach(item => {
      const res = JSON.parse(item?.picAnnotationResult);
      if(!res) {
        setIsEmpty(true)
      }
      const src = res && res[currentCamera] && res[currentCamera]?.picOssAddress;
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

  const init = () => {
    const renderer = initRender(slideRef.current);
    const scene = initScene();
    const camera = initCamera();
    const render = () => {
      renderer.render(scene, camera);
    };

    _render = render;
    _scene = scene;
    scene.add(camera);
    render();
  };

  useEffect(() => {
    getCounter && getCounter(counter);
  }, [counter]);

  useEffect(() => {
    if (_nextFrameList?.length) {
      getImagesTask(_nextFrameList, 'next');
    }
  }, [_nextFrameList]);

  useEffect(() => {
    if (_frameList?.length) {
      getImagesTask(_frameList, 'current');
    }
  }, [_frameList]);

  useEffect(() => {
    const pageNumber = Math.floor(step / preloadSize) + 1;
    const imageIndex = step % preloadSize;
    const playList = pageNumber % 2 === 0 ? _nextFrameList : _frameList;
    _scene&&_scene.clear();
    if (
      !playList ||
      !playList.length ||
      !playList[imageIndex]?.picAnnotationResult
      ) {
        setIsLoading(false);
        setIsEmpty(true);
        return;
      }
      else {
        setIsLoading(true);
        setIsEmpty(false);
      }

    const list = JSON.parse(playList[imageIndex].picAnnotationResult);

    if (list && slideRef.current) {
      getImage2D(list[currentCamera]?.picOssAddress);
      drawMarker(list[currentCamera]?.PicAnnotationResult);
      setIds(list[currentCamera]?.picAnnotationResultBriefly || []);
    }
  }, [step, currentCamera, _frameList, _nextFrameList]);

  useEffect(() => {
    init();
    return () => {
      slideRef.current = null;
      _render = null;
      _scene = null;
    }
  }, []);

  return (
    <ImageWrapper margin={margin} width={width} height={height}>
      <ImageContent ref={slideRef}>
        <ImageWay>{ids[currentCamera]}</ImageWay>
        {isLoading ? (
          <Loading
            style={{ position: 'absolute', width: width, height: height }}
          />
        ) : null}
        {isEmpty ? (
          <img
            src={emptyPng}
            height={height}
            style={{ position: 'absolute', top: '0' }}
          />
        ) : null}
      </ImageContent>
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

export default SlideshowResult;
