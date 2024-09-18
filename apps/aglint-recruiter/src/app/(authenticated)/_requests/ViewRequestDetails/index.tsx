import { getFullName } from '@aglint/shared-utils';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { Switch } from '@components/ui/switch';
import {
  Bot,
  Briefcase,
  Calendar,
  ChevronDown,
  Edit2,
  Eye,
  MapPin,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideDrawerEdit from 'src/app/(authenticated)/_jobs/[application]/_common/components/EditDrawer';
import CollapseContent from 'src/app/(authenticated)/_jobs/[application]/_common/components/InterviewStage/IndividualSession/Collapse';
import { useEditSession } from 'src/app/(authenticated)/_jobs/[application]/_common/components/InterviewTab/hooks/useEditSession';

import MemberCard from '@/components/Common/MemberCard';
import { ShowCode } from '@/components/Common/ShowCode';
import { UIDateRangePicker } from '@/components/Common/UIDateRangePicker';
import UpdateMembers from '@/components/Common/UpdateMembers';
import { RequestProvider } from '@/context/RequestContext';
import { useRequests } from '@/context/RequestsContext';
import { useMemberList } from '@/hooks/useMemberList';
import { type ApiInterviewSessionRequest } from '@/pages/api/scheduling/application/fetchInterviewSessionByRequest';
import { type Request } from '@/queries/requests/types';
import dayjs from '@/utils/dayjs';
import ROUTES from '@/utils/routing/routes';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import RequestProgress from '../_common/components/RequestProgress';
import {
  REQUEST_STATUS_LIST,
  REQUEST_TYPE_LIST,
  REQUEST_URGENT_LIST,
} from '../_common/constant';
import { useMeetingList } from '../_common/hooks';
import CandidateAvailability from './CandidateAvailability';
import RecentRequests from './Components/RecentRequests';
import UpdateDetails from './Components/UpdateDetails';
import ConfirmAvailability from './ConfirmAvailability';
import { AvailabilityProvider } from './ConfirmAvailability/RequestAvailabilityContext';
import CandidateCancelRequest from './RequestNextSteps/CandidateCancelRequest';
import RequestDecline from './RequestNextSteps/RequestDecline';
import ScheduleOptions from './RequestNextSteps/ScheduleOptions';
import RequestNotes from './RequestNotes';
import SelfSchedulingDrawer from './SelfSchedulingDrawer';

export default function ViewRequestDetails() {
  const query = useParams();
  const {
    requests: { data: requestList, isPlaceholderData },
    handleAsyncUpdateRequest,
  } = useRequests();
  const { data: sessions, status, refetch: refetchMeetings } = useMeetingList();

  const { data: members } = useMemberList();

  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const selectedRequest = Object.values(requestList)
    .flat()
    .find((request) => request?.id === query?.id);
  const candidateDetails = selectedRequest?.applications?.candidates;
  const jobDetails = selectedRequest?.applications?.public_jobs;
  const selectedMember =
    members &&
    members.find((member) => member.user_id === selectedRequest?.assignee_id);

  useEffect(() => {
    if (!isPlaceholderData && status === 'success' && selectedRequest) {
      setDateRange({
        from: new Date(selectedRequest.schedule_start_date).toISOString(),
        to: new Date(selectedRequest.schedule_end_date).toISOString(),
      });
    }
  }, [isPlaceholderData]);
  if (!isPlaceholderData && status === 'success' && !selectedRequest) {
    return (
      // we need to fix this empty state
      <Alert variant='error'>
        <AlertTitle>Request not found</AlertTitle>
      </Alert>
    );
  } else if ((isPlaceholderData && status === 'pending') || !selectedRequest) {
    return <ViewRequestDetailsSkeleton />;
  } else
    return (
      <div className='container-lg mx-auto w-full px-16'>
        {selectedRequest && (
          <CandidateAvailability selectedRequest={selectedRequest} />
        )}
        <AvailabilityProvider>
          <ConfirmAvailability />
        </AvailabilityProvider>
        <SideDrawerEdit refetch={refetchMeetings} />
        {/* {selectedRequest?.status === 'to_do' && ( */}
        <SelfSchedulingDrawer refetch={refetchMeetings} />
        {/* )} */}
        <div className='space-y-8'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='/requests'>Requests</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='#' className='font-medium text-gray-900'>
                  Request Details
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='flex flex-row items-start justify-between pb-2'>
            <div>
              <h1 className='mb-2 text-2xl font-bold text-gray-900'>
                Request Detail
              </h1>
              <div className='flex items-center space-x-4 text-sm text-gray-500'>
                <div className='flex items-center space-x-1'>
                  <User className='h-4 w-4' />
                  <Link
                    href={
                      ROUTES['/jobs/[job]/[application]']({
                        job: jobDetails?.id,
                        application_id: selectedRequest?.application_id,
                      }) + '?tab=scoring'
                    }
                  >
                    <span>
                      {getFullName(
                        candidateDetails?.first_name,
                        candidateDetails?.last_name,
                      )}
                    </span>
                  </Link>
                </div>
                <span>•</span>
                {/* <span>{candidateDetails?.current_job_title}</span>
                <span>•</span> */}
                <div className='flex items-center space-x-1'>
                  <Briefcase className='h-4 w-4' />
                  <Link href={ROUTES['/jobs/[job]']({ job: jobDetails?.id })}>
                    <span>{jobDetails?.job_title}</span>
                  </Link>
                </div>
                {/* <span>•</span> */}
                {/* <span>Finance and Accounting</span> */}
                {jobDetails?.office_locations && (
                  <>
                    <span>•</span>
                    <div className='flex items-center space-x-1'>
                      <MapPin className='h-4 w-4' />
                      <span>{`${jobDetails?.office_locations.city}, ${jobDetails?.office_locations.country}`}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='flex flex-col items-end gap-4 space-x-2'>
              <div className='flex flex-row gap-2'>
                <Badge variant='destructive'>
                  {capitalizeFirstLetter(selectedRequest?.type)}
                </Badge>
                <Badge variant='outline' className='bg-green-50 text-green-700'>
                  {capitalizeFirstLetter(selectedRequest?.status)}
                </Badge>
              </div>
              <div className='flex-center flex items-center gap-2'>
                <h3 className='text-sm font-medium text-gray-500'>
                  Assigned to:
                </h3>
                <Link
                  href={ROUTES['/user/[user]']({
                    user_id: selectedMember?.user_id,
                  })}
                  className='flex flex-row items-center gap-2'
                >
                  <Avatar className='h-6 w-6'>
                    <AvatarImage
                      src={selectedMember?.profile_image}
                      alt='Avatar'
                    />
                    <AvatarFallback>
                      {selectedMember?.first_name.slice(0, 1)}
                      {selectedMember?.last_name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <p className='font-medium'>
                    {getFullName(
                      selectedMember?.first_name,
                      selectedMember?.last_name,
                    )}
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='flex w-8/12 flex-col space-y-4 pr-4'>
              <Card className='bg-white shadow-sm'>
                <CardHeader className='flex flex-row items-start justify-between pb-2'>
                  <div>
                    <CardTitle className='mb-2 text-xl font-semibold'>
                      Request Details
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-2 grid grid-cols-2 gap-6'>
                      <div className='space-y-4'>
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm font-medium text-gray-500'>
                              Status
                            </span>
                            <UpdateDetails
                              handleChange={async ({ value }) => {
                                const status =
                                  value as unknown as Request['status'];
                                await handleAsyncUpdateRequest({
                                  payload: {
                                    requestId: selectedRequest.id,
                                    requestPayload: {
                                      status,
                                    },
                                  },
                                });
                              }}
                              items={REQUEST_STATUS_LIST}
                              updateButton={
                                <Edit2 className='h-4 w-4 cursor-pointer text-gray-400' />
                              }
                            />
                          </div>
                          <Badge
                            variant='outline'
                            className='bg-green-50 text-green-700'
                          >
                            {capitalizeFirstLetter(selectedRequest?.status)}
                          </Badge>
                        </div>
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm font-medium text-gray-500'>
                              Priority
                            </span>
                            <UpdateDetails
                              handleChange={async ({ value }) => {
                                const priority =
                                  value as unknown as Request['priority'];
                                await handleAsyncUpdateRequest({
                                  payload: {
                                    requestId: selectedRequest.id,
                                    requestPayload: {
                                      priority,
                                    },
                                  },
                                });
                              }}
                              items={REQUEST_URGENT_LIST}
                              updateButton={
                                <Edit2 className='h-4 w-4 cursor-pointer text-gray-400' />
                              }
                            />
                          </div>
                          <Badge
                            variant='outline'
                            className='bg-gray-100 text-gray-800'
                          >
                            {capitalizeFirstLetter(selectedRequest?.priority)}
                          </Badge>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm font-medium text-gray-500'>
                              Interview Date
                            </span>
                            <UIDateRangePicker
                              value={dateRange}
                              onAccept={(dates) => {
                                setDateRange(dates);
                                if (dates) {
                                  handleAsyncUpdateRequest({
                                    payload: {
                                      requestId: selectedRequest.id,
                                      requestPayload: {
                                        schedule_start_date: dayjs(
                                          dates.from,
                                        ).toISOString(),
                                        schedule_end_date: dayjs(
                                          dates.to,
                                        ).toISOString(),
                                      },
                                    },
                                  });
                                }
                              }}
                              disablePastDates={true}
                              customButton={
                                <Edit2 className='h-4 w-4 cursor-pointer text-gray-400' />
                              }
                            />
                          </div>
                          <span className='text-sm'>
                            {dayjs(selectedRequest?.schedule_start_date).format(
                              'DD MMM, YYYY',
                            ) +
                              ' - ' +
                              dayjs(selectedRequest?.schedule_end_date).format(
                                'DD MMM, YYYY',
                              )}
                          </span>
                        </div>
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <h3 className='text-sm font-medium text-gray-500'>
                              Assigned to
                            </h3>
                            <UpdateMembers
                              handleChange={async ({ user_id }) => {
                                const assignee_id = user_id;
                                await handleAsyncUpdateRequest({
                                  payload: {
                                    requestId: selectedRequest.id,
                                    requestPayload: {
                                      assignee_id,
                                    },
                                  },
                                });
                              }}
                              updateButton={
                                <Edit2 className='h-4 w-4 cursor-pointer text-gray-400' />
                              }
                              members={members}
                            />
                          </div>
                          <MemberCard selectedMember={selectedMember} />
                        </div>
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm font-medium text-gray-500'>
                            Request Type
                          </span>
                          <UpdateDetails
                            handleChange={async ({ value }) => {
                              const type = value as unknown as Request['type'];
                              await handleAsyncUpdateRequest({
                                payload: {
                                  requestId: selectedRequest.id,
                                  requestPayload: {
                                    type,
                                  },
                                },
                              });
                            }}
                            items={REQUEST_TYPE_LIST}
                            updateButton={
                              <Edit2 className='h-4 w-4 cursor-pointer text-gray-400' />
                            }
                          />
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Calendar className='h-4 w-4 text-gray-500' />
                          <span className='text-sm'>
                            {capitalizeFirstLetter(selectedRequest?.type)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <RequestNotes />

                  <SessionCards sessions={sessions} />
                </CardContent>
              </Card>
              <RecentRequests applicationId={selectedRequest?.application_id} />
            </div>
            <div className='flex w-4/12 flex-col space-y-4'>
              <ShowCode.When isTrue={selectedRequest.status !== 'completed'}>
                <Alert>
                  <Bot className='h-4 w-4' />
                  <AlertTitle>Next Step</AlertTitle>
                  <AlertDescription>
                    Here is your next step on the request.
                  </AlertDescription>

                  <div className='mt-4 flex flex-row justify-end gap-2'>
                    <ShowCode.When
                      isTrue={
                        selectedRequest.type === 'schedule_request' ||
                        selectedRequest.type === 'reschedule_request'
                      }
                    >
                      <ScheduleOptions />
                    </ShowCode.When>
                    <ShowCode.When
                      isTrue={selectedRequest.type === 'decline_request'}
                    >
                      <RequestDecline />
                    </ShowCode.When>
                    <ShowCode.When
                      isTrue={
                        selectedRequest.type === 'cancel_schedule_request'
                      }
                    >
                      <CandidateCancelRequest />
                    </ShowCode.When>
                  </div>
                </Alert>
              </ShowCode.When>

              <Card>
                <CardHeader className='flex items-center justify-between'>
                  <div className='flex w-full flex-row items-center justify-between'>
                    <CardTitle className='text-lg'>Request Progress</CardTitle>
                    <div className='flex items-center space-x-2'>
                      {/* {reqTriggerActionsMap && Object.keys(reqTriggerActionsMap).length > 0 && ( */}
                      {/* <Button size='sm'>
                        <WandSparkles className='h-4 w-4 mr-2' />
                        Proceed with Aglint AI
                      </Button> */}
                      {/* )} */}
                      <div className='flex items-center space-x-2'>
                        <span className='text-sm'>Automaton</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedRequest ? (
                    <RequestProvider
                      request_id={selectedRequest?.id}
                      enabled={true}
                    >
                      <RequestProgress />
                    </RequestProvider>
                  ) : null}
                </CardContent>
              </Card>

              {/* <Card className='mb-4'>
              <CardHeader>
                <CardTitle className='text-md'>Add Automations</CardTitle>
                <CardDescription>
                  Streamline your workflow with these automations:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>Add Candidate Reminders</span>
                        <Button size='sm' variant='outline'>
                          Add
                        </Button>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>RSVP Via Slack</span>
                        <Button size='sm' variant='outline'>
                          Add
                        </Button>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>Sync with Calendar</span>
                        <Button size='sm' variant='outline'>
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
            </div>
          </div>
        </div>
      </div>
    );
}

function SessionCards({
  sessions,
}: {
  sessions: ApiInterviewSessionRequest['response']['sessions'];
}) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { onClickEdit } = useEditSession();
  return (
    <div>
      {/* <SideDrawerEdit refetch={refetch} /> */}

      <div className='my-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Sessions</h3>
        <Badge variant='outline'>{sessions?.length} sessions</Badge>
      </div>
      <div className='space-y-2 rounded-lg border'>
        {sessions &&
          sessions.map((session, index) => (
            <Card key={index} className='shado-none border-0'>
              <CardHeader
                className='cursor-pointer px-4 py-2'
                onClick={() => {
                  setExpandedCard(expandedCard === index ? null : index);
                }}
              >
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex-1 truncate text-sm font-medium'>
                    {capitalizeFirstLetter(session.interview_session.name)}
                  </CardTitle>
                  <div className='flex items-center space-x-2'>
                    <Badge variant='outline' className='text-xs'>
                      {capitalizeFirstLetter(session.interview_meeting.status)}
                    </Badge>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickEdit(session);
                      }}
                      variant='outline'
                      size='sm'
                    >
                      <Edit2 className='mr-2 h-4 w-4' />
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `/scheduling/view?meeting_id=${session.interview_meeting.id}&tab=job_details`,
                          '_blank',
                        );
                      }}
                      variant='outline'
                      size='sm'
                    >
                      <Eye className='mr-2 h-4 w-4' />
                      View Details
                    </Button>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedCard === index ? 'rotate-180 transform' : ''
                      }`}
                    />
                  </div>
                </div>
              </CardHeader>
              <CollapseContent
                collapsed={expandedCard === index}
                currentSession={session}
                candidate={null}
              />
            </Card>
          ))}
      </div>
    </div>
  );
}

function ViewRequestDetailsSkeleton() {
  return (
    <div className='container-lg mx-auto w-full px-12'>
      {/* Breadcrumb */}
      <div className='flex items-center space-x-2 text-sm text-gray-500'>
        <span>Home</span>
        <span>/</span>
        <span>Requests</span>
        <span>/</span>
        {/* <span>Schedule Requests</span> */}
        {/* <span>/</span> */}
        <span className='font-medium text-gray-900'>Request Details</span>
      </div>

      {/* Header */}
      <div className='flex flex-row items-start justify-between pb-2'>
        <div>
          <h1 className='mb-2 text-2xl font-bold text-gray-900'>
            Schedule Request Details
          </h1>
          <Skeleton className='h-4 w-96' />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row gap-2'>
            <Skeleton className='h-6 w-20' />
            <Skeleton className='h-6 w-20' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-4 w-24' />
          </div>
        </div>
      </div>

      {/* Progress Holder */}
      <Alert>
        <Bot className='h-4 w-4' />
        <AlertTitle>Next Step</AlertTitle>
        <AlertDescription>
          <Skeleton className='h-4 w-64' />
        </AlertDescription>
        <div className='mt-4 flex flex-row justify-end gap-2'>
          <Skeleton className='h-9 w-32' />
          <Skeleton className='h-9 w-40' />
        </div>
      </Alert>

      {/* Request Details Card */}
      <Card className='bg-white shadow-sm'>
        <CardHeader className='flex flex-row items-start justify-between pb-2'>
          <CardTitle className='mb-2 text-xl font-semibold'>
            Request Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-6'>
            {/* Left column */}
            <div className='col-span-2 grid grid-cols-2 gap-6'>
              {[...Array(4)].map((_, index) => (
                <div key={index} className='space-y-4'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-6 w-32' />
                </div>
              ))}
            </div>
            {/* Right column */}
            <div className='space-y-4'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-6 w-32' />
            </div>
          </div>

          {/* Sessions */}
          <div className='mt-8'>
            <div className='my-4 flex items-center justify-between'>
              <Skeleton className='h-6 w-24' />
              <Skeleton className='h-6 w-24' />
            </div>
            <div className='space-y-2 rounded-lg border p-4'>
              {[...Array(3)].map((_, index) => (
                <Card key={index} className='border-0 shadow-none'>
                  <CardHeader className='px-4 py-2'>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-4 w-64' />
                      <div className='flex items-center space-x-2'>
                        <Skeleton className='h-6 w-20' />
                        <Skeleton className='h-8 w-20' />
                        <Skeleton className='h-8 w-24' />
                        <Skeleton className='h-4 w-4' />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
