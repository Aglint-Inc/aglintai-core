import axios from 'axios';
import { useEffect } from 'react';

import { ScheduleInfoPending } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import CandidateDetailsJobDrawer from '../CandidateDetailsJob';
import SchedulingOptionComp from '../ScheduleOption';
import {
  setIsViewProfileOpen,
  setSchedulingOptions,
  setSelectedApplication,
  useSchedulingApplicationStore
} from '../store';
import { mailHandler, transformData } from '../../utils';

function PendingConfirmed() {
  const { recruiter } = useAuthDetails();
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );

  const onClickCancel = async () => {
    try {
      if (selectedApplication.schedule.id) {
        await supabase
          .from('interview_schedule')
          .update({ is_active: false })
          .eq('id', selectedApplication.schedule.id);
        setSelectedApplication({ ...selectedApplication, schedule: null });
        if ((selectedApplication.schedule.meeting_json as any)?.id) {
          const res = await axios.post(
            '/api/scheduling/update-calender-event-status',
            {
              organizer_id: selectedApplication.schedule.created_by,
              event_id: (selectedApplication.schedule.meeting_json as any).id
            }
          );
          if (res.status !== 200) {
            throw new Error('Error in response');
          }
        }
      }
    } catch {
      //
    }
  };

  const resendInvite = async () => {
    if (selectedApplication?.schedule?.id) {
      if (selectedApplication?.schedule.resend_invite <= 3) {
        await supabase
          .from('interview_schedule')
          .update({
            resend_invite: selectedApplication?.schedule.resend_invite + 1
          })
          .eq('id', selectedApplication.schedule.id);

        mailHandler({
          id: selectedApplication.schedule.id,
          candidate_name: selectedApplication.candidates.first_name,
          company_logo: recruiter.logo,
          company_name: recruiter.name,
          schedule_name: selectedApplication.schedule.schedule_name
        });
        selectedApplication.schedule.resend_invite += 1;
        setSelectedApplication({
          ...selectedApplication,
          schedule: selectedApplication.schedule
        });
      } else {
        toast.error(
          'You have reached the maximum limit of resending the invite'
        );
      }
    }
  };

  useEffect(() => {
    findScheduleOptions();
  }, [selectedApplication?.applications?.id]);

  const findScheduleOptions = async () => {
    const res = await axios.post(
      '/api/scheduling/v2/find_availability',
      selectedApplication.schedule.filter_json
    );
    if (res.data) {
      setSchedulingOptions(
        res.data.map((option) => {
          return { ...option, transformedPlan: transformData(option.plan) };
        })
      );
    } else {
      toast.error('Error fetching schedule options');
    }
  };

  return (
    <>
      {/* <DeleteScheduleDialog onClickCancel={onClickCancel} />
      <RescheduleDialog onClickReschedule={onClickReschedule} /> */}
      <CandidateDetailsJobDrawer />
      {selectedApplication?.schedule && (
        <ScheduleInfoPending
          isCancelSheduleVisible={true}
          isConfirmedVisible={
            selectedApplication.schedule.status === 'confirmed'
          }
          onClickCancelSchedule={{
            onClick: onClickCancel
          }}
          onClickRequest={{
            onClick: resendInvite
          }}
          onClickViewProfile={{
            onClick: () => {
              setIsViewProfileOpen(true);
            }
          }}
          isPendingVisible={selectedApplication.schedule.status === 'pending'}
          textName={getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name
          )}
          textRole={selectedApplication.public_jobs.job_title}
          textLocation={selectedApplication.public_jobs.location || '--'}
          slotProfileImage={
            <MuiAvatar
              level={getFullName(
                selectedApplication?.candidates.first_name,
                selectedApplication?.candidates.last_name
              )}
              src={selectedApplication?.candidates.avatar}
              variant={'circular'}
              width={'100%'}
              height={'100%'}
              fontSize={'12px'}
            />
          }
          slotScheduleInfoPlan={'asdad'}
          slotProvidedOption={<SchedulingOptionComp />}
        />
      )}
    </>
  );
}

export default PendingConfirmed;
