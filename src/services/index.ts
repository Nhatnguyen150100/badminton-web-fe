import AuthService from './authService';
import BadmintonCourtService from './badmintonCourtService';
import CourtNumberService from './courtNumberService';
import ProfileService from './profileService';
import ScheduleService from './scheduleService';
import TimeBookingService from './timeBookingService';

export const authService = new AuthService();
export const profileService = new ProfileService();
export const badmintonCourtService = new BadmintonCourtService();
export const courtNumberService = new CourtNumberService();
export const timeBookingService = new TimeBookingService();
export const scheduleService = new ScheduleService();
