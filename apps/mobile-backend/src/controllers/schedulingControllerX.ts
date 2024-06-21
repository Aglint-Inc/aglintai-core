import OpenAI from 'openai';
import { openai } from '../clients/openAiClient';
import { conversationType } from '../types/assistant.type';
import { db } from '../clients/drizzleClient';
import {
  applications_table,
  candidates_table,
  interview_meeting_table,
  interview_schedule_table,
  public_jobs_table,
} from '../types/tables.type';
import { SQL, and, eq, ilike, or } from 'drizzle-orm';
import { apiHandlerFactory } from '../utils/apiUtils';
import { Request, Response } from 'express';

type callOpenAIWithToolsType = {
  candidateName?: string;
  interviewName?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  jobTitle?: string;
  allDetailsConfirmedByUser?: boolean;
};

type metaData = {
  ids: any[];
  // ids: { sId: string; pId: string }[];
  rec_id: string;
  task: 'scheduler';
  subtask: 'selectCandidate' | 'collectCandidateDetails' | 'sendEmail';
};

interface schedulerType {
  request: {
    details: callOpenAIWithToolsType;
    messages: conversationType;
    metadata: metaData;
  };
  response: schedulerType['request'];
}

export const scheduler = async (req: Request, res: Response): Promise<void> => {
  const apiHandler = apiHandlerFactory<schedulerType>(req, res);
  apiHandler(
    async ({ body }) => {
      // eslint-disable-next-line prefer-const
      let { details, messages, metadata } = body;
      details = {
        candidateName: null,
        allDetailsConfirmedByUser: false,
        dateRange: {
          start: null,
          end: null,
        },
        interviewName: null,
        jobTitle: null,
        ...details,
      };
      metadata.subtask == 'collectCandidateDetails'
        ? await runFunctionCall({
            conversation: [
              {
                role: 'assistant',
                content: `You are provided with conversation scheduling assistant and scheduler. your task is to extract the information available from conversation and call updateCandidateDetails function. convert date to dd/mm/yy format. today is ${new Date().toLocaleDateString()}`,
              },
              ...messages,
            ],
            functions: [
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
                      allDetailsConfirmedByUser: {
                        type: 'boolean',
                      },
                    },
                    required: [],
                  },
                },
              },
            ],
          }).then(async (res) => {
            if (messages.length) {
              details = { ...details, ...(res.args as typeof details) };
              if (res.args) {
                details = { ...details, ...res.args };
              }
            }
            console.log({
              metadata,
              res,
              details,
              x: messages.length,
              y: details.candidateName,
              z: !metadata.ids?.length,
            });
            if (
              messages.length &&
              details.candidateName &&
              !metadata.ids?.length
            ) {
              metadata.ids = await functionCallManager({
                name: 'getCandidateDetails',
                args: {
                  rec_id: metadata.rec_id,
                  name: details.candidateName || null,
                  jobTitle: details.jobTitle || null,
                },
              });
              const message = await runConversation({
                conversation: [
                  {
                    role: 'assistant',
                    content: `You are voice call assistant for hr to scheduling interview. follow instructions:
                    - after getting candidate name you queried data an found ${metadata.ids.length} results.
                    - confirm with user which candidate to select.`,
                  },
                  ...[...messages].reverse().slice(0, 2).reverse(),
                  {
                    role: 'assistant',
                    content: `here are the results found for query..
                    result: ${JSON.stringify(
                      metadata.ids.map(
                        (item) =>
                          `${item.sid}. ${item.name} for  ${item.job_title} title.`,
                      ),
                      null,
                      2,
                    )}
                    confirm with user which candidate to select.`,
                  },
                ],
              });
              metadata.subtask = 'selectCandidate';
              messages.push(message);
            } else {
              const message = await runConversation({
                conversation: [
                  {
                    role: 'assistant',
                    content: `You are a voice assistant name 'aglint ai'. Follow these instructions:
                        Details user has already provided (do not share this with the user): '''${JSON.stringify(details, null, 2)}'''
                        task: Collect the candidate name, job title, date range, and interview name information from the user through a phone call.
                        -start by greeting (no introduction) user and sharing all details required for scheduling with candidate.
                        - If the candidate name is not provided, start by asking for the candidate's name.
                        - If the job title is not provided, ask for the job title next.
                        - If the date range is not provided, ask for the date range next.
                        - If the interview name is not provided, ask for the interview name next (suggest the name "${details.candidateName}'s interview").
                        - If all the information is present, confirm the details with the user and ask for confirmation to send the scheduling link.
                        NOTE: position is job title`,
                  },
                  ...messages,
                ],
              });
              messages.push(message);
            }
            return { details, ...(res.args as typeof details) };
          })
        : metadata.subtask == 'selectCandidate'
          ? await runFunctionCall({
              conversation: [
                {
                  role: 'assistant',
                  content: `You are provided with conversation between scheduling assistant and scheduler.
                     here are the candidates found:
                     ${metadata.ids.map((item) => `${item.sid}. ${item.name} for ${item.job_title} title.`)}
                     `,
                },
                ...[...messages].reverse().slice(0, 2).reverse(),
              ],
              functions: [
                {
                  type: 'function',
                  function: {
                    name: 'selectCandidate',
                    description:
                      'select candidate from multiple candidates using sid.',
                    parameters: {
                      type: 'object',
                      properties: {
                        sid: {
                          type: 'number',
                        },
                      },
                      required: ['sid'],
                    },
                  },
                },
              ],
            }).then(async (res) => {
              if (res.args) {
                const cand = metadata.ids.find(
                  (item) => item.sid == res.args.sid,
                );

                details = {
                  ...details,
                  candidateName: cand.name,
                  jobTitle: cand.job_title,
                };
                metadata.ids = [cand];
              }

              const message = await runConversation({
                conversation: [
                  {
                    role: 'system',
                    content: `You are a voice assistant name 'aglint ai'. Follow these instructions:
                    task: Collect the candidate name, job title, date range, and interview name information from the user through a phone call.
                    -start by greeting (no introduction) user and sharing all details required for scheduling with candidate.
                    - If the candidate name is not provided, start by asking for the candidate's name.
                    - If the job title is not provided, ask for the job title next.
                    - If the date range is not provided, ask for the date range next.
                    - If the interview name is not provided, ask for the interview name next (suggest the name "${details.candidateName}'s interview").
                    - If all the information is present, confirm the details with the user and ask for confirmation to send the scheduling link.
                    Details user has already provided (do not share this with the user): '''${JSON.stringify(details, null, 2)}'''
                        NOTE: position is job title`,
                  },
                  ...[
                    ...messages,
                    {
                      role: 'assistant',
                      content: `candidate name is '${details.candidateName}' and job title is '${details.jobTitle}'.`,
                    } as conversationType[0],
                  ],
                ],
              });
              console.log(JSON.stringify(details, null, 2));

              metadata.subtask = 'collectCandidateDetails';
              messages.push(message);
              return { details, ...(res.args as typeof details) };
            })
          : 'x';
      return {
        details,
        messages,
        metadata,
      };
    },
    ['details', 'messages'],
  );
};

export async function runFunctionCall({
  conversation,
  functions,
}: {
  conversation: conversationType;
  functions: OpenAI.Chat.Completions.ChatCompletionTool[];
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    messages: conversation,
    tools: functions,
    tool_choice: 'required',
  });
  return {
    res: response.choices[0].finish_reason,
    content: response.choices[0].message.content,
    toolName: response.choices[0].message.tool_calls?.[0]?.function.name,
    args: JSON.parse(
      response.choices[0].message.tool_calls?.[0]?.function.arguments || '{}',
    ),
  };
}

export async function runConversation({
  conversation,
}: {
  conversation: conversationType;
}): Promise<conversationType[number]> {
  const secondResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    messages: conversation,
    temperature: 0.5,
  });

  return {
    role: 'system',
    content: secondResponse.choices[0].message.content || '',
  };
}
async function getCandidates({
  rec_id,
  name,
  job_title,
}: {
  rec_id: string;
  name?: string | null;
  job_title?: string | null;
}) {
  if (!name && !job_title) {
    return [];
  }

  const query = db
    .select({
      interview_meeting_id: interview_meeting_table.id,
      job_title: public_jobs_table.job_title,
      first_name: candidates_table.first_name,
      last_name: candidates_table.last_name,
    })
    .from(interview_schedule_table)
    .innerJoin(
      interview_meeting_table,
      eq(
        interview_schedule_table.id,
        interview_meeting_table.interview_schedule_id,
      ),
    )
    .innerJoin(
      applications_table,
      eq(interview_schedule_table.application_id, applications_table.id),
    )
    .innerJoin(
      public_jobs_table,
      eq(public_jobs_table.id, applications_table.job_id),
    )
    .innerJoin(
      candidates_table,
      eq(candidates_table.id, applications_table.candidate_id),
    );
  const filters: (SQL | undefined)[] = [];
  if (rec_id) {
    filters.push(eq(interview_schedule_table.recruiter_id, rec_id));
  }
  if (name) {
    filters.push(
      or(
        ilike(candidates_table.first_name, `%${name}%`),
        ilike(candidates_table.last_name, `%${name}%`),
      ),
    );
  }
  if (job_title) {
    filters.push(eq(public_jobs_table.job_title, job_title));
  }
  if (filters.length) {
    filters.push(eq(interview_meeting_table.status, 'not_scheduled'));
    query.where(and(...filters));
  }
  return query;
}

async function functionCallManager(x: {
  name: 'getCandidateDetails';
  args: { rec_id: string; name: string | null; jobTitle: string | null };
}) {
  console.log(x);
  switch (x.name) {
    case 'getCandidateDetails': {
      return getCandidates({
        rec_id: x.args.rec_id,
        name: x.args.name,
        job_title: x.args.jobTitle,
      }).then((data) =>
        data.map((data, i) => ({
          sid: i + 1,
          interview_meeting_id: data.interview_meeting_id,
          job_title: data.job_title,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        })),
      );
    }
  }
}
