import { FC, useState, useEffect } from 'react';
import { Radio } from 'antd';
import type { RadioProps } from 'antd/lib';
import { Option, SelectOption } from '@/types';

export interface DmpRadioProps extends RadioProps {
  api: () => any;
  map?: Option;
}

interface Api {
  data: any;
  error: any;
  isLoading: boolean;
  refetch: () => any;
}

export const DmpRadio: FC<DmpRadioProps> = props => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const { api, map, ...others } = props;
  let apiData: Api = {
    data: [],
    error: {},
    isLoading: false,
    refetch: () => {
      console.log('refetch');
    },
  };

  if (api) {
    apiData = api();
  }
  const { data } = apiData;

  useEffect(() => {
    let options: SelectOption[] = [];

    if (map) {
      const { code, name } = map;

      if (Array.isArray(code)) {
        options =
          data?.data?.length &&
          data?.data?.map((item: any) => {
            return {
              label: item[name],
              value: item[code[0]] + '-' + item[code[1]],
            };
          });
      } else {
        options =
          data?.data?.length &&
          data?.data?.map((item: any) => {
            return {
              label: item[name],
              value: item[code],
            };
          });
      }
    } else {
      options =
        data?.data?.length &&
        data?.data?.map((item: Option) => {
          return {
            label: item.name,
            value: item.code,
          };
        });
    }
    setOptions(options);
  }, []);

  return <Radio.Group options={options} {...others} />;
};
