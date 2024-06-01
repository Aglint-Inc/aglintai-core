import axios from 'axios';

import toast from '@/src/utils/toast';

export const handleValidate = () => {
  return Object.entries(location).reduce(
    (acc, [key, curr]) => {
      let value = curr.value as any;
      let error = false;
      switch (curr.validation) {
        case 'string':
          {
            if (curr.required && value.trim().length === 0) {
              error = true;
            } else {
              value = value.trim();
            }
          }
          break;
        case 'boolean': {
          if (typeof value !== 'boolean') {
            error = true;
          }
        }
      }
      return {
        newLocation: {
          ...acc.newLocation,
          [key]: { ...acc.newLocation[key], value, error },
        },
        error: error && !acc.error ? true : acc.error,
      };
    },
    { newLocation: location, error: false },
  );
};

export function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const geoCodeLocation = async (address: string) => {
  if (address.length > 3) {
    const apiKey = 'AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI';
    let locationData = null;
    try {
      locationData = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
      );
    } catch (error) {
      toast.message('Please give proper location');
    }
    const result = (locationData as any)?.data?.results[0];

    let add = null;
    if (result?.address_components[4]) {
      add = {
        region: result?.address_components[3]?.long_name ?? '',
        country: result?.address_components[4]?.long_name ?? '',
      };
    } else if (result?.address_components[3]) {
      add = {
        region: result?.address_components[2]?.long_name ?? '',
        country: result?.address_components[3]?.long_name ?? '',
      };
    } else {
      add = {
        region: result?.address_components[1]?.long_name ?? '',
        country: result?.address_components[2]?.long_name ?? '',
      };
    }

    const geo = {
      lat: result?.geometry.location.lat ?? '',
      lang: result?.geometry.location.lng ?? '',
    };
    let timezone = null;
    try {
      timezone = await axios.get(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${geo.lat},${geo.lang}&timestamp=1331161200&key=${apiKey}`,
      );
    } catch (error) {
      toast.message('Failed to fetch timezone');
    }

    const timeZoneId = timezone && timezone?.data.timeZoneId;
    return { add, timeZoneId };
  }
};
