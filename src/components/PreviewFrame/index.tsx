import { FC, useEffect, useState, useRef, MutableRefObject } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';
import {
  PointLoading,
} from '@/components';
import { ThreeWrapper } from './styled';
import { FrameBasicData, ImageInfo } from '@/types';
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
let height: number = 0;
let width: number = 0;

//设置背景颜色
const initRender = (dom: Element) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  dom && dom.appendChild(renderer.domElement);
  return renderer;
};

const initCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    1,
    10000,
  );
  camera.position.set(-100, 0, 100);
  camera.up.set(0, 0, 1);
  return camera;
};

const initScene = () => {
  const scene = new THREE.Scene();
  scene.autoUpdate = true;
  return scene;
};

const initLight = () => {
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  return light;
};

const initControls = (camera: any, renderer: any, render: any) => {
  const controls = new OrbitControls(camera, renderer.domElement);

  // use if there is no animation loop
  controls.addEventListener('change', render);
  controls.update();
  return controls;
};

const initLoader = () => {
  const loader = new PCDLoader();
  return loader;
};

interface Props {
  isOverlooking?: boolean;
  frameList?: ImageInfo;
  nextFrameList?: ImageInfo;
  totalPages?: number;
  preloadSize?: number;
  step: number;
  getCounter?: (step: number) => void;
}

const PreviewFrame: FC<Props> = (props) => {
  const {
    preloadSize = 20,
    isOverlooking,
    frameList: _frameList,
    nextFrameList: _nextFrameList,
    totalPages,
    getCounter,
    step
  } = props;

  const threeRef: any = useRef(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);

  const getPoints = (path: string) => {
    setLoading(true);
    _loader.load(
      replaceHttpToHttps(path),
      (points: any) => {
        // points.geometry.center();
        points.material.color.setHex(0xffffff);
        _scene.remove(_points);
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

  const loadImage = async (url: string) => {
    new THREE.TextureLoader().load(url, (texture: THREE.Texture) => {
      const mat = new THREE.SpriteMaterial({ map: texture, color: 0xffffff });
      const obj = new THREE.Sprite(mat);
      obj.geometry.scale(10, 10, 10);
      _lazyObj = obj;
    });
  };

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

    scene.add(camera);
    scene.add(light);

    _controls = initControls(camera, renderer, render);
    window.addEventListener('resize', debounceOnWindowResize);
    render();
    loadImage(emptyPng);
  };

  const getPointsTask = (data: FrameBasicData[], type: string) => {
    const pageNumber = Math.floor((step + 1) / preloadSize);
    let _counter = preloadSize * (pageNumber + 1);
    data.forEach(item => {
      if (item.pcdOssAddress) {
        _loader.load(
          replaceHttpToHttps(item.pcdOssAddress),
          (points: any) => {
            points.material.color.setHex(0xffffff);
          },
          (xhr: any) => {
            if (xhr.loaded / xhr.total === 1) {
              _counter += 1;
              console.log(_counter);
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
    _renderer &&
      _frameList?.content &&
      _frameList?.content.length &&
      getPointsTask(_frameList?.content, 'current');
  }, [_frameList]);

  useEffect(() => {
    const pageNumber = Math.floor((step + 1) / preloadSize);
    if (totalPages && +pageNumber === +totalPages) return;

    _renderer &&
      _nextFrameList?.content &&
      _nextFrameList?.content?.length &&
      getPointsTask(_nextFrameList?.content, 'next');
  }, [_nextFrameList]);

  useEffect(() => {
    const pageNumber = Math.floor(step / preloadSize) + 1;
    const pointsIndex = step % preloadSize;

    const list = pageNumber % 2 === 0 ? _nextFrameList : _frameList;

    if (list?.content && list?.content[pointsIndex] && _render) {
      getPoints(list?.content[pointsIndex]?.pcdOssAddress!);
    } else {
      setLoading(true);
    }
  }, [step, _frameList, _nextFrameList]);

  useEffect(() => {
    if(_camera && _controls) {
      if (isOverlooking ) {
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
  }, []);

  return (
    <>
      <ThreeWrapper ref={threeRef}>
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
      </ThreeWrapper>
    </>
  );
};

export default PreviewFrame;
