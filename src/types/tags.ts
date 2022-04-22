export interface TagGroup {
  title: string;
  value: string;
  key?: string;
  children: TagGroup[];
}

export interface TagType {
  title: string;
  value: string;
  key?: string;
}

export enum TagColor {
  magenta,
  gold,
  red,
  volcano,
  orange,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  '#f50',
  '#2db7f5',
  '#87d068',
  '#108ee9',
}
