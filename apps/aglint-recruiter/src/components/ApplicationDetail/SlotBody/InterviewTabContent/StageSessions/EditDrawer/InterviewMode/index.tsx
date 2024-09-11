import { Switch } from '@components/ui/switch';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { GlobalBannerShort } from '@devlink2/GlobalBannerShort';
import { InterviewMode } from '@devlink2/InterviewMode';
import { useRouter } from 'next/router';

import MembersAutoComplete from '@/components/Scheduling/Common/MembersTextField';
import { useInterviewModules } from '@/queries/interview-modules';
import ROUTES from '@/utils/routing/routes';

import {
  type EditSessionDrawer,
  setErrorValidation,
  setSelectedInterviewers,
  setTrainingInterviewers,
  setTrainingToggle,
  useEditSessionDrawerStore,
} from '../store';
import CountDropDown from './CountDropDown';
import SelectSessionType from './SelectSessionType';

function InterviewModeComp() {
  const router = useRouter();
  const {
    editSession,
    selectedInterviewers,
    trainingInterviewers,
    trainingToggle,
    errorValidation,
  } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
    selectedInterviewers: state.selectedInterviewers,
    trainingInterviewers: state.trainingInterviewers,
    trainingToggle: state.trainingToggle,
    errorValidation: state.errorValidation,
  }));

  const interviewModules = useInterviewModules();

  let optionsInterviewers: EditSessionDrawer['selectedInterviewers'] = [];
  let optionTrainees: EditSessionDrawer['trainingInterviewers'] = [];

  const filterArchivedModules = interviewModules?.data?.filter(
    (module) =>
      editSession?.interview_session.module_id === module.id ||
      !module.is_archived,
  );

  const moduleCurrent = filterArchivedModules?.find(
    (module) => module.id === editSession?.interview_session.module_id,
  );

  if (moduleCurrent) {
    optionsInterviewers =
      moduleCurrent?.members
        .filter((user) => user.training_status == 'qualified')
        ?.map((member) => ({
          email: member.email,
          user_id: member.user_id,
          profile_image: member.profile_image,
          position: member.position,
          first_name: member.first_name,
          last_name: member.last_name,
          module_relation_id: member.module_relation_id,
        })) || [];

    optionTrainees =
      moduleCurrent?.members
        .filter((user) => user.training_status == 'training')
        ?.map((member) => ({
          email: member.email,
          user_id: member.user_id,
          profile_image: member.profile_image,
          position: member.position,
          first_name: member.first_name,
          last_name: member.last_name,
          module_relation_id: member.module_relation_id,
        })) || [];
  }

  const isTraineesDropVisible =
    moduleCurrent?.members?.filter((user) => user.training_status == 'training')
      .length > 0;

  return (
    <InterviewMode
      isIndividual={editSession.interview_session.session_type === 'individual'}
      isPanel={
        selectedInterviewers?.length > 1 &&
        editSession.interview_session.session_type === 'panel'
      }
      isTraining={true}
      textToggleLabel={`Training ${trainingToggle ? 'On' : 'Off'}`}
      slotToggle={
        <Switch
          checked={trainingToggle}
          onCheckedChange={(checked) => {
            setTrainingToggle(checked);
            setTrainingInterviewers([]);
          }}
        />
      }
      slotInterviewModePill={<SelectSessionType />}
      isInterviewerDropVisible={true}
      slotMemberCountDropdown={
        selectedInterviewers?.length > 0 && <CountDropDown />
      }
      slotInterviewersDropdown={
        moduleCurrent?.members.length === 0 ? (
          <GlobalBannerShort
            iconName={'warning'}
            textTitle={'Interview type has no interviewers.'}
            textDescription={
              'Please add members to the selected interview type.'
            }
            color={'error'}
            slotButtons={
              <ButtonSolid
                color={'error'}
                size={1}
                textButton={'Go to interview type'}
                onClickButton={{
                  onClick: () =>
                    router.push(
                      ROUTES['/scheduling/interview-types/[type_id]']({
                        type_id: moduleCurrent.id,
                      }),
                    ),
                }}
              />
            }
          />
        ) : (
          <>
            <MembersAutoComplete
              maxWidth='466px'
              placeholder='Select Interviewers'
              renderUsers={optionsInterviewers}
              selectedUsers={selectedInterviewers}
              setSelectedUsers={setSelectedInterviewers}
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
          </>
        )
      }
      isTrainingVisible={optionTrainees.length > 0}
      slotInterviewersAvatarSelectionPill={<></>}
      slotTraineeAvatarSelectionPill={<></>}
      isTraineesDropVisible={
        isTraineesDropVisible &&
        trainingToggle &&
        optionTrainees?.length > trainingInterviewers?.length
      }
      slotTraineesDropdown={
        <MembersAutoComplete
          maxWidth='466px'
          placeholder='Select Training Interviewers'
          renderUsers={optionTrainees}
          selectedUsers={trainingInterviewers}
          setSelectedUsers={setTrainingInterviewers}
          pillColor='var(--neutral-3)'
          error={
            errorValidation.find((err) => err.field === 'training_interviewers')
              .error
          }
          helperText={
            errorValidation.find((err) => err.field === 'training_interviewers')
              .message
          }
          onUserSelect={() => {
            setErrorValidation(
              errorValidation.map((err) =>
                err.field === 'training_interviewers'
                  ? { ...err, error: false }
                  : err,
              ),
            );
          }}
        />
      }
    />
  );
}

export default InterviewModeComp;