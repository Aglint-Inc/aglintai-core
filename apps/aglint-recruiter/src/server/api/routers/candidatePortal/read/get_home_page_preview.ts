import { dummyDataHomePage } from 'src/app/(public)/candidate/(authenticated)/_common/dummydata';
import { z } from 'zod';

import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

import { type getHomePage } from './get_home_page';

const schema = z.object({
  recruiter_id: z.string().uuid(),
  application_id: z.string().uuid().optional().nullable(),
});

const query = async ({ input }: PublicProcedure<typeof schema>) => {
  const { recruiter_id, application_id } = input;

  const db = createPublicClient();

  let interviewPlan = dummyDataHomePage.interviewPlan;

  if (application_id) {
    const data = (
      await db
        .from('interview_progress')
        .select('name,description,order,update_at,is_completed,created_at')
        .eq('application_id', application_id)
        .order('order', { ascending: true })
        .throwOnError()
    ).data!;

    interviewPlan = data;
  }
  const data = (
    await db
      .from('recruiter_preferences')
      .select('banner_image,about,company_images,greetings')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data!;

  const currentData = {
    banner_image: data.banner_image || '',
    about: data.about || '',
    company_images: data.company_images || [],
    greetings: data.greetings || '',
  };

  const initiData: getHomePage['output'] = {
    ...dummyDataHomePage,
    company: {
      ...dummyDataHomePage.company,
      ...currentData,
    },
    interviewPlan: interviewPlan,
  };

  return initiData;
};

export const get_home_page_preview = publicProcedure.input(schema).query(query);

export type getHomePagePreview = ProcedureDefinition<
  typeof get_home_page_preview
>;
