import React from 'react';
import TheHeader from './TheHeader';

interface IProps {
  children: React.ReactNode;
}

export default function TheLayout({ children }: IProps) {
  return (
    <>
      <TheHeader />
      {children}
    </>
  );
}
