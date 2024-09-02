import { useEffect } from 'react';

import {
  type EditInterviewSession,
  type UpdateDebriefSession,
  editInterviewSession,
  updateDebriefSession,
} from '@/src/queries/interview-plans';
import toast from '@/src/utils/toast';

import { useGetScheduleApplication } from '../../queries/hooks';
import { setIsEditOpen, useSchedulingApplicationStore } from '../../store';
import {
  initialError,
  resetEditSessionDrawerState,
  setEditSession,
  setErrorValidation,
  setSaving,
  useEditSessionDrawerStore,
} from './store';

export const useEditSession = () => {
  const { allSessions } = useSchedulingApplicationStore((state) => ({
    allSessions: state.initialSessions,
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
      setSaving(editSession.interview_session.id);

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
      await fetchInterviewDataByApplication();
      handleClose();
    } catch (e) {
      toast.error('Error saving session. Please contact support.');
    } finally {
      setSaving(null);
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
