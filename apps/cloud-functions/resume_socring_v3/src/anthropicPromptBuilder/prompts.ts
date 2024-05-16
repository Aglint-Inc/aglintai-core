import Anthropic from "@anthropic-ai/sdk";

import { JobJson, ResumeJson, Section } from "../types";
import { getRequirements } from "../generateFields";

export const getAnthropicPrompt = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
  tags: Section[]
) => {
  const prompt = `You are an assisting AI, tasked  with analyzing a candidate's prior work experience, skills and education and determine if it is similar to the job description.
   
${Anthropic.HUMAN_PROMPT}
-----
Resume :

${getResumeTags(resumeJson, tags)}
-----
Job details: 
Title: ${jobJson.title},
Level: ${jobJson.level},

${getRequirements(jobJson, tags)}
-----

Response format 
{
  "schools": {
    "[school_index]": 'low'|'medium'|'high' 
  },
  "positions": {
    "[position_index]": 'low'|'medium'|'high' 
  },
  "skills": {
    "[skill_name]": 'low'|'medium'|'high' 
  }
}

Do not provide explanations or reasonings, strictly analyse and only return a response with the above JSON format.
${Anthropic.AI_PROMPT}
`;

  const temperature = 0;
  const prevError = null;
  return {
    prompt,
    temperature,
    prevError,
  };
};

const getResumeTags = (resumeJson: ResumeJson, tags: Section[]) => {
  return tags
    .map((tag) => {
      return `${tag.charAt(0).toUpperCase() + tag.slice(1, tag.length)} details:
${getSubTags(resumeJson, tag)}`;
    })
    .join("\n---\n");
};
const getSubTags = (resumeJson: ResumeJson, tag: Section) => {
  switch (tag) {
    case "positions": {
      const len =
        resumeJson &&
        resumeJson.positions &&
        Array.isArray(resumeJson.positions)
          ? resumeJson.positions.length
          : 0;
      return len !== 0
        ? resumeJson.positions
            .map((pos, i) => {
              return `Position ${i}:
Title: ${pos.title},
Level: ${pos.level},
Description: ${pos.summary}`;
            })
            .join("\n\n")
        : `${null} \n`;
    }
    case "schools": {
      const len =
        resumeJson && resumeJson.schools && Array.isArray(resumeJson.schools)
          ? resumeJson.schools.length
          : 0;
      return len !== 0
        ? resumeJson.schools
            .map((school, i) => {
              return `School ${i}:
Degree: ${school.degree},
Field of study: ${school.field},
Institution: ${school.institution},
Gpa: ${school.gpa}`;
            })
            .join("\n\n")
        : `${null} \n`;
    }
    case "skills": {
      const len =
        resumeJson && resumeJson.skills && Array.isArray(resumeJson.skills)
          ? resumeJson.skills.length
          : 0;
      return len !== 0
        ? resumeJson.skills
            .map((skill, i) => {
              return `Skill ${i}: ${skill}`;
            })
            .join("\n")
        : `${null} \n`;
    }
  }
};
