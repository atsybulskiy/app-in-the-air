import { useAppSelector } from '../../../redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { paths } from '../../../shared/config/routes/routes';

export const PrivateRoute = () => {
  const { isAuth } = useAppSelector((state) => state.authState);
  let location = useLocation();

  if (isAuth) {
    return <Outlet />;
  }
  return <Navigate to={paths.login} state={{ from: location }} replace />;
};
