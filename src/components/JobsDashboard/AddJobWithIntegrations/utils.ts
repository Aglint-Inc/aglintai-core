import axios from 'axios';
import { htmlToText } from 'html-to-text';

import { supabase } from '@/src/utils/supabaseClient';

export function extractLinkedInURL(arr) {
  for (const item of arr) {
    // Check if the item starts with "http://linkedin.com" or "https://linkedin.com"
    if (
      item.startsWith('http://linkedin.com') ||
      item.startsWith('https://linkedin.com')
    ) {
      return item; // Return the LinkedIn URL
    }
  }

  // Return an empty string if no LinkedIn URL is found
  return '';
}

export const splitFullName = (name: string) => {
  const nameParts = name.trim().split(' ');

  if (nameParts.length === 1) {
    // If there is only one word, consider it as the first name and no last name
    return {
      firstName: nameParts[0],
      lastName: '',
    };
  } else {
    // If there are multiple words, the last word is the last name, and the rest are the first name
    const lastName = nameParts.pop();
    const firstName = nameParts.join(' ');
    return {
      firstName,
      lastName,
    };
  }
};

export const POSTED_BY = {
  LEVER: 'Lever',
  AGLINT: 'Aglint',
  GREENHOUSE: 'Greenhouse',
};

export const generateEmbedding = async (des, job_id) => {
  const jd_text = htmlToText(des);

  const { data: emb } = await axios.post('/api/ai/create-embeddings', {
    text: jd_text,
  });

  const embedding = emb.data[0].embedding;
  await supabase
    .from('public_jobs')
    .update({ embedding: embedding })
    .eq('id', job_id);

  return embedding;
};
