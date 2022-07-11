import { FC, useState, useEffect } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd/lib';
import { Option, SelectOption } from '@/types';

export interface DmpSelectProps extends SelectProps {
  api: () => any;
  map?: Option;
}

interface Api {
  data: any;
  error: any;
  isLoading: boolean;
  refetch: () => any;
}

export const DmpSelect: FC<DmpSelectProps> = props => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const { api, map, ...others } = props;
  let apiData: Api = {
    data: [],
    error: {},
    isLoading: false,
    refetch: () => {
      console.error('error');
    },
  };

  if (api) {
    apiData = api();
  }
  const { data, isLoading } = apiData;

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

  return <Select loading={isLoading} options={options} {...others} />;
};
