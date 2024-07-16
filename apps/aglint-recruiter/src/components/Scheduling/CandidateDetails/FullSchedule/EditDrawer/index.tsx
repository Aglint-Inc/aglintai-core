import { Drawer, MenuItem, Stack, TextField } from '@mui/material';
import { capitalize } from 'lodash';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { InterviewMode } from '@/devlink2/InterviewMode';
import { InterviewModePill } from '@/devlink2/InterviewModePill';
import { SelectedMemberPill } from '@/devlink2/SelectedMemberPill';
import { SideDrawerBlock } from '@/devlink2/SideDrawerBlock';
import { SidedrawerBodySession } from '@/devlink2/SidedrawerBodySession';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import {
  DropDown,
  IndividualIcon,
  PanelIcon,
  ScheduleTypeField,
} from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';
import { useInterviewModules } from '@/src/queries/interview-modules';
import { getFullName } from '@/src/utils/jsonResume';
import { sessionDurations } from '@/src/utils/scheduling/const';

import { useSchedulingApplicationStore } from '../../store';
import DebriedForm from './DebriefFrom';
import { useEditSession } from './hooks';
import {
  setDebriefMembers,
  setEditSession,
  setErrorValidation,
  setSelectedInterviewers,
  setTrainingInterviewers,
  setTrainingToggle,
  useEditSessionDrawerStore,
} from './store';
import { Interviewer } from './types';

function SideDrawerEdit() {
  const { isEditOpen, members } = useSchedulingApplicationStore((state) => ({
    isEditOpen: state.isEditOpen,
    members: state.members,
  }));
  const interviewModules = useInterviewModules();

  const {
    editSession,
    selectedInterviewers,
    saving,
    trainingInterviewers,
    trainingToggle,
    debriefMembers,
    errorValidation,
  } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
    selectedInterviewers: state.selectedInterviewers,
    saving: state.saving,
    trainingInterviewers: state.trainingInterviewers,
    trainingToggle: state.trainingToggle,
    debriefMembers: state.debriefMembers,
    errorValidation: state.errorValidation,
  }));

  const { handleClose, handleSave } = useEditSession();

  let optionsInterviewers = [];
  let optionTrainees = [];
  const optionMembers = members.map((member) => ({
    name: getFullName(member.first_name, member.last_name),
    value: member.user_id,
    start_icon_url: member.profile_image,
  }));

  const moduleCurrent = interviewModules?.data?.find(
    (module) => module.id === editSession?.interview_session.module_id,
  );

  const selectedQuaInterviewerIds = selectedInterviewers.map(
    (interviewer) => interviewer.value,
  );

  if (moduleCurrent) {
    optionsInterviewers = (moduleCurrent?.members
      .filter(
        (user) =>
          user.training_status == 'qualified' &&
          selectedQuaInterviewerIds.indexOf(user.moduleUserId) === -1,
      )
      ?.map((member) => ({
        name: member.first_name + ' ' + member.last_name,
        value: member.moduleUserId,
        start_icon_url: member.profile_image,
      })) || []) as Interviewer[];

    optionTrainees = (moduleCurrent?.members
      .filter((user) => user.training_status == 'training')
      ?.map((member) => ({
        name: member.first_name + ' ' + member.last_name,
        value: member.moduleUserId,
        start_icon_url: member.profile_image,
      })) || []) as Interviewer[];
  }

  const isTraineesDropVisible =
    moduleCurrent?.members?.filter((user) => user.training_status == 'training')
      .length > 0;

  const onChange = (e, type) => {
    if (type === 'interviewer') {
      errorValidation.find(
        (err) => err.field === 'qualified_interviewers',
      ).error = false;

      setErrorValidation([...errorValidation]);

      const selectedUser = moduleCurrent?.members?.find(
        (member) => member.moduleUserId === e.target.value,
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
    } else if (type === 'trainee') {
      const selectedUser = moduleCurrent?.members?.find(
        (member) => member.moduleUserId === e.target.value,
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
    } else {
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
    }
  };

  return (
    <Drawer open={isEditOpen} onClose={() => handleClose()} anchor='right'>
      <Stack overflow={'hidden'}>
        <SideDrawerBlock
          textTitle='Edit Session'
          onClickClose={{ onClick: () => handleClose() }}
          slotSidedrawerBody={
            <Stack>
              {editSession &&
              editSession.interview_session.session_type !== 'debrief' ? (
                <SidedrawerBodySession
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
                      error={
                        errorValidation.find(
                          (err) => err.field === 'session_name',
                        ).error
                      }
                      helperText={
                        errorValidation.find(
                          (err) => err.field === 'session_name',
                        ).message
                      }
                    />
                  }
                  slotDurationDropdown={
                    <TextField
                      fullWidth
                      select
                      value={editSession.interview_session.session_duration}
                    >
                      {sessionDurations?.map((dur) => (
                        <MenuItem
                          value={dur}
                          key={dur}
                          onClick={() =>
                            setEditSession({
                              interview_session: {
                                ...editSession.interview_session,
                                session_duration: dur,
                              },
                            })
                          }
                        >
                          {getBreakLabel(dur)}
                        </MenuItem>
                      ))}
                    </TextField>
                  }
                  slotModuleDropdown={
                    <>
                      <TextField
                        fullWidth
                        select
                        value={editSession.interview_session.module_id}
                      >
                        {interviewModules?.data?.map((module) => (
                          <MenuItem
                            value={module.id}
                            key={module.id}
                            onClick={() => {
                              setEditSession({
                                interview_session: {
                                  ...editSession.interview_session,
                                  module_id: module.id,
                                },
                              });
                              setSelectedInterviewers([]);
                              setTrainingInterviewers([]);
                              setTrainingToggle(false);
                            }}
                          >
                            {capitalize(module.name)}
                          </MenuItem>
                        ))}
                      </TextField>
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
                  slotInterviewMode={
                    <InterviewMode
                      isIndividual={
                        editSession.interview_session.session_type ===
                        'individual'
                      }
                      isPanel={
                        editSession.interview_session.session_type === 'panel'
                      }
                      isTraining={true}
                      textToggleLabel={`Training ${trainingToggle ? 'On' : 'Off'}`}
                      slotToggle={
                        <AntSwitch
                          checked={trainingToggle}
                          onClick={() => {
                            setTrainingToggle(!trainingToggle);
                            setTrainingInterviewers([]);
                          }}
                        />
                      }
                      slotInterviewModePill={
                        <>
                          <InterviewModePill
                            isActive={
                              editSession.interview_session.session_type ===
                              'panel'
                            }
                            textModeName={'Panel'}
                            slotModeIcon={
                              <Stack style={{ transform: 'translateY(1px)' }}>
                                <PanelIcon />
                              </Stack>
                            }
                            onClickPill={{
                              onClick: () => {
                                setEditSession({
                                  interview_session: {
                                    ...editSession.interview_session,
                                    session_type: 'panel',
                                  },
                                });
                              },
                            }}
                          />
                          <InterviewModePill
                            isActive={
                              editSession.interview_session.session_type ===
                              'individual'
                            }
                            textModeName={'Individual'}
                            slotModeIcon={
                              <Stack style={{ transform: 'translateY(1px)' }}>
                                <IndividualIcon />
                              </Stack>
                            }
                            onClickPill={{
                              onClick: () => {
                                setEditSession({
                                  interview_session: {
                                    ...editSession.interview_session,
                                    session_type: 'individual',
                                  },
                                });
                              },
                            }}
                          />
                        </>
                      }
                      isInterviewerDropVisible={true}
                      slotMemberCountDropdown={
                        selectedInterviewers?.length > 0 ? (
                          <TextField
                            size='small'
                            name={'interviewer_cnt'}
                            type='number'
                            sx={{
                              width: '60px',
                              '& .MuiOutlinedInput-root': {
                                padding: '0px!important',
                              },
                            }}
                            value={
                              editSession.interview_session.interviewer_cnt || 1
                            }
                            onChange={(e) => {
                              setEditSession({
                                interview_session: {
                                  ...editSession.interview_session,
                                  interviewer_cnt: Number(e.target.value),
                                },
                              });
                            }}
                            select
                          >
                            {Array.from(
                              { length: selectedInterviewers.length },
                              (_, i) => i + 1,
                            ).map((num) => (
                              <MenuItem value={num} key={num}>
                                {num}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          '--'
                        )
                      }
                      slotInterviewersDropdown={
                        optionsInterviewers.length === 0 ? (
                          <UITextField
                            value='Please add members to the interview type'
                            disabled
                            fullWidth
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
                        ) : (
                          <>
                            <DropDown
                              placeholder='Select Interviewers'
                              onChange={(e) => onChange(e, 'interviewer')}
                              options={optionsInterviewers}
                              value=''
                              error={
                                errorValidation.find(
                                  (err) =>
                                    err.field === 'qualified_interviewers',
                                ).error
                              }
                              helperText={
                                errorValidation.find(
                                  (err) =>
                                    err.field === 'qualified_interviewers',
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
                                        (selected) =>
                                          selected.value !== interviewer.value,
                                      ),
                                    );
                                    setEditSession({
                                      interview_session: {
                                        ...editSession.interview_session,
                                        interviewer_cnt:
                                          selectedInterviewers.length - 1,
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
                                        (selected) =>
                                          selected.value !== interviewer.value,
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
                          onChange={(e) => onChange(e, 'trainee')}
                          options={optionTrainees}
                          value=''
                          error={
                            errorValidation.find(
                              (err) => err.field === 'training_interviewers',
                            ).error
                          }
                          helperText={
                            errorValidation.find(
                              (err) => err.field === 'training_interviewers',
                            ).message
                          }
                        />
                      }
                    />
                  }
                />
              ) : (
                editSession && <DebriedForm optionMembers={optionMembers} />
              )}
            </Stack>
          }
          slotButton={
            <>
              <ButtonSoft
                textButton='Cancel'
                color={'neutral'}
                size={2}
                onClickButton={{ onClick: () => handleClose() }}
              />
              <ButtonSolid
                isDisabled={errorValidation.some((err) => err.error)}
                textButton='Save'
                size={2}
                isLoading={saving}
                onClickButton={{
                  onClick: () => {
                    if (!saving) {
                      handleSave();
                    }
                  },
                }}
              />
            </>
          }
        />
      </Stack>
    </Drawer>
  );
}

export default SideDrawerEdit;
