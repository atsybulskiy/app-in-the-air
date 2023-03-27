import React from 'react';
import {Route, Routes, useMatch} from 'react-router-dom';

import {Header} from './components/header/Header';
import {MainRoutes, paths} from './routes/routes';

const App = () => {
  const mainPath = useMatch(paths.main);

  return (
    <>
      <Header/>
      <main className={`${mainPath ? 'main' : ''} pt-3`}>
        <Routes>
          {MainRoutes.map(route => <Route path={route.path} element={route.content()} key={route.path}/>)}
        </Routes>
      </main>
    </>
  );
};

export default App;
