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
