import { type DatabaseTable } from '@aglint/shared-types';
import { type CandidateResponseSelfSchedule } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { dayjsLocal } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { type ComponentProps } from 'react';
import { createRequest } from 'src/app/(public)/self-scheduling/[filter]/_common/utils/utils';

import { addScheduleActivity } from '@/utils/scheduling/utils';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { type ConfirmedInvitePage } from '../components';
import { setIsRescheduleCancelOpen } from '../store/store';

type SubmitProps = {
  reason: string;
  other_details?: DatabaseTable['interview_session_cancel']['other_details'];
  type: DatabaseTable['interview_session_cancel']['type'];
};

export const useHandleReschedule = ({
  filter_json_id,
  meetings,
  application_id,
  candidate_name,
}: {
  filter_json_id: string | null;
  meetings: ComponentProps<typeof ConfirmedInvitePage>['meetings'];
  application_id: string;
  candidate_name: string;
}) => {
  const { toast } = useToast();
  const session_ids = meetings.map((ses) => ses.interview_session.id);

  const { isPending, mutate } = useMutation({
    mutationFn: async ({ reason, other_details, type }: SubmitProps) =>
      await handleCancelReschedule({
        reason,
        other_details,
        type,
      }),
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  const handleCancelReschedule = async ({
    reason,
    other_details,
    type,
  }: SubmitProps) => {
    const supabaseAdmin = getSupabaseServer();
    if (filter_json_id) {
      const metadata: CandidateResponseSelfSchedule = {
        action: 'waiting',
        type: 'candidate_response_self_schedule',
        reason: reason,
        other_details: other_details,
        response_type: type === 'declined' ? 'cancel' : 'reschedule',
        filter_id: filter_json_id,
        session_ids: session_ids,
      };

      addScheduleActivity({
        title:
          type === 'declined'
            ? `Canceled ${meetings?.map((ses) => ses.interview_session.name).join(' , ')}`
            : `${candidate_name} requested to reschedule the ${meetings?.map((ses) => ses.interview_session.name).join(' , ')}`,
        application_id,
        logged_by: 'candidate',
        supabase: supabaseAdmin,
        created_by: null,
        metadata,
      });
    }

    await createRequest({
      application_id,
      session_ids,
      new_dates: {
        start_date:
          other_details?.dateRange?.start ?? dayjsLocal().toISOString(),
        end_date:
          other_details?.dateRange?.end ??
          dayjsLocal().add(3, 'day').toISOString(),
      },
      type,
      other_details,
      reason,
    });

    setIsRescheduleCancelOpen(null);
    return true;
  };

  return { mutate, isPending };
};
