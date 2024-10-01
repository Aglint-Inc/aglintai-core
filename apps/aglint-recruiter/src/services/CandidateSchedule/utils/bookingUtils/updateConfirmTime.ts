import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const updateConfirmTime = async (filter_id: string) => {
  try {
    const supabaseAdmin = getSupabaseServer();

    await supabaseAdmin
      .from('interview_filter_json')
      .update({ viewed_on: new Date().toISOString() })
      .eq('id', filter_id)
      .throwOnError();
  } catch {
    // eslint-disable-next-line no-console
    console.log('Unable to update confirm time');
  }
};
