export const TimeFormat = (time: string) => {
  return time.match(/\d\d:\d\d/)
    ? time.match(/\d\d:\d\d/)![0]
    : "Unknow Pickup Time";
};
