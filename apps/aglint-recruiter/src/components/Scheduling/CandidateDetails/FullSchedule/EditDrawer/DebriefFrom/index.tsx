import { InterviewSession } from '@aglint/shared-types';
import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';

import { SelectedMemberPill } from '@/devlink2/SelectedMemberPill';
import { SidedrawerBodyDebrief } from '@/devlink2/SidedrawerBodyDebrief';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { DropDown } from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import IconScheduleType from '@/src/components/Scheduling/Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '@/src/components/Scheduling/Candidates/utils';
import { MemberType } from '@/src/components/Scheduling/InterviewTypes/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { getFullName } from '@/src/utils/jsonResume';

import {
  setEditSession,
  setMembers,
  useSchedulingApplicationStore,
} from '../../../store';
import { Interviewer, schedule_type } from '..';

function DebriedForm({
  debriefMembers,
  optionMembers,
  setDebriefMembers,
}: {
  debriefMembers: Interviewer[];
  optionMembers: Interviewer[];
  setDebriefMembers: React.Dispatch<React.SetStateAction<Interviewer[]>>;
}) {
  const { recruiter } = useAuthDetails();
  const editSession = useSchedulingApplicationStore(
    (state) => state.editSession,
  );
  const members = useSchedulingApplicationStore((state) => state.members);

  const onChange = (e) => {
    const selectedUser = members?.find(
      (member) => member.user_id === e.target.value,
    );
    if (
      !debriefMembers.find(
        (interviewer) => interviewer.value === e.target.value,
      )
    ) {
      setDebriefMembers([
        ...debriefMembers,
        {
          name: getFullName(selectedUser.first_name, selectedUser.last_name),
          value: selectedUser.user_id,
          start_icon_url: selectedUser.profile_image,
        },
      ]);
    }
  };

  useEffect(() => {
    fetchAllMembers();
  }, []);

  const fetchAllMembers = async () => {
    const resMem = (await axios.post('/api/scheduling/fetchUserDetails', {
      recruiter_id: recruiter.id,
    })) as { data: MemberType[] };

    if (resMem?.data?.length > 0) {
      setMembers(resMem.data);
    }
  };

  const selectedUserIds = debriefMembers.map((member) => member.value);

  const filterDebriefMembers = optionMembers?.filter(
    (member) => !selectedUserIds.includes(member.value),
  );

  return (
    <>
      <SidedrawerBodyDebrief
        isAttendeeVisible={false}
        slotSessionNameInput={
          <UITextField
            name={'name'}
            placeholder={'Session name'}
            value={editSession.interview_session.name}
            onChange={(e) =>
              setEditSession({
                interview_session: {
                  ...editSession.interview_session,
                  name: e.target.value,
                },
              })
            }
          />
        }
        slotDurationDropdown={
          <TextField
            fullWidth
            select
            value={editSession.interview_session.session_duration}
          >
            {[30, 45, 60, 120]?.map((ses) => (
              <MenuItem
                value={ses}
                key={ses}
                onClick={() =>
                  setEditSession({
                    interview_session: {
                      ...editSession.interview_session,
                      session_duration: ses,
                    },
                  })
                }
              >
                {getBreakLabel(ses)}
              </MenuItem>
            ))}
          </TextField>
        }
        slotMemberAvatarSelectionPill={
          <>
            {debriefMembers?.map((member) => {
              return (
                <SelectedMemberPill
                  isCloseButton={true}
                  key={member.value}
                  onClickRemove={{
                    onClick: () => {
                      setDebriefMembers(
                        debriefMembers.filter(
                          (selected) => selected.value !== member.value,
                        ),
                      );
                    },
                  }}
                  textMemberName={member.name}
                  slotMemberAvatar={
                    <MuiAvatar
                      src={member.start_icon_url}
                      level={getFullName(member.name, '')}
                      variant='rounded-small'
                    />
                  }
                />
              );
            })}
          </>
        }
        slotScheduleTypeDropdown={
          <TextField
            fullWidth
            select
            value={editSession.interview_session.schedule_type}
            onChange={(e) => {
              setEditSession({
                interview_session: {
                  ...editSession.interview_session,
                  schedule_type: e.target
                    .value as InterviewSession['schedule_type'],
                },
              });
            }}
          >
            {schedule_type.map((type) => (
              <MenuItem value={type} key={type}>
                <Stack direction={'row'} spacing={2}>
                  <IconScheduleType type={type} size={5} />
                  <Typography variant='body1' color={palette.grey[800]}>
                    {getScheduleType(type)}
                  </Typography>
                </Stack>
              </MenuItem>
            ))}
          </TextField>
        }
        slotMembersDropdown={
          filterDebriefMembers.length > 0 && (
            <DropDown
              placeholder='Select Members'
              onChange={(e) => onChange(e)}
              options={filterDebriefMembers}
              value={''}
            />
          )
        }
      />
    </>
  );
}

export default DebriedForm;
