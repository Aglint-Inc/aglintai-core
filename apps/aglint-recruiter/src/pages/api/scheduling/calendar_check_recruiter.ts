import axios from 'axios';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const userCalendarCheck = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/check_calendar_status`;

type BodyParams = {
  recruiter_id: string;
};
const calenderCheckRecruiter = async (req_body: BodyParams) => {
  const { recruiter_id } = req_body;
  const supabaseAdmin = getSupabaseServer();

  const { data: users, error } = await supabaseAdmin
    .from('recruiter_relation')
    .select('user_id')
    .eq('recruiter_id', recruiter_id);

  if (error) throw error;

  users.forEach((user) => {
    axios
      .post(userCalendarCheck, { user_id: user.user_id })
      .catch(console.error);
  });
};

export default createPageApiPostRoute(null, calenderCheckRecruiter);
