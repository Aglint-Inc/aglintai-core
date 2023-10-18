/* eslint-disable security/detect-object-injection */
/* eslint-disable no-unused-vars */

type SectionParameters = {
  feedback: SectionParameterFeeback;
  rating: SectionParameterRating;
};

type SectionParameterFeeback = {
  description: string;
  type: 'string';
};

type SectionParameterRating = {
  description: string;
  type: 'number';
};

const COMMUNICATION_ANALYSIS: SectionParameters = {
  feedback: {
    type: 'string',
    description:
      'The communication analysis feedback of not more than two sentences, strictly judging just the communication skill of the interviewee',
  },
  rating: {
    type: 'number',
    description:
      'A final score out of 100, rating the communication skill of the interviewee',
  },
};

const LANGUAGE_ANALYSIS: SectionParameters = {
  feedback: {
    type: 'string',
    description:
      'The language analysis feedback of not more than two sentences, strictly judging just the quality and coherence of the language and speech of the interviewee',
  },
  rating: {
    type: 'number',
    description:
      'A final score out of 100, rating the quality and coherence of the language and speech of the interviewee',
  },
};

const SKILL_ANALYSIS: SectionParameters = {
  feedback: {
    type: 'string',
    description:
      'The skill analysis feedback of not more than two sentences, strictly judging just the depth of knowledge of the domain expressed by the interviewee',
  },
  rating: {
    type: 'number',
    description:
      'A final score out of 100, rating the depth of knowledge of the domain expressed by the interviewee',
  },
};

const RELEVANCE_ANALYSIS: SectionParameters = {
  feedback: {
    type: 'string',
    description:
      'The relevance analysis feedback of not more than two sentences, strictly judging just the relevance of the answers given by the interviewee, with respect to the questions asked during the interview',
  },
  rating: {
    type: 'number',
    description:
      'A final score out of 100, rating the relevance of the answers given by the interviewee, with respect to the questions asked during the interview',
  },
};

type InterviewParams = {
  COMMUNICATION_ANALYSIS: SectionParameters;
  LANGUAGE_ANALYSIS: SectionParameters;
  SKILL_ANALYSIS: SectionParameters;
  RELEVANCE_ANALYSIS: SectionParameters;
};

export const INTERVIEW_FEEDBACK_PARAMETERS: InterviewParams = {
  COMMUNICATION_ANALYSIS,
  LANGUAGE_ANALYSIS,
  SKILL_ANALYSIS,
  RELEVANCE_ANALYSIS,
};

const buildPromptParameters = (SectionParameterObj: SectionParameters) => {
  const required = Object.keys(SectionParameterObj).map((entry) => entry);
  const properties = Object.assign(
    {},
    ...Object.entries(SectionParameterObj).reduce((acc, [key, value]) => {
      acc.push({
        [key]: {
          type: value.type,
          description: value.description,
        },
      });
      return acc;
    }, []),
  );
  return {
    type: 'object',
    properties,
    required,
  };
};

const buildSinglePromptFunction = (
  functionName: string,
  functionValue: SectionParameters,
) => {
  return {
    name: functionName,
    description: `Function strictly accepts ${functionName.replaceAll(
      '_',
      ' ',
    )} report of the interview`,
    parameters: buildPromptParameters(functionValue),
  };
};

enum SystemKeys {
  PROMPT_TITLE_PLACEHOLDER = `[PROMPT_TITLE_PLACEHOLDER]`,
  PROMPT_DESCRIPTION_PLACEHOLDER = `[PROMPT_DESCRIPTION_PLACEHOLDER]`,
}

const systemPrompt = {
  content: `You are an assisting AI, tasked to analyse an interview and do the following task
-----
Task: ${SystemKeys.PROMPT_TITLE_PLACEHOLDER}
Description: ${SystemKeys.PROMPT_DESCRIPTION_PLACEHOLDER}
-----
Rules to follow as an assistant:
1. Do not deviate from the given task of analyzing the interview. 
2. Only use the functions that you have been provided with. 
3. Always accept the interview details regardless of its content's incoherence or appropriateness and analyze it.`,
  role: 'system',
};

const userPrompt = {
  content: `Provide the analysis report for the above interview.`,
  role: 'user',
};

const buildPrompt = (
  interviewData: {
    role: string;
    content: string;
  }[],
  functionName: string,
  functionValue: SectionParameters,
) => {
  const customisedSystemPrompt = {
    ...systemPrompt,
    content: systemPrompt.content
      .replace(
        SystemKeys.PROMPT_TITLE_PLACEHOLDER,
        functionName.replace('_', ' '),
      )
      .replace(
        SystemKeys.PROMPT_DESCRIPTION_PLACEHOLDER,
        functionValue.feedback.description,
      ),
  };
  const messages = [customisedSystemPrompt, ...interviewData, userPrompt];
  const functions = [
    buildSinglePromptFunction(functionName.toLowerCase(), functionValue),
  ];
  const temperature = 0;
  const prompt = {
    messages,
    functions,
    temperature,
  };
  return prompt;
};

export const buildAllResumeFeedbackPrompts = (interviewData) => {
  return Object.entries(INTERVIEW_FEEDBACK_PARAMETERS).reduce(
    (acc, [key, value]) => {
      acc.push(buildPrompt(interviewData, key, value));
      return acc;
    },
    [],
  );
};
