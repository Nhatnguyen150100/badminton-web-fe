import { IRole } from './user.types';

export interface ILogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  id: string;
  userName: null;
  fullName: null;
  gender: null;
  birthDay: null;
  phoneNumber: null;
  email: string;
  role: IRole;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}
