import moment from 'moment-timezone';

export const formatDateTime = (value) => {
  const formattedDT = moment
    .tz(value, 'America/Sao_Paulo')
    .format('DD-MM-YYYY HH:mm:ss');
  return formattedDT;
};
