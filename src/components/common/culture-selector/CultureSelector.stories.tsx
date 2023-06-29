import type { Meta, StoryFn } from '@storybook/react';

import { CultureSelector } from './CultureSelector';
import { StoreDecorator } from '../../../shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'UI/CultureSelector',
  component: CultureSelector,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof CultureSelector>;

export default meta;

const Template: StoryFn<typeof CultureSelector> = () => (
  <CultureSelector />
);

export const CultureSelectorComponent = Template.bind({});
CultureSelectorComponent.args = {};
CultureSelectorComponent.decorators = [
  StoreDecorator({})
];