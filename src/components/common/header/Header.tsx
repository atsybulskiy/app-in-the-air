import { Link } from 'react-router-dom';

import classNames from 'classnames';
import styles from './header.module.scss';
import logo from '../../../assets/images/logo.svg';

import { paths } from '../../../routes/routes';
import { CultureSelector } from '../culture-selector/CultureSelector';
import { User } from '../user/User';

export const Header = () => {
  return (
    <nav className={classNames(styles.container, 'navbar fixed-top navbar-light')}>
      <div className="container">
        <Link className="navbar-brand me-auto" to={paths.main}>
          <img src={logo} alt="" />
        </Link>
        <CultureSelector />
        <User />
      </div>
    </nav>
  );
};
