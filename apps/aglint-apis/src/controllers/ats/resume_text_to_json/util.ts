import axios from 'axios';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export const getResponse = ({
  json,
  embeddings,
  token = null,
  saved = false,
  error,
  application_id,
}: {
  json?: any;
  embeddings?: any;
  token?: {
    totalCompletionTokens: number;
    totalPromptTokens: number;
    totalExecutionTokens: number;
  } | null;
  saved?: boolean;
  error?: string;
  application_id?: string;
}) => {
  if (error && application_id) {
    logs({
      application_id,
      logs: {
        function: 'resume_text_to_json_v1',
        error,
      },
    });
  }
  return {json, embeddings, saved, token, error};
};

export const saveToDB = async ({
  table,
  data,
  id,
}: {
  table: 'applications' | 'candidate_files' | 'candidates';
  data: any;
  id: string;
}) => {
  if (!id && id.trim() === '') return false;
  const {error} = await supabaseAdmin
    .from(table)
    .update({...data})
    .eq('id', id);
  if (error) {
    console.error({errorX: error});
  }
  return !error;
};

export const logToken = async (
  application_id: string,
  token: {
    totalCompletionTokens: number;
    totalPromptTokens: number;
    totalExecutionTokens: number;
  }
) => {
  const {error} = await supabaseAdmin.from('rp_token_usage').insert({
    application_id,
    task: 'json',
    token_used_json: token,
    total_token_used: token.totalExecutionTokens,
  });
  if (error) {
    // console.error(error);
  }
  return !error;
};

export const logs = async (data: any) => {
  await supabaseAdmin
    .from('applications')
    .update({
      processing_status: 'failed',
    })
    .eq('id', data.application_id);
  const {error} = await supabaseAdmin.from('rp_logs').insert({...data});
  return !error;
};

// function fixJsonString(jsonString: string): string {
//   jsonString = jsonString.replace(/:\s*"([^"]*)"/g, (match, p1) => {
//     return `: "${p1.replace(/"/g, '\\"')}"`;
//   });

//   // Check if JSON is valid after the fix
//   try {
//     JSON.parse(jsonString);
//     return jsonString;
//   } catch (e: any) {
//     throw new Error(
//       'The JSON is still invalid after attempting to fix: ' + e.message
//     );
//   }
// }

export function sendToken(
  totalExecutionTokens: number,
  totalPromptTokens: number,
  totalCompletionTokens: number,
  application_id: string
) {
  axios.post(
    'https://us-central1-aglint-cloud-381414.cloudfunctions.net/token_counter_v1',
    {
      total_token: totalExecutionTokens,
      prompt_token: totalPromptTokens,
      completion_token: totalCompletionTokens,
      api: 'Resume_Text_To_JSON_V1',
      model: 'gpt-3.5-turbo-1106',
      env: 'dev',
      company_name: application_id,
    }
  );
}
