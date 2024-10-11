import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/not-found';
import TheLayout from '../components/layout/TheLayout';
import ListBadmintonCourtPost from '../modules/user/list-badminton-court-post/ListBadmintonCourtPost';
import { DEFINE_ROUTERS_USER } from '../constants/routers-mapper';

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
    ],
  },
]);

export default router;
