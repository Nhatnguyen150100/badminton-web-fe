const DEFINE_ROUTERS_ADMIN = {
  home: '/admin',
  loginAdmin: '/login-admin',
};

const DEFINE_ROUTERS_USER = {
  home: '/',
  courtPostDetail: '/court-post/:id',
  profile: '/profile',
  badmintonCourtManager: '/badminton-court-manager',
  badmintonGatherManager: '/badminton-gather-manager',
  badmintonGatherDetail: '/badminton-gather-manager/:id',
  badmintonCourtDetail: '/badminton-court-manager/:id',
  newBadmintonCourt: '/new-badminton-court',
  newBadmintonGather: '/new-badminton-gather',
  listGatherPost: '/gather-post',
  userBooking: '/my-booking',
};

export { DEFINE_ROUTERS_ADMIN, DEFINE_ROUTERS_USER };
