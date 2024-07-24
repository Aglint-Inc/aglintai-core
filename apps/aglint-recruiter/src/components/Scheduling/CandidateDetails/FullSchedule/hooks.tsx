import axios from 'axios';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSessionCache } from '@/src/pages/api/scheduling/application/candidatesessioncache';
import { createCloneSession } from '@/src/utils/scheduling/createCloneSession';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useSchedulingApplicationStore } from '../store';
import { setSaving, useEditSessionDrawerStore } from './EditDrawer/store';

export const useSaveBreakDuration = ({
  fetchInterviewDataByApplication,
}: {
  fetchInterviewDataByApplication: () => void;
}) => {
  const { recruiter, recruiterUser } = useAuthDetails();
  const { allSessions, selectedApplication, selectedSchedule } =
    useSchedulingApplicationStore((state) => ({
      selectedSchedule: state.selectedSchedule,
      allSessions: state.initialSessions,
      selectedApplication: state.selectedApplication,
    }));

  const saving = useEditSessionDrawerStore((state) => state.saving);

  const handleSaveBreakDuration = async ({
    duration,
    session_id,
  }: {
    duration: number;
    session_id: string;
  }) => {
    try {
      setSaving(session_id);
      if (!selectedSchedule && !saving) {
        const res = await axios.post(
          '/api/scheduling/application/candidatesessioncache',
          {
            allSessions: allSessions,
            application_id: selectedApplication.id,
            is_get_more_option: false,
            scheduleName: `Interview for ${selectedApplication.public_jobs.job_title} - ${selectedApplication.candidates.first_name}`,
            session_ids: [],
            recruiter_id: recruiter.id,
            rec_user_id: recruiterUser.user_id,
          } as ApiBodyParamsSessionCache,
        );

        let createCloneRes: Awaited<ReturnType<typeof createCloneSession>>;

        if (res.status === 200 && res.data) {
          createCloneRes = res.data;
        }

        if (createCloneRes) {
          await supabase
            .from('interview_session')
            .update({
              break_duration: duration,
            })
            .eq(
              'id',
              createCloneRes.refSessions.find(
                (s) => s.interview_session.id === session_id,
              ).newId,
            );
        } else {
          toast.error('Error caching session.');
        }
      } else {
        await supabase
          .from('interview_session')
          .update({
            break_duration: duration,
          })
          .eq('id', session_id);
      }
      await fetchInterviewDataByApplication();
    } catch (e) {
      toast.error('Error saving break duration.');
    } finally {
      setSaving(null);
    }
  };
  return { handleSaveBreakDuration };
};
