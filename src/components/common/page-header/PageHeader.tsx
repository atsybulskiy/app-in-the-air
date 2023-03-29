import styles from './page-header.module.scss';
import { hideEmail } from '../../../helpers';

interface IProps {
  message: string;
  email: string;
}

export const PageHeader = ({ message, email }: IProps) => {
  return (
    <>
      <div className={styles.message}>{message}</div>
      <div className={styles.title}>Order Details</div>
      <div className={styles.email}>
        Email sent on <span className={'text-black'}>{hideEmail(email)}</span>
      </div>
    </>
  );
};
