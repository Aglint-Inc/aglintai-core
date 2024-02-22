import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);
export default async function handler(req, res) {
  const { application_id } = req.body;
  const { data, error } = await supabase
    .from('applications')
    .select(
      '*, public_jobs ( * , assessment_job_relation ( *, assessment ( *, assessment_question (id,question,assessment_id,created_at,duration,type,level,parent_question_id,description,required ) ) ))',
    )
    .eq('id', application_id)
    .single();
  if (!error) {
    res.status(200).send(data);
  }
}

// const a = async (supabase:ReturnType<typeof createClient<Database>>, application_id:string) => {
//   const { data, error } = await supabase
//     .from('applications')
//     .select(
//       '*, public_jobs ( * , assessment_job_relation ( *, assessment ( *, assessment_question ( * ) ) ))',
//     )
//     .eq('id', application_id)
//     .single();
//   return data;
// };

// export type A = Awaited<ReturnType<typeof a>>;
