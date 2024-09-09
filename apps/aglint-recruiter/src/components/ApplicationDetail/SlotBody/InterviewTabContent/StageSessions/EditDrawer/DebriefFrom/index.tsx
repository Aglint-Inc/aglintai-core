import { SidedrawerBodyDebrief } from '@devlink2/SidedrawerBodyDebrief';
import { MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import UITextField from '@/components/Common/UITextField';
import { type MemberType } from '@/components/Scheduling/InterviewTypes/types';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { ScheduleTypeField } from '@/job/interview-plan/components/sessionForms';
import { type BodyParamsFetchUserDetails } from '@/pages/api/scheduling/fetchUserDetails';
import { getBreakLabel } from '@/utils/getBreakLabel';
import { sessionDurations } from '@/utils/scheduling/const';

import MembersAutoComplete, {
  MemberTypeAutoComplete,
} from '@/components/Scheduling/Common/MembersTextField';
import {
  setDebriefMembers,
  setEditSession,
  useEditSessionDrawerStore,
} from '../store';

function DebriedForm() {
  const { recruiter } = useAuthDetails();
  const [members, setMembers] = useState([]);
  const { editSession, debriefMembers, errorValidation } =
    useEditSessionDrawerStore((state) => ({
      editSession: state.editSession,
      debriefMembers: state.debriefMembers,
      errorValidation: state.errorValidation,
    }));

  const optionMembers: MemberTypeAutoComplete[] = members.map((member) => ({
    email: member.email,
    user_id: member.module_relation_id,
    profile_image: member.profile_image,
    position: member.position,
    first_name: member.first_name,
    last_name: member.last_name,
  }));

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

  const selectedUserIds = debriefMembers.map((member) => member.user_id);

  const filterDebriefMembers = optionMembers?.filter(
    (member) => !selectedUserIds.includes(member.user_id),
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
        slotMemberAvatarSelectionPill={<></>}
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
          <MembersAutoComplete
            placeholder='Select Interviewers'
            renderUsers={filterDebriefMembers}
            selectedUsers={debriefMembers}
            setSelectedUsers={setDebriefMembers}
            pillColor='var(--neutral-3)'
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
