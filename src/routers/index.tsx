import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/not-found';
import DEFINE_ROUTERS from '../constants/routers-mapper';
import LoginPage from '../modules/auth/login';
import RegisterPage from '../modules/auth/register';
import TheLayout from '../components/layout/TheLayout';
import ListBadmintonCourtPost from '../modules/user/list-badminton-court-post/ListBadmintonCourtPost';

const router = createBrowserRouter([
  {
    path: DEFINE_ROUTERS.home,
    errorElement: <ErrorPage />,
    Component: TheLayout,
    children: [
      {
        index: true,
        path: '',
        element: <ListBadmintonCourtPost />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS.auth.login,
    element: <LoginPage />,
  },
  {
    path: DEFINE_ROUTERS.auth.register,
    element: <RegisterPage />,
  },
]);

export default router;
