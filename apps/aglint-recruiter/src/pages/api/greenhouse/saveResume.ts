/* eslint-disable no-console */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!storageUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL not set');
}

export type saveResumeAPI = {
  request: {
    application_id: string;
    resume: string;
    candidate_id: string;
  };
  response: {
    success: boolean;
  };
};
const bucketName = 'resume-job-post';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  let { application_id, candidate_id, resume } =
    req.body as saveResumeAPI['request'];
  if (application_id || resume) {
    if (
      resume.includes('pdf') ||
      resume.includes('doc') ||
      resume.includes('txt')
    ) {
      await saveResumeToDb(application_id, candidate_id, resume);
      return res.status(200).json({ success: true });
    } else {
      await updateApplicationsToFailed(application_id);
      return res.status(200).json('Invalid file format');
    }
  } else {
    return res.status(400).json('required payload is missing');
  }
}

async function updateApplicationsToFailed(application_id: string) {
  return supabaseAdmin
    .from('applications')
    .update({
      processing_status: 'failed',
      retry: 2,
      is_resume_fetching: false,
    })
    .eq('application_id', application_id)
    .throwOnError();
}

async function saveResumeToDb(
  application_id: string,
  candidate_id: string,
  fileUrl: string,
) {
  const fileId = uuidv4();
  const fileLink = await uploadFile(fileId, fileUrl);
  await supabaseAdmin
    .from('candidate_files')
    .insert({
      candidate_id: candidate_id,
      file_url: fileLink,
      type: 'resume',
      id: fileId,
    })
    .throwOnError();

  return await supabaseAdmin
    .from('applications')
    .update({ is_resume_fetching: false, candidate_file_id: fileId })
    .eq('id', application_id)
    .throwOnError();
}

async function uploadFile(fileId: string, fileUrl: string) {
  const response = await axios.get(fileUrl, {
    responseType: 'arraybuffer', // Request binary data
  });
  const { data, error: uploadError } = await supabaseAdmin.storage
    .from(bucketName)
    .upload(
      `public/${fileId}${
        fileUrl.includes('pdf')
          ? '.pdf'
          : fileUrl.includes('doc')
            ? '.docx'
            : fileUrl.includes('txt')
              ? '.txt'
              : '.pdf'
      }`,
      response.data,
      {
        contentType: fileUrl.includes('pdf')
          ? 'application/pdf'
          : fileUrl.includes('doc')
            ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            : fileUrl.includes('txt')
              ? 'text/plain'
              : 'application/pdf',
        cacheControl: '3600',
        upsert: true,
      },
    );
  if (uploadError) {
    throw new Error(uploadError.message);
  }
  return `${storageUrl}/storage/v1/object/public/${bucketName}/${data.path}`;
}
