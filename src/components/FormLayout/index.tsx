import {
  Input,
  InputNumber,
  Checkbox,
  DatePicker,
  TimePicker,
  Cascader,
  Form,
  Card,
} from 'antd';
import {
  DmpSelect,
  DmpSelectProps,
  DmpRadio,
  DmpRadioProps,
} from '@/components';
import { FormWrapper, FormItem } from '@/styled/Form';
import { BasicButton } from '../Basic';

import type {
  InputProps,
  InputNumberProps,
  DatePickerProps,
  TimeRangePickerProps,
  TimePickerProps,
  CascaderProps,
} from 'antd/lib';
import type { FormLayoutProps, btnProps } from './type';
import { useEffect } from 'react';
const DatePickerNode: any = DatePicker;

const formItemDefaultOptions: unknown = {
  size: 'middle',
};

const formItemEnum: any = {
  input: (option: InputProps) => (
    <Input {...formItemDefaultOptions} {...option} />
  ),
  inputNumber: (option: InputNumberProps) => (
    <InputNumber {...formItemDefaultOptions} {...option} />
  ),
  select: (option: DmpSelectProps) => (
    <DmpSelect {...formItemDefaultOptions} {...option} />
  ),
  checkbox: (option: any) => (
    <Checkbox.Group {...formItemDefaultOptions} {...option} />
  ),
  radio: (option: DmpRadioProps) => (
    <DmpRadio {...formItemDefaultOptions} {...option} />
  ),
  timePicker: (option: TimePickerProps) => (
    <TimePicker {...formItemDefaultOptions} {...option} />
  ),
  datePicker: (option: DatePickerProps) => (
    <DatePickerNode {...formItemDefaultOptions} {...option} />
  ),
  dateRangePicker: (option: TimeRangePickerProps) => (
    <DatePickerNode.RangePicker {...formItemDefaultOptions} {...option} />
  ),
  timeRangePicker: (option: TimeRangePickerProps) => (
    <TimePicker.RangePicker {...formItemDefaultOptions} {...option} />
  ),
  cascader: (option: CascaderProps<any>) => (
    <Cascader {...formItemDefaultOptions} {...option} />
  ),
};

function FormLayout(props: FormLayoutProps) {
  const { formItems, formOptions, hasCard } = props;
  if (!formItems) return null;

  const FormItemGroup = formItems.map(item => {
    const { type, itemChildOptions, formItemOptions } = item;
    if (type === 'custom') {
      return item.element;
    }
    return (
      <FormItem key={formItemOptions?.name} {...formItemOptions}>
        {formItemEnum[type](itemChildOptions)}
      </FormItem>
    );
  });

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleReset = () => {
    form.resetFields();
    form.submit();
  };

  const { btnoptions, btnstyle } = formOptions!;
  const btnTemp = btnoptions?.map((btn: btnProps, index: number) => {
    let dom = <BasicButton />;
    switch (btn.kind) {
      case 'submit':
        dom = (
          <BasicButton
            type="primary"
            htmlType="submit"
            {...btn}
            text={btn.text || '查询'}
            key={index}
          />
        );
        break;
      case 'reset':
        dom = (
          <BasicButton
            type="primary"
            htmlType="reset"
            {...btn}
            text={btn.text || '重置'}
            key={index}
          />
        );
        break;
      case 'resetSubmit':
        dom = (
          <BasicButton
            type="primary"
            onClick={handleReset}
            {...btn}
            text={btn.text || '重置'}
            key={index}
          />
        );
        break;
      case 'button':
        dom = (
          <BasicButton type="primary" htmlType="button" {...btn} key={index} />
        );
        break;
    }
    return dom;
  });

  const buttonTemp = btnTemp ? (
    <FormItem noStyle>
      <div style={{ marginTop: '10px', ...btnstyle }}>{btnTemp}</div>
    </FormItem>
  ) : null;

  useEffect(() => {
    props.getForm && props.getForm(form);
  }, []);

  return hasCard ? (
    <Card>
      <FormWrapper
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formOptions}
      >
        {FormItemGroup}
        {buttonTemp}
      </FormWrapper>
    </Card>
  ) : (
    <FormWrapper
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      {...formOptions}
    >
      {FormItemGroup}
      {buttonTemp}
    </FormWrapper>
  );
}

export default FormLayout;
