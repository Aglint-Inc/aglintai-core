import axios from 'axios';
import { useEffect, useState } from 'react';

import UITextField from '@/components/Common/UITextField';
import MembersAutoComplete, {
  type MemberTypeAutoComplete,
} from '@/components/Scheduling/Common/MembersTextField';
import { type MemberType } from '@/components/Scheduling/InterviewTypes/types';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { ScheduleTypeField } from '@/job/interview-plan/components/sessionForms';
import { type BodyParamsFetchUserDetails } from '@/pages/api/scheduling/fetchUserDetails';

import {
  setDebriefMembers,
  setEditSession,
  useEditSessionDrawerStore,
} from '../../../stores/editSessionDrawer';
import SessionDuration from '../DurationDropdown';

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
      <div className='space-y-4'>
        <div>
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
        </div>
        <div>
          <SessionDuration /> 
        </div>
        <div>
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
        </div>
        <div>
          <h3 className='mb-2 text-sm font-medium'>Members</h3>
          <MembersAutoComplete
            placeholder='Select Interviewers'
            renderUsers={filterDebriefMembers}
            selectedUsers={debriefMembers}
            setSelectedUsers={setDebriefMembers}
            pillColor='neutral-200'
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
        </div>
      </div>
    </>
  );
}

export default DebriedForm;
