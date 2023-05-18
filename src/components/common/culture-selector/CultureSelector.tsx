import styles from './culture-selector.module.scss';
import { useLogoutMutation } from '../../../redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../routes/routes';

export const CultureSelector = () => {
  const navigate = useNavigate();
  const [logout, { isLoading, isSuccess, error, isError }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(paths.login);
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          console.log('%c⇒ Error', 'color: #FFCB6B', el.message)
        );
      } else {
        console.log('%c⇒ Error', 'color: #FFCB6B', (error as any).data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const logoutHandler = async () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <div onClick={logoutHandler}>English</div>
      <div>USD - $</div>
    </div>
  );
};
