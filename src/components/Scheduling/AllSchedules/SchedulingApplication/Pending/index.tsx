import axios from 'axios';
import { useEffect, useState } from 'react';

import { ScheduleInfoPending } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { setIsCancelOpen, setIsRescheduleOpen } from '../../store';
import CandidateDetailsJobDrawer from '../Common/CandidateDetailsJob';
import SchedulingOptionComp from '../Common/ScheduleOption';
import {
  setIsViewProfileOpen,
  setSchedulingOptions,
  useSchedulingApplicationStore,
} from '../store';

function PendingConfirmed() {
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );
  const isViewProfileOpen = useSchedulingApplicationStore(
    (state) => state.isViewProfileOpen,
  );
  const schedulingOptions = useSchedulingApplicationStore(
    (state) => state.schedulingOptions,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findScheduleOptions();
    return () => {
      setLoading(true);
    };
  }, [selectedApplication?.applications?.id]);

  const findScheduleOptions = async () => {
    try {
      const res = await axios.post(
        '/api/scheduling/v2/find_availability',
        selectedApplication.schedule.filter_json,
      );
      if (res.data) {
        setSchedulingOptions(res.data);
      } else {
        toast.error('Error fetching schedule options');
      }
    } catch (e) {
      //
    } finally {
      setLoading(false);
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
          textCurrentRole={
            selectedApplication.file?.resume_json?.basics?.currentJobTitle ||
            '--'
          }
          isCancelSheduleVisible={true}
          isConfirmedVisible={
            selectedApplication.schedule.status === 'confirmed'
          }
          onClickCancelSchedule={{
            onClick: () => setIsCancelOpen(true),
          }}
          onClickRequest={{
            onClick: () => setIsRescheduleOpen(true),
          }}
          onClickViewProfile={{
            onClick: () => {
              if (selectedApplication.file.resume_json)
                setIsViewProfileOpen(true);
            },
          }}
          isPendingVisible={selectedApplication.schedule.status === 'pending'}
          textName={getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          )}
          textEmail={
            selectedApplication.candidates.email ||
            selectedApplication.file?.resume_json?.basics?.email ||
            '--'
          }
          textRole={selectedApplication.public_jobs.job_title}
          textLocation={selectedApplication.public_jobs.location || '--'}
          slotProfileImage={
            <MuiAvatar
              level={getFullName(
                selectedApplication?.candidates.first_name,
                selectedApplication?.candidates.last_name,
              )}
              src={selectedApplication?.candidates.avatar}
              variant={'circular'}
              width={'100%'}
              height={'100%'}
              fontSize={'36px'}
            />
          }
          slotScheduleInfoPlan={''}
          slotProvidedOption={
            <SchedulingOptionComp
              schedulingOptions={schedulingOptions}
              isBadgeVisible={true}
              loading={loading}
            />
          }
        />
      )}
    </>
  );
}

export default PendingConfirmed;
