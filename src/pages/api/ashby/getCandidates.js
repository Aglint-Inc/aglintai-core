import axios from 'axios';

import { supabase } from '@/src/utils/supabaseClient';
const crypto = require('crypto');

export default function handler(req, res) {
  const apiKey = req.body.apiKey;
  const decryptedApiKey = decrypt(apiKey, process.env.ENCRYPTION_KEY);
  const base64decryptedApiKey = btoa(decryptedApiKey + ':');

  const page = req.body.page;
  let data = {};

  if (base64decryptedApiKey) {
    if (page) {
      data = {
        ...data,
        cursor: page,
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
          await supabase
            .from('recruiter')
            .update({ ashby_sync_token: response.data.syncToken })
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

// Decrypt data using AES-256
function decrypt(encryptedData, encryptionKey) {
  const decipher = crypto.createDecipher('aes256', encryptionKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
