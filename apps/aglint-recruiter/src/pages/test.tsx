import { useEffect } from 'react';
import { ChatApp } from '../components/ChatApp/ChatApp';
import { supabaseAdmin } from '../utils/supabase/supabaseAdmin';
import axios from 'axios';
import { supabase } from '../utils/supabase/client';

function Page() {
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <ChatApp />
    </>
  );
}

Page.publicProvider = (page) => {
  return <>{page}</>;
};

export default Page;

const fetchUsers = async (user_id: string) => {
  const users = (
    await supabase
      .from('recruiter_user')
      .select('*,calendar_sync')
      .is('is_calendar_connected', true)
      .throwOnError()
  ).data;

  await Promise.all(
    users.map((user) => {
      axios.post('/api/google-calender/resync', {
        user_id: user.user_id,
      });
    }),
  );

  return true;
};
