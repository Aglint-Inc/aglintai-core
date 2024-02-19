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
import { supabase } from '@/src/utils/supabase/client';
import { priorityOrder, statusOrder } from '@/src/utils/support/supportUtils';
import { getRandomColor } from '@/src/utils/text/textUtils';

import { useAuthDetails } from '../AuthContext/AuthContext';

type sortType =
  | 'assignee'
  | 'status'
  | 'priority'
  | 'name'
  | 'jobInfo'
  | 'lastUpdate';

interface ContextValue {
  // allTickets: (Support_ticketType & { jobsDetails: Public_jobsType })[];
  tickets: (Support_ticketType & { jobsDetails: Public_jobsType })[];
  openTicket: Support_ticketType & { jobsDetails: Public_jobsType };
  // setOpenTicket: (
  //   // eslint-disable-next-line no-unused-vars
  //   x: Support_ticketType & { jobsDetails: Public_jobsType },
  // ) => void;
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
  filters: { status: string };
  allAssignee: {
    recruiter: { id: string; title: string; image: string };
    employees: {
      user_id: string;
      first_name: string;
      last_name: string;
      profile_image: string;
    }[];
  }[];
  // eslint-disable-next-line no-unused-vars
  updateTicket: (data: Partial<Support_ticketType>, id: string) => void;
  sort: sortType;
  setSort: (
    // eslint-disable-next-line no-unused-vars
    x: sortType,
  ) => void;
  sortOrder: 1 | -1;
  // eslint-disable-next-line no-unused-vars
  setSortOrder: (x: 1 | -1) => void;
  search: string;
  // eslint-disable-next-line no-unused-vars
  setSearch: (x: string) => void;
  openTicketIndex: number;
  // eslint-disable-next-line no-unused-vars
  setOpenTicketIndex: (x: number) => void;
  randomColors: { [key: string]: string };
  loading: boolean;
}

const defaultProvider: ContextValue = {
  // allTickets: [],
  tickets: [],
  openTicket: null,
  // setOpenTicket: (x: Support_ticketType & { jobsDetails: Public_jobsType }) => {
  //   x;
  //   return;
  // },
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
  filters: { status: 'all' },
  updateTicket: (data: Partial<Support_ticketType>, id: string) => {
    data;
    id;
  },
  allAssignee: [],
  sort: 'lastUpdate',
  setSort: (x: ContextValue['sort']) => {
    x;
  },
  sortOrder: 1,
  setSortOrder: (x: 1 | -1) => {
    x;
  },
  search: '',
  setSearch: (x: string) => {
    x;
  },
  openTicketIndex: -1,
  setOpenTicketIndex: (x: number) => {
    x;
  },
  randomColors: {},
  loading: false,
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
      status: 'all',
    };
    if (router.isReady) {
      filters = { ...filters, ...(router.query as { status: string }) };
    }
    return filters;
  }, [router]);
  const [randomColors, setRandomColors] = useState<{ [key: string]: string }>(
    {},
  );
  const filteredTickets = useMemo(() => {
    const tempColor: { [key: string]: string } = {};
    let tickets =
      allTickets.filter((ticket) => {
        if (ticket.support_group_id === recruiter.id) {
          tempColor[ticket.id] = getRandomColor();
          return true;
        }
        return false;
      }) || [];
    setRandomColors(tempColor);
    // tickets.map(() => randomColor());
    if (filters.status !== 'all') {
      tickets = tickets.filter((ticket) => ticket.state === filters.status);
    }
    return tickets;
  }, [filters, allTickets]);

  const [sort, setSort] = useState<sortType>('lastUpdate');
  const [sortOrder, setSortOrder] = useState<1 | -1>(1);
  const sortedTicket = useMemo(() => {
    if (sort === 'lastUpdate') {
      return filteredTickets.sort((a, b) => {
        // @ts-ignore
        return (new Date(b.updated_at) - new Date(a.updated_at)) * sortOrder;
      });
    } else if (sort === 'priority') {
      return filteredTickets.sort((a, b) => {
        return (
          (priorityOrder[b.priority] - priorityOrder[a.priority]) * sortOrder
        );
      });
    } else if (sort === 'assignee') {
      return filteredTickets.sort((a, b) => {
        // @ts-ignore
        return a.assign_to.localeCompare(b.assign_to) * sortOrder;
      });
    } else if (sort === 'status') {
      return filteredTickets.sort((a, b) => {
        // @ts-ignore
        return (statusOrder[b.state] - statusOrder[a.state]) * sortOrder;
      });
    } else if (sort === 'name') {
      return filteredTickets.sort((a, b) => {
        // @ts-ignore
        return a.user_name.localeCompare(b.user_name) * sortOrder;
      });
    } else if (sort === 'jobInfo') {
      return filteredTickets.sort((a, b) => {
        return (
          a.jobsDetails.job_title.localeCompare(b.jobsDetails.job_title) *
          sortOrder
        );
      });
    }
    return filteredTickets;
  }, [filteredTickets, sort, sortOrder]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>();
  const tickets = useMemo(() => {
    if (!search) return sortedTicket || [];
    return sortedTicket.filter((x) => {
      return (
        x.id.toLocaleLowerCase().includes(search.toLowerCase()) ||
        x.user_name.toLocaleLowerCase().includes(search.toLowerCase()) ||
        x.title.toLocaleLowerCase().includes(search.toLowerCase()) ||
        x.jobsDetails.job_title
          .toLocaleLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [sortedTicket, search]);

  const [openTicket, setOpenTicket] = useState<
    Support_ticketType & { jobsDetails: Public_jobsType }
  >(null);
  const [openTicketIndex, setOpenTicketIndex] = useState<number>();
  // const [allGroups, setAllGroups] = useState<SupportGroupType[]>([]);
  // const [userGroup, setUserGroup] = useState<SupportGroupType>(null);
  const [allChecked, setAllChecked] = useState(false);
  const [allAssignee, setAllAssignee] = useState<
    {
      recruiter: { id: string; title: string; image: string };
      employees: {
        user_id: string;
        first_name: string;
        last_name: string;
        profile_image: string;
      }[];
    }[]
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
            allAssignee.find(
              (assignment) => assignment.recruiter.id === data.support_group_id,
            ).recruiter.title
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
      getAllAssignee(
        recruiter.name === process.env.NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_NAME,
      ).then((data) => {
        const temp = data?.map((item) => ({
          recruiter: {
            id: item.recruiter.id,
            title: item.recruiter.name,
            image: item.recruiter.logo,
          },
          employees: item.employee,
        }));
        getAllEmployee(recruiter.id).then((data) => {
          setAllAssignee([
            ...temp,
            {
              recruiter: {
                id: recruiter.id,
                title: recruiter.name,
                image: recruiter.logo,
              },
              employees: data,
            },
          ]);
        });
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
        setLoading(false);
      });
    }
    // }
    // });
  }, [recruiter?.id]);

  useEffect(() => {
    if (openTicketIndex === null) {
      return;
    }
    if (openTicketIndex === -1) {
      setOpenTicket(null);
    } else {
      setOpenTicket(tickets[Number(openTicketIndex)]);
    }
  }, [openTicketIndex]);

  return (
    <SupportContext.Provider
      value={{
        tickets,
        loading,
        openTicket,
        // setOpenTicket,
        allChecked,
        setAllChecked,
        // allGroups,
        // userGroup,
        allFilter,
        filters,
        updateTicket,
        allAssignee,
        sort,
        setSort,
        sortOrder,
        setSortOrder,
        search,
        setSearch,
        openTicketIndex,
        setOpenTicketIndex,
        randomColors,
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
    .eq('support_group_id', assign_to);
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

const getAllAdmins = async (recruiter_ids: string[]) => {
  const { error, data } = await supabase
    .from('recruiter_user')
    .select('user_id,first_name,last_name,profile_image, recruiter_id')
    .in('recruiter_id', recruiter_ids)
    .neq('join_status', 'invited');
  if (!error) {
    const temp: {
      [key: string]: [
        {
          user_id: string;
          first_name: string;
          last_name: string;
          profile_image: string;
        },
      ];
    } = {};
    data.forEach((item) => {
      temp[item.recruiter_id] = [item];
    });
    return temp;
  }
  return {};
};

const getAllAssignee = async (company?: boolean) => {
  if (company) {
    const { data, error } = await supabase
      .from('recruiter')
      .select()
      .neq('name', process.env.NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_NAME);
    if (!error && data.length) {
      const tempAdmins = await getAllAdmins(data.map((item) => item.id));
      return data.map((item) => {
        return {
          recruiter: item,
          employee: tempAdmins[item.id] ?? [],
        };
      });
    }
  } else {
    const { data, error } = await supabase
      .from('recruiter')
      .select()
      .eq('name', process.env.NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_NAME);
    if (!error && data.length) {
      // const tempAdmins = await getAllEmployee(data[0].id);
      return data.map((item) => ({ recruiter: item, employee: [] }));
    }
  }
  return [];
};

const getAllEmployee = async (recruiter_id: string) => {
  const { error, data } = await supabase
    .from('recruiter_user')
    .select('user_id,first_name,last_name,profile_image')
    .eq('recruiter_id', recruiter_id)
    .neq('join_status', 'invited');
  if (!error) {
    return data;
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
  allAssignee: {
    recruiter: { id: string; title: string; image: string };
    employees: {
      user_id: string;
      first_name: string;
      last_name: string;
      profile_image: string;
    }[];
  }[];
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
  const content = newDetails.content ? newDetails.content : oldDetails.content;
  if (newDetails.content) {
    return content;
  } else if (newDetails.state) {
    temp.text = `Ticket Status is updated from <b>${oldDetails.state}</b> to <b>${newDetails.state}`;
  } else if (newDetails.assign_to) {
    temp.text = `Ticket is now assigned to <b>${
      allAssignee.find(
        (assignment) => assignment.recruiter.id === newDetails.support_group_id,
      ).recruiter.title
    }</b>`;
  } else if (newDetails.priority) {
    temp.text = `Ticket Priority is updated from <b>${oldDetails.priority}</b> to <b>${newDetails.priority}</b>`;
  }
  content.push(temp);
  return content;
};

export const getPriorityIcon = (priority: string) => {
  if (priority.toLocaleLowerCase() === 'low') {
    return (
      <svg
        width='9'
        height='8'
        viewBox='0 0 9 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M4.5 8L0.169872 0.5L8.83013 0.5L4.5 8Z' fill='#467B7C' />
      </svg>
    );
  } else if (priority.toLocaleLowerCase() === 'highest') {
    return (
      <svg
        width='9'
        height='8'
        viewBox='0 0 9 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M4.5 0L8.83013 7.5H0.169873L4.5 0Z' fill='#D93F4C' />
      </svg>
    );
  } else {
    return (
      <svg
        width='8'
        height='8'
        viewBox='0 0 8 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect x='0.5' y='0.5' width='7' height='7' fill='#F79A3E' />
      </svg>
    );
  }
};
