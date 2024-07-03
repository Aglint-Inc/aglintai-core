import { DatabaseEnums, InterviewSession } from '@aglint/shared-types';
import { Drawer, MenuItem, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

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
} from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { ApiBodyParamsSessionCache } from '@/src/pages/api/scheduling/application/candidatesessioncache';
import { useInterviewModules } from '@/src/queries/interview-modules';
import {
  EditInterviewSession,
  editInterviewSession,
  UpdateDebriefSession,
  updateDebriefSession,
} from '@/src/queries/interview-plans';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import IconScheduleType from '../../../Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '../../../Candidates/utils';
import { useGetScheduleApplication } from '../../hooks';
import {
  setEditSession,
  setIsEditOpen,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../../store';
import DebriedForm from './DebriefFrom';

export type Interviewer = {
  name: string;
  value: string | number;
  start_icon_url?: string;
};

function SideDrawerEdit() {
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    editSession,
    allSessions,
    selectedApplication,
    selectedSchedule,
    isEditOpen,
    members,
  } = useSchedulingApplicationStore((state) => ({
    editSession: state.editSession,
    selectedSchedule: state.selectedSchedule,
    allSessions: state.initialSessions,
    selectedApplication: state.selectedApplication,
    isEditOpen: state.isEditOpen,
    members: state.members,
  }));
  const { fetchInterviewDataByApplication } = useGetScheduleApplication();
  const interviewModules = useInterviewModules();

  const [selectedInterviewers, setSelectedInterviewers] = useState<
    Interviewer[]
  >([]);
  const [trainingInterviewers, setTrainingInterviewers] = useState<
    Interviewer[]
  >([]);
  const [debriefMembers, setDebriefMembers] = useState<Interviewer[]>([]);
  const [trainingToggle, setTrainingToggle] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editSession) {
      if (editSession.interview_session.session_type !== 'debrief') {
        setSelectedInterviewers(
          editSession?.users
            ?.filter(
              (user) =>
                user.interview_session_relation.interviewer_type ===
                'qualified',
            )
            .map((user) => ({
              name: getFullName(
                user.user_details.first_name,
                user.user_details.last_name,
              ),
              value: user.interview_module_relation?.id,
              start_icon_url: user.user_details.profile_image,
            })) || [],
        );

        const trainingInterviewers = editSession?.users?.filter(
          (user) =>
            user.interview_session_relation.interviewer_type === 'training',
        );

        setTrainingInterviewers(
          trainingInterviewers?.map((user) => ({
            name: getFullName(
              user.user_details.first_name,
              user.user_details.last_name,
            ),
            value: user.interview_module_relation.id,
            start_icon_url: user.user_details.profile_image,
          })),
        );

        if (trainingInterviewers?.length > 0) {
          setTrainingToggle(true);
        }
      } else {
        setDebriefMembers(
          editSession?.users?.map((user) => ({
            name: getFullName(
              user.user_details.first_name,
              user.user_details.last_name,
            ),
            value: user.user_details.user_id,
            start_icon_url: user.user_details.profile_image,
          })),
        );
      }
    }
  }, [editSession?.users]);

  const handleClose = () => {
    setIsEditOpen(false);
  };

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

  const handleSave = async () => {
    if (!selectedSchedule && !saving) {
      const res = await axios.post(
        '/api/scheduling/application/candidatesessioncache',
        {
          allSessions,
          application_id: selectedApplication.id,
          is_get_more_option: false,
          scheduleName: `Interview for ${selectedApplication.public_jobs.job_title} - ${selectedApplication.candidates.first_name}`,
          session_ids: [],
          recruiter_id: recruiter.id,
          rec_user_id: recruiterUser.user_id,
        } as ApiBodyParamsSessionCache,
      );

      let createCloneRes;

      if (res.status === 200 && res.data) {
        createCloneRes = res.data;
      }
      if (createCloneRes) {
        if (editSession.interview_session.session_type !== 'debrief') {
          const newSession = createCloneRes.refSessions.find(
            (session) => session.id === editSession.interview_session.id,
          );

          const interview_module_relation_entries: EditInterviewSession['interview_module_relation_entries'] =
            [];

          selectedInterviewers.forEach((interviewer) => {
            interview_module_relation_entries.push({
              interviewer_type: 'qualified',
              id: interviewer.value as string,
              training_type: 'qualified',
            });
          });

          trainingInterviewers.forEach((interviewer) => {
            interview_module_relation_entries.push({
              interviewer_type: 'training',
              id: interviewer.value as string,
              training_type: null,
            });
          });

          const editInterviewSessionParams: EditInterviewSession = {
            break_duration: editSession.interview_session.break_duration,
            interviewer_cnt: editSession.interview_session.interviewer_cnt,
            location: editSession.interview_session.location,
            module_id: editSession.interview_session.module_id,
            name: editSession.interview_session.name,
            schedule_type: editSession.interview_session.schedule_type,
            session_duration: editSession.interview_session.session_duration,
            session_id: newSession.newId,
            session_type: editSession.interview_session.session_type,
            interview_module_relation_entries:
              interview_module_relation_entries,
          };

          editInterviewSession(editInterviewSessionParams);
        } else {
          const updateDebriefParams: UpdateDebriefSession = {
            break_duration: editSession.interview_session.break_duration,
            location: editSession.interview_session.location,
            name: editSession.interview_session.name,
            schedule_type: editSession.interview_session.schedule_type,
            session_duration: editSession.interview_session.session_duration,
            session_id: createCloneRes.refSessions[0].newId,
            members: debriefMembers.map((member) => ({
              id: member.value as string,
            })),
            members_meta: editSession.interview_session.members_meta,
          };
          updateDebriefSession(updateDebriefParams);
        }
      } else {
        toast.error('Error caching session.');
      }
      handleClose();
    } else {
      if (editSession.interview_session.session_type !== 'debrief') {
        const interview_module_relation_entries = [];
        selectedInterviewers.forEach((interviewer) => {
          interview_module_relation_entries.push({
            interviewer_type: 'qualified',
            id: interviewer.value,
            training_type: 'qualified',
          });
        });

        trainingInterviewers.forEach((interviewer) => {
          interview_module_relation_entries.push({
            interviewer_type: 'training',
            id: interviewer.value,
            training_type: null,
          });
        });

        const editInterviewSessionParams: EditInterviewSession = {
          break_duration: editSession.interview_session.break_duration,
          interviewer_cnt: editSession.interview_session.interviewer_cnt,
          location: editSession.interview_session.location,
          module_id: editSession.interview_session.module_id,
          name: editSession.interview_session.name,
          schedule_type: editSession.interview_session.schedule_type,
          session_duration: editSession.interview_session.session_duration,
          session_id: editSession.interview_session.id,
          session_type: editSession.interview_session.session_type,
          interview_module_relation_entries: interview_module_relation_entries,
        };

        await editInterviewSession(editInterviewSessionParams);
      } else {
        const updateDebriefParams: UpdateDebriefSession = {
          break_duration: editSession.interview_session.break_duration,
          location: editSession.interview_session.location,
          name: editSession.interview_session.name,
          schedule_type: editSession.interview_session.schedule_type,
          session_duration: editSession.interview_session.session_duration,
          session_id: editSession.interview_session.id,
          members: debriefMembers.map((member) => ({
            id: member.value as string,
          })),
          members_meta: editSession.interview_session.members_meta,
        };
        await updateDebriefSession(updateDebriefParams);
      }

      handleClose();
    }
    await fetchInterviewDataByApplication();
    setSelectedSessionIds([]);
    setSaving(false);
  };

  return (
    <Drawer open={isEditOpen} onClose={() => handleClose()} anchor='right'>
      <Stack overflow={'hidden'}>
        {editSession && (
          <SideDrawerBlock
            textTitle='Edit Session'
            onClickClose={{ onClose: () => handleClose() }}
            slotSidedrawerBody={
              <Stack>
                {editSession.interview_session.session_type !== 'debrief' ? (
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
                      />
                    }
                    slotDurationDropdown={
                      <TextField
                        fullWidth
                        select
                        value={editSession.interview_session.session_duration}
                      >
                        {[30, 45, 60, 120]?.map((dur) => (
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
                              <Typography
                                variant='body1'
                                color={palette.grey[800]}
                              >
                                {getScheduleType(type)}
                              </Typography>
                            </Stack>
                          </MenuItem>
                        ))}
                      </TextField>
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
                        isInterviewerDropVisible={
                          moduleCurrent?.members.filter(
                            (user) => user.training_status == 'qualified',
                          ).length > Number(selectedInterviewers?.length)
                        }
                        slotMemberCountDropdown={
                          selectedInterviewers?.length > 0 && (
                            <TextField
                              name={'interviewer_cnt'}
                              type='number'
                              sx={{ width: '60px' }}
                              value={
                                editSession.interview_session.interviewer_cnt ||
                                1
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
                          )
                        }
                        slotInterviewersDropdown={
                          <DropDown
                            placeholder='Select Interviewers'
                            onChange={(e) => onChange(e, 'interviewer')}
                            options={optionsInterviewers}
                            value=''
                          />
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
                                            selected.value !==
                                            interviewer.value,
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
                                            selected.value !==
                                            interviewer.value,
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
                          />
                        }
                      />
                    }
                  />
                ) : (
                  <DebriedForm
                    debriefMembers={debriefMembers}
                    optionMembers={optionMembers}
                    setDebriefMembers={setDebriefMembers}
                  />
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
                  textButton='Save'
                  size={2}
                  onClickButton={{
                    onClick: () => {
                      if (!saving) {
                        setSaving(true);
                        handleSave();
                      }
                    },
                  }}
                />
              </>
            }
          />
        )}
      </Stack>
    </Drawer>
  );
}

export default SideDrawerEdit;

export const schedule_type: DatabaseEnums['interview_schedule_type'][] = [
  'google_meet',
  'zoom',
  'phone_call',
  'in_person_meeting',
];
