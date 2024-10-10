import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/App';
import ErrorPage from '../pages/not-found';
import DEFINE_ROUTERS from '../constants/routers-mapper';
import AdminPage from '../modules/admin';
import LoginPage from '../modules/auth/login';
import RegisterPage from '../modules/auth/register';
import UserPage from '../modules/user';
import ListKanjis from '../modules/user/list-kanjis';
import TestsPage from '../modules/user/tests';
import ProcessPage from '../modules/user/process';
import LevelN5Page from '../modules/user/level/level-n5';
import LevelN4Page from '../modules/user/level/level-n4';
import LevelN3Page from '../modules/user/level/level-n3';
import LevelN2Page from '../modules/user/level/level-n2';
import LevelN1Page from '../modules/user/level/level-n1';
import KanjiDetail from '../modules/user/list-kanjis/kanji-detail';
import LoginAdminPage from '../modules/admin/auth';
import KanjiManager from '../modules/admin/kanji-manager/KanjiManager';
import Profile from '../modules/user/profile/Profile';
import AccountManager from '../modules/admin/account-manager/AccountManager';
import DashBoard from '../modules/admin/dashboard/DashBoard';
import ExamManager from '../modules/admin/exam-manager/ExamManager';
import ExamDetail from '../modules/admin/exam-manager/ExamDetail';
import NewExam from '../modules/admin/exam-manager/NewExam';
import TestDetail from '../modules/user/tests/testDetail/TestDetail';

const router = createBrowserRouter([
  {
    path: DEFINE_ROUTERS.home,
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: DEFINE_ROUTERS.auth.login,
    element: <LoginPage />,
  },
  {
    path: DEFINE_ROUTERS.auth.register,
    element: <RegisterPage />,
  },
  {
    path: DEFINE_ROUTERS.admin,
    element: <AdminPage />,
    children: [
      {
        path: DEFINE_ROUTERS.dashboard,
        element: <DashBoard />,
      },
      {
        path: DEFINE_ROUTERS.examManager,
        element: <ExamManager />,
      },
      {
        path: DEFINE_ROUTERS.newExam,
        element: <NewExam />,
      },
      {
        path: DEFINE_ROUTERS.examDetail,
        element: <ExamDetail />,
      },
      {
        path: DEFINE_ROUTERS.kanjiManager,
        element: <KanjiManager />,
      },
      {
        path: DEFINE_ROUTERS.accountManager,
        element: <AccountManager />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS.loginAdmin,
    element: <LoginAdminPage />,
  },
  {
    path: DEFINE_ROUTERS.user,
    element: <UserPage />,
    children: [
      {
        path: `${DEFINE_ROUTERS.user}/list-kanjis`,
        element: <ListKanjis />,
      },
      {
        path: DEFINE_ROUTERS.profile,
        element: <Profile />,
      },
      {
        path: DEFINE_ROUTERS.kanjiDetail,
        element: <KanjiDetail />,
      },
      {
        path: DEFINE_ROUTERS.tests,
        element: <TestsPage />,
      },
      {
        path: DEFINE_ROUTERS.testsDetail,
        element: <TestDetail />,
      },
      {
        path: DEFINE_ROUTERS.process,
        element: <ProcessPage />,
      },
      {
        path: DEFINE_ROUTERS.levelN5,
        element: <LevelN5Page />,
      },
      {
        path: DEFINE_ROUTERS.levelN4,
        element: <LevelN4Page />,
      },
      {
        path: DEFINE_ROUTERS.levelN3,
        element: <LevelN3Page />,
      },
      {
        path: DEFINE_ROUTERS.levelN2,
        element: <LevelN2Page />,
      },
      {
        path: DEFINE_ROUTERS.levelN1,
        element: <LevelN1Page />,
      },
    ],
  },
]);

export default router;
