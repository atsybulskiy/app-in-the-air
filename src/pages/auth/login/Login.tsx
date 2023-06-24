import styles from './login.module.scss';
import { useAppSelector, useLoginMutation } from '../../../redux';
import { useEffect, useState } from 'react';
import { Loader } from '../../../components/common/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { paths } from '../../../routes/routes';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('saniabest+1500@gmail.com');
  const [password, setPassword] = useState('');
  const { isAuth } = useAppSelector((state) => state.authState);

  const [loginUser, { isLoading, isSuccess, error, isError }] = useLoginMutation();

  const onSubmitHandler = async () => {
    loginUser({ email, password });
  };

  useEffect(() => {
    if (isSuccess && isAuth) {
      navigate(paths.main);
    }
    if (isError) {
      if (Array.isArray((error as any)?.data.error)) {
        (error as any).data.error.forEach((el: any) =>
          console.log('%c⇒ Error', 'color: #FF5370', el.message)
        );
      } else {
        console.log('%c⇒ Error', 'color: #FF5370', (error as any).data.message);
      }
    }
  }, [isLoading, isAuth, isSuccess, isError, navigate, error]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3>Login</h3>
        <input className="form-control" onChange={e => setEmail(e.target.value)} value={email} type={'text'}
               placeholder={'Email'} />
        <input className="form-control" onChange={e => setPassword(e.target.value)} value={password} type={'password'}
               placeholder={'Password'} />
        <button className="btn btn-primary" onClick={onSubmitHandler}>Login</button>
        <Link to={paths.registration}>Registration</Link>
      </div>
    </div>
  );
};
