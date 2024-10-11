import TheHeader from './TheHeader';
import { Outlet } from 'react-router-dom';

export default function TheLayout() {
  return (
    <>
      <TheHeader />
      <div className="container py-10">
        <Outlet />
      </div>
    </>
  );
}
