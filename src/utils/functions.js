export const diff_dates = (dt2, dt1) => {
  return Math.round((dt1 - dt2) / (1000 * 60 * 60 * 24));
};
