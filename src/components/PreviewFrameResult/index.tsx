import { FC, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';
import { PointLoading } from '@/components';
import { ThreeWrapper } from './styled';
import { debounce, replaceHttpToHttps } from '@/utils';
import emptyPng from '@/assets/images/empty.png';

let _scene: any = null;
let _render: any = null;
let _points: any = null;
let _camera: any = null;
let _loader: any = null;
let _controls: any = null;
let _renderer: any = null;
let _lazyObj: any = null;
let height = 0;
let width = 0;

//设置背景颜色
const initRender = (dom: Element) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(width, height);
  dom && dom.appendChild(renderer.domElement);

  return renderer;
};

const initControls = (camera: any, renderer: any, render: any) => {
  const controls = new TrackballControls(camera, renderer.domElement);

  // use if there is no animation loop
  controls.addEventListener('change', render);
  controls.update();

  return controls;
};

const initLoader = () => {
  const loader = new PCDLoader();

  return loader;
};

const initScene = () => {
  const scene = new THREE.Scene();

  scene.autoUpdate = true;
  addAxisHelper(scene);

  return scene;
};

const initLight = () => {
  const light = new THREE.DirectionalLight(0xffffff);

  light.position.set(1, 1, 1);

  return light;
};

const initCamera = () => {
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

  camera.position.set(-100, 0, 100);
  camera.up.set(0, 0, 1);
  camera.lookAt(200);

  return camera;
};

// TODO辅助线
const addAxisHelper = (scene: any) => {
  const axisHelper = new THREE.AxesHelper(50);

  scene.add(axisHelper);
};

const animate = () => {
  //更新控制器
  _controls && _controls.update();
  _render && _render();
  requestAnimationFrame(animate);
};

const drawBox = (data: any) => {
  _scene && addAxisHelper(_scene);
  if (!data || data.length <= 0) {
    return;
  }
  data.forEach((item: any) => {
    const geometry = new THREE.BoxGeometry(
      item?.scale?.x,
      item?.scale?.y,
      item?.scale?.z,
    );

    const mesh = new THREE.Mesh(geometry);

    item?.rotation &&
      mesh.rotation.set(item.rotation?.x, item.rotation?.y, item.rotation?.z);
    item?.position &&
      mesh.position.set(item.position?.x, item.position?.y, item.position?.z);
    const box = new THREE.BoxHelper(mesh, 0x00ff00);

    _scene.add(box);
    if (item?.category && item?.position) {
      const label = drawLabel(item?.position, item?.category, item?.scale);

      _scene.add(label);
    }
  });
};

const drawLabel = (position: any, label: string, color?: string) => {
  const canvas = document.createElement('canvas');

  canvas.width = 40;
  canvas.height = 14;
  const ctx: any = canvas.getContext('2d');

  ctx.fillStyle = color || '#fe0101';
  ctx.font = 'Bold 14px 宋体';
  ctx.fillText(label, 0, 14);
  document.body.appendChild(canvas);
  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.SpriteMaterial({ map: texture });
  const text = new THREE.Sprite(material);

  text.position.set(position.x, position.y, position.z);
  text.scale.set(0.2, 0.2, 0.2);

  return text;
};

interface Props {
  isOverlooking?: boolean;
  frameList?: any;
  nextFrameList?: any;
  totalPages?: number;
  preloadSize?: number;
  step: number;
  getCounter?: (step: number) => void;
}

const PreviewFrameResult: FC<Props> = props => {
  const {
    preloadSize = 20,
    isOverlooking,
    frameList: _frameList,
    nextFrameList: _nextFrameList,
    totalPages,
    getCounter,
    step,
  } = props;

  const threeRef: any = useRef(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const getPoints = (path: string) => {
    setLoading(true);
    // const color = new THREE.Color();
    _loader.load(
      replaceHttpToHttps(path),
      (points: any) => {
        points.material.color.setHex(0xffffff);
        _scene.remove(_points);
        // points.material.vertexColors = true;
        // points.material.size = 1.2;
        // const position = points.geometry.attributes.position;
        // const colors = [];
        // const length = points.geometry.attributes.position.count;
        // for (let i = 0; i < length; i++) {
        //   const index = i * 3 > length ? length : i * 3+2;
        //   const item = Math.abs(position.array[index]*54);
        //   if (item<=10) {
        //     color.setRGB(0, 0, 255);
        //   } else if (item >= 10 && item < 170) {
        //     color.setRGB(0, 255, 0);
        //   } else {
        //     color.setRGB(255, 0, 0);
        //   }
        //   colors.push(color.r, color.g, color.b);
        // }
        // points.geometry.setAttribute(
        //   'color',
        //   new THREE.Float32BufferAttribute(colors, 3),
        // );
        // points.geometry.computeBoundingSphere();
        // console.log(points, position);
        _points = points;
        _scene.add(points);
        _render();
      },
      (xhr: any) => {
        if (xhr.loaded / xhr.total === 1) {
          setLoading(false);
        }
      },
      (error: Error) => {
        console.log('An error happened the content is: ', error);
      },
    );
  };

  const onWindowResize = () => {
    const { height: h, width: w } =
      threeRef.current && threeRef.current.getBoundingClientRect();

    height = h;
    width = w;
    _camera.aspect = width / height;
    _camera.updateProjectionMatrix();
    _renderer.setSize((width = w), height);
  };
  const debounceOnWindowResize = debounce(onWindowResize, 300);

  const init = () => {
    const renderer = initRender(threeRef.current);
    const scene = initScene();
    const camera = initCamera();
    const light = initLight();
    const loader = initLoader();

    const render = () => {
      renderer.render(scene, camera);
    };

    _scene = scene;
    _render = render;
    _renderer = renderer;
    _camera = camera;
    _loader = loader;
    _controls = initControls(camera, renderer, render);

    scene.add(camera);
    scene.add(light);
    animate();

    window.addEventListener('resize', debounceOnWindowResize);
    render();
  };

  const getPointsTask = (data: any) => {
    const pageNumber = Math.floor((step + 1) / preloadSize);
    let _counter = preloadSize * (pageNumber + 1);

    data.forEach((item: any) => {
      const res = JSON.parse(item?.pcdAnnotationResult);

      if (!res) {
        setIsEmpty(true);
      }
      if (res?.pcdOssAddress) {
        _loader.load(
          replaceHttpToHttps(res?.pcdOssAddress),
          (points: any) => {
            // points.geometry.center();
            points.material.color.setHex(0xffffff);
          },
          (xhr: any) => {
            if (xhr.loaded / xhr.total === 1) {
              _counter += 1;
              setCounter(_counter);
            }
          },
          (error: Error) => {
            console.log('An error happened the content is: ', error);
          },
        );
      }
    });
  };

  useEffect(() => {
    getCounter && getCounter(counter);
  }, [counter]);

  useEffect(() => {
    _renderer && _frameList && _frameList.length && getPointsTask(_frameList);
  }, [_frameList]);

  useEffect(() => {
    const pageNumber = Math.floor((step + 1) / preloadSize);

    if (totalPages && +pageNumber === +totalPages) return;

    _renderer &&
      _nextFrameList &&
      _nextFrameList.length &&
      getPointsTask(_nextFrameList);
  }, [_nextFrameList]);

  useEffect(() => {
    const pageNumber = Math.floor(step / preloadSize) + 1;
    const pointsIndex = step % preloadSize;

    const playList = pageNumber % 2 === 0 ? _nextFrameList : _frameList;

    if (
      !playList ||
      !playList.length ||
      !playList[pointsIndex]?.pcdAnnotationResult
    ) {
      setLoading(false);
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      setLoading(true);
      const list = JSON.parse(playList[pointsIndex].pcdAnnotationResult);

      if (_render) {
        _scene.clear();
        getPoints(list.pcdOssAddress);
        drawBox(list.PcdAnnotationResult);
      }
    }
  }, [step, _frameList, _nextFrameList]);

  useEffect(() => {
    if (_camera && _controls) {
      if (isOverlooking) {
        _camera.position.set(-100, 0, 100);
        _controls.update();
      } else {
        _camera.position.set(-100, 0, 0);
        _controls.update();
      }
    }
  }, [isOverlooking]);

  useEffect(() => {
    Promise.resolve().then(() => {
      const { height: h, width: w } =
        threeRef.current && threeRef.current.getBoundingClientRect();

      height = h;
      width = w;
      init();
    });

    return () => {
      _scene = null;
      _render = null;
      _points = null;
      _camera = null;
      _loader = null;
      _controls = null;
      _renderer = null;
      _lazyObj = null;
      threeRef.current = null;
    };
  }, []);

  return (
    <>
      <ThreeWrapper ref={threeRef} key={'pointCould'}>
        {loading ? (
          <PointLoading
            style={{
              position: 'absolute',
              top: 0,
              zIndex: 10,
            }}
            modalStyle={{
              opacity: 0.6,
              background: '#000',
            }}
            tip="加载中..."
          />
        ) : null}
        {isEmpty ? (
          <img
            src={emptyPng}
            height="80%"
            style={{ position: 'absolute', top: '0' }}
          />
        ) : null}
      </ThreeWrapper>
    </>
  );
};

export default PreviewFrameResult;
