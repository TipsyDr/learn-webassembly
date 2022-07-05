import { FC } from 'react';
import { Input } from 'antd';
import { ConfirmBtn, CancelBtn, EditBtn } from '@/components';

interface Props {
  type?: 'input' | 'TextArea' | undefined;
  title?: string;
  defaultValue: string | undefined;
  style?: {};
  status?: boolean;
  value?: string;
  inputProps?: {};
  EditBtnProps?: {};
  onChange: (e: any) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onClick: () => void;
}

const EditInput: FC<Props> = props => {
  const {
    onChange,
    onConfirm,
    onCancel,
    onClick,
    value,
    defaultValue,
    inputProps,
    EditBtnProps,
    type,
    status,
  } = props;

  return (
    <>
      {status ? (
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
      ) : (
        <span>
          {value?<span style={{ marginRight: '10px' }}>{value}</span>: null}
          <EditBtn btnProps={EditBtnProps} onClick={onClick} />
        </span>
      )}
    </>
  );
};

export default EditInput;
