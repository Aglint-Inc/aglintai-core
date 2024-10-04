import {
  type EditSessionDrawer,
  setDebriefMembers,
  setEditSession,
  setIsEditOpen,
  setSelectedInterviewers,
  setTrainingInterviewers,
  setTrainingToggle,
} from '../../../stores/editSessionDrawer';

export const useEditSession = () => {
  const onClickEdit = async (
    currentSession: EditSessionDrawer['editSession'],
  ) => {
    setEditSession(currentSession);
    if (!currentSession) return;
    if (currentSession.interview_session.session_type !== 'debrief') {
      setSelectedInterviewers(
        (currentSession?.users ?? [])
          .filter(
            (user) =>
              user?.interview_session_relation?.interviewer_type ===
              'qualified',
          )
          .map((user) => ({
            email: (user?.user_details?.email ?? null)!,
            user_id: (user?.interview_module_relation?.user_id ?? null)!,
            first_name: (user?.user_details?.first_name ?? null)!,
            last_name: (user?.user_details?.last_name ?? null)!,
            position: (user?.user_details?.position ?? null)!,
            profile_image: (user?.user_details?.profile_image ?? null)!,
            module_relation_id: (user?.interview_module_relation?.id ?? null)!,
          })) || [],
      );

      const trainingInterviewers = currentSession?.users?.filter(
        (user) =>
          user.interview_session_relation.interviewer_type === 'training',
      );

      setTrainingInterviewers(
        trainingInterviewers?.map((user) => ({
          email: (user?.user_details?.email ?? null)!,
          user_id: (user?.interview_module_relation?.user_id ?? null)!,
          first_name: (user?.user_details?.first_name ?? null)!,
          last_name: (user?.user_details?.last_name ?? null)!,
          position: (user?.user_details?.position ?? null)!,
          profile_image: (user?.user_details?.profile_image ?? null)!,
          module_relation_id: (user?.interview_module_relation?.id ?? null)!,
        })) || [],
      );

      if ((trainingInterviewers ?? []).length > 0) {
        setTrainingToggle(true);
      }
    } else {
      setDebriefMembers(
        currentSession?.users?.map((user) => ({
          email: (user?.user_details?.email ?? null)!,
          user_id: (user?.interview_module_relation?.user_id ?? null)!,
          first_name: (user?.user_details?.first_name ?? null)!,
          last_name: (user?.user_details?.last_name ?? null)!,
          position: (user?.user_details?.position ?? null)!,
          profile_image: (user?.user_details?.profile_image ?? null)!,
        })) || [],
      );
    }
    setIsEditOpen(true);
  };

  return { onClickEdit };
};
