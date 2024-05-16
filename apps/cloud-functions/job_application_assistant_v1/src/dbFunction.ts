// import { Pool } from "pg";
import { drizzle } from "drizzle-orm/postgres-js";
// import { database_Options } from "./client/pgClient";

import {
  applicationsTable,
  candidateFilesTable,
  candidatesTable,
} from "./types/tables.type";
// import { connectionString } from "./client/pgClient";
import {
  SQL,
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  lt,
  lte,
  notInArray,
  or,
  sql,
  // sql,
} from "drizzle-orm";
import { getEmbedding } from "./utils";

import { candidates, publicJobs } from "./drizzle/schema";

// export const getData = async (options: getFilterApplicationType) => {
//   let client = null;
//   try {
//     client = postgres(connectionString, { prepare: false });
//     const db = drizzle(client);

//     if (options.ids) {
//       return await get_application_data({ db, ids: options.ids });
//     } else {
//       return (await filterResults({ db, ...options })).map((result) => ({
//         applications_id: result.applications_id,
//         name: `${result.first_name} ${result.last_name}`,
//         ats_score: result.overall_score,
//       }));
//     }
//   } catch (error: any) {
//     throw new Error(error.message);
//   } finally {
//     // Make sure to release the client back to the pool
//     // client?.end();
//   }
// };
export const createCandidate = async ({
  db,
  options,
}: {
  db: ReturnType<typeof drizzle>;
  options: {
    email: string;
    firstName: string;
    lastName: string;
    recruiterId: string;
  };
}) => {
  console.log("createCandidate called", { options });
  return db
    .insert(candidates)
    .values({ geolocation: null, ...options })
    .returning({ id: candidates.id });
};

export const get_jobs = async ({
  db,
  recruiterId,
  options: { title, keyWords, location, experience, offset = 0, limit = 10 },
}: {
  db: ReturnType<typeof drizzle>;
  recruiterId: string;
  options: {
    title?: string | null;
    keyWords: string[] | null;
    location?: {
      filter?: "in" | "not_in";
      city: string[];
      // state: string[];
      // country: string[];
    } | null;
    experience?: number;
    offset?: number;
    limit?: number;
  };
}) => {
  let query = db.select().from(publicJobs);
  const filters: (SQL | undefined)[] = [
    eq(publicJobs.recruiterId, recruiterId),
  ];
  if (title) {
    filters.push(eq(publicJobs.jobTitle, title));
  }

  if (keyWords) {
    const skills_embedding = await getEmbedding(
      [title, ...keyWords].join(", ")
    );
    const tempData = `[ ${skills_embedding.join(",")} ]`;
    // const tempData = PgArray(skills_embedding);
    filters.push(
      sql`( 1 - (${publicJobs.jobDetailsEmbedding} <#> ${tempData})) > 0.8`
    );
  }

  if (location) {
    const { filter, city } = location;
    const options: any[] = [];
    const tempFunc = (filter || "in") === "in" ? inArray : notInArray;
    if (city?.length) {
      options.push(tempFunc(candidatesTable.city, city));
    }
    if (options.length) {
      filters.push(or(...options));
    }
  }

  if (experience) {
    filters.push(
      and(
        gte(publicJobs.experienceInMonths, experience - experience / 10),
        lte(publicJobs.experienceInMonths, experience + experience / 10)
      )
    );
  }

  if (filters.length) {
    query.where(and(...filters));
  }
  return query.offset(offset).limit(limit);
};

export const getCandidateDetails = async ({
  db,
  candidateId,
}: {
  db: ReturnType<typeof drizzle>;
  candidateId: string;
}) => {
  console.log("createCandidate called", { candidateId });
  return db.select().from(candidates).where(eq(candidates.id, candidateId));
};