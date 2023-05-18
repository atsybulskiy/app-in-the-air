import { useAppSelector } from '../../../redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { paths } from '../../../routes/routes';

export const PrivateRoute = () => {
  const { isAuth } = useAppSelector((state) => state.userState);
  let location = useLocation();

  console.log('%c⇒ isAuth', 'color: #82AAFF', isAuth);

  if (isAuth) {
    console.log('isNotAuth');
    return <Outlet />;
  }
  return <Navigate to={paths.login} state={{ from: location }} replace />;
};
