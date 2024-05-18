import { InterviewSession } from '@aglint/shared-types';
import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';

import { SelectedMemberPill, SidedrawerBodyDebrief } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { DropDown } from '@/src/components/JobNewInterviewPlan/sessionForms';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import IconScheduleType from '@/src/components/Scheduling/Candidates/ListCard/Icon';
import { MemberType } from '@/src/components/Scheduling/InterviewTypes/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import {
  setEditSession,
  setMembers,
  useSchedulingApplicationStore,
} from '../../../store';

function DebriedForm({
  debriefMembers,
  trainingInterviewers,
  setTrainingInterviewers,
  optionMembers,
  setDebriefMembers,
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

  return (
    <SidedrawerBodyDebrief
      slotSessionNameInput={
        <UITextField
          name={'name'}
          placeholder={'Session name'}
          value={editSession.name}
          onChange={(e) =>
            setEditSession({
              name: e.target.value,
            })
          }
        />
      }
      slotDurationDropdown={
        <TextField fullWidth select value={editSession.session_duration}>
          {[30, 45, 60, 120]?.map((ses) => (
            <MenuItem
              value={ses}
              key={ses}
              onClick={() =>
                setEditSession({
                  session_duration: ses,
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
                key={member.value}
                onClickRemove={{
                  onClick: () => {
                    setTrainingInterviewers(
                      trainingInterviewers.filter(
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
                    variant='circular'
                    fontSize='10px'
                    height='100%'
                    width='100%'
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
          value={editSession.schedule_type}
          onChange={(e) => {
            setEditSession({
              schedule_type: e.target
                .value as InterviewSession['schedule_type'],
            });
          }}
        >
          <MenuItem value='google_meet'>
            <Stack direction={'row'} spacing={2}>
              <IconScheduleType type='google_meet' />
              <Typography variant='body2' color={'#000'}>
                Google Meet
              </Typography>
            </Stack>
          </MenuItem>
          <MenuItem value='zoom'>
            <Stack direction={'row'} spacing={2}>
              <IconScheduleType type='zoom' />
              <Typography variant='body2' color={'#000'}>
                Zoom
              </Typography>
            </Stack>
          </MenuItem>
          <MenuItem value='phone_call'>
            <Stack direction={'row'} spacing={2}>
              <IconScheduleType type='phone_call' />
              <Typography variant='body2' color={'#000'}>
                Phone Call
              </Typography>
            </Stack>
          </MenuItem>
          <MenuItem value='in_person_meeting'>
            <Stack direction={'row'} spacing={2}>
              <IconScheduleType type='in_person_meeting' />
              <Typography variant='body2' color={'#000'}>
                In Person Meeting
              </Typography>
            </Stack>
          </MenuItem>
        </TextField>
      }
      slotMembersDropdown={
        <DropDown
          placeholder='Select Members'
          onChange={(e) => onChange(e)}
          options={optionMembers}
          value=''
        />
      }
    />
  );
}

export default DebriedForm;
