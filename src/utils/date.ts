import moment from "moment";
import { config } from "./config";

export const formatDate = (dateFormat?: string, dateInput?: string) => {
  if (!dateFormat) {
    dateFormat = config.defaultDateFormat;
  }

  if (!dateInput) {
    dateInput = moment().toLocaleString();
  }

  return moment(dateInput).format(dateFormat);
};


export const getTimeDifference = (dateFrom: string, dateTo: string) => {
  const date1 = new Date(dateFrom);
  const date2 = new Date(dateTo);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  const seconds = diffTime / 1000; // in seconds

  if (seconds < 60) {
    return `${seconds} sec`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours} hr ${remainingMinutes} min ${remainingSeconds} sec`;
  }
}

/**
 * 
 * @param date date in the format 'MM-DD-YYYY' 
 * @param time a time in the format 'HH:mm
 */
export const getCombinedDateTime = (date: string, time: string) => {

  // Split the date and time components
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  // Create a new Date object by setting the components
  const combinedDateTime = new Date(year, month - 1, day, hours, minutes);

  return combinedDateTime;

}