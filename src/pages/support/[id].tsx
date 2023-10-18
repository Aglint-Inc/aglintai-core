import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import TicketChat from '@/src/components/Support/Create/TicketChat';
import {
  EmployeeType,
  PublicJobsType,
  SupportTicketType,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
dayjs.extend(relativeTime);

function SupportTicket() {
  const [userDetails, setUserDetails] = useState<EmployeeType>(null);
  const router = useRouter();
  const [ticket, setTicket] = useState<
    SupportTicketType & { jobDetails: PublicJobsType }
  >();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query as { id: string };
      getTicket(id).then((ticket) => setTicket(ticket));
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user) {
          supabase
            .from('employee')
            .select()
            .eq('user_id', data.session.user.id)
            .then(({ data, error }) => {
              if (!error && data.length) {
                setUserDetails(data[0]);
              }
            });
        }
      });
    }
  }, [router.isReady]);

  return <>{ticket && <TicketChat {...{ ticket, userDetails }} />}</>;
}

export default SupportTicket;
SupportTicket.getLayout = (page) => {
  return <>{page}</>;
};

const getTicket = async (id: string) => {
  const { data, error } = await supabase
    .from('support_ticket')
    .select()
    .eq('id', id);
  if (!error && data.length) {
    return { ...data[0], jobDetails: await getJobDetails(data[0].job_id) };
  }
  return null;
};

const getJobDetails = async (id: string) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select()
    .eq('id', id);
  if (!error && data.length) {
    return data[0];
  }
  return null;
};
