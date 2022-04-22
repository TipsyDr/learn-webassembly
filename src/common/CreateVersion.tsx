import { FC } from 'react';
import { Modal } from 'antd';
import { CreateVersion as TypeVersion } from '@/types';
import { FormLayout, FormOptions } from '@/components';

interface Props {
  visible?: boolean;
  ok: (val: TypeVersion) => void;
  cancel: () => void;
}

interface Params {
  versionName: string;
  addr: string;
}

export const CreateVersion: FC<Props> = props => {
  const { visible, ok, cancel } = props;

  const handleOk = function (val: Params) {
    ok(val);
  };

  const formItems = [
    {
      type: 'input',
      formItemOptions: {
        label: ' 版本名称',
        name: 'versionName',
        rules: [{ required: true, message: '版本名称为必填项' }],
      },
      itemChildOptions: {
        placeholder: '请填写版本名称',
      },
    },
    {
      type: 'input',
      formItemOptions: {
        label: '版本文档链接',
        name: 'addr',
        rules: [{ required: true, message: '版本文档链接为必填项' }],
      },
      itemChildOptions: {
        placeholder: '请添加版本文档链接',
      },
    },
  ];

  const formOptions: FormOptions = {
    labelAlign: 'right',
    labelWrap: true,
    labelCol: { flex: '110px' },
    btnstyle: {
      textAlign: 'right',
    },
    btnoptions: [
      {
        kind: 'button',
        text: '取消',
        onClick: cancel,
      },
      {
        kind: 'reset',
        style: { marginLeft: '10px' },
      },
      {
        kind: 'submit',
        text: '提交',
        style: { marginLeft: '10px' },
      },
    ],
    onFinish: handleOk,
  };

  return (
    <>
      <Modal title="创建版本" visible={visible} footer={null} onCancel={cancel}>
        <FormLayout formItems={formItems} formOptions={formOptions} />
      </Modal>
    </>
  );
};
