import { DeepPartial } from '@reduxjs/toolkit';
import { StoreProvider } from '../../../../app/providers/StoreProvider/ui/StoreProvider';
import { StateSchema } from '../../../../app/providers/StoreProvider/config/StateSchema';
import { StoryFn } from '@storybook/react';

export const StoreDecorator = (state: DeepPartial<StateSchema>) =>
  (StoryComponent: StoryFn) => (
    <StoreProvider initialState={state}>
      <StoryComponent />
    </StoreProvider>
  );