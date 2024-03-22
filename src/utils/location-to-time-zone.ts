import axios from 'axios';

export const geoCodeLocation = async (address: string) => {
  const locationData = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI`,
  );
  const result = (locationData as any)?.data?.results[0];
  const geo = {
    lat: result.geometry.location.lat,
    lang: result.geometry.location.lng,
  };
  return geo;
};

export const getTimeZoneOfGeo = async ({ lat, lang }) => {
  const apiKey = 'AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI';
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lang}&timestamp=1332001200&key=${apiKey}`;
  const { data } = await axios.get(url);
  const timeZoneId = data.timeZoneId;
  return timeZoneId as string;
};
