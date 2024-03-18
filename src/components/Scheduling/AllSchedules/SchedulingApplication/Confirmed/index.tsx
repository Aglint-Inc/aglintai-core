import dayjs from 'dayjs';

import { ScheduleInfoConfirmed } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import CandidateDetailsJobDrawer from '../Common/CandidateDetailsJob';
import SchedulingOptionComp from '../Common/ScheduleOption';
import {
  SchedulingOptionType,
  setIsViewProfileOpen,
  useSchedulingApplicationStore
} from '../store';
import { setIsCancelOpen, setIsRescheduleOpen } from '../../store';

function ConfirmedComp() {
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );
  const isViewProfileOpen = useSchedulingApplicationStore(
    (state) => state.isViewProfileOpen
  );

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

      <ScheduleInfoConfirmed
        textCompleted={
          selectedApplication.schedule?.confirmed_option?.plans
            ? `This Schedule has been completed on ${dayjs(
                selectedApplication.schedule.confirmed_option.plans[
                  selectedApplication.schedule.confirmed_option.plans.length - 1
                ].end_time
              ).format('DD MMM YYYY')}`
            : ''
        }
        isScheduleStatusVisible={
          selectedApplication.schedule.status === 'confirmed'
        }
        isScheduleCompletedVisible={
          selectedApplication.schedule.status === 'completed'
        }
        isScheduleCancelVisible={
          selectedApplication.schedule.status === 'cancelled'
        }
        onClickCancel={{
          onClick: () => {
            setIsCancelOpen(true);
          }
        }}
        onClickViewProfile={{
          onClick: () => {
            setIsViewProfileOpen(true);
          }
        }}
        isScheduleInfoVisible={Boolean(
          selectedApplication.schedule.confirmed_option?.transformedPlan
        )}
        onClickReschedule={{
          onClick: () => {
            setIsRescheduleOpen(true);
          }
        }}
        slotScheduleInfoCard={
          selectedApplication?.schedule?.confirmed_option?.transformedPlan ? (
            <SchedulingOptionComp
              schedulingOptions={
                [
                  {
                    transformedPlan:
                      selectedApplication?.schedule?.confirmed_option
                        ?.transformedPlan
                  }
                ] as unknown as SchedulingOptionType
              }
              isBadgeVisible={true}
            />
          ) : (
            'No Interview Plan Available'
          )
        }
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
      />
    </>
  );
}

export default ConfirmedComp;
