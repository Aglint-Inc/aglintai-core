import dayjs from 'dayjs';
import React from 'react';

import { ScheduleInfo } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { useSchedulingApplicationStore } from '../store';
import IconScheduleType from '../../ListCard/Icon';
import { getScheduleType } from '../../utils';

function PendingConfirmed() {
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );

  return (
    <>
      {selectedApplication?.schedule && (
        <ScheduleInfo
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
          onClickCopyLink={{
            onClick: () => {
              navigator.clipboard.writeText(
                (selectedApplication.schedule.meeting_json as any)?.hangoutLink
              );
              toast.success('Link copied to clipboard');
            }
          }}
          onClickJoinMeet={{
            onClick: () => {
              window.open(
                (selectedApplication.schedule.meeting_json as any)?.hangoutLink
              );
            }
          }}
          textMeetingPlatform={getScheduleType(
            selectedApplication.schedule.schedule_type
          )}
          textDate={dayjs(
            selectedApplication.schedule.schedule_time?.endTime
          ).format('DD')}
          textDay={dayjs(
            selectedApplication.schedule.schedule_time?.endTime
          ).format('dddd')}
          textMonth={dayjs(
            selectedApplication.schedule.schedule_time?.endTime
          ).format('MMM')}
          slotMeetingIcon={
            <IconScheduleType
              type={selectedApplication.schedule.schedule_type}
            />
          }
        />
      )}
    </>
  );
}

export default PendingConfirmed;
