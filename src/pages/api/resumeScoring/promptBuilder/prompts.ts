import { JobJson, Prompt, ResumeJson } from '../types';
import { arrayToPrompt } from '../utils';

export const GET_SKILL_PROMPT = (
  jobJson: JobJson,
  candidateSkill: ResumeJson['skills'],
) => {
  return {
    system: `You are an assisting AI, tasked with analyzing a relevance of a skill and determine its rate of requirement for a job description. 
A skill is rated high if it is a required skill for the job. A skill is rated medium if it is not neccessarily mentioned in the required skills, but is a necessary sub-skill / good to have skill for the job. 
A skill is rated low if it has no relevance to the job's requirements.
-----
Job details:

Title: ${jobJson.title}

Skills required:
${arrayToPrompt('Skill', jobJson.skills)}

-----
Provide a response as the JSON format provided below:
-----
{
${candidateSkill
  .filter((s) => s && s.trim() !== '')
  .map((skill) => `${skill}: enum(low, medium, high)`)
  .join('\n')}
} 
-----`,
  };
};

export const GET_SCHOOL_PROMPT = (
  jobJson: JobJson,
  candidateSchool: ResumeJson['schools'][0],
) => {
  return {
    system: `You are an assisting AI, tasked with analyzing a candidate's education details and determine if it aligns to the needs of the job description. 
Provide a response as the JSON format provided:
-----
{
    rating: enum(low, medium, high), # These are the levels of alignment.
} 
-----`,
    user: `-----

Job details:

Title: ${jobJson.title}

Level: ${jobJson.level}

Description: ${jobJson.description}

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
  candidatePosition: ResumeJson['positions'][0],
) => {
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

Description: ${jobJson.description}

-----

Candidate work experience details:

Title: ${candidatePosition.title}

Level: ${candidatePosition.level}

Description: ${candidatePosition.summary}

-----
`,
  };
};

const getUnformatedPrompts = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
  tag: Prompt['tag'],
) => {
  switch (tag) {
    case 'positions':
      return resumeJson &&
        resumeJson.positions &&
        resumeJson.positions.length !== 0
        ? resumeJson.positions.map((p) => GET_POSITION_PROMPT(jobJson, p))
        : [];
    case 'schools':
      return resumeJson && resumeJson.schools && resumeJson.schools.length !== 0
        ? resumeJson.schools.map((s) => GET_SCHOOL_PROMPT(jobJson, s))
        : [];
    case 'skills':
      return resumeJson && resumeJson.skills && resumeJson.skills.length !== 0
        ? [GET_SKILL_PROMPT(jobJson, resumeJson.skills)]
        : [];
  }
};

export const getPrompts = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
  tags: Prompt['tag'][],
) => {
  return tags.reduce((acc, tag) => {
    const taggedPrompts = getUnformatedPrompts(jobJson, resumeJson, tag).map(
      (unformatedPrompt, index) => {
        const messages = Object.entries(unformatedPrompt).reduce(
          (acc, [role, content]) => {
            return [...acc, { role, content }];
          },
          [] as Prompt['messages'],
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
      },
    );
    acc.push(...taggedPrompts);
    return acc;
  }, [] as Prompt[]);
};
