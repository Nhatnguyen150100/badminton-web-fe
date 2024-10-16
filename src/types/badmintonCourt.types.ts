import { IStatusLabel } from './status.types';

export interface IBadmintonCourt {
  id: string;
  name: string;
  district: string;
  ward: string;
  address: string;
  lang: number;
  lat: number;
  userId: string;
  imageCourt: string;
  description: string;
  status: IStatusLabel;
  createdAt: string;
  updatedAt: string;
}

export interface ILatLng {
  lat: number;
  lng: number;
}
