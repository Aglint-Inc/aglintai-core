import { supabase } from './config';

export const getResponse = ({
  jd_json,
  token = null,
  saved = false,
  retry,
  error,
  job_id,
}: {
  jd_json?: any;
  token?: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  } | null;
  saved?: boolean;
  retry?: number;
  error?: string;
  job_id?: string;
}) => {
  if (error && job_id) {
    logs({
      application_id: job_id,
      logs: {
        function: 'resume_scoring_v1',
        error,
      },
    });
  }
  return { jd_json, saved, token, retry, error };
};

export const saveToDB = async (data: any, id: string) => {
  if (!id || id.trim() === '') return false;
  const { error } = await supabase
    .from('public_jobs')
    .update({ ...data })
    .eq('id', id);
  error && console.error('error', error);
  return !Boolean(error);
};

export const logToken = async (
  application_id: string,
  token: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  }
) => {
  const { error } = await supabase.from('rp_token_usage').insert({
    application_id,
    task: 'jd parsing',
    token_used_json: token,
    total_token_used: token.total_tokens,
  });
  error && console.error(error);
  return !Boolean(error);
};

export const logs = async (data: any) => {
  // await saveToDB(
  //   {
  //     api_status: 'failed',
  //   },
  //   data.application_id
  // );
  const { error } = await supabase.from('rp_logs').insert({ ...data });
  error && console.error(error);
  return !Boolean(error);
};

export const newAbortSignal = (timeoutMs: number) => {
  const abortController = new AbortController();
  setTimeout(() => {
    abortController.abort();
    console.log('Aborting Signal.');
  }, timeoutMs || 0);
  return abortController.signal;
};

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));
