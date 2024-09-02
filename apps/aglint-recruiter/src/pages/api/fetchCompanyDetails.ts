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

import { type DB } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

import { addHttps, getUrlHost } from '@/src/utils/fetchCompDetails';

const supabaseAdmin = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || '',
);
export default async function handler(req, res) {
  try {
    let dbFormatterUrl = addHttps(getUrlHost(addHttps(req.body.domain_name)));
    let [result] = supabaseWrap(
      await supabaseAdmin
        .from('company_search_cache')
        .select()
        .eq('website_url', dbFormatterUrl),
    );
    let companyDetails;
    if (result) {
      companyDetails = result.search_result;
    } else {
      const { data } = await axios.get(
        `https://api.apollo.io/v1/organizations/enrich?api_key=${process.env.APPOLO_API}&domain=${dbFormatterUrl}`,
      );

      companyDetails = data.organization;
      supabaseWrap(
        await supabaseAdmin.from('company_search_cache').insert({
          company_name: companyDetails.name,
          search_result: companyDetails,
          website_url: dbFormatterUrl,
        }),
      );
    }

    res.status(200).send(companyDetails);
  } catch (error) {
    res.status(500).send({ data: null, error: error });
  }
}

// const getDomainName = (website_url = '') => {
//   let url = new URL(addHttps(website_url));
//   return url.host;
// };
