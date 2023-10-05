import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { TicketChatBubble } from '@/devlink/TicketChatBubble';
import { TicketMessageSuggestion } from '@/devlink/TicketMessageSuggestion';
import { TicketSideDrawer } from '@/devlink/TicketSideDrawer';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  JobApplcationDB,
  Public_jobsType,
  Support_ticketType,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import {
  mapPriorityColor
} from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

import TipTapEditor from '../Common/richTextEditor/RichTextBlock';

dayjs.extend(relativeTime);

function SupportTicketDetails({
  ticketProp,
  onClose,
}: {
  ticketProp: Support_ticketType & { jobsDetails: Public_jobsType };
  onClose: () => void;
}) {
  const router = useRouter();
  const { userDetails, recruiter } = useAuthDetails();
  const [ticket, setTicket] = useState<
    Support_ticketType & { jobsDetails: Public_jobsType }
  >(null);
  const [application, setApplication] = useState<JobApplcationDB>(null);

  const sendMessage = (message: string) => {
    return updateTicket({
      // @ts-ignore
      content: [
        ...(ticket?.content ? ticket.content : []),
        {
          type: 'message',
          from: 'it_support',
          id: userDetails.user.id,
          name: recruiter?.name,
          text: message,
          timeStamp: new Date().toISOString(),
        },
      ],
    });
  };
  const updateTicket = (data: Partial<Support_ticketType[]>) => {
    return updateSupportTicketInDb({
      id: ticket.id,
      ...data,
    }).then((data) => {
      setTicket({ ...ticket, ...data });
    });
  };

  useEffect(() => {
    // getTicket(ticket_id).then((data) => {
    //   data?.job_id &&
    //     getJobDetails(data.job_id).then((jobDetails) => {
    //       // @ts-ignore
    //       setTicket({ ...data, jobDetails } as Support_ticketType & {
    //         jobsDetails: Public_jobsType;
    //       });
    //     });
    //   // console.log({ data, ticket_id });
    // });
    setTicket(ticketProp);
    ticketProp?.application_id &&
      getJobApplicationDetails(ticketProp.application_id).then(
        (data) => data && setApplication(data),
      );
  }, [ticketProp]);
  return (
    <Stack>
      {ticket && (
        <TicketSideDrawer
          textAppliedJobCompany={ticket.jobsDetails?.company}
          textAppliedJobPostedDate={
            application &&
            new Date(application?.created_at).toLocaleDateString()
          }
          // textAssignedtoName={ticket.assign_to || 'Not Assigned'}
          textAppliedJobRole={ticket.jobsDetails?.job_title}
          textCreatedDate={dayjs(ticket.created_at).fromNow()}
          textCandidateMail={ticket.email || '-'}
          textCandidateName={ticket.user_name}
          // textCandidateSite={ticket.}
          textCandidateStatus={application && application.status}
          // textPriorityLevel={mapPriority(ticket.priority)}
          // colorPropsPriorityText={{
          //   style: {
          //     color: mapPriorityColor(ticket.priority),
          //   },
          // }}
          // textStatus={ticket.state}
          // bgColorPropsStatus={{
          //   style: {
          //     backgroundColor: mapStatusColor(ticket.priority),
          //   },
          // }}
          colorPropsCandidateStatus={{
            style: {
              color: mapPriorityColor(ticket.priority),
            },
          }}
          textTicketId={ticket.id}
          textIssuesTitle={ticket.title}
          slotCandidateImage={
            <Avatar
              src={''}
              variant='rounded'
              alt={ticket.user_name}
              sx={{ height: '100%', width: '100%' }}
            />
          }
          // slotAssignedToImage={
          //   <Avatar
          //     src={''}
          //     variant='rounded'
          //     alt={ticket.user_name}
          //     sx={{ height: '100%', width: '100%' }}
          //   />
          // }
          textCandiatePhone={'-'}
          textCandidateSite={'-'}
          slotTypeMessage={<AddNewMessage sendMessage={sendMessage} />}
          slotChatBox={
            <Stack gap={2} height={'50vh'}>
              {ticket.content.map((item, index) => {
                const itemOne = item as unknown as {
                  type: string;
                  from: string;
                  id: string;
                  name: string;
                  text: string;
                  timeStamp: string;
                };
                return (
                  <TicketChatBubble
                    key={index}
                    slotChatImage={
                      // @ts-ignore
                      <Avatar
                        variant='rounded'
                        src={''}
                        alt={itemOne.name}
                        sx={{ height: '100%', width: '100%' }}
                      />
                    }
                    textMessages={
                      <Typography
                        dangerouslySetInnerHTML={{ __html: itemOne.text }}
                      />
                    }
                    textTime={dayjs(itemOne.timeStamp).fromNow()}
                    textName={itemOne.name}
                  />
                );
              })}
            </Stack>
          }
          // slotChatBox={'aslk'}
          slotMessageSuggestion={['lol', 'hi', 'hello'].map((item, index) => (
            <TicketMessageSuggestion
              textMessageSuggestion={item}
              key={index}
              onClickSuggestion={{
                onClick: () => {
                  sendMessage(item);
                },
              }}
            />
          ))}
          onClickInterviewLink={{
            onClick: () => {
              navigator.clipboard
                .writeText(
                  `https://dev.aglinthq.com/landing-page?id=${ticket.application_id}`,
                )
                .then(() => {
                  toast.message('Copied to clipboard');
                });
            },
          }}
          onClickAppliedViewJob={{
            onClick: () => {
              router.push(
                ` https://dev.aglinthq.com/job-post/${ticket.job_id}`,
              );
            },
          }}
          onClickClose={{
            onClick: onClose,
          }}
        />
      )}
    </Stack>
  );
}

export default SupportTicketDetails;

// const getTicket = async (id: string) => {
//   const { data, error } = await supabase
//     .from('support_ticket')
//     .select('*')
//     .eq('id', id);
//   if (!error && data.length) {
//     return data[0];
//   }
//   return null;
// };

// const getJobDetails = async (job_id: string) => {
//   const { data, error } = await supabase
//     .from('public_jobs')
//     .select('*')
//     .eq('id', job_id);
//   if (!error && data.length) {
//     return data;
//   }
//   return [];
// };

const getJobApplicationDetails = async (application_id: string) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('application_id', application_id);
  if (!error && data.length) {
    return data[0];
  }
  return null;
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

const AddNewMessage = ({ sendMessage }) => {
  const [message, setMessage] = useState<String>();
  return (
    <Stack gap={1}>
      {/* <TextField
        multiline
        minRows={2}
        maxRows={4}
        label='Reply'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      /> */}
      <TipTapEditor
        options={false}
        placeholder='Type Message'
        value={message}
        onChange={(e) => {
          setMessage(e.html);
        }}
      />
      <Stack direction={'row'} justifyContent={'end'}>
        <IconButton
          disabled={false}
          onClick={() => {
            // handelAddTicket();
            sendMessage(message).then(() => setMessage(''));
          }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3 13.0001H9V11.0001H3V1.8457C3 1.56956 3.22386 1.3457 3.5 1.3457C3.58425 1.3457 3.66714 1.36699 3.74096 1.4076L22.2034 11.562C22.4454 11.695 22.5337 11.9991 22.4006 12.241C22.3549 12.3241 22.2865 12.3925 22.2034 12.4382L3.74096 22.5925C3.499 22.7256 3.19497 22.6374 3.06189 22.3954C3.02129 22.3216 3 22.2387 3 22.1544V13.0001Z'
              fill='#2F3941'
            />
          </svg>
        </IconButton>
      </Stack>
    </Stack>
  );
};
