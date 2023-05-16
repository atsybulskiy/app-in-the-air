import styles from './loader.module.scss';
import classNames from 'classnames';

interface IProps {
  className?: string;
}

export const Loader = ({ className }: IProps) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.loader} />
    </div>
  );
};
