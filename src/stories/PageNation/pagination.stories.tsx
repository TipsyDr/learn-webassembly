import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from './pagination';

export default {
  title: 'Example/Pagination',
  component: Pagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Pagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = args => (
  <Pagination {...args} />
);

export const Default = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  start: 0,
  limit: 10,
  total: 199,
  maxPagerCount: 5,
  showGotoPager: true,
};
