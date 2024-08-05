import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

import { decrypt } from '../decryptApiKey';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function handler(req, res) {
  const apiKey = req.body.apiKey;
  const decryptedApiKey = decrypt(apiKey, process.env.ENCRYPTION_KEY);
  const base64decryptedApiKey = btoa(decryptedApiKey + ':');
  const syncToken = req.body.synctoken;

  const page = req.body.page;
  let data = {};

  if (base64decryptedApiKey) {
    if (page) {
      data = {
        ...data,
        cursor: page,
      };
    }
    if (syncToken) {
      data = {
        ...data,
        syncToken: syncToken,
      };
    }

    const options = {
      method: 'POST',
      url: 'https://api.ashbyhq.com/application.list',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${base64decryptedApiKey}`,
      },
      data: data,
    };

    axios
      .request(options)
      .then(async function (response) {
        if (!response.data.moreDataAvailable) {
          // eslint-disable-next-line no-console
          console.log('synctoken', response.data.syncToken);
          await supabase
            .from('recruiter')
            .update({
              ashby_sync_token: response.data.syncToken,
              ashby_last_synced: new Date().toISOString(),
            })
            .eq('ashby_key', apiKey);
        }
        return res.status(200).send(response.data);
      })
      .catch(function (error) {
        return res.status(400).send(error);
      });
  } else {
    return res.status(400).send('No ApiKey provided');
  }
}
