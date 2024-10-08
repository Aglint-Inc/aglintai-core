import { z, ZodSchema } from 'zod';

import { type DBProcedure, dbProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { jobDescriptionSchema } from '../../common/jobDescriptionSchema';
import { TRPCError } from '@trpc/server';
import { ChatCompletionMessageParam } from 'openai/resources';
import { DatabaseTable } from '@aglint/shared-types';
import OpenAI from 'openai';
import { nanoid } from 'nanoid';
import { zodResponseFormat } from 'openai/helpers/zod';
import { ParsedChatCompletion } from 'openai/resources/beta/chat/completions';
import { SafeObject } from '@/utils/safeObject';

const schema = z.object({
  job_id: z.string(),
});

const jsonItemSchema = z.array(
  z.object({
    field: z.string(),
    mustHave: z.boolean(),
  }),
);

const jdSchema = z.object({
  level: z.enum([
    'Fresher-level',
    'Associate-level',
    'Mid-level',
    'Senior-level',
    'Executive-level',
  ]),
  experience: jsonItemSchema,
  skills: jsonItemSchema,
  education: jsonItemSchema,
}) satisfies ZodSchema<DatabaseTable['public_jobs']['draft_jd_json']>;

const mutation = async (payload: DBProcedure<typeof schema>) => {
  const description = await getJobDescription(payload);
  try {
    await startScoreLoading(payload);
    console.log(description, '🔥');
    const draft_jd_json = await generateJd(description);
    console.log(draft_jd_json, '💦');
    const parameter_weights = getParameterWeights(draft_jd_json);
    console.log(parameter_weights, '💨');
    await finishScoreLoading({ ...payload, draft_jd_json, parameter_weights });
  } catch (e) {
    await stopScoreLoading(payload);
    throw e;
  }
};

export const generate = dbProcedure.input(schema).mutation(mutation);

const getJobDescription = async ({ input }: DBProcedure<typeof schema>) => {
  const db = createPublicClient();
  const job = (
    await db
      .from('public_jobs')
      .select('description')
      .eq('id', input.job_id)
      .single()
      .throwOnError()
  ).data;
  if (!job)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Job not found',
    });
  return jobDescriptionSchema.parse(job.description);
};

const startScoreLoading = async ({ input }: DBProcedure<typeof schema>) => {
  const db = createPublicClient();
  return await db
    .from('public_jobs')
    .update({ scoring_criteria_loading: true })
    .eq('id', input.job_id)
    .throwOnError();
};

const stopScoreLoading = async ({ input }: DBProcedure<typeof schema>) => {
  const db = createPublicClient();
  return await db
    .from('public_jobs')
    .update({ scoring_criteria_loading: false })
    .eq('id', input.job_id)
    .throwOnError();
};

const finishScoreLoading = async ({
  input,
  draft_jd_json,
  parameter_weights,
}: DBProcedure<typeof schema> &
  Pick<
    DatabaseTable['public_jobs'],
    'draft_jd_json' | 'parameter_weights'
  >) => {
  const db = createPublicClient();
  return await db
    .from('public_jobs')
    .update({
      draft_jd_json,
      parameter_weights,
      scoring_criteria_loading: false,
    })
    .eq('id', input.job_id)
    .throwOnError();
};

type Jd = DatabaseTable['public_jobs']['draft_jd_json'];

const generateJd = async (description: string): Promise<Jd> => {
  const [{ education }, { level }, { experience }, { skills }] =
    await Promise.all([
      generateJdContent('education', description),
      generateJdContent('level', description),
      generateJdContent('experience', description),
      generateJdContent('skills', description),
    ]);
  const response = {
    education,
    level,
    skills,
    experience,
  };
  return jdSchema.parse(response);
};

const generateJdContent = async <T extends keyof Jd>(
  key: T,
  description: string,
) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You are a helpful AI assistant tasked with extracting must-have and nice-to-have requirements from a job description.${getMeta(key)}.`,
    },
    {
      role: 'user',
      content: description,
    },
  ];
  const result = (await openai.beta.chat.completions.parse({
    messages,
    model: 'gpt-4o-2024-08-06',
    temperature: 0.4,
    response_format: zodResponseFormat(
      jdSchema.pick({ [key]: true } as any),
      key,
    ),
  })) as ParsedChatCompletion<Pick<Jd, T>> & {
    _request_id?: string | null;
  };
  const response = result.choices[0].message.parsed;
  if (response) return response;
  else {
    if (key === 'level')
      return {
        level: 'Fresher-level',
      } as Pick<Jd, 'level'> as unknown as Pick<Jd, T>;
    return {
      [key]: [],
    } as unknown as Pick<Jd, T>;
  }
};

const getMeta = <T extends keyof Jd>(key: T) => {
  switch (key) {
    case 'education':
      return 'Ignore skill or experience related requirements mentioned in the job description. Strictly consider only the education requirements that are mentioned in the job description.';
    case 'experience':
      return 'Ignore skill or education related requirements mentioned in the job description. Strictly consider only the experience requirements that are mentioned in the job description.';
    case 'skills':
      return 'Ignore experience or education related requirements mentioned in the job description. Strictly consider only the skill requirements that are mentioned in the job description.';
    default:
      return '';
  }
};

type Weights = DatabaseTable['public_jobs']['parameter_weights'];

const getParameterWeights = ({ level: _level, ...jd }: Jd): Weights => {
  const weights: Weights = {
    education: jd.education.length,
    experience: jd.experience.length,
    skills: jd.skills.length,
  };
  const count = SafeObject.values(weights).filter((value) =>
    Boolean(value),
  ).length;
  const defaultWeights: Weights = {
    education: 0,
    experience: 0,
    skills: 0,
  };
  const result = SafeObject.entries(weights)
    .filter(([, value]) => Boolean(value))
    .reduce(
      (acc, [key], i) => {
        const c = Math.trunc(100 / count);
        if (i === count - 1) {
          acc.obj[key] = acc.total;
          acc.total = 0;
        } else {
          acc.obj[key] = c;
          acc.total -= c;
        }
        return acc;
      },
      {
        total: 100,
        obj: weights,
      },
    ).obj;

  return {
    ...defaultWeights,
    ...result,
  };
};
