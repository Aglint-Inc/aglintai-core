import { supabase } from '@/utils/supabase/client';

export async function updateInterviewSessionsDurations(
  id: string,
  duration: number,
) {
  await supabase
    .from('interview_session')
    .update({ break_duration: duration })
    .eq('id', id);
}
