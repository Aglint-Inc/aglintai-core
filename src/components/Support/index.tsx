import { Avatar, Drawer } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';

import { AllTickets } from '@/devlink/AllTickets';
import { InboxTickets } from '@/devlink/InboxTickets';
import { useSupportContext } from '@/src/context/SupportContext/SupportContext';
// import { Public_jobsType, Support_ticketType } from '@/src/types/data.types';
import {
  mapPriority,
  mapPriorityColor,
} from '@/src/utils/support/supportUtils';

import SupportTicketDetails from './SupportTicket';
dayjs.extend(relativeTime);

function Support() {
  const { tickets, openTicket, setOpenTicket, allChecked, setAllChecked } =
    useSupportContext();
  // useEffect(() => {
  //   console.log({ ticketx });
  // }, [ticketx]);
  // const [groupId, setGroupId] = useState<string>();
  // const [tickets, setTickets] = useState<
  //   (Support_ticketType & { jobsDetails: Public_jobsType })[]
  // >([]);
  // const [openTicket, setOpenTicket] = useState<
  //   Support_ticketType & { jobsDetails: Public_jobsType }
  // >(null);
  //   const router = useRouter();
  // const init = async () => {
  //   const id = await getGroup();
  //   if (id) {
  //     const tickets = await getTickets(id);
  //     const temp = {};
  //     tickets.map((ticket) => {
  //       return (temp[ticket.id] = false);
  //     });
  //     if (tickets.length) {
  //       const publicJobs = await getJobDetails(
  //         tickets.map((ticket) => ticket.job_id),
  //       );

  //       const temp = {};
  //       publicJobs.map((publicJob) => {
  //         temp[publicJob.id] = publicJob;
  //       });

  //       const ticketsDetail = tickets.map((ticket) => {
  //         // @ts-ignore
  //         ticket.jobsDetails = temp[ticket.job_id];
  //         return ticket as Support_ticketType & {
  //           jobsDetails: Public_jobsType;
  //         };
  //       });

  //       setTickets(ticketsDetail);
  //     }
  //     setCheckedItem(temp);
  //     // setGroupId(id);
  //   }
  // };

  // useEffect(() => {
  //   init();
  // }, []);
  return (
    <>
      <Drawer
        open={Boolean(openTicket)}
        onClose={() => {
          setOpenTicket(null);
        }}
        anchor={'right'}
      >
        <SupportTicketDetails
          ticketProp={openTicket}
          onClose={() => {
            setOpenTicket(null);
          }}
        />
      </Drawer>
      <AllTickets
        slotTicketList={tickets.map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
        onClickAllTicketCheck={{
          onClick: () => {
            setAllChecked(!allChecked);
          },
        }}
        isAllTicketChecked={allChecked}
      />
    </>
  );
}

export default Support;

const Ticket = ({ ticket }) => {
  const { setOpenTicket, allChecked } = useSupportContext();
  const [checked, setChecked] = useState(false);
  return (
    <InboxTickets
      key={ticket.id}
      textTicketsId={ticket.id}
      textAssigneeName={ticket.assign_to || 'Not Assigned'}
      textCandidateName={ticket.user_name}
      textJobRole={ticket.jobsDetails.job_title}
      isChecked={allChecked || checked}
      textStatus={ticket.state}
      textPriority={mapPriority(ticket.priority)}
      textDate={dayjs(ticket.created_at).fromNow()}
      textCompanyLocations={ticket.jobsDetails.company}
      textIssues={ticket.title}
      colorTextPriority={{
        style: {
          color: mapPriorityColor(ticket.priority),
        },
      }}
      colorBgPropsStatus={{
        style: {
          backgroundColor: mapPriorityColor(ticket.priority),
        },
      }}
      //   slotPriorityIcon={}
      slotAssigneeImage={
        <Avatar
          src=''
          alt={ticket.assign_to || 'Not Assigned'}
          sx={{ height: '100%', width: '100%' }}
        />
      }
      slotCandidateImage={
        <Avatar
          src=''
          alt={ticket.assign_to || 'Not Assigned'}
          sx={{ height: '100%', width: '100%' }}
        />
      }
      onClickCheck={{
        onClick: (e) => {
          e.stopPropagation();
          setChecked(!checked);
        },
      }}
      onClickCard={{
        onClick: () => {
          // router.push(`/support/${ticket.id}`);
          setOpenTicket(ticket);
        },
      }}
    />
  );
};
