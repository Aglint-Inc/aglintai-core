import { type PublicJobsType, type SupportTicketType } from '@aglint/shared-types';
import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';

import { CandidateChat } from '@/devlink/CandidateChat';
import { TicketChatBubble } from '@/devlink/TicketChatBubble';
import { TicketStatusDivider } from '@/devlink/TicketStatusDivider';
import { TicketTimeDivider } from '@/devlink/TicketTimeDivider';
import { getDayFormate } from '@/src/utils/dayUtils/dayUtils';
import { supabase } from '@/src/utils/supabase/client';
import { capitalize } from '@/src/utils/text/textUtils';

import TipTapEditor from '../../Common/richTextEditor/RichTextBlock';

// import TipTapEditor from '../Candidates/Coach/RichText/RichTextBlock';

dayjs.extend(relativeTime);

function TicketChat({
  ticket: ticketDetails,
}: {
  ticket: SupportTicketType & {
    jobDetails: PublicJobsType;
  };
}) {
  const [ticket, setTicket] = useState<
    SupportTicketType & {
      jobDetails: PublicJobsType;
    }
  >();

  useEffect(() => {
    setTicket({ ...ticket, ...ticketDetails });
  }, []);

  const sendMessage = (message: string) => {
    if (message?.replaceAll('<p>', '').replaceAll('</p>', '').trim() === '') {
      return;
    }
    return updateTicket({
      // @ts-ignore
      content: [
        ...(ticket?.content ? ticket.content : []),
        {
          type: 'message',
          from: 'user',
          id: ticket.user_id,
          name: ticket.user_name,
          text: message,
          timeStamp: new Date().toISOString(),
        },
      ],
    });
  };
  const updateTicket = (data: Partial<SupportTicketType[]>) => {
    return updateSupportTicketInDb({
      id: ticket.id,
      ...data,
    }).then((data) => {
      setTicket({ ...ticket, ...data });
    });
  };

  return (
    <>
      {ticket && (
        <CandidateChat
          slotChatInbox={
            <>
              {chatBox(
                ticket.content as {
                  id: string;
                  from: string;
                  name: string;
                  text: string;
                  type: string;
                  timeStamp: string;
                }[],
              )}
            </>
            // <Stack gap={2}>
            //   {ticket.content.map((item, index) => {
            //     const itemOne = item as unknown as {
            //       type: string;
            //       from: string;
            //       id: string;
            //       name: string;
            //       text: string;
            //       timeStamp: string;
            //     };
            //     return (
            //       <TicketChatBubble
            //         key={index}
            //         slotChatImage={
            //           // @ts-ignore
            //           <Avatar
            //             variant='rounded'
            //             src={''}
            //             alt={itemOne.name}
            //             sx={{ height: '100%', width: '100%' }}
            //           />
            //         }
            //         textMessages={
            //           <Typography
            //             dangerouslySetInnerHTML={{ __html: itemOne.text }}
            //           />
            //         }
            //         textTime={dayjs(itemOne.timeStamp).fromNow()}
            //         textName={itemOne.name}
            //       />
            //     );
            //   })}
            // </Stack>
          }
          // textCompany={ticket.jobDetails?.company}
          textRole={<Stack>{ticket.jobDetails?.job_title}</Stack>}
          textTicketId={ticket.id}
          textStatus={capitalize(ticket.state)}
          // slotCompanyLogo={
          //   <Avatar
          //     variant='rounded'
          //     src={getCompanyIcon(ticket.jobDetails?.company)}
          //     alt={ticket.jobDetails?.job_title}
          //     sx={{ width: '100%', height: '100%' }}
          //   />
          // }
          //   bgColorPropsStatus={mapStatus}
          slotTypeMessage={<AddNewMessage sendMessage={sendMessage} />}
        />
      )}
    </>
  );
}

export default TicketChat;

// const getTicket = async (id: string) => {
//   const { data, error } = await supabase
//     .from('support_ticket')
//     .select()
//     .eq('id', id);
//   if (!error && data.length) {
//     return data[0];
//   }
//   return null;
// };

const AddNewMessage = ({ sendMessage }) => {
  const [message, setMessage] = useState<String>();
  return (
    <Stack gap={1}>
      <TipTapEditor
        options={false}
        placeholder='Type Message'
        value={message}
        minRows={1}
        maxRows={4}
        onChange={(e) => {
          setMessage(e.html);
        }}
        onKeyDown={(e) => {
          if (!e.shiftKey && e.key === 'Enter') {
            sendMessage(message)?.then(() => setMessage(''));
          }
        }}
        toolboxPosition='bottom'
        customSend={
          <Stack direction={'row'} justifyContent={'end'} width={'100%'}>
            <IconButton
              disabled={false}
              onClick={() => {
                // handelAddTicket();
                sendMessage(message)?.then(() => setMessage(''));
              }}
            >
              {message &&
              message?.replaceAll('<p>', '').replaceAll('</p>', '').trim() !==
                '' ? (
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='24' height='24' rx='3.42857' fill='#2F3941' />
                  <g clip-path='url(#clip0_3401_41257)'>
                    <path
                      d='M6.85693 12.5708H10.2855V11.4279H6.85693V6.19685C6.85693 6.03905 6.98485 5.91113 7.14265 5.91113C7.19079 5.91113 7.23816 5.9233 7.28034 5.9465L17.8303 11.749C17.9686 11.825 18.019 11.9988 17.943 12.137C17.9169 12.1845 17.8778 12.2236 17.8303 12.2497L7.28034 18.0522C7.14208 18.1282 6.96834 18.0778 6.8923 17.9395C6.8691 17.8974 6.85693 17.85 6.85693 17.8018V12.5708Z'
                      fill='white'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_3401_41257'>
                      <rect
                        width='13.7143'
                        height='13.7143'
                        fill='white'
                        transform='translate(5.14307 5.14258)'
                      />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='24' height='24' rx='3.42857' fill='#F8F9F9' />
                  <g clip-path='url(#clip0_3401_41253)'>
                    <path
                      d='M6.85693 12.5708H10.2855V11.4279H6.85693V6.19685C6.85693 6.03905 6.98485 5.91113 7.14265 5.91113C7.19079 5.91113 7.23816 5.9233 7.28034 5.9465L17.8303 11.749C17.9686 11.825 18.019 11.9988 17.943 12.137C17.9169 12.1845 17.8778 12.2236 17.8303 12.2497L7.28034 18.0522C7.14208 18.1282 6.96834 18.0778 6.8923 17.9395C6.8691 17.8974 6.85693 17.85 6.85693 17.8018V12.5708Z'
                      fill='#87929D'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_3401_41253'>
                      <rect
                        width='13.7143'
                        height='13.7143'
                        fill='white'
                        transform='translate(5.14307 5.14258)'
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </IconButton>
          </Stack>
        }
        borderColor={'var(--neutral-6)'}
        padding={1.5}
      />
    </Stack>
  );
};

const updateSupportTicketInDb = async (
  ticketData: Partial<SupportTicketType>,
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

const chatBox = (
  content: {
    id: string;
    from: string;
    name: string;
    text: string;
    type: string;
    timeStamp: string;
  }[],
) => {
  const temp = [];
  let tempDate = content[0].timeStamp;
  temp.push(<TicketTimeDivider textDate={getDayFormate(tempDate)} />);
  content.forEach((item, index) => {
    if (
      new Date(item.timeStamp).toDateString() !==
      new Date(tempDate).toDateString()
    ) {
      tempDate = item.timeStamp;
      temp.push(<TicketTimeDivider textDate={getDayFormate(tempDate)} />);
    }
    if (item.type === 'message') {
      temp.push(
        <TicketChatBubble
          key={index}
          slotChatImage={
            // @ts-ignore
            <Avatar
              variant='rounded'
              src={''}
              alt={item.name}
              sx={{ height: '100%', width: '100%' }}
            />
          }
          textMessages={
            <Typography
              dangerouslySetInnerHTML={{ __html: item.text }}
              fontSize={'14px'}
            />
          }
          textTime={dayjs(item.timeStamp).fromNow()}
          textName={item.name}
        />,
      );
    } else {
      temp.push(
        <TicketStatusDivider
          key={index}
          statusText={item.text.replaceAll('<b>', '').replaceAll('</b>', '')}
        />,
      );
    }
  });
  return (
    <Stack gap={2} flexGrow={1}>
      {temp}
    </Stack>
  );
};
