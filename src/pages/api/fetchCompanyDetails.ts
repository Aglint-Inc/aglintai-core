// import axios from 'axios';

// export default async function handler(req, res) {
//   let company_domain = req.body.domain_name;
//   if (company_domain) {
//     try {
//       const { data } = await axios.get(
//         `https://api.thecompaniesapi.com/v1/companies/${company_domain}?token=${process.env.THE_COMPANIES_API}`,
//       );
//       res.status(200).send(data);
//     } catch (error) {
//       res.status(500).send({ data: null, error: error });
//     }
//   } else {
//     res.status(200).send({ data: null, error: 'url is required in body' });
//   }
// }
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { Database } from '@/src/types/schema';

export default async function handler(req, res) {
  let company_domain = req.body.domain_name;
  if (company_domain) {
    try {
      let [result] = supabaseWrap(
        await supabaseAdmin
          .from('company_search_cache')
          .select()
          .eq('website_url', company_domain),
      );
      let companyDetails;
      if (result) {
        companyDetails = result.search_result;
      } else {
        const { data } = await axios.get(
          `https://api.apollo.io/v1/organizations/enrich?api_key=${process.env.APPOLO_API}&domain=${company_domain}`,
        );
        companyDetails = data.organization;
        supabaseWrap(
          await supabaseAdmin.from('company_search_cache').insert({
            company_name: companyDetails.name,
            search_result: companyDetails,
            website_url: company_domain,
          }),
        );
      }

      res.status(200).send(companyDetails);
    } catch (error) {
      res.status(500).send({ data: null, error: error });
    }
  } else {
    res.status(200).send({ data: null, error: 'url is required in body' });
  }
}
