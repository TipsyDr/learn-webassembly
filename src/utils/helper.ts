import { TagColor } from '@/types/tags';

export function getTagColor(index: number, maxLength: number): string {
  if (index <= maxLength) {
    return TagColor[index];
  } else {
    return TagColor[Math.ceil(index / maxLength)];
  }
}

export function formatSeconds(val: number | string | undefined): string {
  if (typeof val === 'undefined') {
    return '0秒';
  }
  const result: number = Number.isNaN(val) ? parseInt(val + '') : +val!;

  const h =
    Math.floor(result / 3600) < 10
      ? '0' + Math.floor(result / 3600)
      : Math.floor(result / 3600);
  const m =
    Math.floor((result / 60) % 60) < 10
      ? '0' + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60);
  const s =
    Math.floor(result % 60) < 10
      ? '0' + Math.floor(result % 60)
      : Math.floor(result % 60);

  let res = '';

  if (h !== '00') res += `${h}小时`;
  if (m !== '00') res += `${m}分钟`;
  res += `${s}秒`;

  return res;
}

export async function downloadRes(url: string) {
  const a = document.createElement('a');

  a.href = url;
  // a.target = '_blank';
  a.click();
  a.remove();
}

export function getAnnotationType(val: number): string {
  let annotationType = '';

  switch (val) {
    case 1:
      annotationType = '图像目标检测';

      break;
    case 2:
      annotationType = '图像伪3D';

      break;
    case 3:
      annotationType = '图像车道线';

      break;
    case 4:
      annotationType = '点云目标跟踪';

      break;
    case 5:
      annotationType = '点云车道线';

      break;
    case 6:
      annotationType = '点云平板车目标检测';

      break;
    case 7:
      annotationType = '交汇点标注';

      break;
  }

  return annotationType;
}

export function getAnnotationStatus(val: number): {
  label: string;
  type: string;
} {
  let annotationStatus = { label: '无状态信息', type: 'default' };

  switch (val) {
    case 0:
      annotationStatus = { label: '待挑帧', type: 'fail' };

      break;
    case 1:
      annotationStatus = { label: '挑帧中', type: 'processing' };

      break;
    case 2:
      annotationStatus = { label: '待送标', type: 'success' };

      break;
    case 3:
      annotationStatus = { label: '待标注', type: 'doing' };

      break;
    case 4:
      annotationStatus = { label: '标注中', type: 'doing' };

      break;
    case 5:
      annotationStatus = { label: '标注完成', type: 'complete' };

      break;
  }

  return annotationStatus;
}

export function copyHandle(content: string) {
  const clip = {
    status: false,
  };
  const copy = (e: any) => {
    e.preventDefault();
    e.clipboardData.setData('text/plain', content);
    clip.status = true;
    document.removeEventListener('copy', copy);
  };

  document.addEventListener('copy', copy);
  document.execCommand('Copy');

  return clip;
}

export function scrollContentToTop(top: number) {
  const dom = document.getElementsByClassName('ant-layout-content')[0];
  const content = dom.children[1];

  return (content.scrollTop = top);
}

export function replaceFileName(fileName: string, time: string) {
  const nameArr = fileName.split('_');
  const fileType = fileName.split('.');

  if (fileType[1] === 'bag') {
    const first = nameArr[0];
    const last = nameArr[nameArr.length - 1];

    return `${first}_${time}_${last}`;
  } else {
    return fileName;
  }
}

/**
 * 防抖
 *
 * @param {*} f
 * @param {*} wait
 * @return {*}
 */
export function debounce(f: any, wait: number) {
  let timer: any = null;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      f(...args);
    }, wait);
  };
}

/**
 * 节流
 *
 * @param {*} f
 * @param {*} wait
 * @return {*}
 */
export function throttle(f: any, wait: number) {
  let last = 0;
  let timer: any = null;

  return (...args: any) => {
    const now = Date.now();
    const remaining = wait - (now - last);

    clearTimeout(timer);

    if (remaining <= 0) {
      f(...args);
      last = Date.now();
    } else {
      if (timer) return;
      timer = setInterval(() => {
        f(...args);
        last = Date.now();
      }, remaining);
    }
  };
}

export function replaceHttpToHttps(url: string) {
  const urlSplit = url.split('://');

  if (urlSplit[0] === 'https') {
    return url;
  } else {
    return `https://${urlSplit[1]}`;
  }
}

// 图片质量压缩
export function getCompressUrl(url: string): string {
  return url + '&' + encodeURIComponent('x-oss-process=image/quality,q_60');
}
