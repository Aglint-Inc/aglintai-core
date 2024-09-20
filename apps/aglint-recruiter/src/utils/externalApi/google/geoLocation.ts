import axios from 'axios';

export async function searchLocation(address: string) {
  const apiKey = 'AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI';
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
  const apiKey = 'AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI';
  const temp_res = await searchLocation(address);
  if (!temp_res.length) {
    throw new Error('no Match found!');
  }
  let timeZone: string | null = null;
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

export function extractMetaFromGeoLocation(
  addressObject: GoogleLocationAPI['results'][number],
) {
  let city = null,
    state = null,
    country = null;

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

export const getTimeZoneOfGeo = async (
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

export type GoogleTimeZoneAPI = {
  dstOffset: number;
  rawOffset: number;
  status: string;
  timeZoneId: string;
  timeZoneName: string;
};

export type GoogleLocationAPI = {
  results: {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    partial_match: boolean;
    place_id: string;
    types: string[];
  }[];
  status: string;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type Geometry = {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Bounds;
};

type Bounds = {
  northeast: Location;
  southwest: Location;
};

type Location = {
  lat: number;
  lng: number;
};
