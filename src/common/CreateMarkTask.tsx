import { FC } from 'react';
import { FormLayout, FormOptions } from '@/components';
import { Description, DescItem, DmpModal } from '@/styled';
// import { useLoginContext } from '@/context';
import { CreateMarkTask as MarkTaskParams } from '@/types';
import { useGetAnnotationVersion, useGetAnnotationType } from '@/api';

interface Props {
  forceRender?: boolean;
  bagSetId?: string;
  vos?: any[];
  visible?: boolean;
  ok: (val: any) => void;
  cancel: () => void;
}

const CreateMarkTask: FC<Props> = props => {
  const { bagSetId, vos, visible, ok, cancel } = props;

  // const { userInfo } = useLoginContext();
  const formConfig = {
    formItems: [
      {
        type: 'input',
        formItemOptions: {
          label: '标注任务名称',
          name: 'annotationName',
        },
        itemChildOptions: {
          placeholder: '请填写标注任务名称',
        },
      },
      {
        type: 'radio',
        formItemOptions: {
          initialValue: '0',
          label: '标注类型',
          name: 'annotationType',
        },
        itemChildOptions: {
          api: useGetAnnotationType,
        },
      },
      {
        type: 'select',
        formItemOptions: {
          label: '标注版本',
          name: 'markVersion',
        },
        itemChildOptions: {
          placeholder: '待添加',
          api: useGetAnnotationVersion,
          map: {
            code: ['versionName', 'id'],
            name: 'versionName',
          },
        },
      },
    ],
  };

  const handleSubmit = function (val: MarkTaskParams) {
    ok({
      vos: vos,
      // username: userInfo?.userName,
      ...val,
    });
  };

  const formOptions: FormOptions = {
    layout: 'horizontal',
    btnstyle: {
      width: '100%',
      textAlign: 'right',
    },
    btnoptions: [
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
    onFinish: handleSubmit,
  };

  return (
    <>
      <DmpModal
        forceRender
        title="创建标注任务"
        footer={null}
        visible={visible}
        onOk={ok}
        onCancel={cancel}
      >
        <Description
          size="small"
          column={1}
          labelStyle={{ width: '120px', color: '#9c9c9c', fontSize: '14px' }}
          contentStyle={{ fontSize: '14px' }}
        >
          {bagSetId && <DescItem label="bag集合ID">{bagSetId}</DescItem>}
          <DescItem label="选择 bag 数量">{vos?.length}</DescItem>
        </Description>
        <FormLayout hasCard={true} {...formConfig} formOptions={formOptions} />
      </DmpModal>
    </>
  );
};

export default CreateMarkTask;
