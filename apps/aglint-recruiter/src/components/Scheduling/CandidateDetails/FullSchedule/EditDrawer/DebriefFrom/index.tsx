import { MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

import { SelectedMemberPill } from '@/devlink2/SelectedMemberPill';
import { SidedrawerBodyDebrief } from '@/devlink2/SidedrawerBodyDebrief';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import {
  DropDown,
  ScheduleTypeField,
} from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { type MemberType } from '@/src/components/Scheduling/InterviewTypes/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { type BodyParamsFetchUserDetails } from '@/src/pages/api/scheduling/fetchUserDetails';
import { getFullName } from '@/src/utils/jsonResume';
import { sessionDurations } from '@/src/utils/scheduling/const';

import { setMembers, useSchedulingApplicationStore } from '../../../store';
import {
  setDebriefMembers,
  setEditSession,
  setErrorValidation,
  useEditSessionDrawerStore,
} from '../store';

function DebriedForm() {
  const { recruiter } = useAuthDetails();
  const members = useSchedulingApplicationStore((state) => state.members);
  const { editSession, debriefMembers, errorValidation } =
    useEditSessionDrawerStore((state) => ({
      editSession: state.editSession,
      debriefMembers: state.debriefMembers,
      errorValidation: state.errorValidation,
    }));

  const optionMembers = members.map((member) => ({
    name: getFullName(member.first_name, member.last_name),
    value: member.user_id,
    start_icon_url: member.profile_image,
  }));

  const onChange = (e) => {
    errorValidation.find(
      (err) => err.field === 'qualified_interviewers',
    ).error = false;

    setErrorValidation([...errorValidation]);

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
    const bodyParams: BodyParamsFetchUserDetails = {
      recruiter_id: recruiter.id,
      includeSupended: false,
      isCalendar: true,
    };
    const resMem = (await axios.post(
      '/api/scheduling/fetchUserDetails',
      bodyParams,
    )) as { data: MemberType[] };

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
          <DropDown
            placeholder='Select Members'
            onChange={(e) => onChange(e)}
            options={filterDebriefMembers}
            value={''}
            error={
              errorValidation.find(
                (err) => err.field === 'qualified_interviewers',
              ).error
            }
            helperText={
              errorValidation.find(
                (err) => err.field === 'qualified_interviewers',
              ).message
            }
          />
        }
        textMembers={'Members'}
      />
    </>
  );
}

export default DebriedForm;
