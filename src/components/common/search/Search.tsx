import { ChangeEvent } from 'react';
import styles from './search.module.scss';

interface IProps {
  value: string;
  onChange(value: string): void;
}

export const Search = ({ value, onChange }: IProps) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        type={'text'}
        className={styles.input}
        placeholder={'Search in orders'}
        onChange={changeHandler}
        value={value}
      />
    </div>
  );
};
