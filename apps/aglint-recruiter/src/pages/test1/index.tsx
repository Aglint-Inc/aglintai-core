import React, { useEffect } from 'react';

import { supabase } from '@/src/utils/supabase/client';

function TextPage1() {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await supabase
      .from('meeting_details')
      .select(
        '*,applications(*,candidates(first_name,last_name)), public_jobs(id,company), meeting_interviewers(*)',
      )
      .eq('meeting_interviewers.is_confirmed', true);
    console.log(data);
  }

  return <div>TextPage1</div>;
}

export default TextPage1;
