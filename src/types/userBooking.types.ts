import { ICourtNumber } from './courtNumber.types';
import { IStatusLabel } from './status.types';
import { ITimeBooking } from './timeBooking.types';

export interface IUserBooking {
  id: string;
  userId: string;
  note: string;
  updatedAt: string;
  createdAt: string;
}

export interface IUserBookingDetail {
  status: IStatusLabel;
  schedule: IScheduleUserBooking;
}

interface IScheduleUserBooking {
  appointmentDate: string;
  constBooking: number;
  badmintonCourt: BadmintonCourt;
  courtNumber: ICourtNumber;
  timeBooking: ITimeBooking;
}

interface BadmintonCourt {
  id: string;
  name: string;
  address: string;
}
