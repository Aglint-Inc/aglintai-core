import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import OpenAI from 'openai';

import { PublicJobsType } from '@/src/types/data.types';
import { tokenMeter } from '@/src/utils/tokenCounter';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // eslint-disable-next-line security/detect-object-injection
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    },
  );
  try {
    let job: PublicJobsType = req.body.job;
    const jd_text = htmlToText(job.description);

    if (!jd_text) {
      return res.status(400).send('No text provided');
    }
    const resEmb = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: jd_text,
    });

    const location = await getLocationDetails(job.location);

    tokenMeter({
      tokenUsage: { ...resEmb.usage, completion_tokens: 0 },
      company_name: 'embeddings',
      model: 'text-embedding-3-small',
      usageLocation: 'embedding',
    });

    const experience = await extractExperienceWithRetries(jd_text);

    await updateJob({
      embedding: resEmb.data[0].embedding,
      experience,
      location,
      id: job.id,
      supabase,
    });

    return res
      .status(200)
      .json({ embedding: resEmb.data[0].embedding, experience, location });
  } catch (error) {
    res.status(500).send(error.message);
  }
  return res.status(200).json('success');
}

async function extractExperienceWithRetries(jdText) {
  const maxRetries = 5;
  let experience = 0;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are job description parser. Extract year of experience_in_months from the given job description. Generate result in given format.{
               "experience_in_months": number
              } . If experience_in_months is not found, return 0`,
          },
          {
            role: 'system',
            content: `Here is the Job Description : ${jdText}`,
          },
        ],
        model: 'gpt-3.5-turbo-1106',
        temperature: 0.8 + i * 0.1,
      });

      tokenMeter({
        tokenUsage: { ...chatCompletion.usage, completion_tokens: 0 },
        company_name: 'embeddings',
        model: 'gpt-3.5-turbo-1106',
        usageLocation: 'api/editjob/publishjob',
      });

      // eslint-disable-next-line no-console
      console.log(chatCompletion.choices[0].message.content);
      experience = JSON.parse(
        chatCompletion.choices[0].message.content,
      ).experience_in_months;
      break; // If successful, exit the loop
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Attempt ${i + 1} failed:`, error);
      if (i === maxRetries - 1) {
        throw new Error('Failed to extract experience after maximum retries.');
      }
    }
  }

  return experience;
}

async function getLocationDetails(location) {
  try {
    const apiKey = 'AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

    const response = await axios.get(apiUrl);

    if (response.data.status === 'OK') {
      const result = response.data.results[0];
      const addressComponents = result.address_components;

      let city = null,
        state = null,
        country = null;

      for (const component of addressComponents) {
        const types = component.types;
        if (types.includes('locality')) {
          city = component.long_name;
        } else if (types.includes('administrative_area_level_1')) {
          state = component.long_name;
        } else if (types.includes('country')) {
          country = component.long_name;
        }
      }

      return { city, state, country };
    } else {
      throw new Error('Geocoding request failed');
    }
  } catch (error) {
    throw new Error('Failed to fetch location details: ' + error.message);
  }
}

async function updateJob({ embedding, experience, location, id, supabase }) {
  try {
    await supabase
      .from('public_jobs')
      .update({
        job_details_embedding: embedding,
        experience_in_months: experience,
        location_json: location,
      })
      .eq('id', id)
      .select();
  } catch (error) {
    throw new Error('Failed to update job' + error.message);
  }
}
