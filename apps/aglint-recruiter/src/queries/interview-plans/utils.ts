import { type DatabaseTable, type DB } from '@aglint/shared-types';
import { type SupabaseClient } from '@supabase/supabase-js';

export type EditInterviewSession = Omit<
  DB['public']['Functions']['update_interview_session']['Args'],
  'interview_module_relation_entries'
> & {
  interview_module_relation_entries: {
    id: string;
    interviewer_type: DatabaseTable['interview_session_relation']['interviewer_type'];
    training_type: DatabaseTable['interview_session_relation']['training_type'];
  }[];
};

export const editInterviewSession = async (
  args: EditInterviewSession,
  db: SupabaseClient<DB>,
) => {
  const { error } = await db.rpc('update_interview_session', args);
  if (error) throw new Error(error.message);
};

export type UpdateDebriefSession =
  DB['public']['Functions']['update_debrief_session']['Args'];

export const updateDebriefSession = async (
  args: UpdateDebriefSession,
  supabase: SupabaseClient<DB>,
) => {
  const { error } = await supabase.rpc('update_debrief_session', args);
  if (error) throw new Error(error.message);
};
