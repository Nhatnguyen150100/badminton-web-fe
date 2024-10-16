const DEFINE_ROUTERS_ADMIN = {
  home: 'admin/',
};

const DEFINE_ROUTERS_USER = {
  home: '/',
  profile: '/profile',
  badmintonCourtManager: '/badminton-court-manager',
  badmintonCourtDetail: '/badminton-court-manager/:id',
  newBadmintonCourt: '/new-badminton-court',
  listPostBooking: '/booking',
};

export { DEFINE_ROUTERS_ADMIN, DEFINE_ROUTERS_USER };
