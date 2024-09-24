import { type DB } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseAdmin = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);
export default async function handler(req, res) {
  try {
    const dbFormatterUrl = addHttps(getUrlHost(addHttps(req.body.domain_name)));
    const [result] = supabaseWrap(
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

const addHttps = (url = '') => {
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  if (url.includes('www.')) {
    url = url.replace('www.', '');
  }
  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }

  if (url.startsWith('https://')) {
    return url;
  } else {
    return 'https://' + url;
  }
};

const getUrlHost = (website_url) => {
  const url = new URL(website_url);
  return url.origin;
};
