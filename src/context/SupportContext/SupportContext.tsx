// ** React Imports
// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  Public_jobsType,
  Support_ticketType,
  SupportGroupType,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

interface ContextValue {
  // allTickets: (Support_ticketType & { jobsDetails: Public_jobsType })[];
  tickets: (Support_ticketType & { jobsDetails: Public_jobsType })[];
  openTicket: Support_ticketType & { jobsDetails: Public_jobsType };
  setOpenTicket: (
    // eslint-disable-next-line no-unused-vars
    x: Support_ticketType & { jobsDetails: Public_jobsType },
  ) => void;
  allChecked: boolean;
  // eslint-disable-next-line no-unused-vars
  setAllChecked: (x: boolean) => void;
  allGroups: SupportGroupType[];
  userGroup: SupportGroupType;
  allFilter: {
    all: number;
    open: number;
    'in progress': number;
    Resolved: number;
    'on hold': number;
  };
  filters: { state: string };
}

const defaultProvider = {
  allTickets: [],
  tickets: [],
  openTicket: null,
  setOpenTicket: (x: Support_ticketType & { jobsDetails: Public_jobsType }) => {
    x;
    return;
  },
  allChecked: false,
  setAllChecked: (x) => {
    x;
    return;
  },
  allGroups: [],
  userGroup: null,
  allFilter: {
    all: 0,
    open: 0,
    'in progress': 0,
    Resolved: 0,
    'on hold': 0,
  },
  filters: { state: 'all' },
};

const SupportContext = createContext<ContextValue>(defaultProvider);
export const useSupportContext = () => useContext(SupportContext);

const SupportProvider = ({ children }) => {
  const router = useRouter();
  const [allTickets, setAllTickets] = useState<
    (Support_ticketType & { jobsDetails: Public_jobsType })[]
  >([]);
  const allFilter = useMemo(() => {
    const allFilter = {
      all: allTickets.length,
      open: 0,
      'in progress': 0,
      Resolved: 0,
      'on hold': 0,
    };
    allTickets.map((ticket) => {
      allFilter[ticket.state]++;
    });

    return allFilter;
  }, [allTickets]);
  const filters = useMemo(() => {
    let filters = {
      state: 'all',
    };
    if (router.isReady) {
      filters = { ...filters, ...(router.query as { state: string }) };
    }
    return filters;
  }, [router]);

  const tickets = useMemo(() => {
    let tickets = allTickets;
    if (filters.state !== 'all') {
      tickets = tickets.filter((ticket) => ticket.state === filters.state);
    }
    return tickets;
  }, [filters, allTickets]);
  const [openTicket, setOpenTicket] = useState<
    Support_ticketType & { jobsDetails: Public_jobsType }
  >(null);
  const [allGroups, setAllGroups] = useState<SupportGroupType[]>([]);
  const [userGroup, setUserGroup] = useState<SupportGroupType>(null);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    getAllGroup().then((data) => {
      if (data.length) {
        setAllGroups(data);
        const selectedGroup = data[0];
        setUserGroup(selectedGroup);
        getTickets(selectedGroup.id).then((tickets) => {
          if (tickets.length) {
            getJobDetails(tickets.map((ticket) => ticket.job_id)).then(
              (jobs) => {
                const temp = {};
                jobs.map((publicJob) => {
                  temp[publicJob.id] = publicJob;
                });
                const ticketsDetail = tickets.map((ticket) => {
                  // @ts-ignore
                  ticket.jobsDetails = temp[ticket.job_id];
                  return ticket as Support_ticketType & {
                    jobsDetails: Public_jobsType;
                  };
                });
                setAllTickets(ticketsDetail);
              },
            );
          }
        });
      }
    });
  }, []);
  return (
    <SupportContext.Provider
      value={{
        tickets,
        openTicket,
        setOpenTicket,
        allChecked,
        setAllChecked,
        allGroups,
        userGroup,
        allFilter,
        filters,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export { SupportContext, SupportProvider };

const getAllGroup = async () => {
  const { data, error } = await supabase.from('support_groups').select('*');
  // .eq('company_id', '');
  if (!error && data.length) {
    return data;
  }
  return [];
};

const getTickets = async (group_id: string) => {
  const { data, error } = await supabase
    .from('support_ticket')
    .select('*')
    .eq('support_group_id', group_id);
  // .eq('company_id', '');
  if (!error && data.length) {
    return data;
  }
  return [];
};

const getJobDetails = async (job_ids: string[]) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select('*')
    .in('id', job_ids);
  if (!error && data.length) {
    return data;
  }
  return [];
};
