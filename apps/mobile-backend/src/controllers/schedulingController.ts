import { Request, Response } from 'express';
import { apiHandlerFactory } from '../utils/apiUtils';
import OpenAI from 'openai';
import { openai } from '../clients/openAiClient';
import { schedulingFlowChart } from './xyz';

type callOpenAIWithToolsType = {
  candidateName?: string;
  interviewName?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  jobTitle?: string;
};

interface schedulerType {
  request: {
    details: callOpenAIWithToolsType;
    messages: [
      {
        role: 'system';
        content: string;
      },
      {
        role: 'user';
        content: string;
      },
    ];
    new_chat: boolean;
  };
  response: {
    messages: string | null;
    details: callOpenAIWithToolsType;
  };
}

export const scheduler = async (req: Request, res: Response): Promise<void> => {
  const apiHandler = apiHandlerFactory<schedulerType>(req, res);
  console.log(
    await getCandidates({
      rec_id: 'd353b3a0-3e19-45d0-8623-4bd35577f548',
      name: 'kunal',
    }),
  );
  apiHandler(
    async (reqDetails) => {
      const { details, messages, new_chat = false } = reqDetails.body;
      const result = await callOpenAIWithTools(details, messages, new_chat);
      return result;
    },
    ['details', 'messages'],
  );
};

// async function callOpenAIWithTools() {
//   const context: OpenAI.Chat.ChatCompletionMessageParam[] = [
//     {
//       role: 'system',
//       content:
//         'You are a helpful assistant that help scheduler send a scheduling mail with date range, reschedule, and cancel interviews for candidates.',
//     },
//     {
//       role: 'assistant',
//       content:
//         'for scheduling an interview you needs candidate name, date range(start date and end date) and job title. here the details already provided: ```{\n "candidateName": "Vivek",\n "dateRange": {\n "start": "2022-07-25",\n "end": "2022-07-29"\n}\n, "jobTitle":null"}```. Ask the the remaining details one by one similar to a person will ask on phone call. please get all the required details',
//     },
//     {
//       role: 'user',
//       content:
//         'Alright, next week works.',
//     },
//     {
//       role: 'user',
//       content: 'yes',
//     },
//   ];

//   // configure chat tools (first openAI call)
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo-0613',
//     messages: context,
//     tools: [
//       {
//         type: 'function',
//         function: {
//           name: 'updateCandidateDetails',
//           description: 'will cache the candidate and interview details.',
//           parameters: {
//             type: 'object',
//             properties: {
//               candidateName: {
//                 type: 'string',
//               },
//               interviewName: {
//                 type: 'string',
//               },
//               dateRange: {
//                 type: 'object',
//                 properties: {
//                   start: {
//                     type: 'string',
//                   },
//                   end: {
//                     type: 'string',
//                   },
//                 },
//                 required: ['start', 'end'],
//               },
//               jobTitle: {
//                 type: 'string',
//               },
//             },
//             required: [],
//           },
//         },
//       },
//     ],
//     tool_choice: 'required',
//   });
//   // decide if tool call is required
//   const willInvokeFunction = response.choices[0].finish_reason == 'tool_calls';
//   const toolCall = response.choices[0].message.tool_calls![0];
//   console.log(response.choices[0]);
//   console.log(response.choices[0].message.tool_calls);

//   if (willInvokeFunction) {
//     const toolName = toolCall.function.name;
//     const rawArgument = toolCall.function.arguments;
//     console.log(toolName, rawArgument);
//   }

//   const secondResponse = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo-0613',
//     messages: context,
//   });
//   console.log(secondResponse.choices[0].message.content);
// }

// callOpenAIWithTools();

async function callOpenAIWithTools(
  details: callOpenAIWithToolsType,
  messages: [
    {
      role: 'system';
      content: string;
    },
    {
      role: 'user';
      content: string;
    },
  ],
  new_chat = false,
) {
  console.log(details, new_chat);
  if (!new_chat) {
    const context: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `you are provided with conversation scheduling assistant and scheduler. your task is to extract the information available from conversation and call updateCandidateDetails function. convert date to dd/mm/yy format. today is ${new Date().toLocaleDateString()}`,
      },
      ...messages,
    ];

    // configure chat tools (first openAI call)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: context,
      tools: [
        {
          type: 'function',
          function: {
            name: 'updateCandidateDetails',
            description: 'save the candidate and interview details.',
            parameters: {
              type: 'object',
              properties: {
                candidateName: {
                  type: 'string',
                },
                interviewName: {
                  type: 'string',
                },
                dateRange: {
                  type: 'object',
                  properties: {
                    start: {
                      type: 'string',
                    },
                    end: {
                      type: 'string',
                    },
                  },
                  required: ['start', 'end'],
                },
                jobTitle: {
                  type: 'string',
                },
              },
              required: [],
            },
          },
        },
        // {
        //   type: 'function',
        //   function: {
        //     name: 'scheduleInterview',
        //     description: 'schedule interview',
        //     parameters: {
        //       type: 'object',
        //       properties: {},
        //       required: [],
        //     },
        //   },
        // },
      ],
      tool_choice: 'required',
    });
    // decide if tool call is required
    // const willInvokeFunction =
    //   response.choices[0].finish_reason == 'tool_calls';
    const toolCall = response.choices[0].message.tool_calls?.[0];

    // const toolName = toolCall?.function.name;
    const rawArgument = JSON.parse(toolCall?.function.arguments || '{}');
    details = { ...details, ...rawArgument };
  }
  const prompt = await callSwitcher(details, new_chat);
  // const secondResponse = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo-0613',
  //   messages: [
  //     {
  //       role: 'system',
  //       content:
  //         'You are a helpful assistant that help scheduler schedule interviews for candidates with date range, reschedule, and cancel.',
  //     },
  //     {
  //       role: 'assistant',
  //       content: prompt,
  //     },
  //   ],
  // });
  // console.log(secondResponse.choices[0].message.content);

  return {
    messages: prompt,
    details,
  };

  async function callSwitcher(
    details: callOpenAIWithToolsType,
    new_chat: boolean,
  ) {
    if (!new_chat) {
      if (!details.jobTitle) {
        return schedulingFlowChart.requiredData.job_title();
      } else if (!details.candidateName) {
        return schedulingFlowChart.requiredData.candidate_name();
      } else if (!details.dateRange) {
        return schedulingFlowChart.requiredData.date_range();
      } else if (!details.interviewName) {
        return schedulingFlowChart.requiredData.interview_name(`xyz interview`);
      } else {
        return await callEnder({
          conversation: [
            {
              role: 'system',
              content:
                'you are a scheduling assistant help user(hr) to schedule an interview.',
            },
            {
              role: 'assistant',
              content: `user have give all the details required ${JSON.stringify(details)} confirm all details with user. ask permission to go ahead and schedule the interview.`,
            },
          ],
        });
      }
    } else {
      return await callEnder({
        conversation: [
          {
            role: 'system',
            content:
              'you are a scheduling assistant help user(hr) to schedule an interview.',
          },
          {
            role: 'assistant',
            content:
              'for scheduling an interview you needs candidate name, date range(start date and end date) and job title. Ask the the remaining details one by one similar to a person will ask on phone call. please get all the required details',
          },
        ],
      });
    }
  }
}

async function callEnder({
  conversation,
}: {
  conversation: OpenAI.Chat.ChatCompletionMessageParam[];
}) {
  const secondResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    messages: conversation,
  });
  return secondResponse.choices[0].message.content;
}
