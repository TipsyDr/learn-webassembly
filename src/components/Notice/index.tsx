import { notification } from 'antd';
import { ReactNode } from 'react';

type Type = 'success' | 'warning' | 'error' | 'info';
interface Conf {
  type?: Type;
  mes?: ReactNode;
  desc?: ReactNode;
}
export const notice = (conf: Conf) => {
  const { type, mes, desc } = conf;

  notification[type || 'info']({
    message: mes,
    description: desc,
    style: { borderRadius: '10px' },
  });
};
