import {
  APIFindAltenativeTimeSlot,
  APIFindAltenativeTimeSlotResponse,
  APIUpdateMeetingInterviewers,
} from '@aglint/shared-types';
import { Dialog, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { Dispatch, useEffect, useState } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { ChangeInterviewer } from '@/devlink3/ChangeInterviewer';
import { MemberRow } from '@/devlink3/MemberRow';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import ConflictWithHover from '../../CandidateDetails/SchedulingDrawer/StepSlotOptions/SingleDayCard/SessionIndividual/ConflictWithHover';
import {
  convertTimeZoneToAbbreviation,
  formatTimeWithTimeZone,
} from '../../utils';
import { ScheduleMeeting } from '../types';

function ChangeInterviewerDialog({
  isChangeInterviewerOpen,
  setIsChangeInterviewerOpen,
  schedule,
  cancelUserId,
  setCancelUserId,
}: {
  isChangeInterviewerOpen: boolean;
  setIsChangeInterviewerOpen: Dispatch<React.SetStateAction<boolean>>;
  schedule: ScheduleMeeting;
  cancelUserId: string;
  setCancelUserId: Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();
  const localTimezone = dayjs.tz.guess();
  const { recruiter } = useAuthDetails();
  const [loading, setLoading] = useState(true);
  const [avaialableUsers, setAvailableUsers] =
    useState<APIFindAltenativeTimeSlotResponse>([]);
  const [seletectedUserId, setSeletectedUserId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (cancelUserId) fetchInterviewers();
  }, [cancelUserId]);

  const cancelInterviewer = schedule?.users.find(
    (user) => user.id === cancelUserId,
  );

  const possibleUsers = schedule?.users.filter(
    (user) =>
      user.id !== cancelUserId &&
      !user.interview_session_relation.is_confirmed &&
      avaialableUsers.find((item) =>
        item.qualifiedIntervs.some((int) => int.user_id === user.id),
      ),
  );

  const fetchInterviewers = async () => {
    try {
      const bodyParams: APIFindAltenativeTimeSlot = {
        recruiter_id: recruiter.id,
        session_id: schedule.interview_session.id,
        ignore_interviewer: cancelInterviewer.id,
        slot_start_time: schedule.interview_meeting.start_time,
        user_tz: dayjs.tz.guess(),
        api_options: {
          include_conflicting_slots: {
            show_soft_conflicts: true,
            show_conflicts_events: true,
            out_of_working_hrs: true,
            day_off: true,
          },
        },
      };

      const res = await axios.post(
        '/api/scheduling/v1/find-alternative-time-slots',
        bodyParams,
      );
      if (res.status === 200) {
        setAvailableUsers(
          (res.data as APIFindAltenativeTimeSlotResponse).filter((item) =>
            item.qualifiedIntervs.some((int) => int.user_id !== cancelUserId),
          ),
        );
      }
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setIsSaving(false);
    setIsChangeInterviewerOpen(false);
    setAvailableUsers([]);
    setLoading(true);
    setCancelUserId('');
  };

  const onClickChange = async () => {
    try {
      setIsSaving(true);
      const selectedUser = schedule.users.find(
        (user) => user.id === seletectedUserId,
      );

      if (!selectedUser) {
        toast.error('Please select an alternate interviewer');
        return;
      }

      const restUsers = schedule.users.filter(
        (user) =>
          user.interview_session_relation.is_confirmed &&
          user.id !== cancelUserId &&
          user.interview_session_relation.accepted_status !== 'declined' &&
          user.interview_session_relation.accepted_status !==
            'request_reschedule',
      );

      const allPossibleUsers = [selectedUser, ...restUsers];

      if (selectedUser) {
        const bodyParams: APIUpdateMeetingInterviewers = {
          candidate_email: schedule.candidates.email,
          meeting_id: schedule.interview_meeting.id,
          replaced_inters: allPossibleUsers.map((user) => {
            return {
              email: user.email,
              user_id: user.id,
            };
          }),
        };

        const res = await axios.post(
          '/api/scheduling/v1/update_meeting_interviewers',
          bodyParams,
        );

        if (res.status) {
          await supabase
            .from('interview_session_cancel')
            .update({ is_resolved: true })
            .eq(
              'session_relation_id',
              cancelInterviewer.interview_session_relation.id,
            );

          await supabase
            .from('interview_session_relation')
            .update({ accepted_status: 'waiting' })
            .eq('session_id', schedule.interview_session.id);

          queryClient.invalidateQueries({
            queryKey: ['schedule_details', schedule.interview_meeting.id],
          });
        }
      }
    } catch (e) {
      toast.error('Unable to change interviewer');
    } finally {
      resetState();
    }
  };

  return (
    <Dialog
      open={isChangeInterviewerOpen}
      onClose={() => {
        if (!isSaving) resetState();
      }}
      maxWidth='lg'
    >
      {cancelInterviewer && (
        <ChangeInterviewer
          onClickClose={{
            onClick: () => {
              if (!isSaving) resetState();
            },
          }}
          textAvailableDesc={`Please select alternate interviewer available from ${dayjs(
            schedule.interview_meeting.start_time,
          ).format(
            'hh:mm A',
          )} - ${dayjs(schedule.interview_meeting.end_time).format('hh:mm A')} ${convertTimeZoneToAbbreviation(localTimezone)} on ${dayjs(schedule.interview_meeting.start_time).format('MMM DD')} instead of Brooklyn Simmons.`}
          textName={getFullName(
            cancelInterviewer.first_name,
            cancelInterviewer.last_name,
          )}
          slotProfileImage={
            <MuiAvatar
              level={getFullName(
                cancelInterviewer.first_name,
                cancelInterviewer.last_name,
              )}
              src={cancelInterviewer.profile_image}
              variant={'circular'}
              width={'100%'}
              height={'100%'}
              fontSize={'18px'}
            />
          }
          onClickChange={{
            onClick: () => {
              if (seletectedUserId) {
                if (!isSaving) onClickChange();
              } else {
                toast.warning('Please select an alternate interviewer');
              }
            },
          }}
          textDesignation={cancelInterviewer?.position || ''}
          slotInterviewerList={
            loading ? (
              <Stack>
                <Loader />
              </Stack>
            ) : (
              <Stack spacing={1}>
                {possibleUsers.length === 0 && (
                  <GlobalEmptyState
                    iconName={'person'}
                    textDesc={
                      ' No alternate interviewer found for this session'
                    }
                    styleEmpty={{
                      style: {
                        backgroundColor: 'var(--neutral-2)',
                      },
                    }}
                  />
                )}
                {possibleUsers.map((user) => {
                  const sessionConflicts = avaialableUsers.find((item) =>
                    item.qualifiedIntervs.some(
                      (int) => int.user_id === user.id,
                    ),
                  );

                  const allUserConflicts =
                    sessionConflicts?.ints_conflicts
                      .filter((item) => item.interviewer.user_id === user.id)
                      .map((item) => item.conflict_reasons)
                      .map((item) => item)
                      .flat() || [];

                  const userSoftConflicts = allUserConflicts.filter(
                    (item) => item.conflict_type === 'soft',
                  );

                  const userHardConflicts = allUserConflicts.filter(
                    (item) =>
                      item.conflict_type !== 'soft' &&
                      item.conflict_type !== 'out_of_working_hours',
                  );

                  const userOutsideWorkHours = allUserConflicts.filter(
                    (item) => item.conflict_type === 'out_of_working_hours',
                  );

                  if (!sessionConflicts) return null;

                  return (
                    <Stack
                      key={user.id}
                      onClick={() => {
                        setSeletectedUserId(user.id);
                      }}
                      p={'var(--space-2)'}
                      sx={{
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor:
                          seletectedUserId === user.id
                            ? 'var(--accent-6)'
                            : 'var(--neutral-6)',
                        borderRadius: 'var(--radius-4)',
                      }}
                    >
                      <MemberRow
                        key={user.id}
                        textRole={user.position}
                        slotInterviewerImage={
                          <MuiAvatar
                            level={getFullName(user.first_name, user.last_name)}
                            src={user.profile_image}
                            variant='rounded'
                            width={'100%'}
                            height='100%'
                          />
                        }
                        isShadow={false}
                        isReverseShadow={false}
                        textName={getFullName(user.first_name, user.last_name)}
                        textTime={formatTimeWithTimeZone({
                          start_time: sessionConflicts.start_time,
                          end_time: sessionConflicts.end_time,
                          timeZone: dayjs.tz.guess(),
                        })}
                        slotConflicts={
                          <>
                            {allUserConflicts.length === 0 && (
                              <ConflictWithHover
                                isHardConflict={false}
                                isOutsideWorkHours={false}
                                isSoftConflict={false}
                                conflictReasons={[]}
                                textCount={'No conflicts'}
                                isNoConflict={true}
                                isToolTipVisible={true}
                              />
                            )}
                            {userSoftConflicts.length > 0 && (
                              <ConflictWithHover
                                isHardConflict={false}
                                isOutsideWorkHours={false}
                                isSoftConflict={true}
                                conflictReasons={userSoftConflicts}
                                textCount={userSoftConflicts.length}
                                isNoConflict={false}
                                isToolTipVisible={true}
                              />
                            )}
                            {userHardConflicts.length > 0 && (
                              <ConflictWithHover
                                isHardConflict={true}
                                isOutsideWorkHours={false}
                                isSoftConflict={false}
                                conflictReasons={userHardConflicts}
                                textCount={userHardConflicts.length}
                                isNoConflict={false}
                                isToolTipVisible={true}
                              />
                            )}
                            {userOutsideWorkHours.length > 0 && (
                              <ConflictWithHover
                                isHardConflict={false}
                                isOutsideWorkHours={true}
                                isSoftConflict={false}
                                conflictReasons={userOutsideWorkHours}
                                textCount={userOutsideWorkHours.length}
                                isNoConflict={false}
                                isToolTipVisible={true}
                              />
                            )}
                          </>
                        }
                      />
                    </Stack>
                  );
                })}
              </Stack>
            )
          }
        />
      )}
    </Dialog>
  );
}

export default ChangeInterviewerDialog;
