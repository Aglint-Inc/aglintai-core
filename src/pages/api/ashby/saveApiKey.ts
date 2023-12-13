/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
const crypto = require('crypto');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  let apiKey = req.body.apiKey;
  let recruiterId = req.body.recruiterId;

  if (!apiKey) {
    res.status(400).send('apiKey or recruiterId is missing');
  }
  console.log(apiKey);

  const encryptedApiKey = encrypt(apiKey, process.env.ENCRYPTION_KEY);

  axios.post(process.env.ASHBY_SYNC_URL, {
    recruiter_id: recruiterId,
    ashby_key: encryptedApiKey,
  });

  console.log(encryptedApiKey);

  const { data, error } = await supabase
    .from('recruiter')
    .update({ ashby_key: encryptedApiKey })
    .eq('id', recruiterId)
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
