import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CandidateScheduleCard } from '@/devlink/CandidateScheduleCard';
import { ChangeButton } from '@/devlink/ChangeButton';
import { SelectButton } from '@/devlink/SelectButton';
import { SessionInfo } from '@/devlink/SessionInfo';
import { AvailabilityReq } from '@/devlink2/AvailabilityReq';
import { ButtonPrimary } from '@/devlink2/ButtonPrimary';
import { MultiDaySelect } from '@/devlink2/MultiDaySelect';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import {
  insertTaskProgress,
  updateCandidateRequestAvailability,
  useRequestAvailabilityContext
} from '../RequestAvailabilityContext';
import { convertMinutesToHoursAndMinutes } from '../utils';
import AvailableSlots from './AvailableSlots';
import DateSlotsPoPup from './DateSlotsPopUp';

function CandidateAvailability() {
  const router = useRouter();
  const {
    setOpenDaySlotPopup,
    multiDaySessions,
    candidateRequestAvailability,
    daySlots,
  } = useRequestAvailabilityContext();
  const handleOpen = async (day: number) => {
    setOpenDaySlotPopup(day);
  };

  async function handleSubmit() {
    if (multiDaySessions.length !== daySlots.length) {
      toast.message('Please select slots from each day');
      return;
    }
    await updateCandidateRequestAvailability({
      data: { slots: daySlots },
      id: String(router.query?.request_id),
    });
    insertTaskProgress({
      request_availability_id: candidateRequestAvailability?.id,
      taskData: {
        created_by: {
          name: getFullName(
            candidateRequestAvailability.applications.candidates.first_name,
            candidateRequestAvailability.applications.candidates.last_name,
          ),
          id: candidateRequestAvailability.applications.candidates.id,
        },
      },
    });

    router.push('/scheduling/request-availability/submitted');
  }

  useEffect(() => {
    if (candidateRequestAvailability?.slots) {
      router.push('/scheduling/request-availability/submitted');
    }
  }, [candidateRequestAvailability]);
  return (
    <div>
      <DateSlotsPoPup />
      <AvailabilityReq
        slotPickSlotDay={
          <ShowCode>
            <ShowCode.When isTrue={multiDaySessions.length > 1}>
              <MultiDaySelect
                slotPrimaryButton={
                  <ButtonPrimary
                    onClickButton={{ onClick: handleSubmit }}
                    textLabel={'Submit Availability'}
                  />
                }
                slotCandidateScheduleCard={multiDaySessions.map(
                  (sessions, i) => {
                    const totalSessionMinutes = sessions.reduce(
                      (accumulator, session) =>
                        accumulator + session.session_duration,
                      0,
                    );
                    return (
                      <>
                        <CandidateScheduleCard
                          isSlotButtonVisible={
                            daySlots.map((ele) => ele.round).includes(i) ||
                            i < 1
                          }
                          key={i}
                          slotSessionInfo={sessions.map((session, i) => {
                            return (
                              <SessionInfo
                                textSessionName={session.name}
                                textSessionDuration={convertMinutesToHoursAndMinutes(
                                  session.session_duration,
                                )}
                                key={i}
                              />
                            );
                          })}
                          textDay={`Day ${i + 1}`}
                          textDuration={convertMinutesToHoursAndMinutes(
                            totalSessionMinutes,
                          )}
                          isSelected={false}
                          slotButton={
                            <ShowCode>
                              <ShowCode.When
                                isTrue={
                                  daySlots.length &&
                                  daySlots
                                    .map((ele) => ele.round)
                                    .includes(i + 1)
                                }
                              >
                                <ChangeButton
                                  onClickButton={{
                                    onClick: () => handleOpen(i + 1),
                                  }}
                                />
                              </ShowCode.When>
                              <ShowCode.Else>
                                <SelectButton
                                  onClickButton={{
                                    onClick: () => handleOpen(i + 1),
                                  }}
                                />
                              </ShowCode.Else>
                            </ShowCode>
                          }
                        />
                      </>
                    );
                  },
                )}
              />
            </ShowCode.When>
            <ShowCode.Else>
              <AvailableSlots singleDay={true} />
            </ShowCode.Else>
          </ShowCode>
        }
      />
    </div>
  );
}

export default CandidateAvailability;
