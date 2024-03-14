import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ModuleSchedules from '@/src/components/Scheduling/Modules/ModuleMembers/ModuleSchedules';
import { supabase } from '@/src/utils/supabase/client';

function Interviews() {
  const [interviewsData, setInterviewsData] = useState([]);
  const router = useRouter();

  const getInterviewsData = async () => {
    const { data, error } = await supabase.rpc(
      'get_interview_schedule_by_user_id',
      {
        target_user_id: router.query.member_id as string
      }
    );

    if (!error) {
      setInterviewsData(data);
    }
  };

  useEffect(() => {
    if (router.query.member_id) getInterviewsData();
  }, [router]);
  return (
    <>{interviewsData && <ModuleSchedules schedules={interviewsData} />}</>
  );
}

export default Interviews;
