import 'server-only';

import axios from 'axios';

import type { GoogleLocationAPI, GoogleTimeZoneAPI } from './types';

const tep_apiKey = process.env.GOOGLE_API_KEY;

if (!tep_apiKey) {
  throw new Error('No Google API Key Found!');
}

const apiKey = tep_apiKey;
async function searchLocation(address: string) {
  const res = await axios.get<GoogleLocationAPI>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
  );
  if (res.status !== 200 && res.data.status == 'OK') {
    throw new Error('Geo Location API Failed!');
  }
  return res.data.results;
}

export async function searchExactLocation(
  address: string,
  options?: {
    timeZone?: boolean;
  },
) {
  const temp_res = await searchLocation(address);
  if (!temp_res.length) {
    throw new Error('no Match found!');
  }
  let timeZone: string = '';
  if (options?.timeZone) {
    timeZone = (
      await getTimeZoneOfGeo(
        {
          lang: temp_res[0].geometry.location.lng,
          lat: temp_res[0].geometry.location.lat,
        },
        apiKey,
      )
    ).timeZoneId;
  }
  return {
    ...temp_res[0],
    ...extractMetaFromGeoLocation(temp_res[0]),
    timeZone,
  };
}

function extractMetaFromGeoLocation(
  addressObject: GoogleLocationAPI['results'][number],
) {
  let city: string | null = null,
    state: string | null = null,
    country: string | null = null;

  for (const component of addressObject.address_components) {
    const types = component.types;
    if (types.includes('locality')) {
      city = component.long_name;
    } else if (types.includes('administrative_area_level_1')) {
      state = component.long_name;
    } else if (types.includes('country')) {
      country = component.long_name;
    }
  }
  return { city, state, country };
}

const getTimeZoneOfGeo = async (
  {
    lang,
    lat,
  }: {
    lat: number;
    lang: number;
  },
  key: string,
) => {
  const { data } = await axios.get<GoogleTimeZoneAPI>(
    `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lang}&timestamp=1332001200&key=${key}`,
  );
  return data;
};

export const geoCodeLocation = async (address: string) => {
  if (address.length > 3) {
    const locationData = await searchLocation(address);
    const result = locationData[0];

    let add: { region: string; country: string };
    if (result.address_components[4]) {
      add = {
        region: result.address_components[3].long_name ?? '',
        country: result.address_components[4].long_name ?? '',
      };
    } else if (result.address_components[3]) {
      add = {
        region: result.address_components[2].long_name ?? '',
        country: result.address_components[3].long_name ?? '',
      };
    } else {
      add = {
        region: result.address_components[1]?.long_name ?? '',
        country: result.address_components[2]?.long_name ?? '',
      };
    }

    const geo = {
      lat: result.geometry.location.lat ?? -1,
      lang: result.geometry.location.lng ?? -1,
    };
    const timezone = await getTimeZoneOfGeo(
      { lat: geo.lat, lang: geo.lang },
      apiKey,
    );

    const timeZoneId = timezone && timezone.timeZoneId;
    return { add, timeZoneId };
  }
};
