import { type PublicJobsType, type SupportTicketType } from '@aglint/shared-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Seo from '@/src/components/Common/Seo';
import TicketChat from '@/src/components/Support/Create/TicketChat';
import { supabase } from '@/src/utils/supabase/client';
dayjs.extend(relativeTime);

function SupportTicket() {
  const router = useRouter();
  const [ticket, setTicket] = useState<
    SupportTicketType & { jobDetails: PublicJobsType }
  >();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query as { id: string };
      getTicket(id).then((ticket) => setTicket(ticket));
    }
  }, [router.isReady]);

  return (
    <>
      <Seo title='Support | Aglint AI' description='AI for People Products' />
      {ticket && <TicketChat {...{ ticket }} />}
    </>
  );
}

export default SupportTicket;
SupportTicket.publicProvider = (page) => {
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
