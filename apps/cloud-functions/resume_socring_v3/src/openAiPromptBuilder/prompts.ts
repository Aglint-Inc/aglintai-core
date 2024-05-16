import { getRequirement } from "../generateFields";
import { ScoringParam } from "../resultParser";
import { Badges, JobJson, OpenAIPrompt, ResumeJson, Section } from "../types";

export const GET_SKILL_PROMPT = (
  jobJson: JobJson,
  candidateSkill: ResumeJson["skills"]
) => {
  return {
    system: `You are an assisting AI, tasked with analyzing a relevance of a skill and determine its rate of requirement for a job description. 
A skill is rated high if it is a required skill for the job. A skill is rated medium if it is not neccessarily mentioned in the required skills, but is a necessary sub-skill / good to have skill for the job. 
A skill is rated low if it has no relevance to the job's requirements.
-----
Job details:

Title: ${jobJson.title}

${getRequirement(jobJson, "skills")}

-----
Provide a response as the JSON format provided below:
-----
{
${candidateSkill
  .filter((s) => s && s.trim() !== "")
  .map((skill) => `${skill}: enum(low, medium, high)`)
  .join("\n")}
} 
-----`,
  };
};

export const GET_REASONING_PROMPT = (
  tag: OpenAIPrompt["tag"],
  jobJson: JobJson,
  resumeJson: ResumeJson,
  resultObj: ScoringParam,
  badges: Badges
) => {
  const safeTag = getSafeTag(tag);
  const requirements = getRequirement(jobJson, tag);
  const candidateName = `${(resumeJson?.basics?.firstName ?? "").trim()} ${(
    resumeJson?.basics?.lastName ?? ""
  ).trim()}`;
  const safeCandidateName =
    candidateName.trim() !== "" ? candidateName.trim() : "the candidate";
  return [
    {
      role: "system",
      content: `You are an assisting AI, tasked to analyse a review chat and provide an overall reason justifying the ratings to ${safeCandidateName}'s ${safeTag} in relation to the job. 
Consider the ratings given by the assistant and provide a quick overview of whether ${safeCandidateName}'s ${safeTag} match the job requirements.
-----
Job details:

Title: ${jobJson.title}

Level: ${jobJson.level}

${requirements}
-----
Provide a response as the JSON format provided below:
{
  reasoning: string # The overall reason justifying the ratings, not more than 2 sentences.
}
-----
`,
    },
    ...getSafeChat(tag, resultObj, resumeJson, badges, safeCandidateName),
  ];
};

const getSafeChat = (
  tag: OpenAIPrompt["tag"],
  resultObj: ScoringParam,
  resumeJson: ResumeJson,
  badges: Badges,
  candidateName: string
) => {
  switch (tag) {
    case "positions":
      return getSafeExperienceChat(
        resultObj.positions,
        resumeJson.positions,
        badges,
        candidateName
      );
    case "schools":
      return getSafeEducationsChat(
        resultObj.schools,
        resumeJson.schools,
        candidateName
      );
    case "skills":
      return getSafeSkillsChat(resultObj.skills.list, candidateName);
  }
};

const getSafeExperienceChat = (
  positionsResult: ScoringParam["positions"],
  positions: ResumeJson["positions"],
  badges: Badges,
  candidateName: string
) => {
  const message1 = {
    role: "user",
    content: `Analyse ${candidateName}'s prior work experience and determine if it is similar to the job description. Provide a response by using the enum(low, medium, high), where these are the levels of similarity.`,
  };
  const message2 = {
    role: "assistant",
    content: `Certainly! Please provide the relevant details about ${candidateName}'s prior work experience and the job description. Include key responsibilities, skills, and any other relevant information. Once you provide the necessary details, I can help you analyze the similarity and provide a response using the specified enum levels (low, medium, high).`,
  };
  const messageN = {
    role: "user",
    content: `Provide the overall reasoning that must be a justification about the suitability of ${candidateName}'s ${getSafeTag(
      "positions"
    )} for the job.
RATINGS AND WORK EXPERIENCE DETAILS ARE HIGHLY CONFIDENTIAL! STRICTLY DO NOT MENTION ANY RATING OR WORK EXPERIENCE DETAILS WITHIN THE RESPONSE.`,
  };
  const message = positionsResult.reduce(
    (acc, curr) => {
      const candidatePosition = positions[curr.index];
      const userMessage = {
        role: "user",
        content: `Title: ${candidatePosition.title}
      
Level: ${candidatePosition.level}
      
Description: ${candidatePosition.summary}

${
  badges.leadership >= 70 &&
  ["Senior-level", "Executive-level"].includes(candidatePosition.level)
    ? `Assumption: ${candidateName} had role at the ${candidatePosition.level}, hence we make an assumption that this person can take up a leadership role.`
    : ""
}`,
      };
      const assistantMessage = {
        role: "assistant",
        content: curr.rating,
      };
      acc.push(userMessage, assistantMessage);
      return acc;
    },
    [message1, message2]
  );
  return [...message, messageN];
};

const getSafeEducationsChat = (
  educationsResult: ScoringParam["schools"],
  educations: ResumeJson["schools"],
  candidateName: string
) => {
  const message1 = {
    role: "user",
    content: `Analyse ${candidateName}'s prior education details and determine if it aligns to the needs of the job description. Provide a response by using the enum(low, medium, high), where these are the levels of alignment.`,
  };
  const message2 = {
    role: "assistant",
    content: `Certainly! Please provide the relevant details about ${candidateName}'s education details. I can help you analyze the alignment and provide a response using the specified enum levels (low, medium, high).`,
  };
  const messageN = {
    role: "user",
    content: `Provide the overall reasoning that must be a justification about the suitability of ${candidateName}'s ${getSafeTag(
      "schools"
    )} for the job.
RATINGS AND EDUCATION DETAILS ARE HIGHLY CONFIDENTIAL! STRICTLY DO NOT MENTION ANY RATING OR EDUCATION DETAILS WITHIN THE RESPONSE.`,
  };
  const messages = educationsResult.reduce(
    (acc, curr) => {
      const candidateSchool = educations[curr.index];
      const userMessage = {
        role: "user",
        content: `Degree: ${candidateSchool.degree}

Field of study: ${candidateSchool.field}

Institution: ${candidateSchool.institution}

GPA: ${candidateSchool.gpa}`,
      };
      const assistantMessage = {
        role: "assistant",
        content: curr.rating,
      };
      acc.push(userMessage, assistantMessage);
      return acc;
    },
    [message1, message2]
  );
  return [...messages, messageN];
};

const getSafeSkillsChat = (
  skillsResult: ScoringParam["skills"]["list"],
  candidateName: string
) => {
  const message1 = {
    role: "user",
    content: `Analyze the relevance of ${candidateName}'s skill and determine its rate of requirement for a job description. 
A skill is rated high if it is a required skill for the job. A skill is rated medium if it is not neccessarily mentioned in the required skills, but is a necessary sub-skill / good to have skill for the job. 
A skill is rated low if it has no relevance to the job's requirements.`,
  };
  const message2 = {
    role: "assistant",
    content: `Certainly! Please provide the relevant details about ${candidateName}'s skills, the job description, and any additional information that might help in understanding the context. Once you provide the necessary details, I can help you determine the relevance of the skill and assign the appropriate rating (high, medium, low) based on the criteria you've outlined.`,
  };
  const messageN = {
    role: "user",
    content: `Provide the overall reasoning that must be a justification about the suitability of ${candidateName}'s ${getSafeTag(
      "skills"
    )} for the job.
RATINGS AND SKILLS ARE HIGHLY CONFIDENTIAL! STRICTLY DO NOT MENTION ANY RATING OR SKILLS WITHIN THE RESPONSE.`,
  };
  const messages = Object.entries(skillsResult).reduce(
    (acc, [skill, rating]) => {
      const userMessage = {
        role: "user",
        content: skill,
      };
      const assistantMessage = {
        role: "assistant",
        content: rating,
      };
      acc.push(userMessage, assistantMessage);
      return acc;
    },
    [message1, message2]
  );
  return [...messages, messageN];
};

const getSafeTag = (tag: OpenAIPrompt["tag"]) => {
  switch (tag) {
    case "positions":
      return "work experiences";
    case "schools":
      return "education details";
    case "skills":
      return "skills";
  }
};

export const GET_SCHOOL_PROMPT = (
  jobJson: JobJson,
  candidateSchool: ResumeJson["schools"][number]
) => {
  return {
    system: `You are an assisting AI, tasked with analyzing a candidate's education details and determine if it aligns to the needs of the job description. 
Provide a response as the JSON format provided:
-----
{
    rating: enum(low, medium, high) # These are the levels of alignment.
} 
-----`,
    user: `-----

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
`,
  };
};

export const GET_POSITION_PROMPT = (
  jobJson: JobJson,
  candidatePosition: ResumeJson["positions"][number]
) => {
  //SUPPORT FOR SUMMARY/DESCRIPTION, WILL BE REMOVED AFTER A WHILE
  const description = candidatePosition?.description?.trim() ?? "";
  const summary = candidatePosition?.summary?.trim() ?? "";
  const payload =
    description.length > summary.length
      ? description.length === 0
        ? "No experience detail available"
        : description
      : summary;
  return {
    system: `You are an assisting AI, tasked  with analyzing a candidate's prior work experience and determine if it is similar to the job description. Provided a response as the JSON format provided:
-----
{
    rating: enum(low, medium, high) # These are the levels of similarity.
} 
-----
`,
    user: `-----

Job details:

Title: ${jobJson.title}

Level: ${jobJson.level}

${getRequirement(jobJson, "positions")}

-----

Candidate work experience details:

Title: ${candidatePosition.title}

Level: ${candidatePosition.level}

Description: ${payload}

-----
`,
  };
};

export const getPrompts = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
  tags: OpenAIPrompt["tag"][]
) => {
  return tags.reduce((acc, tag) => {
    const taggedPrompts = getUnformatedPrompts(jobJson, resumeJson, tag).map(
      (unformatedPrompt, index) => {
        const messages = Object.entries(unformatedPrompt).reduce(
          (acc, [role, content]) => {
            return [...acc, { role, content }];
          },
          [] as OpenAIPrompt["messages"]
        );
        const temperature = 0;
        const prevError = null;
        return {
          messages,
          temperature,
          prevError,
          index,
          tag,
        };
      }
    );
    acc.push(...taggedPrompts);
    return acc;
  }, [] as OpenAIPrompt[]);
};

const getUnformatedPrompts = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
  tag: OpenAIPrompt["tag"]
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

export const getReasoningPrompts = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
  badges: Badges,
  resultObj: ScoringParam,
  tags: OpenAIPrompt["tag"][]
) => {
  return tags.reduce((acc, tag, index) => {
    const tag2 = tagToJDKey(tag);
    if (
      resumeJson &&
      resumeJson[tag] &&
      resumeJson[tag].length !== 0 &&
      jobJson &&
      jobJson[tag2] &&
      jobJson[tag2].length !== 0
    ) {
      const messages = GET_REASONING_PROMPT(
        tag,
        jobJson,
        resumeJson,
        resultObj,
        badges
      );
      const temperature = 0;
      const prevError = null;
      acc.push({
        messages,
        temperature,
        prevError,
        index,
        tag,
      });
    }
    return acc;
  }, [] as OpenAIPrompt[]);
};

const tagToJDKey = (tag: OpenAIPrompt["tag"]): keyof JobJson => {
  switch (tag) {
    case "positions":
      return "rolesResponsibilities";
    case "schools":
      return "educations";
    case "skills":
      return "skills";
  }
};
