import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/not-found';
import TheLayout from '../components/layout/TheLayout';
import ListBadmintonCourtPost from '../modules/user/list-badminton-court-post/ListBadmintonCourtPost';
import {
  DEFINE_ROUTERS_ADMIN,
  DEFINE_ROUTERS_USER,
} from '../constants/routers-mapper';
import Profile from '../modules/user/profile/Profile';
import BadmintonCourtRoot from '../modules/user/badminton-court-manager/BadmintonCourtRoot';
import ListBookingCourtPost from '../modules/user/list-booking-court-post/ListBookingCourtPost';
import CreateBadmintonCourt from '../modules/user/badminton-court-manager/CreateBadmintonCourt';
import BadmintonCourtDetail from '../modules/user/badminton-court-manager/detail/BadmintonCourtDetail';
import AdminPage from '../modules/admin/AdminPage';
import LoginAdminPage from '../modules/admin/LoginAdminPage';
import PostDetail from '../modules/user/list-badminton-court-post/postDetail/PostDetail';
import ListCourtBooking from '../modules/user/user-booking/ListCourtBooking';

const router = createBrowserRouter([
  {
    path: DEFINE_ROUTERS_USER.home,
    errorElement: <ErrorPage />,
    Component: TheLayout,
    children: [
      {
        index: true,
        path: '',
        element: <ListBadmintonCourtPost />,
      },
      {
        path: DEFINE_ROUTERS_USER.courtPostDetail,
        element: <PostDetail />,
      },
      {
        path: DEFINE_ROUTERS_USER.listPostBooking,
        element: <ListBookingCourtPost />,
      },
      {
        path: DEFINE_ROUTERS_USER.profile,
        element: <Profile />,
      },
      {
        path: DEFINE_ROUTERS_USER.userBooking,
        element: <ListCourtBooking />,
      },
      {
        path: DEFINE_ROUTERS_USER.badmintonCourtManager,
        element: <BadmintonCourtRoot />,
      },
      {
        path: DEFINE_ROUTERS_USER.newBadmintonCourt,
        element: <CreateBadmintonCourt />,
      },
      {
        path: DEFINE_ROUTERS_USER.badmintonCourtDetail,
        element: <BadmintonCourtDetail />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS_ADMIN.home,
    element: <AdminPage />,
  },
  {
    path: DEFINE_ROUTERS_ADMIN.loginAdmin,
    element: <LoginAdminPage />,
  },
]);

export default router;
