import styles from './user.module.scss';
import image from '../../../assets/images/user-pic.png';
import { useAppSelector } from '../../../redux';

export const User = () => {
  const { user } = useAppSelector(state => state.authState);
  return (
    <div className={styles.container}>
      <div className={styles.name}>{user?.email}</div>
      <div className={styles.avatar}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};
