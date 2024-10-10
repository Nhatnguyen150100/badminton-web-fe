const _prefixSegment = '/auth';

const authRouter = {
  login: `${_prefixSegment}/login`,
  register: `${_prefixSegment}/register`,
};

const DEFINE_ROUTERS = {
  home: '/',
  admin: '/admin',
  kanjiManager: '/admin/kanji-manager',
  dashboard: '/admin/dashboard',
  accountManager: '/admin/account-manager',
  loginAdmin: '/admin/auth/login',
  examManager: '/admin/exam-manager',
  newExam: '/admin/exam-manager/new-exam',
  examDetail: '/admin/exam-manager/:examId',
  auth: authRouter,
  user: '/dashboard',
  profile: '/dashboard/profile',
  listKanjis: '/dashboard/list-kanjis',
  kanjiDetail: '/dashboard/list-kanjis/:kanjiId',
  tests: '/dashboard/tests',
  testsDetail: '/dashboard/tests/:testsId',
  levelN5: '/dashboard/level-N5',
  levelN4: '/dashboard/level-N4',
  levelN3: '/dashboard/level-N3',
  levelN2: '/dashboard/level-N2',
  levelN1: '/dashboard/level-N1',
  process: '/dashboard/process',
};

export const DEFINE_LIST_ROUTES_USER = {
  kanji: {
    name: 'Kanji',
    route: DEFINE_ROUTERS.listKanjis,
    subRoutes: [],
  },
  level: {
    name: 'Level',
    route: '#',
    subRoutes: [
      {
        name: 'N5',
        route: DEFINE_ROUTERS.levelN5,
      },
      {
        name: 'N4',
        route: DEFINE_ROUTERS.levelN4,
      },
      {
        name: 'N3',
        route: DEFINE_ROUTERS.levelN3,
      },
      {
        name: 'N2',
        route: DEFINE_ROUTERS.levelN2,
      },
      {
        name: 'N1',
        route: DEFINE_ROUTERS.levelN1,
      },
    ],
  },
  test: {
    name: 'Test',
    route: DEFINE_ROUTERS.tests,
    subRoutes: [],
  },
  process: {
    name: 'Process',
    route: DEFINE_ROUTERS.process,
    subRoutes: [],
  },
};

export default DEFINE_ROUTERS;
