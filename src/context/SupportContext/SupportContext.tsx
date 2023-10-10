// ** React Imports
// import { useRouter } from 'next/router';
import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  NotificationsEmailAPIType,
  Public_jobsType,
  RecruiterType,
  // RecruiterType,
  Support_ticketType,
  // SupportGroupType,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

import { useAuthDetails } from '../AuthContext/AuthContext';

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
  // allGroups: SupportGroupType[];
  // userGroup: SupportGroupType;
  allFilter: {
    all: number;
    open: number;
    'in progress': number;
    Resolved: number;
    'on hold': number;
  };
  filters: { state: string };
  allAssignee: { id: string; title: string; image: string }[];
  // eslint-disable-next-line no-unused-vars
  updateTicket: (data: Partial<Support_ticketType>, id: string) => void;
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
  // allGroups: [],
  // userGroup: null,
  allFilter: {
    all: 0,
    open: 0,
    'in progress': 0,
    Resolved: 0,
    'on hold': 0,
  },
  filters: { state: 'all' },
  updateTicket: (data: Partial<Support_ticketType>, id: string) => {
    data;
    id;
  },
  allAssignee: [],
};

const SupportContext = createContext<ContextValue>(defaultProvider);
export const useSupportContext = () => useContext(SupportContext);

const SupportProvider = ({ children }) => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
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
      tickets = tickets.filter(
        (ticket) =>
          ticket.state === filters.state && ticket.assign_to === recruiter.id,
      );
    } else {
      tickets = tickets.filter((ticket) => ticket.assign_to === recruiter.id);
    }
    return tickets;
  }, [filters, allTickets]);
  const [openTicket, setOpenTicket] = useState<
    Support_ticketType & { jobsDetails: Public_jobsType }
  >(null);
  // const [allGroups, setAllGroups] = useState<SupportGroupType[]>([]);
  // const [userGroup, setUserGroup] = useState<SupportGroupType>(null);
  const [allChecked, setAllChecked] = useState(false);
  const [allAssignee, setAllAssignee] = useState<
    { id: string; title: string; image: string }[]
  >([]);

  const sendUpdateEmail = ({
    subject,
    body,
  }: {
    subject: string;
    body: string;
  }) => {
    if (openTicket.email_updates) {
      sendNotificationEmail({
        application_id: openTicket.application_id,
        details: {
          fromEmail: recruiter.email,
          fromName: recruiter.name,
          temples: {
            subject: subject,
            body: body,
          },
        },
      });
    }
  };

  const updateTicket = (data: Partial<Support_ticketType>, id: string) => {
    const update = data;
    const old = allTickets.find((ticket) => ticket.id === id);
    return updateSupportTicketInDb({
      id,
      ...data,
      content: getUpdateMessage({
        allAssignee,
        recruiter,
        oldDetails: old,
        newDetails: update,
      }),
    }).then((data) => {
      setAllTickets(
        allTickets.map((ticket) => {
          if (ticket.id === id) {
            return { ...ticket, ...data };
          }
          return ticket;
        }),
      );
      if (openTicket?.id === id) {
        setOpenTicket({ ...openTicket, ...data });
      }
      // @ts-ignore
      if (update.content) {
        const last_message = data.content[
          data.content.length - 1
        ] as unknown as {
          id: string;
          from: string;
          name: string;
          text: string;
          type: string;
          timeStamp: string;
        };
        if (last_message.type === 'message') {
          sendUpdateEmail({
            subject: `${data.id}: New Message.`,
            body: `Your Ticket have new message from <b>${last_message.name}</b> : ${last_message.text}`,
          });
        }
      } else if (update.state) {
        sendUpdateEmail({
          subject: `${data.id}: State Changed.`,
          body: `Your Ticket state is updated from <b>${old.state}</b> to <b>${data.state}</b>`,
        });
      } else if (update.assign_to) {
        sendUpdateEmail({
          subject: `${data.id}: Ticket Assignment Changed.`,
          body: `Ticket is now assigned to <b>${
            allAssignee.find((assignment) => assignment.id === data.assign_to)
              .title
          }</b>`,
        });
      } else if (update.priority) {
        sendUpdateEmail({
          subject: `${data.id}: Priority Updated.`,
          body: `Ticket state is updated from <b>${old.priority}</b> to <b>${data.priority}</b>`,
        });
      }
    });
  };

  useEffect(() => {
    if (recruiter?.id) {
      getAllAssignee(recruiter.name === 'Aglint Inc').then((data) => {
        const temp = data?.map((item) => ({
          id: item.id,
          title: item.name,
          image: item.logo,
        }));
        setAllAssignee([
          ...temp,
          { id: recruiter.id, title: recruiter.name, image: recruiter.logo },
        ]);
      });
      // getAllGroup().then((data) => {
      //   if (data.length) {
      //     setAllGroups(data);
      //     const selectedGroup = data[0];
      //     setUserGroup(selectedGroup);
      getTickets(recruiter.id).then((tickets) => {
        if (tickets.length) {
          getJobDetails(tickets.map((ticket) => ticket.job_id)).then((jobs) => {
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
          });
        }
      });
    }
    // }
    // });
  }, [recruiter]);
  return (
    <SupportContext.Provider
      value={{
        tickets,
        openTicket,
        setOpenTicket,
        allChecked,
        setAllChecked,
        // allGroups,
        // userGroup,
        allFilter,
        filters,
        updateTicket,
        allAssignee,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export { SupportContext, SupportProvider };

// const getAllGroup = async () => {
//   const { data, error } = await supabase.from('support_groups').select('*');
//   // .eq('company_id', '');
//   if (!error && data.length) {
//     return data;
//   }
//   return [];
// };

const getTickets = async (assign_to: string) => {
  const { data, error } = await supabase
    .from('support_ticket')
    .select('*')
    .eq('assign_to', assign_to);
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
const updateSupportTicketInDb = async (
  ticketData: Partial<Support_ticketType>,
) => {
  const { data, error } = await supabase
    .from('support_ticket')
    //   @ts-ignore
    .update({ updated_at: new Date().toISOString(), ...ticketData })
    .eq('id', ticketData.id)
    .select();
  if (!error && data.length) {
    return data[0];
  }
  return null;
};

const getAllAssignee = async (company?: boolean) => {
  if (company) {
    const { data, error } = await supabase.from('recruiter').select();
    if (!error && data.length) {
      return data;
    }
  } else {
    const { data, error } = await supabase
      .from('recruiter')
      .select()
      .eq('name', 'Aglint Inc');
    if (!error && data.length) {
      return data;
    }
  }
  return [];
};

const sendNotificationEmail = ({
  application_id,
  details,
}: NotificationsEmailAPIType) => {
  return axios
    .post('/api/support/notificationEmail', {
      application_id,
      details,
    })
    .then(({ data }) => {
      return data as { emailSend: boolean; error: string };
    });
};

const getUpdateMessage = ({
  recruiter,
  oldDetails,
  newDetails,
  allAssignee,
}: {
  recruiter: RecruiterType;
  oldDetails: Partial<Support_ticketType>;
  newDetails: Partial<Support_ticketType>;
  allAssignee: { id: string; title: string; image: string }[];
}) => {
  const temp: {
    id: string;
    from: string;
    name: string;
    text: string;
    type: string;
    timeStamp: string;
  } = {
    id: recruiter.id,
    from: 'support',
    type: 'update',
    name: recruiter.name,
    timeStamp: new Date().toISOString(),
    text: null,
  };
  const content = oldDetails.content;
  if (newDetails.content) {
    return content;
  } else if (newDetails.state) {
    temp.text = `Ticket Status is updated from <b>${oldDetails.state}</b> to <b>${newDetails.state}`;
  } else if (newDetails.assign_to) {
    temp.text = `Ticket is now assigned to <b>${
      allAssignee.find((assignment) => assignment.id === newDetails.assign_to)
        .title
    }</b>`;
  } else if (newDetails.priority) {
    temp.text = `Ticket Priority is updated from <b>${oldDetails.priority}</b> to <b>${newDetails.priority}</b>`;
  }
  content.push(temp);
  return content;
};
