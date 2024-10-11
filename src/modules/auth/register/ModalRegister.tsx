import { Button, Input, Modal } from 'antd';
import * as React from 'react';
import { toast } from 'react-toastify';
import { authService } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { setModalActive } from '../../../lib/reducer/generalSlice';
import DEFINE_MODAL_NAME from '../../../constants/modal-name';
import { RootState } from '../../../lib/store';
import { IGeneral } from '../../../types/general.types';

export default function ModalRegister() {
  const modalActive = useSelector(
    (state: RootState) => state.general.modalActive,
  );
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = React.useState(false);

  const onHandleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      toast.error('Password and confirm password is not match');
      return;
    }
    if (!(form.email && form.password && form.confirmPassword)) {
      toast.error('Please enter email and password');
      return;
    }
    try {
      setLoading(true);
      const rs = await authService.register({
        email: form.email,
        password: form.password,
      });
      toast.success(rs.message);
      handleLogin();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({
      email: '',
      password: '',
      confirmPassword: '',
    });
    dispatch(setModalActive(null));
  };

  const handleLogin = () => {
    dispatch(setModalActive(DEFINE_MODAL_NAME.LOGIN_MODAL as IGeneral));
  };

  return (
    <>
      <Modal
        className="!p-0 auth-modal"
        centered
        footer={null}
        open={modalActive === DEFINE_MODAL_NAME.REGISTER_MODAL}
        destroyOnClose
        onCancel={handleClose}
      >
        <div className="text-center space-y-3 mb-4">
          <img className="mx-auto w-40" src="/logo.png" alt="logo" />
          <h4 className="mb-5 mt-1 pb-1 text-xl font-semibold">Web cầu lông</h4>
        </div>

        <form>
          <p className="mb-4">Đăng kí tài khoản</p>
          <Input
            type="text"
            placeholder="Email"
            className="mb-4"
            value={form.email}
            onChange={(e) => {
              setForm((pre) => ({
                ...pre,
                email: e.target.value,
              }));
            }}
          ></Input>
          <Input.Password
            type="password"
            placeholder="Password"
            className="mb-4"
            value={form.password}
            onChange={(e) => {
              setForm((pre) => ({
                ...pre,
                password: e.target.value,
              }));
            }}
          ></Input.Password>
          <Input.Password
            type="password"
            placeholder="Confirm Password"
            className="mb-4"
            value={form.confirmPassword}
            onChange={(e) => {
              setForm((pre) => ({
                ...pre,
                confirmPassword: e.target.value,
              }));
            }}
          ></Input.Password>
          <div className="mb-5 pb-1 pt-1 text-center">
            <button
              disabled={loading}
              className="mb-3 bg-blue-700 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-0px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              type="button"
              onClick={() => onHandleSubmit()}
            >
              Đăng kí
            </button>
          </div>
          <div className="flex items-center justify-between pb-6">
            <p className="mb-0 mr-2">Chưa đã có tài khoản?</p>
            <button
              type="button"
              onClick={handleLogin}
              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
