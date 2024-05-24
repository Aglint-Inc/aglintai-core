import { PlanCombinationRespType } from '@aglint/shared-types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { ConflictHard } from '@/devlink3/ConflictHard';
import { ConflictReason } from '@/devlink3/ConflictReason';
import { ConflictSoft } from '@/devlink3/ConflictSoft';
import { DateOption } from '@/devlink3/DateOption';
import { MemberRow } from '@/devlink3/MemberRow';
import { NoConflicts } from '@/devlink3/NoConflicts';
import { ScheduleOption } from '@/devlink3/ScheduleOption';
import { ScheduleOptionsList } from '@/devlink3/ScheduleOptionsList';
import { SessionDetails } from '@/devlink3/SessionDetails';
import { SingleDaySchedule } from '@/devlink3/SingleDaySchedule';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import { userTzDayjs } from '@/src/services/CandidateSchedule/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';

import { formatTimeWithTimeZone } from '../../utils';
import { useSchedulingApplicationStore } from '../store';

function StepSlotOptions() {
  const [groupedData, setGroupedData] = useState<
    ReturnType<typeof groupByDateRange>
  >([]);

  const schedulingOptions = useSchedulingApplicationStore(
    (state) => state.schedulingOptions,
  );

  useEffect(() => {
    setGroupedData(groupByDateRange(extractPlanData(schedulingOptions)));
  }, []);

  

  return (
    <ScheduleOptionsList
      slotDateOption={
        <>
          {groupedData?.map((item) => {
            const dates = item?.dateArray || [];
            const header = dates
              .map((date) => dayjs(date).format('MMMM DD dddd'))
              .join(' , ');
            const slots = item?.plans || [];
            const isMultiDay = dates.length > 1 ? true : false;

            return (
              <DateOption
                key={header}
                textdate={header}
                isSelected={false}
                textOptionCount={`${slots.length} options`}
                slotScheduleOption={
                  <>
                    {slots?.map((slot) => {
                      const daySessions = dates.map((date) => {
                        return {
                          date: date,
                          sessions: slot.sessions.filter(
                            (session) =>
                              dayjs(session.start_time).format('MMMM DD') ===
                              dayjs(date).format('MMMM DD'),
                          ),
                        };
                      });

                      return (
                        <>
                          <ScheduleOption
                            isSelected={false}
                            isCheckbox={false}
                            isRadio={false}
                            slotSingleDaySchedule={daySessions?.map(
                              (item, ind) => {
                                const day = item.date;
                                const sessions = item.sessions;
                                const totalTimeRange = formatTimeWithTimeZone({
                                  start_time: sessions[0].start_time,
                                  end_time:
                                    sessions[sessions.length - 1].end_time,
                                  timeZone: userTzDayjs.tz.guess(),
                                });

                                let sesAllConflicts: PlanCombinationRespType['sessions'][number]['ints_conflicts'] =
                                  [];

                                sessions.map((session) =>
                                  session.ints_conflicts.map((item) =>
                                    sesAllConflicts.push(item),
                                  ),
                                );

                                const sesSoftConflicts = sesAllConflicts
                                  .map((item) => item.conflict_reasons)
                                  .map((item) => item)
                                  .flat()
                                  .filter(
                                    (item) => item.conflict_type === 'soft',
                                  );

                                const sesHardConflicts = sesAllConflicts
                                  .map((item) => item.conflict_reasons)
                                  .map((item) => item)
                                  .flat()
                                  .filter(
                                    (item) => item.conflict_type !== 'soft',
                                  );

                                return (
                                  <SingleDaySchedule
                                    key={ind}
                                    isMultiDay={isMultiDay}
                                    textDayCount={`Day ${ind + 1}`}
                                    textDate={dayjs(day).format('MMMM DD')}
                                    textTotalTimeRange={totalTimeRange}
                                    slotConflicts={
                                      <>
                                        {sesAllConflicts.length === 0 && (
                                          <NoConflicts />
                                        )}
                                        {sesSoftConflicts.length > 0 && (
                                          <ConflictSoft
                                            textConflict={
                                              sesSoftConflicts.length
                                            }
                                          />
                                        )}
                                        {sesHardConflicts.length > 0 && (
                                          <ConflictHard
                                            textConflict={
                                              sesSoftConflicts.length
                                            }
                                          />
                                        )}
                                      </>
                                    }
                                    slotSessionDetails={
                                      <>
                                        {sessions.map((session) => {
                                          const members = [
                                            ...session.qualifiedIntervs,
                                            ...session.trainingIntervs,
                                          ];

                                          const session_name =
                                            session.session_name;
                                          const session_duration =
                                            getBreakLabel(session.duration);

                                          return (
                                            <>
                                              <SessionDetails
                                                key={session.session_id}
                                                textSessionName={session_name}
                                                textSessionDuration={
                                                  session_duration
                                                }
                                                textSessionTime={formatTimeWithTimeZone(
                                                  {
                                                    start_time:
                                                      session.start_time,
                                                    end_time: session.end_time,
                                                    timeZone:
                                                      userTzDayjs.tz.guess(),
                                                  },
                                                )}
                                                isMemberRow={true}
                                                slotMemberRow={members.map(
                                                  (member) => {
                                                    const allUserConflicts =
                                                      session.ints_conflicts
                                                        .filter(
                                                          (item) =>
                                                            item.interviewer
                                                              .user_id ===
                                                            member.user_id,
                                                        )
                                                        .map(
                                                          (item) =>
                                                            item.conflict_reasons,
                                                        )
                                                        .map((item) => item)
                                                        .flat();

                                                    const userSoftConflicts =
                                                      allUserConflicts.filter(
                                                        (item) =>
                                                          item.conflict_type ===
                                                          'soft',
                                                      );

                                                    const userHardConflicts =
                                                      allUserConflicts.filter(
                                                        (item) =>
                                                          item.conflict_type ===
                                                          'soft',
                                                      );

                                                    return (
                                                      <MemberRow
                                                        key={member.user_id}
                                                        slotInterviewerImage={
                                                          <MuiAvatar
                                                            level={getFullName(
                                                              member.first_name,
                                                              member.last_name,
                                                            )}
                                                            src={
                                                              member.profile_image
                                                            }
                                                            variant={'circular'}
                                                            width={'100%'}
                                                            height={'100%'}
                                                            fontSize={'14px'}
                                                          />
                                                        }
                                                        isShadow={
                                                          member.training_type ===
                                                          'shadow'
                                                        }
                                                        isReverseShadow={
                                                          member.training_type ===
                                                          'reverse_shadow'
                                                        }
                                                        textName={getFullName(
                                                          member.first_name,
                                                          member.last_name,
                                                        )}
                                                        textTime={formatTimeWithTimeZone(
                                                          {
                                                            start_time:
                                                              session.start_time,
                                                            end_time:
                                                              session.end_time,
                                                            timeZone:
                                                              userTzDayjs.tz.guess(),
                                                          },
                                                        )}
                                                        slotConflicts={
                                                          <>
                                                            {allUserConflicts.length ===
                                                              0 && (
                                                              <NoConflicts />
                                                            )}
                                                            {userSoftConflicts.length >
                                                              0 && (
                                                              <ConflictSoft
                                                                textConflict={
                                                                  allUserConflicts.length
                                                                }
                                                                slotConflictReason={userSoftConflicts.map(
                                                                  (
                                                                    item,
                                                                    ind,
                                                                  ) => {
                                                                    return (
                                                                      <ConflictReason
                                                                        key={
                                                                          ind
                                                                        }
                                                                        textConflictReason={
                                                                          item.conflict_event
                                                                        }
                                                                      />
                                                                    );
                                                                  },
                                                                )}
                                                              />
                                                            )}
                                                            {userHardConflicts.length >
                                                              0 && (
                                                              <ConflictHard
                                                                textConflict={
                                                                  allUserConflicts.length
                                                                }
                                                                slotConflictReason={userHardConflicts.map(
                                                                  (
                                                                    item,
                                                                    ind,
                                                                  ) => {
                                                                    return (
                                                                      <ConflictReason
                                                                        key={
                                                                          ind
                                                                        }
                                                                        textConflictReason={
                                                                          item.conflict_event
                                                                        }
                                                                      />
                                                                    );
                                                                  },
                                                                )}
                                                              />
                                                            )}
                                                          </>
                                                        }
                                                      />
                                                    );
                                                  },
                                                )}
                                              />
                                            </>
                                          );
                                        })}
                                      </>
                                    }
                                  />
                                );
                              },
                            )}
                          />
                        </>
                      );
                    })}
                  </>
                }
              />
            );
          })}
        </>
      }
    />
  );
}

export default StepSlotOptions;

function extractPlanData(
  sessionsArray: PlanCombinationRespType[],
): (PlanCombinationRespType & { dateRange: string[] })[] {
  return sessionsArray.map((plan) => ({
    plan_comb_id: plan.plan_comb_id,
    sessions: plan.sessions,
    dateRange: plan.sessions.map((session) => session.start_time.split('T')[0]),
  }));
}

function groupByDateRange(
  plansData: (PlanCombinationRespType & {
    dateRange: string[];
  })[],
): {
  dateArray: string[];
  plans: PlanCombinationRespType[];
}[] {
  const groupedData: {
    [dateRange: string]: PlanCombinationRespType[];
  } = {};

  plansData.forEach((plan) => {
    const dateRangeKey = JSON.stringify(plan.dateRange);
    if (!groupedData[String(dateRangeKey)]) {
      groupedData[String(dateRangeKey)] = [];
    }
    groupedData[String(dateRangeKey)].push({
      plan_comb_id: plan.plan_comb_id,
      sessions: plan.sessions,
    });
  });

  return Object.entries(groupedData).map(([dateRange, plans]) => ({
    dateArray: JSON.parse(dateRange),
    plans: plans.map((plan) => ({
      plan_comb_id: plan.plan_comb_id,
      sessions: plan.sessions.flatMap((session) => session),
    })),
  }));
}
