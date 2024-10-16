export type IStatusPost = {
  PENDING_APPROVAL: 'PENDING_APPROVAL';
  ACCEPTED: 'ACCEPTED';
  DENIED: 'DENIED';
  CANCELED: 'CANCELED';
};

export type IScheduleStatus = {
  AVAILABLE: "AVAILABLE",
  NOT_AVAILABLE: "NOT_AVAILABLE",
}

export type IScheduleStatusLabel = {
  [K in keyof IScheduleStatus]: string;
};

export type IStatusLabel = IStatusPost[keyof IStatusPost]
