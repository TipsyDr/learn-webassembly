import type { ReactNode } from 'react';
import type { FormItemProps, ButtonProps, FormProps } from 'antd/lib';
import { IconTypes } from '@/types';

export interface itemChildOptions {
  suffix?: ReactNode;
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  id?: boolean;
  prefix?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  showCount?: boolean;
  allowClear?: boolean;
  label?: string;
  size?: string;
  type?: string;
  placeholder?: string | string[];
  defaultValue?: string;
  maxLength?: number;
  value?: unknown;
  options?: { label: string; value: unknown }[];
  format?: string;
  style?: {};
  showTime?: {};
  onChange?: (e: any) => void;
  onPressEnter?: (e: any) => void;
  api?: (e: any) => any;
}

export interface FormItemOptions extends FormItemProps {
  name: string;
  label?: string;
}

interface ItemProps {
  type: string;
  itemChildOptions?: itemChildOptions;
  formItemOptions?: FormItemOptions;
  element?: React.ReactElement;
}

export type FormItemConf = ItemProps;

export interface Confirm {
  useConfirm: boolean;
  title: string;
  onConfirm: () => void;
}

export interface BtnProps extends ButtonProps {
  text?: string;
  kind?: string;
  cicon?: IconTypes;
  confirm?: Confirm;
}

export interface FormOptions extends FormProps {
  btnoptions?: BtnProps[];
  btnstyle?: any;
}

export interface FormLayoutProps {
  hasCard?: boolean;
  formItems: ItemProps[];
  formOptions?: FormOptions;
  getForm?: (value: ReactNode) => void;
  onSubmit?: (val: any) => void;
}
