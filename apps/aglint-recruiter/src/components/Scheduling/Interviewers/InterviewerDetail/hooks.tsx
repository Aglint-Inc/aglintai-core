import { DatabaseTable } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export const useImrQuery = ({ user_id }) => {
  const queryClient = useQueryClient();
  const queryKey = ['interviewer_details', user_id];
  const query = useQuery({
    queryKey: ['interviewer_details', user_id],
    queryFn: () => getInterviewerDetails(user_id),
    enabled: !!user_id,
  });
  const refetch = () => queryClient.invalidateQueries({ queryKey });
  return { ...query, refetch };
};

export const useModuleRelations = ({ user_id }) => {
  const queryClient = useQueryClient();
  const queryKey = ['interviewer_module_relations', user_id];
  const query = useQuery({
    queryKey,
    queryFn: () => getModuleRelations(user_id),
    enabled: !!user_id,
  });
  const refetch = () => queryClient.invalidateQueries({ queryKey });
  return { ...query, refetch };
};

export const useTrainingProgressUser = ({ user_id }) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['progress_module_users', user_id],
    queryFn: () => fetchProgress(user_id),
    enabled: !!user_id,
  });

  const refetch = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['progress_module_users', user_id],
    });
  };

  return { ...query, refetch };
};

const fetchProgress = async (user_id: string) => {
  const { data } = await supabase
    .from('interview_training_progress')
    .select(
      '*,interview_session_relation(*,interview_session(*,interview_meeting(*)),interview_module_relation(*)),recruiter_user(first_name,last_name)',
    )
    .eq('interview_session_relation.interview_module_relation.user_id', user_id)
    .eq('interview_session_relation.is_confirmed', true)
    .not('interview_session_relation', 'is', null)
    .throwOnError();

  const resRel = data
    .filter(
      (ses) =>
        ses.interview_session_relation.interview_session.interview_meeting
          .status === 'completed',
    )
    .map((sesRel) => {
      const interview_session_relation: DatabaseTable['interview_session_relation'] =
        {
          feedback: sesRel.interview_session_relation.feedback,
          accepted_status: sesRel.interview_session_relation.accepted_status,
          id: sesRel.interview_session_relation.id,
          interview_module_relation_id:
            sesRel.interview_session_relation.interview_module_relation_id,
          interviewer_type: sesRel.interview_session_relation.interviewer_type,
          is_confirmed: sesRel.interview_session_relation.is_confirmed,
          session_id: sesRel.interview_session_relation.session_id,
          training_type: sesRel.interview_session_relation.training_type,
          user_id: sesRel.interview_session_relation.user_id,
        };
      return {
        ...sesRel,
        interview_meeting:
          sesRel.interview_session_relation.interview_session.interview_meeting,
        interview_session_relation,
        interview_module_relation:
          sesRel.interview_session_relation.interview_module_relation,
        interview_session: sesRel.interview_session_relation.interview_session,
      };
    });

  return resRel;
};

const getInterviewerDetails = async (user_id: string) => {
  return (
    await supabase
      .from('recruiter_user')
      .select('*')
      .eq('user_id', user_id)
      .single()
  ).data;
};

const getModuleRelations = async (user_id: string) => {
  return (
    await supabase
      .from('module_relations_view')
      .select('*')
      .eq('user_id', user_id)
  ).data;
};
