import {
  Autocomplete,
  Avatar,
  AvatarProps,
  darken,
  IconButton,
  lighten,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
// // import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

import { AssigneeSmall } from '@/devlink/AssigneeSmall';
import { PrioritySmall } from '@/devlink/PrioritySmall';
import { StatusPillSmall } from '@/devlink/StatusPillSmall';
import { TicketChatBubble } from '@/devlink/TicketChatBubble';
// import { TicketMessageSuggestion } from '@/devlink/TicketMessageSuggestion';
import { TicketSideDrawer } from '@/devlink/TicketSideDrawer';
import { TicketStatusDivider } from '@/devlink/TicketStatusDivider';
import { TicketTimeDivider } from '@/devlink/TicketTimeDivider';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  getPriorityIcon,
  useSupportContext,
} from '@/src/context/SupportContext/SupportContext';
import { palette } from '@/src/context/Theme/Theme';
import {
  CandidateType,
  // EmailTemplateType,
  JobApplicationType,
  Public_jobsType,
  Support_ticketType,
  // SupportEmailAPIType,
} from '@/src/types/data.types';
import { getDayFormate } from '@/src/utils/dayUtils/dayUtils';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import {
  allPriority,
  allStatus,
  // fillEmailTemplate,
  getCandidateStatusColor,
  mapPriorityColor,
  mapStatusColor,
} from '@/src/utils/support/supportUtils';
import { capitalizeAll, getRandomColor } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import TipTapEditor from '../Common/richTextEditor/RichTextBlock';
import { capitalize } from '../JobApplicationsDashboard/utils';

dayjs.extend(relativeTime);

function SupportTicketDetails({
  ticketProp,
  onClose,
  candidateBackgroundColor,
}: {
  ticketProp: Support_ticketType & { jobsDetails: Public_jobsType };
  onClose: () => void;
  candidateBackgroundColor?: string;
}) {
  const {
    tickets,
    updateTicket,
    allAssignee,
    openTicketIndex,
    setOpenTicketIndex,
  } = useSupportContext();
  const router = useRouter();
  const { userDetails, recruiter, recruiterUser } = useAuthDetails();
  const [ticket, setTicket] = useState<
    Support_ticketType & { jobsDetails: Public_jobsType }
  >(null);
  const [application, setApplication] = useState<
    JobApplicationType & CandidateType & { company: string; job_title: string }
  >(null);
  // const [emailTemplates, setEmailTemplates] = useState<EmailTemplateType>(null);

  const sendMessage = (message: string) => {
    if (
      message &&
      message.replaceAll('</p>', '').replaceAll('<p>', '').trim() !== ''
    )
      return callUpdateTicket({
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
  const callUpdateTicket = (data: Partial<Support_ticketType>) => {
    // @ts-ignore
    return updateTicket(data, ticket.id);
  };
  useEffect(() => {
    const onNev = function onPress(event) {
      if (event.shiftKey) {
        // Do something awesome
        if (event.key === 'ArrowLeft') {
          openTicketIndex - 1 < 0
            ? setOpenTicketIndex(tickets.length - 1)
            : setOpenTicketIndex(openTicketIndex - 1);
        } else if (event.key === 'ArrowRight') {
          setOpenTicketIndex((openTicketIndex + 1) % tickets.length);
        }
      }
    };
    document.addEventListener('keydown', onNev, false);
    return () => {
      document.removeEventListener('keydown', onNev, false);
    };
  }, [openTicketIndex]);

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
    if (ticketProp) {
      setTicket(ticketProp);
      // setEmailTemplates(
      //   // @ts-ignore
      //   ticketProp.jobsDetails.screening_setting?.screeningEmail
      //     ?.emailTemplates,
      // );
      ticketProp?.application_id &&
        getApplicationDetails(ticketProp.application_id).then((data) => {
          return data && setApplication(data);
        });
    }
  }, [ticketProp]);
  const assignedTo =
    ticketProp &&
    allAssignee.find((item) => {
      return ticketProp.support_group_id === item.recruiter.id;
    });
  const isAssesEnabled = posthog.isFeatureEnabled('isAssesmentEnabled');
  const isPhoneScreeningEnabled = posthog.isFeatureEnabled(
    'isPhoneScreeningEnabled',
  );
  return (
    <Stack width={{ sm: '100%', md: '930px' }}>
      {ticket && (
        <TicketSideDrawer
          isInterviewLinkVisible={isAssesEnabled ? true : false}
          isPreviewVisible={isPhoneScreeningEnabled ? true : false}
          onClickInterviewLink={{
            onClick: () => {
              navigator.clipboard
                .writeText(getInterviewUrl(ticket.application_id))
                .then(() => {
                  toast.message('Copied to clipboard.');
                });
            },
          }}
          onClickPreview={{
            onClick: () => {
              navigator.clipboard
                .writeText(
                  `${
                    process.env.NEXT_PUBLIC_HOST_NAME
                  }/candidate-phone-screening?job_post_id=${
                    ticket.job_id
                  }&recruiter_email=${recruiterUser.email}&recruiter_name=${[
                    recruiterUser.first_name,
                    recruiterUser.last_name,
                  ].join(' ')}`,
                )
                .then(() => {
                  toast.message('Copied to clipboard');
                });
            },
          }}
          textAppliedJobCompany={ticket.jobsDetails?.company}
          textAppliedJobPostedDate={
            application && dayjs(application?.created_at).fromNow()
          }
          slotAssignee={
            <AssignmentComponent
              assign_to={
                assignedTo?.employees[0] &&
                `${assignedTo?.employees[0]?.first_name} ${assignedTo?.employees[0]?.last_name}`
              }
              imageUrl={
                assignedTo?.employees[0]
                  ? assignedTo?.employees[0].profile_image
                  : ''
              }
              recruiterId={ticket.jobsDetails.recruiter_id}
              setAssignedTo={(assign_to: string, support_group_id?: string) => {
                // @ts-ignore
                callUpdateTicket(
                  support_group_id
                    ? { support_group_id, assign_to }
                    : { assign_to },
                );
              }}
            />
          }
          slotPriority={
            <PriorityComponent
              priority={capitalize(ticket?.priority || '')}
              // @ts-ignore
              setPriority={(priority) => callUpdateTicket({ priority })}
            />
          }
          slotStatus={
            <StatusComponent
              status={capitalize(ticket?.state || '')}
              // @ts-ignore
              setStatus={(state) => callUpdateTicket({ state })}
            />
          }
          textAppliedJobRole={ticket.jobsDetails?.job_title}
          textCreatedDate={dayjs(ticket.created_at).fromNow()}
          textCandidateMail={application?.email || '-'}
          textCandidateName={ticket.user_name}
          // textCandidateSite={ticket.}
          textCandidateStatus={application && capitalize(application.status)}
          slotStatusHeading={
            <StatusComponent
              status={capitalize(ticket?.state || '')}
              // @ts-ignore
              setStatus={(state) => callUpdateTicket({ state })}
            />
          }
          colorPropsCandidateStatus={{
            style: {
              ...getCandidateStatusColor(
                application?.status || 'invitation sent',
              ),
            },
          }}
          textTicketId={ticket.id}
          textIssuesTitle={`#${ticket.id}: ${ticket.title}`}
          slotCandidateImage={
            <CustomAvatar
              src={''}
              variant='rounded'
              alt={ticket.user_name}
              isRandomColor={true}
              backgroundColor={candidateBackgroundColor}
            />
          }
          textCandiatePhone={application?.phone || '-'}
          textCandidateSite={application?.linkedin || '-'}
          slotChatBox={
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
          }
          slotMessageSuggestion={
            ''
            //   [
            //   {
            //     type: 'Invitation mail',
            //     function: () =>
            //       sendEmail({
            //         application_id: ticket.application_id,
            //         email: application.email,
            //         email_type: 'qualified',
            //         details: {
            //           fromEmail: recruiter.email,
            //           fromName: recruiter.name,
            //           temples: {
            //             subject: fillEmailTemplate(
            //               emailTemplates.interview.subject,
            //               {
            //                 first_name: application.first_name,
            //                 last_name: application.last_name,
            //                 job_title: application.job_title,
            //                 company_name: application.company,
            //               },
            //             ),
            //             body: fillEmailTemplate(emailTemplates.interview.body, {
            //               first_name: application.first_name,
            //               last_name: application.last_name,
            //               job_title: application.job_title,
            //               company_name: application.company,
            //             }).replace(
            //               '[interviewLink]',
            //               getInterviewUrl(ticket.application_id),
            //             ),
            //           },
            //         },
            //       }),
            //   },
            //   {
            //     type: 'Disqualified mail',
            //     function: () =>
            //       sendEmail({
            //         application_id: ticket.application_id,
            //         email: application.email,
            //         email_type: 'qualified',
            //         details: {
            //           fromEmail: recruiter.email,
            //           fromName: recruiter.name,
            //           temples: {
            //             subject: fillEmailTemplate(
            //               emailTemplates.rejection.subject,
            //               {
            //                 first_name: application.first_name,
            //                 last_name: application.last_name,
            //                 job_title: application.job_title,
            //                 company_name: application.company,
            //               },
            //             ),
            //             body: fillEmailTemplate(emailTemplates.rejection.body, {
            //               first_name: application.first_name,
            //               last_name: application.last_name,
            //               job_title: application.job_title,
            //               company_name: application.company,
            //             }),
            //           },
            //         },
            //       }),
            //   },
            // ].map((item, index) => (
            //   <TicketMessageSuggestion
            //     textMessageSuggestion={item.type}
            //     key={index}
            //     onClickSuggestion={{
            //       onClick: () => {
            //         item.function().then(({ emailSend }) => {
            //           if (emailSend) {
            //             callUpdateTicket({
            //               // @ts-ignore
            //               content: [
            //                 ...(ticket?.content ? ticket.content : []),
            //                 {
            //                   type: 'update',
            //                   from: 'it_support',
            //                   id: userDetails.user.id,
            //                   name: recruiter?.name,
            //                   text: `${item.type} Email Sent`,
            //                   timeStamp: new Date().toISOString(),
            //                 },
            //               ],
            //             });
            //             toast.success('Email sent');
            //           } else toast.error('Email not sent');
            //         });
            //       },
            //     }}
            //   />
            // ))
          }
          slotTypeMessage={<AddNewMessage sendMessage={sendMessage} />}
          // onClickInterviewLink={{
          //   onClick: () => {
          //     navigator.clipboard
          //       .writeText(getInterviewUrl(ticket.application_id))
          //       .then(() => {
          //         toast.message('Copied to clipboard');
          //       });
          //   },
          // }}
          onClickAppliedViewJob={{
            onClick: () => {
              router.push(
                `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${ticket.job_id}`,
              );
            },
          }}
          onClickClose={{
            onClick: onClose,
          }}
          onClickNext={{
            onClick: () => {
              setOpenTicketIndex((openTicketIndex + 1) % tickets.length);
            },
          }}
          onClickPrev={{
            onClick: () => {
              openTicketIndex - 1 < 0
                ? setOpenTicketIndex(tickets.length - 1)
                : setOpenTicketIndex(openTicketIndex - 1);
            },
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

const getApplicationDetails = async (id: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select()
    .eq('id', id);
  if (!error && data.length) {
    const {
      data: [candidate],
      error: candidateError,
    } = await supabase
      .from('candidates')
      .select()
      .eq('id', data[0].candidate_id);
    const job_details = supabase
      .from('public_jobs')
      .select('company,job_title')
      .eq('id', data[0].job_id)
      .then(({ data, error }) => {
        if (error || !data.length) {
          return {};
        }
        return data[0];
      });
    const tempData = !candidateError && {
      ...data[0],
      ...(candidate || {}),
      ...(job_details || {}),
    };
    return tempData as unknown as JobApplicationType &
      CandidateType & { company: string; job_title: string };
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
            <CustomAvatar variant='rounded' src={''} alt={item.name} />
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
        borderColor={palette.grey[100]}
        padding={1.5}
      />
    </Stack>
  );
};

const getInterviewUrl = (application_id: string) => {
  return `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.MOCKTEST}?id=${application_id}`;
};

// const sendEmail = ({
//   application_id,
//   email,
//   email_type,
//   details,
// }: SupportEmailAPIType) => {
//   return axios
//     .post('/api/support/email', {
//       application_id,
//       email,
//       email_type,
//       details,
//     })
//     .then(({ data }) => {
//       return data as { emailSend: boolean; error: string };
//     });
// };

const AssignmentComponent = ({
  assign_to,
  imageUrl,
  recruiterId,
  setAssignedTo,
}: {
  assign_to: string;
  imageUrl?: string;
  recruiterId: string;
  setAssignedTo: (
    // eslint-disable-next-line no-unused-vars
    assign_to: string,
    // eslint-disable-next-line no-unused-vars
    support_group_id?: string,
  ) => void;
}) => {
  const { allAssignee } = useSupportContext();
  const [open, setOpen] = useState(false);
  return (
    <>
      {open ? (
        <CustomAutoComplete
          setOpen={setOpen}
          // value={assign_to}
          options={(() => {
            const temp = allAssignee
              .filter(
                (item) =>
                  item.recruiter.id === recruiterId ||
                  item.recruiter.title ===
                    process.env.NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_NAME,
              )
              .map((assignee) =>
                assignee.employees.map((employee) => ({
                  id: employee.user_id,
                  title: `${employee.first_name} ${employee.last_name}`,
                  recruiter_id: assignee.recruiter.id,
                  recruiter_name: assignee.recruiter.title,
                })),
              )
              .flat(1);
            return temp;
          })()}
          // @ts-ignore
          groupBy={(option) => option.recruiter_name}
          renderGroup={(params) => {
            return (
              <li key={params.key}>
                <GroupHeader className='one-line-clamp'>
                  {params.group}
                </GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            );
          }}
          getOptionLabel={(option) => option.title}
          onChange={setAssignedTo}
        />
      ) : (
        <Stack
          onClick={() => {
            setOpen(!open);
          }}
          sx={{
            cursor: 'pointer',
          }}
        >
          <AssigneeSmall
            textAssignedtoName={
              <Stack
                className='one-line-clamp'
                dangerouslySetInnerHTML={{
                  __html: assign_to || 'Not Assigned',
                }}
              ></Stack>
            }
            slotAssignedToImage={
              <CustomAvatar
                src={imageUrl || ''}
                variant='rounded'
                alt={'user_name'}
              />
            }
          />
        </Stack>
      )}
    </>
  );
};

const PriorityComponent = ({
  priority,
  setPriority,
}: {
  priority: string;
  // eslint-disable-next-line no-unused-vars
  setPriority: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <CustomAutoComplete
          setOpen={setOpen}
          value={priority}
          options={allPriority}
          onChange={setPriority}
        />
      ) : (
        <Stack onClick={() => setOpen(true)}>
          <PrioritySmall
            textPriorityLevel={priority}
            slotPriorityIcon={getPriorityIcon(priority)}
            colorPropsPriorityText={{
              style: {
                color: mapPriorityColor(priority),
              },
            }}
          />
        </Stack>
      )}
    </>
  );
};

const StatusComponent = ({
  status,
  setStatus,
}: {
  status: string;
  // eslint-disable-next-line no-unused-vars
  setStatus: (value: string) => {};
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <CustomAutoComplete
          setOpen={setOpen}
          value={status}
          options={allStatus}
          onChange={setStatus}
        />
      ) : (
        <Stack onClick={() => setOpen(true)}>
          <StatusPillSmall
            textStatus={capitalizeAll(status)}
            bgColorPropsStatus={{
              style: {
                backgroundColor: mapStatusColor(status),
              },
            }}
          />
        </Stack>
      )}
    </>
  );
};

const CustomAutoComplete = ({
  value,
  options,
  setOpen,
  onChange,
  ...rest
}: {
  // eslint-disable-next-line no-unused-vars
  setOpen: (x: boolean) => void;
  options:
    | string[]
    | { id: string; title: string }[]
    | {
        id: string;
        title: string;
        recruiter_id: string;
        recruiter_name: string;
      }[];
  value: string;
  onChange: (
    // eslint-disable-next-line no-unused-vars
    assign_to: string,
    // eslint-disable-next-line no-unused-vars
    support_group_id?: string,
  ) => void;
}) => {
  return (
    <Autocomplete
      open={true}
      value={value}
      options={[...options]}
      getOptionLabel={(option) => {
        // @ts-ignore
        return capitalize(option.title || option);
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
            }}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
            }}
            variant='filled'
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={true}
            onBlur={() => {
              setOpen(false);
            }}
            sx={{
              minWidth: '150px',
              '& .MuiAutocomplete-root': { height: '30px' },
              '& .MuiFormControl-root ': { margin: 0 },

              '& input': { padding: '0px!important', fontSize: '14px' },
              '& .MuiInputBase-root': {
                padding: '4px 26px 4px 4px !important',
              },
              '& .MuiAutocomplete-endAdornment': {
                right: '4px!important',
              },
            }}
          />
        );
      }}
      onChange={(_, newValue) => {
        if (newValue) {
          // @ts-ignore
          onChange(newValue.id || newValue, newValue.recruiter_id || null);
          setOpen(false);
        }
      }}
      {...rest}
    />
  );
};

const CustomAvatar = ({
  src,
  alt,
  variant,
  isRandomColor = false,
  backgroundColor,
}: {
  src: string;
  alt: string;
  variant?: AvatarProps['variant'];
  isRandomColor?: boolean;
  backgroundColor?: string;
}) => {
  return (
    <Avatar
      src={src}
      alt={alt || ''}
      {...(variant ? { variant } : {})}
      sx={{
        height: '100%',
        width: '100%',
        fontSize: '1em',
        ...(backgroundColor
          ? { backgroundColor }
          : isRandomColor
            ? { backgroundColor: getRandomColor() }
            : {}),
      }}
    >
      {alt.toLocaleUpperCase().slice(0, 1)}
    </Avatar>
  );
};

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});
