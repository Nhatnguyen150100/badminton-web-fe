import AuthService from './authService';
import BadmintonCourtService from './badmintonCourtService';
import CourtNumberService from './courtNumberService';
import ProfileService from './profileService';

export const authService = new AuthService();
export const profileService = new ProfileService();
export const badmintonCourtService = new BadmintonCourtService();
export const courtNumberService = new CourtNumberService();
