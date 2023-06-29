import type { Meta, StoryObj } from '@storybook/react';

import { Block } from './Block';

const meta = {
  title: 'UI/Block',
  component: Block,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'Title!' },
  },
} satisfies Meta<typeof Block>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlockComponent: Story = {
  args: {
    title: 'Title'
  },
};
