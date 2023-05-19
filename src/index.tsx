import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './styles/index.scss';
import { App } from './App';

import { persistor, store } from './redux';
import { Loader } from './components/common/loader/Loader';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
