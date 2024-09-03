import { useRouter } from 'next/router';

import { Switch } from '@/components/ui/switch';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { InterviewMode } from '@/devlink2/InterviewMode';
import { SelectedMemberPill } from '@/devlink2/SelectedMemberPill';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { DropDown } from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { useInterviewModules } from '@/src/queries/interview-modules';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';

import {
  setEditSession,
  setErrorValidation,
  setSelectedInterviewers,
  setTrainingInterviewers,
  setTrainingToggle,
  useEditSessionDrawerStore,
} from '../store';
import { type Interviewer } from '../types';
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

  let optionsInterviewers: Interviewer[] = [];
  let optionTrainees: Interviewer[] = [];

  const filterArchivedModules = interviewModules?.data?.filter(
    (module) =>
      editSession?.interview_session.module_id === module.id ||
      !module.is_archived,
  );

  const moduleCurrent = filterArchivedModules?.find(
    (module) => module.id === editSession?.interview_session.module_id,
  );

  const selectedQuaInterviewerIds = selectedInterviewers.map(
    (interviewer) => interviewer.value,
  );

  if (moduleCurrent) {
    optionsInterviewers =
      moduleCurrent?.members
        .filter(
          (user) =>
            user.training_status == 'qualified' &&
            selectedQuaInterviewerIds.indexOf(user.moduleUserId) === -1,
        )
        ?.map((member) => ({
          name: getFullName(member.first_name, member.last_name),
          value: member.moduleUserId,
          start_icon_url: member.profile_image,
        })) || [];

    optionTrainees =
      moduleCurrent?.members
        .filter((user) => user.training_status == 'training')
        ?.map((member) => ({
          name: member.first_name + ' ' + member.last_name,
          value: member.moduleUserId,
          start_icon_url: member.profile_image,
        })) || [];
  }

  const isTraineesDropVisible =
    moduleCurrent?.members?.filter((user) => user.training_status == 'training')
      .length > 0;

  const onChangeQualified = (user_id: string) => {
    errorValidation.find(
      (err) => err.field === 'qualified_interviewers',
    ).error = false;

    setErrorValidation([...errorValidation]);

    const selectedUser = moduleCurrent?.members?.find(
      (member) => member.moduleUserId === user_id,
    );

    if (
      !selectedInterviewers.find(
        (interviewer) => interviewer.value === selectedUser.moduleUserId,
      )
    ) {
      setSelectedInterviewers([
        ...selectedInterviewers,
        {
          name: getFullName(selectedUser.first_name, selectedUser.last_name),
          value: selectedUser.moduleUserId,
          start_icon_url: selectedUser.profile_image,
        },
      ]);
    }
  };

  const onChangeTrainiess = (user_id: string) => {
    const selectedUser = moduleCurrent?.members?.find(
      (member) => member.moduleUserId === user_id,
    );

    if (
      !trainingInterviewers.find(
        (interviewer) => interviewer.value === selectedUser.moduleUserId,
      )
    ) {
      setTrainingInterviewers([
        ...trainingInterviewers,
        {
          name: getFullName(selectedUser.first_name, selectedUser.last_name),
          value: selectedUser.moduleUserId,
          start_icon_url: selectedUser.profile_image,
        },
      ]);
    }
  };

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
            <DropDown
              placeholder='Select Interviewers'
              onChange={(e) => onChangeQualified(e.target.value)}
              options={optionsInterviewers}
              value=''
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
          </>
        )
      }
      isTrainingVisible={optionTrainees.length > 0}
      slotInterviewersAvatarSelectionPill={
        <>
          {selectedInterviewers?.map((interviewer) => {
            return (
              <SelectedMemberPill
                isCloseButton={true}
                key={interviewer.value}
                onClickRemove={{
                  onClick: () => {
                    setSelectedInterviewers(
                      selectedInterviewers.filter(
                        (selected) => selected.value !== interviewer.value,
                      ),
                    );
                    setEditSession({
                      interview_session: {
                        ...editSession.interview_session,
                        interviewer_cnt: selectedInterviewers.length - 1,
                      },
                    });
                  },
                }}
                textMemberName={interviewer.name}
                slotMemberAvatar={
                  <MuiAvatar
                    src={interviewer.start_icon_url}
                    level={getFullName(interviewer.name, '')}
                    variant='rounded-small'
                  />
                }
              />
            );
          })}
        </>
      }
      slotTraineeAvatarSelectionPill={
        <>
          {trainingInterviewers?.map((interviewer) => {
            return (
              <SelectedMemberPill
                key={interviewer.value}
                isCloseButton={true}
                onClickRemove={{
                  onClick: () => {
                    setTrainingInterviewers(
                      trainingInterviewers.filter(
                        (selected) => selected.value !== interviewer.value,
                      ),
                    );
                  },
                }}
                textMemberName={interviewer.name}
                slotMemberAvatar={
                  <MuiAvatar
                    src={interviewer.start_icon_url}
                    level={getFullName(interviewer.name, '')}
                    variant='rounded-small'
                  />
                }
              />
            );
          })}
        </>
      }
      isTraineesDropVisible={
        isTraineesDropVisible &&
        trainingToggle &&
        optionTrainees?.length > trainingInterviewers?.length
      }
      slotTraineesDropdown={
        <DropDown
          placeholder='Select Interviewers'
          onChange={(e) => onChangeTrainiess(e.target.value)}
          options={optionTrainees}
          value=''
          error={
            errorValidation.find((err) => err.field === 'training_interviewers')
              .error
          }
          helperText={
            errorValidation.find((err) => err.field === 'training_interviewers')
              .message
          }
        />
      }
    />
  );
}

export default InterviewModeComp;
