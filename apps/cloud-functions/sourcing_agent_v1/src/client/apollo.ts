import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const APOLLO_API_KEY_PEOPLE = process.env.APOLLO_API_KEY_PEOPLE;
const APOLLO_API_KEY_COMPANY = process.env.APOLLO_API_KEY_COMPANY;

if (!APOLLO_API_KEY_PEOPLE || !APOLLO_API_KEY_COMPANY) {
  throw new Error(
    "APOLLO_API_KEY_PEOPLE and APOLLO_API_KEY_COMPANY environment variables are required."
  );
}

export { APOLLO_API_KEY_PEOPLE, APOLLO_API_KEY_COMPANY };

export const apollo_company_api = ({ name }: { name: string }) => {
  console.log("apollo_company_api called with ", { name });
  return axios.post(
    "https://api.apollo.io/api/v1/mixed_companies/search",
    {
      api_key: process.env.APOLLO_API_KEY_COMPANY,
      page: 1,
      per_page: 10,
      q_organization_name: name,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );
};

export const apollo_people_api = ({ query }: { query: any }) => {
  console.log("apollo_people_api called with ", { query });
  return axios.post(
    "https://api.apollo.io/v1/mixed_people/search",
    {
      api_key: process.env.APOLLO_API_KEY_PEOPLE,
      ...query,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );
};
