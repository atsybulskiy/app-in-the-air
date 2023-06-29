import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { StoryFn } from '@storybook/react';

const RouterDecorator = (Story: StoryFn) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path='/*' element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

export default RouterDecorator;