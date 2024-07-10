import { MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';

import { SelectedMemberPill } from '@/devlink2/SelectedMemberPill';
import { SidedrawerBodyDebrief } from '@/devlink2/SidedrawerBodyDebrief';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { DropDown, ScheduleTypeField } from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { MemberType } from '@/src/components/Scheduling/InterviewTypes/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { sessionDurations } from '@/src/utils/scheduling/const';

import {
  setMembers,
  useSchedulingApplicationStore,
} from '../../../store';
import { setEditSession, useEditSessionDrawerStore } from '../store';
import { Interviewer } from '../types';

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
  const editSession = useEditSessionDrawerStore(
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
            {sessionDurations?.map((ses) => (
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
          <ScheduleTypeField
            value={editSession.interview_session.schedule_type}
            handleTypeChange={(value) => {
              setEditSession({
                interview_session: {
                  ...editSession.interview_session,
                  schedule_type: value,
                },
              });
            }}
          />
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
