import { Input } from 'antd';
import * as React from 'react';
import { toast } from 'react-toastify';
import { authService } from '../../../services';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../lib/reducer/userSlice';
import cookiesStore from '../../../plugins/cookiesStore';
import { useNavigate } from 'react-router-dom';
import DEFINE_ROUTERS from '../../../constants/routers-mapper';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onHandleSubmit = async () => {
    if (!(form.email && form.password)) {
      toast.error('Please enter email and password');
      return;
    }
    try {
      setLoading(true);
      const rs = await authService.login({
        email: form.email,
        password: form.password,
      });
      cookiesStore.set('access_token', rs.data.accessToken);
      dispatch(setUser(rs.data));
      console.log(cookiesStore.get('access_token'));
      navigate(DEFINE_ROUTERS.home);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate(DEFINE_ROUTERS.auth.register);
  };

  return (
    <>
      <div className="flex h-full w-full justify-center items-center">
        <section className="h-full">
          <div className="container h-full p-10">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
              <div className="w-full">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    <div className="px-4 md:px-0 lg:w-full">
                      <div className="md:mx-6 md:p-12">
                        {/* <!--Logo--> */}
                        <div className="text-center">
                          <img
                            className="mx-auto w-32"
                            src="https://flowbite.com/docs/images/logo.svg"
                            alt="logo"
                          />
                          <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                            Web đặt sân và giao lưu cầu lông
                          </h4>
                        </div>

                        <form>
                          <p className="mb-4">Đăng nhập tài khoản</p>
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
                          <Input
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
                          ></Input>
                          <div className="mb-12 pb-1 pt-1 text-center">
                            <button
                              disabled={loading}
                              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-0px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              style={{
                                background:
                                  'linear-gradient(to right, #c2ebff, #00aaff, #59c8ff, #c2ebff)',
                              }}
                              onClick={() => onHandleSubmit()}
                            >
                              Đăng nhập
                            </button>
                          </div>
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">Chưa có tài khoản?</p>
                            <button
                              type="button"
                              onClick={handleRegister}
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                              Đăng kí
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
