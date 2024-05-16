import { openai } from "./client/openai";

export const getResponse = ({
  result = null,
  error = null,
}: {
  result?: any | null;
  error?: string | null;
}) => {
  return { result, error };
};

export const getEmbedding = async (text: string) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
};

import axios from "axios";
import { findNearest, getDistance } from "geolib";

import { Country, State, City } from "country-state-city";
import { GeolibGeoJSONPoint } from "geolib/es/types";
import { drizzle } from "drizzle-orm/postgres-js";
import { jobAssistantChatTable } from "./types/tables.type";
import { eq } from "drizzle-orm";

import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error("Missing environment variables for postgres connection");
}

export { connectionString };

// const GEO_LOCATION_API_KEY = process.env.GEO_LOCATION_API_KEY;
// if (!GEO_LOCATION_API_KEY) {
//   throw new Error("GEO_LOCATION_API_KEY environment variables are required.");
// }
// export const getLocation = (address: string) => {
//   return axios
//     .get(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI`
//     )
//     .then(({ data }) => {
//       try {
//         const result = data?.results[0];
//         if (result?.geometry?.location.lng && result?.geometry?.location.lat)
//           console.log(result);
//         return {
//           lng: result?.geometry?.location.lng,
//           lat: result?.geometry?.location.lat,
//         };
//         throw new Error("No location data");
//       } catch (e) {
//         throw new Error(`Error in getLocation: ${String(e)}`);
//       }
//     })
//     .then(({ lng, lat }) => {
//       const allCities: { geo: GeolibGeoJSONPoint; name: string }[] = [];
//       City.getAllCities().map((city) => {
//         if (city.latitude && city.longitude) {
//           allCities.push({
//             geo: [city.latitude, city.longitude],
//             name: city.name,
//           });
//         }
//       });
//       const tempNearestCity = allCities
//         .map((city) => {
//           const x = 1,
//             y = 2;
//           return {
//             name: city.name,
//             distance: getDistance({ lat, lng }, city.geo) / 10000,
//           };
//         })
//         .sort((a, b) => a.distance - b.distance);

//       // const nearestCity = findNearest(
//       //   { latitude: lat, longitude: lng },
//       //   allCities
//       // );
//       return tempNearestCity;
//     });
// };

// auth : Punith G.
const deg2rad = (degrees: number) => {
  return (Math.PI * degrees) / 180;
};

const rad2deg = (radians: number) => {
  return (180 * radians) / Math.PI;
};

const WGS84EarthRadius = (lat: number) => {
  const WGS84_a = 6378137.0;
  const WGS84_b = 6356752.3;
  const An = WGS84_a * WGS84_a * Math.cos(lat);
  const Bn = WGS84_b * WGS84_b * Math.sin(lat);
  const Ad = WGS84_a * Math.cos(lat);
  const Bd = WGS84_b * Math.sin(lat);
  return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd));
};

const getLocation = async (address: string) => {
  const locationData = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${
      address?.trim() || ""
    }&key=AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI`
  );
  const result = (locationData as any)?.data?.results[0];
  if (result?.geometry?.location.lng && result?.geometry?.location.lat)
    return {
      lat: result?.geometry?.location?.lat,
      long: result?.geometry?.location?.lng,
    };
  return { lat: null, long: null };
};

export const getBoundingBox = async (
  name: string,
  range: number
  // active: boolean
) => {
  // if (!active)
  //   return {
  //     latitude: {
  //       min: null,
  //       max: null,
  //     },
  //     longitude: {
  //       min: null,
  //       max: null,
  //     },
  //   };
  const { lat: latitudeInDegrees, long: longitudeInDegrees } =
    await getLocation(name);
  const halfSideInKm: number = range;
  const lat = deg2rad(latitudeInDegrees);
  const lon = deg2rad(longitudeInDegrees);
  const halfSide = 1000 * halfSideInKm * 0.621371;
  const radius = WGS84EarthRadius(lat);
  const pRadius = radius * Math.cos(lat);
  const latMin = lat - halfSide / radius;
  const latMax = lat + halfSide / radius;
  const lonMin = lon - halfSide / pRadius;
  const lonMax = lon + halfSide / pRadius;
  return {
    latitude: {
      min: rad2deg(latMin),
      max: rad2deg(latMax),
    },
    longitude: {
      min: rad2deg(lonMin),
      max: rad2deg(lonMax),
    },
  };
};

export const getChatDetails = async ({
  db,
  chat_id,
}: {
  db: ReturnType<typeof drizzle>;
  chat_id: string;
}) => {
  return db
    .select({
      thread_id: jobAssistantChatTable.thread_id,
      job_id: jobAssistantChatTable.job_id,
    })
    .from(jobAssistantChatTable)
    .where(eq(jobAssistantChatTable.id, chat_id))
    .then((data) => data[0]);
};
