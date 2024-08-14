import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { setSaving } from './EditDrawer/store';

export const useSaveBreakDuration = ({
  fetchInterviewDataByApplication,
}: {
  fetchInterviewDataByApplication: () => void;
}) => {
  const handleSaveBreakDuration = async ({
    duration,
    session_id,
  }: {
    duration: number;
    session_id: string;
  }) => {
    try {
      setSaving(session_id);

      await supabase
        .from('interview_session')
        .update({
          break_duration: duration,
        })
        .eq('id', session_id);
      await fetchInterviewDataByApplication();
    } catch (e) {
      toast.error('Error saving break duration.');
    } finally {
      setSaving(null);
    }
  };
  return { handleSaveBreakDuration };
};
