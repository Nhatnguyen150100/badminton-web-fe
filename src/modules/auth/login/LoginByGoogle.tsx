import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUser } from '../../../lib/reducer/userSlice';
import { IRole } from '../../../types/user.types';
import { DEFINE_ROUTERS_USER } from '../../../constants/routers-mapper';
import { setModalActive } from '../../../lib/reducer/generalSlice';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// {
//   "id": "d511aeab-f46d-248c-a29d-55ad1855651a",
//   "fullName": null,
//   "gender": null,
//   "avatar": null,
//   "phoneNumber": null,
//   "email": "admin@gmail.com",
//   "role": "ADMIN",
//   "createdAt": "2024-10-17T01:58:49.000Z",
//   "updatedAt": "2024-10-17T01:58:49.000Z",
//   "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1MTFhZWFiLWY0NmQtMjQ4Yy1hMjlkLTU1YWQxODU1NjUxYSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMxOTE5MTg5LCJleHAiOjE3MzIwMDU1ODl9.QuTw5SzKKqWkvPgN-TUlL9iDvNXmKQRhl9iddhKfq1OnXNul7xQJZejFceQSMfzllWOtUACCzgz_F1QD-MlY9fWqjii3hjPvLWqLLwAUH6_YnjW59XRP8jMOscJ0EswoK4iFifLJPw8aZmT7XxemXc8mZiKbpchkkLD1APbgDFRg0xkzZhFS0gQFK2e39hiTSeMzurvXRDKHwAb6FqkH6hTBrdtWM-VRehDtHu00warGJZ2N0nu-Ta6hHZIR4SXmFn1QSgM6j5DURq1O-oOjKkgD_P_glnfRjYQ2tminTtNHNrSpGCs4ktcb_GxH6_MKUXvNQJ_S71moLT9_qahU7g"
// }

export default function LoginByGoogle() {
  const query = useQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSuccess = query.get('status');
  console.log("🚀 ~ LoginByGoogle ~ isSuccess:", isSuccess)
  const id = query.get('id');
  const fullName = query.get('fullName');
  const gender = query.get('gender');
  const avatar = query.get('avatar');
  const phoneNumber = query.get('phoneNumber');
  const email = query.get('email');
  const role = query.get('role');
  const createdAt = query.get('createdAt');
  const updatedAt = query.get('updatedAt');
  const accessToken = query.get('accessToken');

  useEffect(() => {
    if (isSuccess === 'success' && id && email) {
      dispatch(
        setUser({
          id,
          fullName,
          gender,
          avatar,
          phoneNumber: Number(phoneNumber),
          email,
          role: (role as IRole) ?? 'USER',
          createdAt: createdAt ?? '',
          updatedAt: updatedAt ?? '',
        }),
      );
      dispatch(setModalActive(null));
      navigate(DEFINE_ROUTERS_USER.home);
    }
  }, [
    isSuccess,
    id,
    fullName,
    gender,
    avatar,
    phoneNumber,
    email,
    role,
    createdAt,
    updatedAt,
    accessToken,
  ]);

  return (
    <div>
      {isSuccess === 'success' && id && email ? (
        <div>Login successful!</div>
      ) : (
        <div>Failed to login.</div>
      )}
    </div>
  );
}
