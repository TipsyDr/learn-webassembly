import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Disc from '@/assets/login/disc.png';

const SEPARATION = 80,
  AMOUNTX = 50,
  AMOUNTY = 50;

let particles: any,
  count = 0;

// let mouseX = 0,
// mouseY = 0;
// let windowHalfX = window.innerWidth / 2;
// let windowHalfY = window.innerHeight / 2;
let renderer: any;
let scene: any;
let camera: any;

function onWindowResize() {
  // windowHalfX = window.innerWidth / 2;
  // windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight / 2);
}

// function onPointerMove(event: any) {
//   if (event.isPrimary === false) return;

//   mouseX = event.clientX - windowHalfX;
//   mouseY = event.clientY - windowHalfY;
// }

function render() {
  // camera.position.x += (mouseX - camera.position.x) * 0.05;
  // camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.position.x = 400;
  camera.position.y = 600;
  camera.lookAt(scene.position);

  const positions = particles.geometry.attributes.position.array;
  const scales = particles.geometry.attributes.scale.array;

  let i = 0,
    j = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      positions[i + 1] =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
      scales[j] =
        (Math.sin((ix + count) * 0.3) + 1) * 20 +
        (Math.sin((iy + count) * 0.5) + 1) * 20;
      i += 3;
      j++;
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;

  renderer.render(scene, camera);

  count += 0.1;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

const init = () => {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000,
  );
  camera.position.z = 1000;
  scene = new THREE.Scene();
  const numParticles = AMOUNTX * AMOUNTY;
  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);
  let i = 0,
    j = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
      positions[i + 1] = 0; // y
      positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

      scales[j] = 1;

      i += 3;
      j++;
    }
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const sprite = new THREE.TextureLoader().load(Disc);
  const material = new THREE.PointsMaterial({
    color: '#fff',
    size: 20,
    sizeAttenuation: true,
    map: sprite,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight / 2);
};

export const Wave: FC = () => {
  const threeRef: any = useRef(null);
  const initRenderer = () => {
    threeRef && threeRef.current.appendChild(renderer.domElement);
    // threeRef.current.style.touchAction = 'none';
    // threeRef.current.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onWindowResize);
  };

  useEffect(() => {
    init();
    initRenderer();
    animate();
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: '0',
        bottom: 0,
        width: '100%',
        height: '50%',
        opacity: '0.5',
      }}
      ref={threeRef}
    ></div>
  );
};
