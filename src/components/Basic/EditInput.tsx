import { FC } from 'react';
import { Input } from 'antd';
import { ConfirmBtn, CancelBtn } from '@/components';

interface Props {
  type?: 'input' | 'TextArea' | undefined;
  title?: string;
  defaultValue: string | undefined;
  style?: {};
  inputProps?: {};
  onChange: (e: any) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const EditInput: FC<Props> = props => {
  const { onChange, onConfirm, onCancel, defaultValue, inputProps, type } =
    props;

  return (
    <>
      {type && type === 'input' ? (
        <Input
          style={{ width: '200px', marginRight: '10px' }}
          placeholder="请编辑"
          autoFocus
          defaultValue={defaultValue}
          onChange={(e: any) => onChange(e)}
          {...inputProps}
        />
      ) : (
        <Input.TextArea
          style={{ width: '400px', marginRight: '10px' }}
          placeholder="请编辑"
          autoFocus
          defaultValue={defaultValue}
          onChange={(e: any) => onChange(e)}
          {...inputProps}
        />
      )}

      <ConfirmBtn onClick={() => onConfirm()} />
      <CancelBtn onClick={() => onCancel()} />
    </>
  );
};

export default EditInput;
