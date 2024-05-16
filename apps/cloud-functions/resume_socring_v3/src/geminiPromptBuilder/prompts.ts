import { getRequirement } from "../generateFields";
import { GeminiPrompt, JobJson, ResumeJson } from "../types";

export const GET_SKILL_PROMPT = (
  jobJson: JobJson,
  candidateSkill: ResumeJson["skills"]
) => {
  return `You are an assisting AI, tasked with analyzing a relevance of a skill and determine its rate of requirement for a job description. 
A skill is rated high if it is a required skill for the job. A skill is rated medium if it is not neccessarily mentioned in the required skills, but is a necessary sub-skill / good to have skill for the job. 
A skill is rated low if it has no relevance to the job's requirements.
-----
Job details:

Title: ${jobJson.title}

${getRequirement(jobJson, "skills")}

-----

Return only the result in the specified format as JSON. Do not format response in any way.
Do not include things like '''json. Return a similar response to what a server would return

----

JSON response format:

{
${candidateSkill
  .filter((s) => s && s.trim() !== "")
  .map((skill) => `${skill}: enum(low, medium, high)`)
  .join("\n")}
} 
-----`;
};

export const GET_SCHOOL_PROMPT = (
  jobJson: JobJson,
  candidateSchool: ResumeJson["schools"][number]
) => {
  return `You are an assisting AI, tasked with analyzing a candidate's education details and determine if it aligns to the needs of the job description. 
-----

Job details:

Title: ${jobJson.title}

Level: ${jobJson.level}

${getRequirement(jobJson, "schools")}

-----

Candidate education details:

Degree: ${candidateSchool.degree}

Field of study: ${candidateSchool.field}

Institution: ${candidateSchool.institution}

GPA: ${candidateSchool.gpa}

-----

Return only the result in the specified format as JSON. Do not format response in any way.
Do not include things like '''json. Return a similar response to what a server would return

-----

JSON response format:

{
    rating: enum(low, medium, high) # These are the levels of similarity.
} 
-----
`;
};

export const GET_POSITION_PROMPT = (
  jobJson: JobJson,
  candidatePosition: ResumeJson["positions"][number]
) => {
  return `You are an assisting AI, tasked  with analyzing a candidate's prior work experience and determine if it is similar to the job description.
-----

Job details:

Title: ${jobJson.title}

Level: ${jobJson.level}

${getRequirement(jobJson, "positions")}

-----

Candidate work experience details:

Title: ${candidatePosition.title}

Level: ${candidatePosition.level}

Description: ${candidatePosition.summary}

-----

Return only the result in the specified format as JSON. Do not format response in any way.
Do not include things like '''json. Return a similar response to what a server would return

-----

JSON response format:

{
    rating: enum(low, medium, high) # These are the levels of similarity.
} 
-----
`;
};

export const getPrompts = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
  tags: GeminiPrompt["tag"][]
) => {
  return tags.reduce((acc, tag) => {
    const taggedPrompts = getUnformatedPrompts(jobJson, resumeJson, tag).map(
      (unformatedPrompt, index) => {
        const contents = [
          {
            role: "user",
            parts: [{ text: unformatedPrompt }],
          },
        ] as GeminiPrompt["contents"];
        const temperature = 0;
        const prevError = null;
        return {
          contents,
          temperature,
          prevError,
          index,
          tag,
        };
      }
    );
    acc.push(...taggedPrompts);
    return acc;
  }, [] as GeminiPrompt[]);
};

const getUnformatedPrompts = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
  tag: GeminiPrompt["tag"]
) => {
  switch (tag) {
    case "positions":
      return resumeJson &&
        jobJson &&
        resumeJson.positions &&
        jobJson.rolesResponsibilities &&
        resumeJson.positions.length !== 0 &&
        jobJson.rolesResponsibilities.length !== 0
        ? resumeJson.positions.map((p) => GET_POSITION_PROMPT(jobJson, p))
        : [];
    case "schools":
      return resumeJson &&
        jobJson &&
        resumeJson.schools &&
        jobJson.educations &&
        resumeJson.schools.length !== 0 &&
        jobJson.educations.length !== 0
        ? resumeJson.schools.map((s) => GET_SCHOOL_PROMPT(jobJson, s))
        : [];
    case "skills":
      return resumeJson &&
        jobJson &&
        resumeJson.skills &&
        jobJson.skills &&
        resumeJson.skills.length !== 0 &&
        jobJson.skills.length !== 0
        ? [GET_SKILL_PROMPT(jobJson, resumeJson.skills)]
        : [];
  }
};
