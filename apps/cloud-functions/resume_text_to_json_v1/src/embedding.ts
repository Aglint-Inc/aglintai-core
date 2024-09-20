import { openai } from "./client";
import LoggerV2 from "./logger";
import { schemaType } from "./schema";

function convertJsonToText(resume_json: schemaType, logger: LoggerV2) {
  logger.createLog({
    message: "processing json for embeddings",
    subProcess: "convertJsonToText",
  });
  let work =
    resume_json.positions &&
    Array.isArray(resume_json.positions) &&
    resume_json.positions
      .map((rec) => {
        return `${rec.title ? rec.title : ""} ${rec.org ? rec.org : ""} ${
          rec.description ? rec.description : ""
        } ${rec.location && rec.location != "N/A" ? rec.location : ""}`;
      })
      .join(" ");

  let education =
    resume_json.schools &&
    Array.isArray(resume_json.schools) &&
    resume_json.schools
      .map((rec) => {
        return `${rec.institution ? rec.institution : ""} ${
          rec.degree ? rec.degree : ""
        } ${rec.field ? rec.field : ""} ${rec.gpa ? rec.gpa : ""} `;
      })
      .join(" ");

  // let overview = resume_json.overview ? resume_json.overview : "";
  let skills = Array.isArray(resume_json.skills)
    ? resume_json.skills.join(" ")
    : "";

  let certificates = Array.isArray(resume_json.certificates)
    ? resume_json.certificates.join(" ")
    : "";

  let basics = "";
  if (resume_json.basics) {
    basics = `${
      resume_json.basics.currentCompany ? resume_json.basics.currentCompany : ""
    } ${
      resume_json.basics.currentJobTitle
        ? resume_json.basics.currentJobTitle
        : ""
    } ${resume_json.basics.location ? resume_json.basics.location : ""}`;
  }

  let languages = Array.isArray(resume_json.languages)
    ? resume_json.languages.join(" ")
    : "";

  let projects =
    resume_json.projects &&
    Array.isArray(resume_json.projects) &&
    resume_json.projects
      .map((rec) => {
        return `${rec.title ? rec.title : ""} ${
          rec.summary ? rec.summary : ""
        } `;
      })
      .join(" ");

  return {
    resume_embedding: [
      basics +
        work +
        education +
        // overview +
        skills +
        certificates +
        projects +
        languages,
    ].join(" "),
    education_embedding: education,
    experience_embedding: work,
    skills_embedding: skills,
  };
}

export const getEmbeddings = async (resume_json: any, logger: LoggerV2) => {
  logger.createLog({
    message: "calling openai for embeddings",
    subProcess: "getEmbeddings",
  });
  const resumeSections = convertJsonToText(resume_json as schemaType, logger);
  const embeddings: {
    [key: string]: number[] | null;
  } = {
    resume_embedding: null,
    education_embedding: null,
    experience_embedding: null,
    skills_embedding: null,
  };
  await Promise.all(
    // ["education", "experience", "skills", "resume"]
    Object.entries(resumeSections).map(async ([key, value]) => {
      if (value) {
        const response = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: value,
        });
        embeddings[String(key)] = response.data[0].embedding;
        return { section: key, embedding: response.data[0].embedding };
      } else {
        return { section: key, embedding: null };
      }
    })
  );
  return embeddings as unknown as {
    resume_embedding: number[] | null;
    education_embedding: number[] | null;
    experience_embedding: number[] | null;
    skills_embedding: number[] | null;
  };
};
