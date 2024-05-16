import { ASSISTANT_ID, openai } from "./client/openai";

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
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
};

import axios from "axios";
import { findNearest, getDistance } from "geolib";

import { Country, State, City } from "country-state-city";
import { GeolibGeoJSONPoint } from "geolib/es/types";
import { drizzle } from "drizzle-orm/postgres-js";
import { jobAssistantChatTable, publicJobsTable } from "./types/tables.type";
import { eq } from "drizzle-orm";
import { convert } from "html-to-text";

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
  const pradius = radius * Math.cos(lat);
  const latMin = lat - halfSide / radius;
  const latMax = lat + halfSide / radius;
  const lonMin = lon - halfSide / pradius;
  const lonMax = lon + halfSide / pradius;
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

export const getJOBDetails = async ({
  db,
  job_id,
}: {
  db: ReturnType<typeof drizzle>;
  job_id: string;
}) => {
  return db
    .select({
      title: publicJobsTable.job_title,
      jd: publicJobsTable.description,
      skills: publicJobsTable.skills,
    })
    .from(publicJobsTable)
    .where(eq(publicJobsTable.id, job_id))
    .then((data) => ({
      title: data[0].title,
      description:
        data[0].jd &&
        convert(data[0].jd, {
          wordwrap: 130,
        }),
      skills: data[0].skills || undefined,
    }));
};

export const createThread = async (content: string) => {
  const thread_id = await openai.createThread({
    messages: [
      {
        role: "user",
        content: `here's the job description:\n\n${content}\n\nHelp user to do detailed analysis and compare the applicants for this job.\nnow user will ask queries.`,
      },
    ],
  });
  const run = await openai.runThread({
    thread_id,
    assistant_id: ASSISTANT_ID!,
  });
  console.log({ thread_id });
  await openai.getChatResponse({ run });
  return thread_id;
};
