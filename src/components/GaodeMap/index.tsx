import { FC, useEffect, useRef, useState } from 'react';
import { MapProps, MapPoint } from '@/types';
import { useScript } from '@/hooks';
import { getTrackLbs } from '@/api';
import { Loading, notice, CustomIcon } from '@/components';
import { ErrorMsg } from '@/styled';
import StartSvg from '@/assets/images/startPoint.png';
import EndSvg from '@/assets/images/endPoint.png';

const A_MAP_URL =
  'https://webapi.amap.com/maps?v=2.0&key=09d1b1c96cd0810d95085681fd25e339';

const GaodeMap: FC<MapProps> = props => {
  const { height, width, mapData } = props;
  const { carLicense, startTime, endTime, bagSetId } = mapData;
  const [map, setMap] = useState<any>(null);
  const [start, setStart] = useState(['116.397428', '39.90923']);
  const [end, setEnd] = useState(['116.397428', '39.90923']);
  const [data, setData] = useState({
    path: [],
  });
  const [tip, setTip] = useState<string>('');

  const mapRef = useRef(null);
  const { toPromise } = useScript({ src: A_MAP_URL });

  const addTrace = function (data: MapPoint[], map: any) {
    if (data.length <= 0) return;
    const AMap = (window as any).AMap;
    const path: unknown[] = [];
    data?.forEach(item => {
      if (!Number.isNaN(+item.lng) || !Number.isNaN(+item.lat)) {
        const point = new AMap.LngLat(item.lng, item.lat);
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
  };

  const addMarker = function (
    path: string[],
    map: any,
    label: {
      title: string;
      direction?: string;
    },
    Icon?: any,
  ) {
    if (!path || path.length <= 0) return;
    const AMap = (window as any).AMap;
    const marker = new AMap.Marker({
      position: path, //位置
      icon: Icon,
      label: label,
      anchor: 'center',
    });
    map.add(marker);
  };

  const getMapData = async function () {
    const data = await getTrackLbs({
      carLicense: mapData?.carLicense || '',
      startTime: mapData?.startTime || '',
      endTime: mapData?.endTime || '',
      bagSetId: mapData?.bagSetId || '',
    });
    if (+data.code === 100000) {
      if (data?.data?.path && data?.data?.path.length > 0) {
        setStart([data?.data?.path[0].lng, data?.data?.path[0].lat]);
        setEnd([
          data?.data?.path[data?.data?.path.length - 1].lng,
          data?.data?.path[data?.data?.path.length - 1].lat,
        ]);
      }
      setData(data?.data);
      setTip('');
    } else {
      setTip(`ERROR! ${data.message}`);
    }
  };

  const addLine = function () {
    map?.clearMap();
    map?.setCenter(start);
    addTrace(data?.path, map);
    addMarker(
      end,
      map,
      {
        title: '终点',
        direction: 'left',
      },
      EndSvg,
    );
    addMarker(
      start,
      map,
      {
        title: '起点',
        direction: 'left',
      },
      StartSvg,
    );
  };

  const initMap = async function () {
    const _window = window as any;
    _window._AMapSecurityConfig = {
      securityJsCode: '5eeadfe8df0972cfdf0d028819c1801f',
    };
    await toPromise();
    const mapValue = mapRef.current;
    const AMap = (window as any).AMap;
    const map = new AMap.Map(mapValue, {
      zoom: 11,
      center: start,
      viewMode: '3D',
    });
    setMap(map);
  };

  useEffect(() => {
    initMap();
    return () => {
      map?.getLimitBounds();
    };
  }, []);

  useEffect(() => {
    const carLicenseErr = carLicense ? '' : 'carLicense! ';
    const bagSetIdErr = bagSetId ? '' : 'bagSetId! ';
    const startTimeErr = startTime ? '' : 'startTime! ';
    const endTimeErr = endTime ? '' : 'endTime!';
    carLicense && bagSetId && startTime && endTime && getMapData();
    if (!carLicense || !bagSetId || !startTime || !endTime) {
      setTip(
        `缺少参数数据: ${
          carLicenseErr + bagSetIdErr + startTimeErr + endTimeErr
        }`,
      );
    }
  }, [carLicense, startTime, endTime, bagSetId]);

  useEffect(() => {
    map && data?.path && addLine();
  }, [map, data]);

  return (
    <div>
      {tip ? (
        <ErrorMsg>
          <CustomIcon type="error" />
          <span style={{ paddingLeft: '6px' }}>{tip}</span>
        </ErrorMsg>
      ) : (
        ''
      )}
      <div ref={mapRef} style={{ height, width }}>
        <Loading tip="地图正在加载中..." />
      </div>
    </div>
  );
};

export default GaodeMap;
