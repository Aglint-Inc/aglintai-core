import { JobJson, Prompt, ResumeJson } from '../types';
const getPositionSimilarityPrompt = (
  jobJson: JobJson,
  position: ResumeJson['positions'][0],
  index: number,
) => {
  const systemPrompt = {
    role: 'system',
    content: `You are an assisting AI, tasked  with analyzing a candidate's prior work experience and determine if it is similar to the job description. Provided a response as the JSON format provided:
-----
{
    rating: enum(low, medium, high) # These are the levels of similarity.
    reason: string # a reason justifiying your decision for the similarity that you have provided
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
Candidate work experience details:

Title: ${position.title}

Level: ${position.level}

Description: ${position.summary}
-----
`,
  };
  const messages = [systemPrompt, userPrompt];
  const temperature = 0;
  const prevError = null;
  const tag = 'positions';
  const prompt: Prompt = {
    messages,
    temperature,
    prevError,
    tag,
    index,
  };
  return prompt;
};
export const getPositionSimilarityPrompts = (
  jobJson: JobJson,
  resumeJson: ResumeJson,
): Prompt[] => {
  return resumeJson.positions.map((position, i) =>
    getPositionSimilarityPrompt(jobJson, position, i),
  );
};
