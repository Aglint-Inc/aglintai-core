import type { DatabaseTable, DatabaseTableUpdate } from '@aglint/shared-types';
import { TRPCError } from '@trpc/server';
import { nanoid } from 'nanoid';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import type { ChatCompletionMessageParam } from 'openai/resources';
import type { ParsedChatCompletion } from 'openai/resources/beta/chat/completions';
import { z, type ZodSchema } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { SafeObject } from '@/utils/safeObject';

import { jobDescriptionSchema } from '../common/jobDescriptionSchema';

const schema = z.object({
  id: z.string(),
  type: z.enum(['generate', 'regenerate']),
});

type Jd = DatabaseTable['public_jobs']['draft_jd_json'];

type JdItem = Jd[keyof Omit<Jd, 'level' | 'title'>];

const jsonItemSchema = z.array(
  z.object({
    id: z.string(),
    field: z.string(),
    isMustHave: z.boolean(),
  }),
) satisfies ZodSchema<JdItem>;

const levelSchema = z.enum([
  'Fresher-level',
  'Associate-level',
  'Mid-level',
  'Senior-level',
  'Executive-level',
]) satisfies ZodSchema<Jd['level']>;

const jdSchema = z.object({
  title: z.string(),
  level: levelSchema,
  rolesResponsibilities: jsonItemSchema,
  skills: jsonItemSchema,
  educations: jsonItemSchema,
}) satisfies ZodSchema<Jd>;

type TrimmedJdItem = {
  field: string;
  mustHave: boolean;
}[];
type TrimmedJd = {
  level: Jd['level'];
  roles: TrimmedJdItem;
  responsibilities: TrimmedJdItem;
  education: TrimmedJdItem;
  skills: TrimmedJdItem;
};

const trimmedJdItemSchema = z.array(
  z.object({
    field: z.string(),
    mustHave: z.boolean(),
  }),
) satisfies ZodSchema<TrimmedJdItem>;

const trimmedJdSchema = z.object({
  level: levelSchema,
  roles: trimmedJdItemSchema,
  responsibilities: trimmedJdItemSchema,
  skills: trimmedJdItemSchema,
  education: trimmedJdItemSchema,
}) satisfies ZodSchema<TrimmedJd>;

export const generateJd = async (payload: PrivateProcedure<typeof schema>) => {
  const { description, job_title } = await getJobDetails(payload);
  try {
    await startScoreLoading(payload);
    const draft_jd_json = await getJd(description, job_title);
    const parameter_weights = getParameterWeights(draft_jd_json);
    await finishScoreLoading({ ...payload, draft_jd_json, parameter_weights });
  } catch (e) {
    await stopScoreLoading(payload);
    throw e;
  }
};

export const jd = privateProcedure.input(schema).mutation(generateJd);

const getJobDetails = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = createPublicClient();
  const job = (
    await db
      .from('public_jobs')
      .select('job_title, description')
      .eq('id', input.id)
      .single()
      .throwOnError()
  ).data;
  if (!job)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Job not found',
    });
  return {
    description: jobDescriptionSchema.parse(job.description),
    job_title: job.job_title,
  };
};

const startScoreLoading = async ({
  input,
}: PrivateProcedure<typeof schema>) => {
  const db = createPublicClient();
  return await db
    .from('public_jobs')
    .update({ scoring_criteria_loading: true })
    .eq('id', input.id)
    .throwOnError();
};

const stopScoreLoading = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = createPublicClient();
  return await db
    .from('public_jobs')
    .update({ scoring_criteria_loading: false })
    .eq('id', input.id)
    .throwOnError();
};

const finishScoreLoading = async ({
  input,
  draft_jd_json,
  parameter_weights,
}: PrivateProcedure<typeof schema> &
  Pick<
    DatabaseTable['public_jobs'],
    'draft_jd_json' | 'parameter_weights'
  >) => {
  const db = createPublicClient();
  const payload: DatabaseTableUpdate['public_jobs'] = {
    draft_jd_json,
    parameter_weights,
    scoring_criteria_loading: false,
  };
  if (input.type === 'generate') payload['jd_json'] = draft_jd_json;
  return await db
    .from('public_jobs')
    .update(payload)
    .eq('id', input.id)
    .throwOnError();
};

const getJd = async (description: string, title: string): Promise<Jd> => {
  const [
    { education },
    { level },
    { roles },
    { responsibilities },
    { skills },
  ] = await Promise.all([
    generateJdContent('education', description),
    generateJdContent('level', description),
    generateJdContent('roles', description),
    generateJdContent('responsibilities', description),
    generateJdContent('skills', description),
  ]);
  const response: Jd = {
    title,
    level,
    educations: jdItemMapper(education),
    skills: jdItemMapper(skills),
    rolesResponsibilities: jdItemMapper([...roles, ...responsibilities]),
  };
  return jdSchema.parse(response);
};

const generateJdContent = async <T extends keyof TrimmedJd>(
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
      trimmedJdSchema.pick({ [key]: true } as any),
      key,
    ),
  })) as ParsedChatCompletion<Pick<TrimmedJd, T>> & {
    _request_id?: string | null;
  };
  const response = result.choices[0].message.parsed;
  if (response) return response;
  else {
    if (key === 'level')
      return {
        level: 'Fresher-level',
      } as Pick<TrimmedJd, 'level'> as unknown as Pick<TrimmedJd, T>;
    return {
      [key]: [],
    } as unknown as Pick<TrimmedJd, T>;
  }
};

const getMeta = <T extends keyof TrimmedJd>(key: T) => {
  switch (key) {
    case 'education':
      return 'Consider only the education requirements that are mentioned in the job description';
    case 'roles':
      return 'Consider only the prior roles and durations related to those roles, as the requirement.';
    case 'responsibilities':
      return 'Consider only the responsibilities that are mentioned in the job description.';
    case 'skills':
      return 'Consider only the skill requirements, tools, languages, etc., that are mentioned in the job description. These must be key terms / tags, which must be one to two words only.';
    default:
      return '';
  }
};

type Weights = DatabaseTable['public_jobs']['parameter_weights'];

const getParameterWeights = ({ level: _level, ...jd }: Jd): Weights => {
  const weights: Weights = {
    education: jd.educations.length,
    experience: jd.rolesResponsibilities.length,
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

const jdItemMapper = (item: TrimmedJdItem): JdItem =>
  item.map(({ field, mustHave }) => ({
    field,
    isMustHave: mustHave,
    id: nanoid(),
  }));
