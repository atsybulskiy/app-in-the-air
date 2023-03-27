import styles from './user.module.scss';
import image from '../../images/user-pic.png';

export const User = () => {
  return <div className={styles.container}>
    <div className={styles.name}>Eva</div>
    <div className={styles.avatar}>
      <img src={image} alt=""/>
    </div>
  </div>;
};
