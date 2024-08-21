import { useEffect } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
function InterviewLoad() {
  //   const { recruiter } = useAuthDetails();

  //   const fetchData = async () => {
  //     const { data: all_interviewers } = await supabase
  //       .from('all_interviewers')
  //       .select('user_id,position,profile_image,first_name,last_name')
  //       .eq('recruiter_id', recruiter.id);

  //     console.log(all_interviewers);
  //     // const interviewers_ids = all_interviewers.map(
  //     //   (interviewer) => interviewer.user_id,
  //     // );
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, [recruiter.id]);
  return <>InterviewLoad</>;
}

export default InterviewLoad;
