import { useEffect } from 'react';

import {
  type EditInterviewSession,
  type UpdateDebriefSession,
  updateDebriefSession,
} from '@/queries/interview-plans';
import { api } from '@/trpc/client';
import toast from '@/utils/toast';

import {
  initialError,
  resetEditSessionDrawerState,
  setEditSession,
  setErrorValidation,
  setIsEditOpen,
  setSaving,
  useEditSessionDrawerStore,
} from '../stores/editSessionDrawer';

export const useEditSession = ({ refetch }: { refetch: () => void }) => {
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

  const { mutateAsync } = api.application.edit_session.useMutation();

  const handleSave = async () => {
    try {
      if (validate()) return;
      if (!editSession) return;

      setSaving(editSession.interview_session.id);

      const { interview_session } = editSession;
      const isNotDebrief = interview_session.session_type !== 'debrief';

      if (isNotDebrief) {
        const interview_module_relation_entries: EditInterviewSession['interview_module_relation_entries'] =
          [
            ...selectedInterviewers.map((interviewer) => {
              const int: EditInterviewSession['interview_module_relation_entries'][0] =
                {
                  interviewer_type: 'qualified',
                  id: interviewer.module_relation_id,
                  training_type: 'qualified',
                };
              return int;
            }),
            ...trainingInterviewers.map((interviewer) => {
              const int: EditInterviewSession['interview_module_relation_entries'][0] =
                {
                  interviewer_type: 'training',
                  id: interviewer.module_relation_id,
                  training_type: null,
                };
              return int;
            }),
          ];

        const {
          name,
          interview_plan_id,
          module_id,
          break_duration,
          interviewer_cnt = 1,
          location,
          schedule_type,
          session_duration,
          session_order,
        } = interview_session;

        if (!name || !interview_plan_id || !module_id) return;

        const editInterviewSessionParams: EditInterviewSession = {
          break_duration: Number(break_duration),
          interviewer_cnt,
          location: location as string,
          module_id,
          name,
          schedule_type,
          session_duration,
          session_id: interview_session.id,
          session_type: interview_session.session_type,
          interview_module_relation_entries,
          interview_plan_id,
          session_order,
        };

        mutateAsync(editInterviewSessionParams);
      } else {
        const {
          name,
          break_duration,
          location,
          schedule_type,
          session_duration,
          members_meta,
        } = interview_session;

        if (!name) return;

        const updateDebriefParams: UpdateDebriefSession = {
          break_duration: Number(break_duration),
          location: location as string,
          name,
          schedule_type,
          session_duration,
          session_id: interview_session.id,
          members: debriefMembers.map((member) => ({ id: member.user_id })),
          members_meta: members_meta as UpdateDebriefSession['members_meta'],
        };

        await updateDebriefSession(updateDebriefParams);
      }
      refetch();
      handleClose();
    } catch (e) {
      toast.error('Error saving session. Please contact support.');
    } finally {
      setSaving(null);
    }
  };

  const validate = () => {
    errorValidation[0].error = !editSession?.interview_session.name;

    if (editSession?.interview_session.session_type === 'debrief') {
      errorValidation[1].error = debriefMembers.length === 0;
    } else {
      errorValidation[1].error = selectedInterviewers.length === 0;
    }

    errorValidation[2].error =
      trainingToggle && trainingInterviewers.length === 0;

    setErrorValidation([...errorValidation]);

    return errorValidation.some((validation) => validation.error);
  };

  const handleClose = () => {
    if (saving) return;
    resetEditSessionDrawerState();
    setEditSession(null);
    setIsEditOpen(false);
  };

  return { handleSave, handleClose };
};
