import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { supabase } from "../client/supabaseClient";
// import axios from "axios";
import { apollo_company_api, apollo_people_api } from "../client/apollo";

const extractionFunctionSchema = {
  get_candidates: {
    name: "get_candidates",
    parameters: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["email", "process_query"],
        },
        email: {
          type: "object",
          properties: {
            template: {
              type: "string",
              enum: [
                "Recruitment Inquiry",
                "Networking Connection",
                "Research Study Invitation",
              ],
            },
          },
        },
        process_query: {
          type: "object",
          properties: {
            person_locations: {
              type: "array",
              items: {
                type: "string",
              },
            },
            person_titles: {
              type: "array",
              items: {
                type: "string",
              },
            },
            person_seniorities: {
              type: "array",
              items: {
                enum: [
                  "entry",
                  "senior",
                  "manager",
                  "director",
                  "executive",
                  "intern",
                  "owner",
                  "founder",
                  "c_suite",
                  "partner",
                  "vp",
                  "head",
                ],
                type: "string",
              },
            },
            companies: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "company name mentioned in the text or else empty array",
            },
          },
        },
      },
      required: ["type"],
    },
  },
};

export const getFilter = async (message: string) => {
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo-0125" });

  const result = await model.invoke([new HumanMessage(message)], {
    functions: [extractionFunctionSchema["get_candidates"]],
    function_call: { name: "get_candidates" },
  });
  const args: any = JSON.parse(
    result.additional_kwargs.function_call?.arguments || "{}"
  );
  const tempArgs = args?.process_query;
  // console.log({ tempArgs, args });
  let company_ids: any[] = [];
  if (tempArgs?.companies?.length) {
    let org_ids: any[] = [];
    let saved_ids: any[] = [];
    const { dbCompanies, remainingCompanies } = await get_company_ids_db(
      tempArgs.companies
    );
    if (dbCompanies.length) {
      org_ids = dbCompanies?.map((c) => (c.search_result as any).id) || [];
    }
    if (remainingCompanies.length) {
      const apiCompanies = await get_company_ids_api(remainingCompanies);
      saved_ids = await save_in_db(apiCompanies);
    }
    company_ids = [
      ...org_ids,
      ...saved_ids.map((item) => item.search_result.id),
    ];
  }
  return {
    company_ids,
    args,
  };
};

const get_company_ids_db = async (companyNames: string[]) => {
  const dbCompanies = await supabase
    .from("company_search_cache")
    .select()
    .in(
      "company_name",
      companyNames.map((c) => c.toLowerCase())
    )
    .then(({ data, error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return data;
    });
  let remainingCompanies: string[] = [];
  if (companyNames.length > dbCompanies.length) {
    const tempDbCompanies = dbCompanies.map((c) =>
      c.company_name.toLowerCase()
    );
    remainingCompanies = companyNames.filter(
      (c) => !tempDbCompanies.includes(c.toLowerCase())
    );
  }
  return { dbCompanies, remainingCompanies };
};

const get_company_ids_api = async (companyNames: string[]) => {

  try {
    const data = Promise.all(
      companyNames.map((name) => {
        return apollo_company_api({ name }).then(({ data }) =>
          data.organizations.map((org: any) => {
            return {
              company_name: org.name.toLowerCase(),
              search_result: org,
              website_url: org.website_url,
            };
          })
        );
      })
    );
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error("Error in fetching company ids from api");
  }
};

const save_in_db = async (dbCompanies: any) => {
  //   console.log("saving in db", JSON.stringify(dbCompanies[0]));
  return await supabase
    .from("company_search_cache")
    .insert(dbCompanies[0])
    .select()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};

export const process_Candidate = async ({
  query,
  args,
  org_ids,
  recruiter_id,
}: {
  query: any;
  args: any;
  org_ids: string[];
  recruiter_id: string;
}) => {
  const queryObject = args.process_query;
  const { fetchedIds, pagination } = await apiCandidates({
    page: 1,
    per_page: 25,
    person_titles: queryObject.person_titles,
    person_locations: queryObject.person_locations,
    organization_ids: org_ids,
    person_seniorities: queryObject.person_seniorities,
  });
  await save_search_history_in_db({
    query,
    aiSearchQuery: queryObject,
    fetchedIds: fetchedIds,
    pagination: pagination,
    recruiter_id,
  });
  return fetchedIds;
};

const apiCandidates = async (requestData: any) => {
  // const apiUrl = "https://api.apollo.io/v1/mixed_people/search";

  // const headers = {
  //   "Content-Type": "application/json",
  //   "Cache-Control": "no-cache",
  // };
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
  const response = await apollo_people_api({ query });
  // await axios.post(
  //   apiUrl,
  //   {
  //     api_key: process.env.APOLLO_API_KEY_PEOPLE,
  //     ...query,
  //   },
  //   { headers }
  // );

  let fetchedCandidates = response.data.people;
  const fetchedIds = fetchedCandidates.map((c: any) => c.id);
  const existingCandidates = await checkCandidates(fetchedIds, supabase);
  const existingIds = existingCandidates.map((c: any) => c.id);
  const instableCandidates = fetchedCandidates.filter(
    (cand: any) => !existingIds.includes(cand.id)
  );
  let history_id: string | null = null;
  if (instableCandidates.length) {
    await insertCandidates(instableCandidates, requestData);
  }
  return {
    fetchedIds: [...existingCandidates, ...instableCandidates],
    pagination: response.data.people,
  };
};

const checkCandidates = async (existingIds: string[], supabase: any) => {
  const { data, error } = await supabase
    .from("aglint_candidates")
    .select()
    .in("id", existingIds);
  if (error) {
    return [];
  } else {
    return data;
  }
};

const insertCandidates = async (candidates: any, searchQuery: string) => {
  const dbCandidates = candidates.map((cand: any) => {
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
  return await supabase
    .from("aglint_candidates")
    .insert(dbCandidates)
    .select()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      if (!data.length) throw Error("No data inserted");
      return data[0].id as string;
    });
};

export const save_search_history_in_db = async ({
  recruiter_id,
  aiSearchQuery,
  pagination,
  query,
  fetchedIds,
}: {
  recruiter_id: string;
  aiSearchQuery: any;
  pagination: number;
  query: string;
  fetchedIds: string[];
}) => {
  return await supabase
    .from("candidate_search_history")
    .insert({
      recruiter_id,
      query_json: {
        person_titles: aiSearchQuery.person_titles,
        person_locations: aiSearchQuery.person_locations,
        organization_ids: [],
        person_seniorities: aiSearchQuery.person_seniorities,
        companies: aiSearchQuery.companies,
        pagination,
      },
      search_query: query,
      db_search: "aglint",
      candidates: fetchedIds,
      used_credits: {
        export_credits: 1,
        phone_credits: 0,
        email_credits: 0,
      },
    })
    .select()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      if (!data.length) throw Error("No data inserted");
      return data[0].id as string;
    });
};
