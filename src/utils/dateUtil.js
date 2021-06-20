import moment from 'moment';

export const formatDate = (date, format = 'YYYY/MM/DD') => {
  if (!date) return;
  return moment(date).format(format);
};

export const formatTime = (date) => {
  if (!date) return;
  return moment(date).format('hh:mm a');
};

export const relativeTime = (date) => {
  if (!date) return;
  return moment(date).startOf('minute').fromNow();
};
