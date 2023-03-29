import { ReactNode } from 'react';

interface IProps {
  title: string;
  className?: string;
  children?: ReactNode;
}

export const Block = ({ title, className, children }: IProps) => {
  return (
    <div className={className}>
      <div className="label">{title}</div>
      {children}
    </div>
  );
};
