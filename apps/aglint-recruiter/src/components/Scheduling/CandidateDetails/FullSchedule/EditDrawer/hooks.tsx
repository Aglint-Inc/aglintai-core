import axios from 'axios';
import { useEffect } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSessionCache } from '@/src/pages/api/scheduling/application/candidatesessioncache';
import {
  EditInterviewSession,
  editInterviewSession,
  UpdateDebriefSession,
  updateDebriefSession,
} from '@/src/queries/interview-plans';
import { createCloneSession } from '@/src/utils/scheduling/createCloneSession';
import toast from '@/src/utils/toast';

import { useGetScheduleApplication } from '../../hooks';
import { setIsEditOpen, setSelectedTasks, useSchedulingApplicationStore } from '../../store';
import { getTaskDetails } from '../../utils';
import {
  initialError,
  resetEditSessionDrawerState,
  setEditSession,
  setErrorValidation,
  setSaving,
  useEditSessionDrawerStore,
} from './store';

export const useEditSession = () => {
  const { recruiter, recruiterUser } = useAuthDetails();
  const { allSessions, selectedApplication, selectedSchedule } =
    useSchedulingApplicationStore((state) => ({
      selectedSchedule: state.selectedSchedule,
      allSessions: state.initialSessions,
      selectedApplication: state.selectedApplication,
    }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  const {
    editSession,
    selectedInterviewers,
    saving,
    trainingInterviewers,
    debriefMembers,
    trainingToggle,
    errorValidation,
  } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
    selectedInterviewers: state.selectedInterviewers,
    saving: state.saving,
    trainingInterviewers: state.trainingInterviewers,
    debriefMembers: state.debriefMembers,
    trainingToggle: state.trainingToggle,
    errorValidation: state.errorValidation,
  }));

  useEffect(() => {
    if (!editSession?.interview_session?.id) {
      setErrorValidation(initialError());
    } else {
      validate();
    }
  }, [editSession?.interview_session?.id]);

  const isDebrief = allSessions
    .filter(
      (ses) => editSession?.interview_session.id === ses.interview_session.id,
    )
    .some((ses) => ses.interview_session.session_type === 'debrief');

  const handleSave = async () => {
    try {
      if (validate()) return;
      if (!isDebrief) {
        if (selectedInterviewers.length === 0) {
          return;
        }
      } else {
        if (debriefMembers.length === 0) {
          return;
        }
      }
      setSaving(true);
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

        let createCloneRes: Awaited<ReturnType<typeof createCloneSession>>;

        if (res.status === 200 && res.data) {
          createCloneRes = res.data;
        }

        if (createCloneRes) {
          if (editSession.interview_session.session_type !== 'debrief') {
            const newSession = createCloneRes.refSessions.find(
              (session) =>
                session.interview_session.id ===
                editSession.interview_session.id,
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
            const data = await getTaskDetails(selectedApplication.id);
            setSelectedTasks(data);
            toast.success('Session saved successfully.');
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
            interviewer_cnt: editSession.interview_session.interviewer_cnt || 1,
            location: editSession.interview_session.location,
            module_id: editSession.interview_session.module_id,
            name: editSession.interview_session.name,
            schedule_type: editSession.interview_session.schedule_type,
            session_duration: editSession.interview_session.session_duration,
            session_id: editSession.interview_session.id,
            session_type: editSession.interview_session.session_type,
            interview_module_relation_entries:
              interview_module_relation_entries,
          };

          await editInterviewSession(editInterviewSessionParams);
          toast.success('Session saved successfully.');
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
      }
      handleClose();
      await fetchInterviewDataByApplication();
    } catch (e) {
      toast.error('Error saving session. Please contact support.');
    } finally {
      setSaving(false);
    }
  };

  const validate = () => {
    let isError = false;

    if (!editSession.interview_session.name) {
      errorValidation[0].error = true;
      isError = true;
    } else {
      errorValidation[0].error = false;
    }

    if (
      editSession.interview_session.session_type === 'debrief' &&
      debriefMembers.length === 0
    ) {
      errorValidation[1].error = true;
      isError = true;
    } else if (
      editSession.interview_session.session_type !== 'debrief' &&
      selectedInterviewers.length === 0
    ) {
      errorValidation[1].error = true;
      isError = true;
    } else {
      errorValidation[1].error = false;
    }

    if (trainingToggle && trainingInterviewers.length === 0) {
      errorValidation[2].error = true;
      isError = true;
    } else {
      errorValidation[2].error = false;
    }

    setErrorValidation([...errorValidation]);
    return isError;
  };

  const handleClose = () => {
    if (saving) return;
    resetEditSessionDrawerState();
    setEditSession(null);
    setIsEditOpen(false);
  };

  return { handleSave, handleClose };
};
