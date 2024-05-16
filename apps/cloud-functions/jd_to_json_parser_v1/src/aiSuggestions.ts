import { ChatCompletionCreateParams } from 'openai/resources/chat';
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: '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',
});

export const outputSchema: ChatCompletionCreateParams.Function[] = [
  {
    name: 'results',
    description: 'parsed jd Json',
    parameters: {
      type: 'object',
      properties: {
        requirements: {
          type: 'object',
          properties: {
            suggested_education: {
              type: 'object',
              properties: {
                requirements: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      degree: {
                        type: 'string',
                        description:
                          'education degree generally required for this job title.',
                      },
                    },
                    required: ['degree'],
                  },
                  description:
                    'List of suggested education generally required for this job title.',
                },
              },
              required: ['isRequired', 'requirements'],
              description:
                'Suggested education generally required for this job title by system.',
            },
            suggested_certification: {
              type: 'object',
              properties: {
                isRequired: {
                  type: 'boolean',
                  description:
                    'Indicates if suggested certifications are required.',
                },
                list: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'List of suggested certifications based on AI analysis.',
                },
              },
              required: ['isRequired', 'list'],
              description: 'Suggested certifications based on AI analysis.',
            },
            suggested_experience: {
              type: 'object',
              properties: {
                isExperienceRequired: {
                  type: 'boolean',
                  description:
                    'Indicates if experience required for given job.',
                },
                Experience: {
                  type: 'object',
                  properties: {
                    months: {
                      type: 'integer',
                      description:
                        'general Experience required in months based on given job.',
                    },
                  },
                  required: ['months'],
                  description: 'general Experience required given job.',
                },
              },
              required: [
                'isTotalExperienceRequired',
                'isRelevantExperienceRequired',
              ],
              description: 'Suggested experience based on AI analysis.',
            },
          },
          description: 'Requirements for the given job.',
        },
        suggested_skills: {
          type: 'object',
          properties: {
            technicalSkills: {
              type: 'array',
              items: {
                type: 'string',
              },
              description:
                'List of technical skills (only specific skills, Do not return generalized skill like programming or developer) generally required for this job title.',
            },
            otherSkills: {
              type: 'array',
              items: {
                type: 'string',
              },
              description:
                'List of good to have skills mentioned in the JD or suggest skill depending on job title.',
            },
          },
          required: ['keySkills', 'allSkills'],
          description:
            'suggest List of key skills required for the job by job title.',
        },
      },
      required: ['requirements', 'skills'],
    },
  },
];

export const JdToAISuggestion = async (jd: { [key: string]: any }) => {
  const chat_completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'you are a job description suggestion system. you use job title, and responsibility if described in jd and return the information described in schema. Please follow instruction described in schema description strictly.',
        // you also analyze the given jd ad return suggested_education, suggested_certification, suggested_experience, and suggested_skills.
      },
      {
        role: 'user',
        content: `job title:${jd.job_title}`,
      },
    ],
    model: 'gpt-3.5-turbo',
    functions: outputSchema,
    function_call: 'auto',
    temperature: 0,
  });
  // console.log(chat_completion.choices[0].message.function_call?.arguments);
  return {
    ...JSON.parse(
      chat_completion.choices[0].message.function_call?.arguments || '{}'
    ),
    tokenUsed: chat_completion.usage?.total_tokens,
  };
};
