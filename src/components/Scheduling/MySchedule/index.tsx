import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import ModuleSchedules from '../Modules/ModuleMembers/ModuleSchedules';
import Loader from '../../Common/Loader';

function MySchedule() {
  const { recruiterUser } = useAuthDetails();
  const [interviewsData, setinterviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getInterviewers() {
    const user_id = recruiterUser.user_id;
    const { data, error } = await supabase.rpc(
      'get_interview_schedule_by_user_id',
      {
        target_user_id: user_id
      }
    );

    if (!error) {
      setinterviewsData(data);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (recruiterUser.user_id) getInterviewers();
  }, [recruiterUser]);
  if (loading) {
    return <Loader />;
  } else
    return (
      <Stack p={'20px'}>{<ModuleSchedules schedules={interviewsData} />}</Stack>
    );
}

export default MySchedule;
