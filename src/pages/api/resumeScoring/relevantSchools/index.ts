import { JobJson, Prompt, ResumeJson } from '../types';
const getRelevantSchoolsPrompt = (
  jobJson: JobJson,
  school: ResumeJson['schools'][0],
  index: number,
) => {
  const systemPrompt = {
    role: 'system',
    content: `You are an assisting AI, tasked with analyzing a candidate's education details and determine if it aligns to the needs of the job description. Provide a response as the JSON format provided:
-----
{
  rating: enum(low, medium, high) # These are the levels of alignment.
  reason: string # a reason justifiying your decision for the alignment that you have provided
} 
-----
`,
  };
  const userPrompt = {
    role: 'user',
    content: `-----
Job details:

Title: ${jobJson.title}

Level: ${jobJson.level}

Description: ${jobJson.description}

-----
Candidate education details:

Degree: ${school.degree}

Field of study: ${school.field}

Institution: ${school.institution}

GPA: ${school.gpa}

-----
`,
  };
  const messages = [systemPrompt, userPrompt];
  const temperature = 0;
  const prevError = null;
  const tag = 'schools';
  const prompt: Prompt = {
    messages,
    temperature,
    prevError,
    tag,
    index,
  };
  return prompt;
};
export const getRelevantSchoolsPrompts = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
): Prompt[] => {
  return resumeJson.schools.map((school, i) =>
    getRelevantSchoolsPrompt(jobJson, school, i),
  );
};
