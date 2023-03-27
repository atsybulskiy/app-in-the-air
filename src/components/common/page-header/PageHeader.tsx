import styles from './page-header.module.scss';

interface IProps {
  message: string;
}

export const PageHeader = ({message}: IProps) => {
  return <>
    <div className={styles.message}>{message}</div>
    <div className={styles.title}>Order Details</div>
    <div className={styles.email}>Email sent on <span className={'text-black'}>a***v@gmail.com</span></div>
  </>;
};
