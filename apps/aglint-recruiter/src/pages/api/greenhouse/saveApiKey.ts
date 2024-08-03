/* eslint-disable no-console */
import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
const crypto = require('crypto');

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(req, res) {
  let apiKey = req.body.apiKey;
  let recruiterId = req.body.recruiterId;

  if (!apiKey) {
    res.status(400).send('apiKey or recruiterId is missing');
  }
  console.log(apiKey);

  const encryptedApiKey = encrypt(apiKey, process.env.ENCRYPTION_KEY);

  console.log(encryptedApiKey);

  const { data, error } = await supabase
    .from('integrations')
    .update({ greenhouse_key: encryptedApiKey })
    .eq('recruiter_id', recruiterId)
    .select();

  if (!error) {
    res.status(200).send(data);
  } else {
    res.status(400).send(error);
  }
}

// Encrypt data using AES-256
function encrypt(data, encryptionKey) {
  const cipher = crypto.createCipher('aes256', encryptionKey);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}
