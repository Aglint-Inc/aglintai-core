// pages/api/apolloSearch.ts
import { type Candidate } from '@aglint/shared-types';
import { type AglintCandidatesTypeDB } from '@aglint/shared-types';
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // eslint-disable-next-line security/detect-object-injection
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    },
  );

  const apiUrl = 'https://api.apollo.io/v1/mixed_people/search';

  const requestData = req.body;

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };

  try {
    let query = {
      page: requestData.page,
      per_page: requestData.per_page,
      person_titles: requestData.person_titles,
      person_locations: requestData.person_locations,
      person_seniorities: requestData.person_seniorities,
      organization_ids: requestData.organization_ids,
    };

    if (
      requestData?.person_locations?.length === 0 ||
      Boolean(requestData?.person_locations) == false
    ) {
      delete query.person_locations;
    }

    if (
      requestData?.person_seniorities?.length === 0 ||
      Boolean(requestData?.person_seniorities) == false
    ) {
      delete query.person_seniorities;
    }

    if (
      requestData?.organization_ids?.length === 0 ||
      Boolean(requestData?.organization_ids) == false
    ) {
      delete query.organization_ids;
    }

    const response = await axios.post(
      apiUrl,
      {
        api_key: process.env.APPOLO_API,
        ...query,
      },
      { headers },
    );

    let fetchedCandidates: Candidate[] = response.data.people as Candidate[];
    const fetchedIds = fetchedCandidates.map((c) => c.id);
    const existingCandidates = await checkCandidates(fetchedIds, supabase);
    const existingIds = existingCandidates.map((c) => c.id);
    const insertableCandidates = fetchedCandidates.filter(
      (cand) => !existingIds.includes(cand.id),
    ) as unknown as AglintCandidatesTypeDB[];

    if (insertableCandidates.length > 0) {
      await insertCandidates(insertableCandidates, supabase, requestData);
    }

    return res.status(response.status).json(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res
      .status(error.response?.status || 500)
      .json({ error: 'Internal Server Error' });
  }
}

const insertCandidates = async (
  candidates: AglintCandidatesTypeDB[],
  supabase: any,
  searchQuery,
) => {
  const dbCandidates = candidates.map((cand) => {
    return {
      city: cand.city,
      country: cand.country,
      departments: cand.departments,
      email: cand.email,
      email_status: cand.email_status,
      employment_history: cand.employment_history,
      extrapolated_email_confidence: cand.extrapolated_email_confidence,
      facebook_url: cand.facebook_url,
      first_name: cand.first_name,
      functions: cand.functions,
      intent_strength: cand.intent_strength,
      github_url: cand.github_url,
      headline: cand.headline,
      id: cand.id,
      is_likely_to_engage: cand.is_likely_to_engage,
      last_name: cand.last_name,
      linkedin_url: cand.linkedin_url,
      name: cand.name,
      organization: cand.organization,
      organization_id: cand.organization_id,
      phone_numbers: cand.phone_numbers,
      photo_url: cand.photo_url,
      revealed_for_current_team: cand.revealed_for_current_team,
      seniority: cand.seniority,
      show_intent: cand.show_intent,
      state: cand.state,
      subdepartments: cand.subdepartments,
      title: cand.title,
      twitter_url: cand.twitter_url,
      search_query: searchQuery,
    };
  });
  await supabase.from('aglint_candidates').insert(dbCandidates).select();
};

const checkCandidates = async (
  existingIds: string[],
  supabase: any,
): Promise<AglintCandidatesTypeDB[]> => {
  const { data, error } = await supabase
    .from('aglint_candidates')
    .select()
    .in('id', existingIds);
  if (error) {
    return [];
  } else {
    return data;
  }
};
