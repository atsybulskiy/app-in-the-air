import { Outlet, useMatch } from 'react-router-dom';
import { Header } from '../header/Header';

import classNames from 'classnames';
import styles from './layout.module.scss';

import { paths } from '../../../routes/routes';

export const Layout = () => {
  const mainPath = useMatch(paths.main);

  return (
    <>
      <Header />
      <main className={classNames(styles.container, { main: mainPath })}>
        <Outlet />
      </main>
    </>
  );
};
