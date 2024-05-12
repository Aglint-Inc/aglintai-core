import { Drawer, MenuItem, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

import {
  InterviewMode,
  InterviewModePill,
  SelectedMemberPill,
  SideDrawerBlock,
  SidedrawerBodySession,
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import {
  DropDown,
  IndividualIcon,
  PanelIcon,
} from '@/src/components/JobNewInterviewPlan/sessionForms';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSessionCache } from '@/src/pages/api/scheduling/application/candidatesessioncache';
import { useInterviewModules } from '@/src/queries/interview-modules';
import {
  EditInterviewSession,
  editInterviewSession,
  UpdateDebriefSession,
  updateDebriefSession,
} from '@/src/queries/interview-plans';
import { InterviewSession } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import IconScheduleType from '../../../ListCard/Icon';
import { useGetScheduleApplication } from '../../hooks';
import {
  setEditSession,
  setIsEditOpen,
  useSchedulingApplicationStore,
} from '../../store';
import DebriedForm from './DebriefFrom';

type Interviewer = {
  name: string;
  value: string | number;
  start_icon_url?: string;
};

function SideDrawerEdit() {
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    editSession,
    allSessions,
    selCoordinator,
    selectedApplication,
    selectedSchedule,
    isEditOpen,
    members,
  } = useSchedulingApplicationStore((state) => ({
    editSession: state.editSession,
    selectedSchedule: state.selectedSchedule,
    selCoordinator: state.selCoordinator,
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
      if (editSession.session_type !== 'debrief') {
        setSelectedInterviewers(
          editSession?.users
            ?.filter((user) => user.interviewer_type === 'qualified')
            .map((user) => ({
              name: getFullName(
                user.interview_module_relation.recruiter_user.first_name,
                user.interview_module_relation.recruiter_user.last_name,
              ),
              value: user.interview_module_relation.id,
              start_icon_url:
                user.interview_module_relation.recruiter_user.profile_image,
            })) || [],
        );

        const trainingInterviewers = editSession?.users?.filter(
          (user) => user.interviewer_type === 'training',
        );

        setTrainingInterviewers(
          trainingInterviewers?.map((user) => ({
            name: getFullName(
              user.interview_module_relation.recruiter_user.first_name,
              user.interview_module_relation.recruiter_user.last_name,
            ),
            value: user.interview_module_relation.id,
            start_icon_url:
              user.interview_module_relation.recruiter_user.profile_image,
          })),
        );

        if (trainingInterviewers?.length > 0) {
          setTrainingToggle(true);
        }
      } else {
        setDebriefMembers(
          editSession?.users?.map((user) => ({
            name: getFullName(
              user.recruiter_user.first_name,
              user.recruiter_user.last_name,
            ),
            value: user.user_id,
            start_icon_url: user.recruiter_user.profile_image,
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
    (module) => module.id === editSession?.module_id,
  );

  if (moduleCurrent) {
    optionsInterviewers = (moduleCurrent?.members
      .filter((user) => user.training_status == 'qualified')
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
          coordinator_id: selCoordinator,
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
        if (editSession.session_type !== 'debrief') {
          const newSession = createCloneRes.refSessions.find(
            (session) => session.id === editSession.id,
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

          editInterviewSession({
            break_duration: editSession.break_duration,
            interviewer_cnt: editSession.interviewer_cnt,
            location: editSession.location,
            module_id: editSession.module_id,
            name: editSession.name,
            schedule_type: editSession.schedule_type,
            session_duration: editSession.session_duration,
            session_id: newSession.newId,
            session_type: editSession.session_type,
            interview_module_relation_entries:
              interview_module_relation_entries,
          } as EditInterviewSession);
        } else {
          updateDebriefSession({
            break_duration: editSession.break_duration,
            location: editSession.location,
            name: editSession.name,
            schedule_type: editSession.schedule_type,
            session_duration: editSession.session_duration,
            session_id: createCloneRes.refSessions[0].newId,
            members: debriefMembers.map((member) => ({
              id: member.value as string,
            })),
          } as UpdateDebriefSession);
        }
      } else {
        toast.error('Error caching session.');
      }
      await fetchInterviewDataByApplication();
      handleClose();
    } else {
      if (editSession.session_type !== 'debrief') {
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

        await editInterviewSession({
          break_duration: editSession.break_duration,
          interviewer_cnt: editSession.interviewer_cnt,
          location: editSession.location,
          module_id: editSession.module_id,
          name: editSession.name,
          schedule_type: editSession.schedule_type,
          session_duration: editSession.session_duration,
          session_id: editSession.id,
          session_type: editSession.session_type,
          interview_module_relation_entries: interview_module_relation_entries,
        } as EditInterviewSession);
      } else {
        await updateDebriefSession({
          break_duration: editSession.break_duration,
          location: editSession.location,
          name: editSession.name,
          schedule_type: editSession.schedule_type,
          session_duration: editSession.session_duration,
          session_id: editSession.id,
          members: debriefMembers.map((member) => ({
            id: member.value as string,
          })),
        } as UpdateDebriefSession);
      }
      await fetchInterviewDataByApplication();
      handleClose();
    }
    setSaving(false);
  };

  return (
    <Drawer open={isEditOpen} onClose={() => handleClose()} anchor='right'>
      <Stack overflow={'hidden'}>
        {editSession && (
          <SideDrawerBlock
            onClickClose={{ onClick: () => handleClose() }}
            textPrimaryButton='Save'
            textTitle='Edit Session'
            slotSidedrawerBody={
              editSession.session_type !== 'debrief' ? (
                <SidedrawerBodySession
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
                    <TextField
                      fullWidth
                      select
                      value={editSession.session_duration}
                    >
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
                  slotModuleDropdown={
                    <TextField fullWidth select value={editSession.module_id}>
                      {interviewModules?.data?.map((module) => (
                        <MenuItem
                          value={module.id}
                          key={module.id}
                          onClick={() => {
                            setEditSession({
                              module_id: module.id,
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
                  slotInterviewMode={
                    <InterviewMode
                      isIndividual={editSession.session_type === 'individual'}
                      isPanel={editSession.session_type === 'panel'}
                      isTraining={true}
                      textToggleLabel={`Training ${trainingToggle ? 'On' : 'Off'}`}
                      slotToggle={
                        <AntSwitch
                          checked={trainingToggle}
                          onClick={() => setTrainingToggle(!trainingToggle)}
                        />
                      }
                      slotInterviewModePill={
                        <>
                          <InterviewModePill
                            isActive={editSession.session_type === 'panel'}
                            textModeName={'Panel'}
                            slotModeIcon={
                              <Stack style={{ transform: 'translateY(1px)' }}>
                                <PanelIcon />
                              </Stack>
                            }
                            onClickPill={{
                              onClick: () => {
                                setEditSession({
                                  session_type: 'panel',
                                });
                              },
                            }}
                          />
                          <InterviewModePill
                            isActive={editSession.session_type === 'individual'}
                            textModeName={'Individual'}
                            slotModeIcon={
                              <Stack style={{ transform: 'translateY(1px)' }}>
                                <IndividualIcon />
                              </Stack>
                            }
                            onClickPill={{
                              onClick: () => {
                                setEditSession({
                                  session_type: 'individual',
                                });
                              },
                            }}
                          />
                        </>
                      }
                      isInterviewerDropVisible={
                        Number(optionsInterviewers?.length) >
                        Number(selectedInterviewers?.length)
                      }
                      slotMemberCountDropdown={
                        selectedInterviewers?.length > 0 && (
                          <TextField
                            name={'interviewer_cnt'}
                            type='number'
                            sx={{ width: '60px' }}
                            value={editSession.interviewer_cnt || 1}
                            onChange={(e) => {
                              setEditSession({
                                interviewer_cnt: Number(e.target.value),
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
                                      interviewer_cnt: 1,
                                    });
                                  },
                                }}
                                textMemberName={interviewer.name}
                                slotMemberAvatar={
                                  <MuiAvatar
                                    src={interviewer.start_icon_url}
                                    level={getFullName(interviewer.name, '')}
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
                      slotTraineeAvatarSelectionPill={
                        <>
                          {trainingInterviewers?.map((interviewer) => {
                            return (
                              <SelectedMemberPill
                                key={interviewer.value}
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
                  setTrainingInterviewers={setTrainingInterviewers}
                  trainingInterviewers={trainingInterviewers}
                />
              )
            }
            onClickPrimaryButton={{
              onClick: () => {
                if (!saving) {
                  setSaving(true);
                  handleSave();
                }
              },
            }}
          />
        )}
      </Stack>
    </Drawer>
  );
}

export default SideDrawerEdit;
