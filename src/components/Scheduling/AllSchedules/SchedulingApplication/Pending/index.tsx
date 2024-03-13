import axios from 'axios';
import { useEffect } from 'react';

import { ScheduleInfoPending } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import CandidateDetailsJobDrawer from '../CandidateDetailsJob';
import SchedulingOptionComp from '../ScheduleOption';
import {
  setIsViewProfileOpen,
  setSchedulingOptions,
  useSchedulingApplicationStore
} from '../store';
import { setIsCancelOpen, setIsRescheduleOpen } from '../../store';
import { transformData } from '../../utils';

function PendingConfirmed() {
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );
  const isViewProfileOpen = useSchedulingApplicationStore(
    (state) => state.isViewProfileOpen
  );

  // const onClickCancel = async () => {
  //   try {
  //     if (selectedApplication.schedule.id) {
  //       await supabase
  //         .from('interview_schedule')
  //         .update({ is_active: false })
  //         .eq('id', selectedApplication.schedule.id);
  //       setSelectedApplication({ ...selectedApplication, schedule: null });
  //       if ((selectedApplication.schedule.meeting_json as any)?.id) {
  //         const res = await axios.post(
  //           '/api/scheduling/update-calender-event-status',
  //           {
  //             organizer_id: selectedApplication.schedule.created_by,
  //             event_id: (selectedApplication.schedule.meeting_json as any).id
  //           }
  //         );
  //         if (res.status !== 200) {
  //           throw new Error('Error in response');
  //         }
  //       }
  //     }
  //   } catch {
  //     //
  //   }
  // };

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
      {selectedApplication.file.resume_json && (
        <CandidateDetailsJobDrawer
          applications={selectedApplication.applications}
          candidate={selectedApplication.candidates}
          file={selectedApplication.file}
          isViewProfileOpen={isViewProfileOpen}
          setIsViewProfileOpen={setIsViewProfileOpen}
        />
      )}

      {selectedApplication?.schedule && (
        <ScheduleInfoPending
          isCancelSheduleVisible={true}
          isConfirmedVisible={
            selectedApplication.schedule.status === 'confirmed'
          }
          onClickCancelSchedule={{
            onClick: () => setIsCancelOpen(true)
          }}
          onClickRequest={{
            onClick: () => setIsRescheduleOpen(true)
          }}
          onClickViewProfile={{
            onClick: () => {
              if (selectedApplication.file.resume_json)
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
