import { FC, useEffect, useRef, useState } from 'react';
import { MapProps, MapPoint, MapData } from '@/types';
import { useScript } from '@/hooks';
import { Loading } from '@/components';
import StartSvg from '@/assets/images/startPoint.png';
import EndSvg from '@/assets/images/endPoint.png';

const A_MAP_URL =
  'https://webapi.amap.com/maps?v=2.0&key=09d1b1c96cd0810d95085681fd25e339';

const center = ['116.397428', '39.90923'];

const GaodeMap: FC<MapProps> = props => {
  const { height, width, mapData } = props;

  const [map, setMap] = useState<any>(null);
  const [start, setStart] = useState<string[]>([]);
  const [end, setEnd] = useState<string[]>([]);
  const [data, setData] = useState<MapData>({
    path: [],
  });

  const mapRef = useRef(null);
  const { toPromise } = useScript({ src: A_MAP_URL });

  const addTrace = function (data: MapPoint[][], map: any) {
    if (data.length <= 0) return;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.length <= 0) {
        continue;
      }
      const AMap = (window as any).AMap;
      const path: unknown[] = [];
      item?.forEach(it => {
        if (Number.isFinite(+it.lng) && Number.isFinite(+it.lat)) {
          const point = new AMap.LngLat(it.lng, it.lat);
          path.push(point);
        }
      });
      const polyLine = new AMap.Polyline({
        path: path,
        strokeWeight: 6, // 线条宽度
        strokeColor: '#4d58ba', // 线条颜色
        lineJoin: 'round',
        lineCap: 'round',
        showDir: true,
        isOutline: true, // 是否描边
        outlineColor: 'blue', // 描边颜色
      });
      map?.addOverlay(polyLine);
    }
  };

  const addMarker = function (
    path: string[],
    map: any,
    label: {
      title: string;
      direction?: string;
    },
    Icon?: any,
    content?: any
  ) {
    if (!path || path.length <= 0) return;
    const AMap = (window as any).AMap;
    const marker = new AMap.Marker({
      content: content,
      position: path, //位置
      icon: Icon,
      label: label,
      anchor: 'center',
    });
    map.add(marker);
  };

  const getMapData = async function () {
    if (mapData?.path && mapData?.path.length > 0) {
      const startLine = mapData?.path[0];
      setStart([startLine[0].lng, startLine[0].lat]);
      setEnd([
        startLine[startLine.length - 1].lng,
        startLine[startLine.length - 1].lat,
      ]);
    }
    mapData&&setData(mapData);
  };

  const addLine = function () {
    map?.clearMap();
    data?.path && addTrace(data?.path, map);
    if (end.length) {
      addMarker(
        end,
        map,
        {
          title: '终点',
          direction: 'left',
        },
        EndSvg,
      );
    }
    if(start.length) {
      map?.setCenter(start);
      addMarker(
        start,
        map,
        {
          title: '起点',
          direction: 'left',
        },
        StartSvg,
      );
    }
  };

  const initMap = async function () {
    const _window = window as any;
    _window._AMapSecurityConfig = {
      securityJsCode: '5eeadfe8df0972cfdf0d028819c1801f',
    };
    await toPromise();
    setTimeout(() => {
      const mapValue = mapRef.current;
      const AMap = (window as any).AMap;
      const map = new AMap.Map(mapValue, {
        zoom: 11,
        center: center,
        viewMode: '3D',
      });
      setMap(map);
    }, 300)
  };

  useEffect(() => {
    initMap();
    return () => {
      map?.getLimitBounds();
    };
  }, []);

  useEffect(() => {
    getMapData();
  }, [mapData]);

  useEffect(() => {
    map && addLine();
  }, [map, data]);

  return (
    <div ref={mapRef} style={{ height, width }}>
      <Loading tip="地图正在加载中..." />
    </div>
  );
};

export default GaodeMap;
