export interface IBadmintonGather {
  id: string;
  userId: string;
  nameClub: string;
  description: string;
  badmintonCourtName: string;
  district: string;
  ward: string;
  address: string;
  lang: number;
  lat: number;
  courtNumber: string;
  startTime: string;
  endTime: string;
  appointmentDate: string;
  totalMale: number;
  totalFemale: number;
  constPerMale: number;
  constPerFemale: number;
  priceNegotiable: number;
  imgCourt: string;
  level: string;
  createdAt: string;
  updatedAt: string;
}