import MembersAutoComplete, {
  type MemberTypeAutoComplete,
} from 'src/app/_common/components/MembersTextField';
import { ScheduleTypeField } from 'src/app/(authenticated)/jobs/[job]/(job-edit)/interview-plan/_common/components/sessionForms';

import { useTenantMembers } from '@/company/hooks';
import UITextField from '@/components/Common/UITextField';

import {
  setDebriefMembers,
  setEditSession,
  setErrorValidation,
  useEditSessionDrawerStore,
} from '../../../stores/editSessionDrawer';
import SessionDuration from '../DurationDropdown';

function DebriedForm() {
  const { members } = useTenantMembers();
  const { editSession, debriefMembers, errorValidation } =
    useEditSessionDrawerStore((state) => ({
      editSession: state.editSession,
      debriefMembers: state.debriefMembers,
      errorValidation: state.errorValidation,
    }));

  const optionMembers: MemberTypeAutoComplete[] = members.map((member) => ({
    email: member.email,
    user_id: member.user_id,
    profile_image: member?.profile_image || '',
    position: member?.position || '',
    first_name: member.first_name || '',
    last_name: member?.last_name || '',
  }));

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
            value={editSession!.interview_session.name}
            onChange={(e) =>
              setEditSession({
                interview_session: {
                  ...editSession!.interview_session,
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
            value={editSession!.interview_session.schedule_type}
            handleTypeChange={(value) => {
              setEditSession({
                interview_session: {
                  ...editSession!.interview_session,
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
            pillColor='bg-neutral-200'
            error={
              errorValidation.find(
                (err) => err.field === 'qualified_interviewers',
              )?.error
            }
            helperText={
              errorValidation.find(
                (err) => err.field === 'qualified_interviewers',
              )?.message
            }
            onUserSelect={() => {
              setErrorValidation(
                errorValidation.map((err) =>
                  err.field === 'qualified_interviewers'
                    ? { ...err, error: false }
                    : err,
                ),
              );
            }}
          />
        </div>
      </div>
    </>
  );
}

export default DebriedForm;
