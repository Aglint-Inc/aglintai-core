import {envConfig} from '../../config';
import axios from 'axios';
import dayjs from 'dayjs';
export const geoCodeLocation = async (address: string) => {
  const locationData = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${envConfig.MAPS_API_KEY}`
  );
  const result = (locationData as any)?.data?.results[0];
  const geo = {
    lat: result.geometry.location.lat,
    lang: result.geometry.location.lng,
  };
  return geo;
};

export const getTimeZoneOfGeo = async ({
  lang,
  lat,
}: {
  lat: number;
  lang: number;
}) => {
  const apiKey = envConfig.MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lang}&timestamp=1332001200&key=${apiKey}`;
  const {data} = await axios.get(url);
  const timeZoneId = data.timeZoneId;
  return timeZoneId as string;
};

export const formatDate = (
  user_date: string,
  cand_tz: string,
  format = 'MMMM DD'
) => {
  const [day, month, year] = user_date.split('/');
  if (!day || !month || !year) {
    throw new Error('Date should in the format DD/MM/YYYY');
  }

  return dayjs(`${year}-${month}-${day}`).tz(cand_tz).format(format);
};
