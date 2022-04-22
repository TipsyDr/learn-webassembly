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
  let result: number = Number.isNaN(val) ? parseInt(val + '') : +val!;

  let h =
    Math.floor(result / 3600) < 10
      ? '0' + Math.floor(result / 3600)
      : Math.floor(result / 3600);
  let m =
    Math.floor((result / 60) % 60) < 10
      ? '0' + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60);
  let s =
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
  let a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
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

export function getAnnotationStatus(val: number): string {
  let annotationStatus = '';
  switch (val) {
    case 0:
      annotationStatus = '创建失败';
      break;
    case 1:
      annotationStatus = '创建中';
      break;
    case 2:
      annotationStatus = '创建成功';
      break;
    case 3:
      annotationStatus = '作业中"';
      break;
    case 4:
      annotationStatus = '作业完成"';
      break;
  }
  return annotationStatus;
}

export function copyHandle(content: string) {
  const clip = {
    status: false,
  };
  let copy = (e: any) => {
    e.preventDefault();
    e.clipboardData.setData('text/plain', content);
    clip.status = true;
    document.removeEventListener('copy', copy);
  };
  document.addEventListener('copy', copy);
  document.execCommand('Copy');
  return clip;
}
