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
import { getBoundingBox, getEmbedding } from "./utils";
import {
  OrderByType,
  conditionType,
  getApplicationDataType,
  getFilterApplicationType,
  updateApplicationsType,
} from "./types/data.types";

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

export const getFilterApplication = async ({
  db,
  job_id,
  location,
  score,
  skills,
  company,
  experience_in_months: experience,
  sort,
  offset = 0,
  limit = 10,
}: getFilterApplicationType & { db: ReturnType<typeof drizzle> }) => {
  console.log("getFilterApplication called with ", {
    location,
    score,
    skills,
    company,
    experience,
    sort,
    offset,
    limit,
  });

  // let idsFilter: string[] | null = null;
  // let locationsOptions: SQL | undefined = undefined;
  const filters: (SQL | undefined)[] = [eq(applicationsTable.job_id, job_id)];
  const sortingOrder: SQL[] = [];
  if (location) {
    const { type = "exact", exact, range } = location;
    if (type === "exact" && exact) {
      const { city, state, country } = exact;
      const options: any[] = [];
      const tempFunc = (exact.filter || "in") === "in" ? inArray : notInArray;
      if (city?.length) {
        options.push(tempFunc(candidatesTable.city, city));
      } else if (state?.length) {
        options.push(tempFunc(candidatesTable.state, state));
      } else if (country?.length) {
        options.push(tempFunc(candidatesTable.country, country));
      }
      if (options.length) {
        // locationsOptions = or(...options);
        filters.push(or(...options));
      }
    } else if (type === "range" && range) {
      const { distance, place } = range;
      const coOrds = await getBoundingBox(place, distance);
      filters.push(
        sql`${candidatesTable.geolocation} && ST_SetSRID(ST_MakeBox2D(ST_Point(${coOrds.longitude.min}, ${coOrds.latitude.min}), ST_Point(${coOrds.longitude.max}, ${coOrds.latitude.max})), 4326)`
      );
    }
  }

  if (company) {
    const { type, names } = company;
    if (type === "current") {
      console.log({ names });
      filters.push(inArray(candidatesTable.company, names));
    } else if (type === "previous") {
      filters.push(inArray(candidatesTable.company, names));
    }
  }

  if (experience) {
    const exp = experience.lower_value || experience.greater_value || 0;
    if (experience.condition === "between") {
      filters.push(
        and(
          gte(candidatesTable.experience_in_months, experience.lower_value),
          lte(candidatesTable.experience_in_months, experience.greater_value)
        )
      );
    } else if (experience.condition === "eq") {
      filters.push(
        and(
          gte(candidatesTable.experience_in_months, exp - exp / 10),
          lte(candidatesTable.experience_in_months, exp + exp / 10)
        )
      );
    } else {
      const tempFunc = getConditionFunction(experience.condition);

      filters.push(tempFunc(candidatesTable.experience_in_months, exp));
    }
  }

  let query = db
    .select({
      applications_id: applicationsTable.id,
    })
    .from(applicationsTable)
    .innerJoin(
      candidatesTable,
      eq(applicationsTable.candidate_id, candidatesTable.id)
    )
    .innerJoin(
      candidateFilesTable,
      eq(applicationsTable.candidate_file_id, candidateFilesTable.id)
    );

  if (score) {
    if (score.condition === "between") {
      filters.push(
        and(
          gte(applicationsTable.overall_score, score.lower_value),
          lte(applicationsTable.overall_score, score.greater_value)
        )
      );
    } else {
      const tempFunc = getConditionFunction(score.condition);
      filters.push(
        tempFunc(
          applicationsTable.overall_score,
          score.lower_value || score.greater_value || 0
        )
      );
    }
  }

  if (skills) {
    const skills_embedding = await getEmbedding(skills.join(", "));
    const tempData = `[ ${skills_embedding.join(",")} ]`;
    // const tempData = PgArray(skills_embedding);
    filters.push(
      sql`( 1 - (${candidateFilesTable.resume_embedding} <#> ${tempData})) > 0.8`
    );
  }

  // if (filters.length) {
  //   query.where(and(...filters));
  // }
  // const tempQuery = `resume_json->'skills' @> '[${skills?.map(
  //   (skill) => ` "${skill}"`
  // )}]'`;
  // console.log({
  //   tempQuery,
  // });
  // query.where(sql`${tempQuery}`);
  if (filters.length) {
    filters.push(
      notInArray(applicationsTable.status, ["disqualified", "qualified"])
    );
    query.where(and(...filters));
  }

  if (sort) {
    sort.map((item) => {
      const sortFunc = item.order === "desc" ? desc : asc;
      const colName = getColumn(item.orderBy);
      sortingOrder.push(sortFunc(colName));
    });
  }

  if (sortingOrder.length) {
    query.orderBy(...sortingOrder);
  } else {
    query.orderBy(desc(applicationsTable.overall_score));
  }
  console.log({ query: query.toSQL() });
  return query.offset(offset).limit(limit);
};

const getColumn = (columnName: OrderByType) => {
  switch (columnName) {
    case "created_at":
      return applicationsTable.created_at;
    case "applied_at":
      return applicationsTable.applied_at;
    case "overall_score":
      return applicationsTable.overall_score;
    default:
      return applicationsTable.created_at;
  }
};

const getConditionFunction = (condition: conditionType) => {
  switch (condition) {
    case "gt":
      return gt;
    case "lt":
      return lt;
    case "gte":
      return gte;
    case "lte":
      return lte;
    default:
      return eq;
  }
};

export const get_application_data = ({
  db,
  job_id,
  application_ids: ids,
}: getApplicationDataType & { db: ReturnType<typeof drizzle> }) => {
  console.log("get_application_data called with ", { ids });
  return db
    .select({
      applications_id: applicationsTable.id,
      // first_name: candidatesTable.first_name,
      // last_name: candidatesTable.last_name,
      resume_json: candidateFilesTable.resume_json,
      ats_score: applicationsTable.overall_score,
    })
    .from(applicationsTable)
    .innerJoin(
      candidatesTable,
      eq(applicationsTable.candidate_id, candidatesTable.id)
    )
    .innerJoin(
      candidateFilesTable,
      eq(applicationsTable.candidate_file_id, candidateFilesTable.id)
    )
    .where(
      and(
        eq(applicationsTable.job_id, job_id),
        inArray(applicationsTable.id, ids)
      )
    );
};

export const update_applications = async ({
  db,
  application_ids: ids,
  status,
}: updateApplicationsType & { db: ReturnType<typeof drizzle> }) => {
  console.log("update_applications called with ", {
    ids,
    status,
  });
  await db
    .update(applicationsTable)
    .set({ status })
    .where(inArray(applicationsTable.id, ids));
  return true;
};
