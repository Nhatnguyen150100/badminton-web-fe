import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/not-found';
import TheLayout from '../components/layout/TheLayout';
import ListBadmintonCourtPost from '../modules/user/list-badminton-court-post/ListBadmintonCourtPost';
import { DEFINE_ROUTERS_USER } from '../constants/routers-mapper';
import Profile from '../modules/user/profile/Profile';
import BadmintonCourtRoot from '../modules/user/badminton-court-manager/BadmintonCourtRoot';

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
        path: DEFINE_ROUTERS_USER.profile,
        element: <Profile />,
      },
      {
        path: DEFINE_ROUTERS_USER.badmintonCourtManager,
        element: <BadmintonCourtRoot />,
      }
    ],
  },
]);

export default router;
