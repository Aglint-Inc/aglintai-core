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
    if (currentSession.interview_session.session_type !== 'debrief') {
      setSelectedInterviewers(
        currentSession?.users
          ?.filter(
            (user) =>
              user.interview_session_relation.interviewer_type === 'qualified',
          )
          .map((user) => ({
            email: user.user_details.email,
            user_id: user.interview_module_relation?.user_id,
            first_name: user.user_details.first_name,
            last_name: user.user_details.last_name,
            position: user.user_details.position,
            profile_image: user.user_details.profile_image,
            module_relation_id: user.interview_module_relation?.id,
          })) || [],
      );

      const trainingInterviewers = currentSession?.users?.filter(
        (user) =>
          user.interview_session_relation.interviewer_type === 'training',
      );

      setTrainingInterviewers(
        trainingInterviewers?.map((user) => ({
          email: user.user_details.email,
          user_id: user.interview_module_relation?.user_id,
          first_name: user.user_details.first_name,
          last_name: user.user_details.last_name,
          position: user.user_details.position,
          profile_image: user.user_details.profile_image,
          module_relation_id: user.interview_module_relation?.id,
        })) || [],
      );

      if (trainingInterviewers?.length > 0) {
        setTrainingToggle(true);
      }
    } else {
      setDebriefMembers(
        currentSession?.users?.map((user) => ({
          email: user.user_details.email,
          user_id: user.interview_module_relation?.user_id,
          first_name: user.user_details.first_name,
          last_name: user.user_details.last_name,
          position: user.user_details.position,
          profile_image: user.user_details.profile_image,
        })) || [],
      );
    }
    setIsEditOpen(true);
  };

  return { onClickEdit };
};
