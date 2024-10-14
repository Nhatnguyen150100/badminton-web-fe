import * as React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../lib/store';
import { Navigate } from 'react-router-dom';
import { DEFINE_ROUTERS_USER } from '../../../constants/routers-mapper';
export default function BadmintonCourtRoot() {
  const user = useSelector((state: IRootState) => state.user);

  const isUpdateProfile = React.useMemo((): boolean => {
    return Boolean(user.fullName && user.phoneNumber);
  }, [user]);

  return (
    <>
      {isUpdateProfile ? (
        <div className="w-full space-y-5">
          <h1 className="text-center font-bold text-xl">
            Danh sách thông tin các sân cầu
          </h1>
        </div>
      ) : (
        <Navigate to={DEFINE_ROUTERS_USER.profile} replace={true} />
      )}
    </>
  );
}
