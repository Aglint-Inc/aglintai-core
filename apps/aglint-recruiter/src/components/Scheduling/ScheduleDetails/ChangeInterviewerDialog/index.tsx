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

import { ChangeInterviewer } from '@/devlink3/ChangeInterviewer';
import { InterviewerList } from '@/devlink3/InterviewerList';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { convertTimeZoneToAbbreviation } from '../../utils';
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
      user.id !== cancelUserId && !user.interview_session_relation.is_confirmed,
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
            item.sessions.some(
              (session) =>
                session.qualifiedIntervs[0].user_id !== cancelInterviewer.id,
            ),
          ),
        );
      }
    } catch {
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
        resetState();
      }}
      maxWidth='lg'
    >
      {cancelInterviewer && (
        <ChangeInterviewer
          onClickClose={{
            onClick: () => {
              resetState();
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
              <>
                {possibleUsers.length === 0 && (
                  <Stack pl={2}>
                    No alternate interviewers in this session
                  </Stack>
                )}
                {possibleUsers.map((user) => {
                  const isAvailable =
                    avaialableUsers?.find((item) =>
                      item.sessions.find(
                        (session) =>
                          session.qualifiedIntervs[0].user_id === user.id,
                      ),
                    ).sessions[0].is_conflict === false;
                  return (
                    <Stack
                      key={user.id}
                      onClick={() => {
                        setSeletectedUserId(user.id);
                      }}
                    >
                      <InterviewerList
                        isSelected={seletectedUserId === user.id}
                        textName={
                          getFullName(user.first_name, user.last_name) +
                          ` ( ${isAvailable ? 'Available' : 'Not Available'} ) `
                        }
                        textDesignation={user.position || ''}
                        slotProfileImage={
                          <MuiAvatar
                            level={getFullName(user.first_name, user.last_name)}
                            src={user.profile_image}
                            variant={'rounded-medium'}
                          />
                        }
                      />
                    </Stack>
                  );
                })}
              </>
            )
          }
        />
      )}
    </Dialog>
  );
}

export default ChangeInterviewerDialog;
