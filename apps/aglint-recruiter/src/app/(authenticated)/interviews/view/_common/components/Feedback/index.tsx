import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import Typography from '@components/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import {
  Calendar,
  Circle,
  Clock,
  Mail,
  MessageSquare,
  Pen,
  Plus,
  Star,
  User,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import axios from '@/client/axios';
import { Loader } from '@/common/Loader';
import { useTenant } from '@/company/hooks';
import { ShowCode } from '@/components/Common/ShowCode';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import UIDialog from '@/components/Common/UIDialog';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type API_request_feedback } from '@/pages/api/request_feedback/type';
import toast from '@/utils/toast';

import { useScheduleDetails } from '../../hooks/useScheduleDetails';
import {
  re_mapper,
  saveInterviewerFeedback,
  useInterviewerRelations,
} from './util.function';

type FeedbackWindowInterviewersType = {
  [key: string]: {
    feedback: {
      recommendation: number;
      objective: string;
    };
    user_id: string;
    session: {
      id: string;
      title: string;
      created_at: string;
      time: {
        start: string;
        end: string;
      };
      status:
        | 'waiting'
        | 'confirmed'
        | 'completed'
        | 'cancelled'
        | 'reschedule'
        | 'not_scheduled';
      session_type: DatabaseEnums['session_type'];
    };
    relation_id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    position: string;
  }[];
};

const FeedbackWindow = () => {
  const {
    data: { schedule_data: schedule },
  } = useScheduleDetails();

  const interview_sessions = [
    {
      id: schedule?.interview_session.id,
      title: schedule?.interview_session.name,
      created_at: schedule?.interview_session.created_at,
      time: {
        start: schedule?.interview_meeting.start_time,
        end: schedule?.interview_meeting.end_time,
      },
      status: schedule?.interview_meeting.status,
      session_type: schedule?.interview_session.session_type,
    },
  ];
  const candidate = {
    email: schedule?.candidates?.email,
    name: `${schedule?.candidates?.first_name || ''} ${schedule?.candidates?.last_name || ''}`.trim(),
    job_id: schedule?.job?.id,
    application_id: schedule?.application_id,
  };
  const {
    data: relationsData,
    isLoading,
    refetch,
  } = useInterviewerRelations({
    session_ids: interview_sessions.map((item) => item.id),
  });

  const { recruiter_user } = useTenant();
  const { checkPermissions } = useRolesAndPermissions();
  const user_id = recruiter_user?.user_id;
  const isAdmin = recruiter_user?.role === 'admin';

  const tempRelations = useMemo(() => {
    const tempData = (
      (relationsData || []) as unknown as {
        session_id: string;
        feedback: NonNullable<typeof relationsData>[number]['feedback'];
        interview_module_relation: NonNullable<
          typeof relationsData
        >[number]['interview_module_relation'];
      }[]
    ).filter((item) => Boolean(item.interview_module_relation?.id));

    const tempRelation: {
      [key: string]: {
        feedback: NonNullable<typeof relationsData>[number]['feedback'];
        relation_id: string;
        user_id: string;
      }[];
    } = {};

    for (const item of tempData) {
      const temp = tempRelation[item.session_id] || [];
      if (!item.interview_module_relation) continue;
      temp.push({
        feedback: item.feedback,
        relation_id: item.interview_module_relation?.id,
        user_id: item.interview_module_relation?.user_id,
      });
      tempRelation[item.session_id] = temp;
    }
    return tempRelation;
  }, [relationsData]);

  const interviewers = useMemo(() => {
    const interviewers: FeedbackWindowInterviewersType = {};

    if (tempRelations) {
      interview_sessions.forEach((session) => {
        const temp = tempRelations[String(session.id)] || [];
        temp.forEach((memRelation) => {
          const tempMem = relationsData?.find(
            (item) =>
              item?.interview_module_relation?.user_id === memRelation?.user_id,
          )?.interview_module_relation?.recruiter_user;
          if (!tempMem) return;
          interviewers[String(session.id)] = [
            //@ts-ignore fix this
            ...(interviewers[String(session.id)] || []),
            {
              user_id: tempMem.user_id,
              session: {
                created_at: session.created_at,
                id: session.id,
                title: session.title ?? '',
                session_type: session.session_type,
                status: session.status,
                time: {
                  start: session.time.start ?? '',
                  end: session.time.end ?? '',
                },
              },
              relation_id: memRelation.relation_id,
              first_name: tempMem.first_name,
              last_name: tempMem.last_name,
              email: tempMem.email,
              profile_image: tempMem.profile_image ?? '',
              position: tempMem.position ?? '',
              feedback: memRelation.feedback!,
            },
          ];
        });
      });
    } else {
      interview_sessions.forEach((session_id) => {
        interviewers[String(session_id)] = [];
      });
    }
    return interviewers;
  }, [tempRelations]);

  const handelSubmit = async ({
    session_id,
    relation_id,
    feedback,
  }: {
    session_id: string;
    relation_id: string;
    feedback: DatabaseTable['interview_session_relation']['feedback'];
  }) => {
    return (
      relation_id &&
      (await saveInterviewerFeedback({
        // feedback: JSON.stringify(feedback),
        feedback,
        session_id,
        relation_id,
      }).then(() => {
        refetch();
        return true;
      }))
    );
  };
  return (
    <>
      <ShowCode>
        <ShowCode.When isTrue={isLoading}>
          <div className='flex items-center justify-center'>
            <Loader />
          </div>
        </ShowCode.When>
        <ShowCode.When
          isTrue={Boolean(
            checkPermissions && checkPermissions(['scheduling_actions']),
          )}
        >
          <AdminFeedback
            candidate={{
              application_id: candidate.application_id,
              email: candidate?.email ?? '',
              job_id: candidate?.job_id ?? '',
              name: candidate.name,
            }}
            isAdmin={isAdmin}
            handelSubmit={async ({ session_id, relation_id, feedback }) => {
              return handelSubmit({
                session_id: session_id,
                relation_id: relation_id,
                feedback: feedback,
              }).then(() => {
                return true;
              });
            }}
            interviewers={Object.keys(interviewers)
              .map((key) => interviewers[String(key)])
              .flat()}
            user_id={user_id ?? ''}
          />
        </ShowCode.When>
        <ShowCode.Else>
          <InterviewerFeedback
            interviewers={Object.keys(interviewers)
              .map((key) => interviewers[String(key)])
              .flat()
              .filter((item) => item.user_id === user_id)}
            handelSubmit={({ feedback, relation_id, session_id }) => {
              handelSubmit({
                feedback,
                relation_id,
                session_id,
              });
            }}
          />
        </ShowCode.Else>
      </ShowCode>
    </>
  );
};

export default FeedbackWindow;

const AdminFeedback = ({
  user_id,
  interviewers,
  handelSubmit,
  candidate,
  isAdmin,
}: {
  user_id: string;
  isAdmin: boolean;
  interviewers: FeedbackWindowInterviewersType[string];
  handelSubmit: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
    // eslint-disable-next-line no-unused-vars
    relation_id,
    // eslint-disable-next-line no-unused-vars
    feedback,
  }: {
    session_id: string;
    relation_id: string;
    feedback: DatabaseTable['interview_session_relation']['feedback'];
  }) => Promise<boolean>;

  candidate: {
    email: string;
    name: string;
    job_id: string;
    application_id: string;
  };
}) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<{
    index: number | null;
    interviewer: (typeof interviewers)[number] | null;
  }>({ index: null, interviewer: null });

  const handelFeedbackRequest = async ({
    e,
    session_id,
    relation_id,
    tool = 'email',
    recruiter_user_id,
  }: {
    e: MouseEvent;
    session_id: string;
    relation_id: string;
    tool: 'email' | 'slack';
    recruiter_user_id: string;
  }) => {
    e.stopPropagation();

    sendReminderForEmailAndStack({
      session_id,
      application_id: candidate.application_id,
      recruiter_user_id,
      tool,
    } as API_request_feedback['request']);

    return handelSubmit({
      session_id: session_id,
      relation_id: relation_id,
      feedback: { recommendation: 0, objective: '' },
    }).then(() => {
      toast.success(`Feedback request sent to ${tool} successfully.`);
      return true;
    });
  };
  const sessions: { [key: string]: typeof interviewers } = {};
  interviewers.forEach((item) => {
    sessions[item.session.id] = [...(sessions[item.session.id] || []), item];
  });
  const router = useRouterPro();
  return (
    <>
      <div className='flex flex-col space-y-2 p-2'>
        {router.pathName !== '/interviews/view'
          ? Object.keys(sessions)
              .map((key) => {
                const session = sessions[key] || [];
                if (!session.length) return null;
                return (
                  <Card key={key} className='p-4'>
                    <CardHeader className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        {session[0].session.session_type === 'panel' ? (
                          <Users size={18} className='text-muted-foreground' />
                        ) : (
                          <User size={18} className='text-muted-foreground' />
                        )}
                        <span className='text-lg font-medium'>
                          {session[0].session.title}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                        <Calendar className='h-4 w-4' />
                        <span>
                          {dayjsLocal(session[0].session.time.start).format(
                            'ddd, MMMM DD, YYYY',
                          )}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                        <Clock className='h-4 w-4' />
                        <span>
                          {`${dayjsLocal(session[0].session.time.start).format('hh:mm')} - ${dayjsLocal(session[0].session.time.end).format('hh:mm')}`}
                        </span>
                      </div>
                      <Badge className='flex items-center space-x-1'>
                        <Circle className='h-2 w-2 fill-current' />
                        <span>{session[0].session.status}</span>
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      {session.map((int, index) => {
                        const isFeedBackEnabled =
                          int.session.status === 'completed';
                        return (
                          <FeedbackCardDetails
                            key={index}
                            index={index}
                            int={int}
                            user_id={user_id}
                            isFeedBackEnabled={isFeedBackEnabled}
                            isAdmin={isAdmin}
                            setSelectedInterviewer={setSelectedInterviewer}
                            handelFeedbackRequest={handelFeedbackRequest}
                          />
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })
              .filter((item) => Boolean(item))
          : Object.values(sessions)[0]?.map((int, index) => {
              const isFeedBackEnabled = int.session.status === 'completed';
              return (
                <FeedbackCardDetails
                  key={index}
                  index={index}
                  int={int}
                  user_id={user_id}
                  isFeedBackEnabled={isFeedBackEnabled}
                  isAdmin={isAdmin}
                  setSelectedInterviewer={setSelectedInterviewer}
                  handelFeedbackRequest={handelFeedbackRequest}
                />
              );
            })}
      </div>
      <EditFeedbackPopUp
        setSelectedInterviewer={setSelectedInterviewer}
        selectedInterviewer={selectedInterviewer}
        handelSubmit={handelSubmit}
      />
    </>
  );
};

const InterviewerFeedback = ({
  interviewers,
  handelSubmit,
}: {
  interviewers: FeedbackWindowInterviewersType[string];
  handelSubmit: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
    // eslint-disable-next-line no-unused-vars
    relation_id,
    // eslint-disable-next-line no-unused-vars
    feedback,
  }: {
    session_id: string;
    relation_id: string;
    feedback: DatabaseTable['interview_session_relation']['feedback'];
  }) => void;
}) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<{
    index: number | null;
    interviewer: (typeof interviewers)[number] | null;
  }>({ index: null, interviewer: null });

  const sessions: { [key: string]: typeof interviewers } = {};
  interviewers.forEach((item) => {
    sessions[item.session.id] = [...(sessions[item.session.id] || []), item];
  });
  const router = useRouterPro();
  return (
    <>
      <div className='flex flex-col space-y-2 p-2'>
        {router.pathName !== '/interviews/view'
          ? Object.keys(sessions)
              .map((key) => {
                const session = sessions[key] || [];
                if (!session.length) return null;
                return (
                  <Card key={key}>
                    <CardHeader>
                      <div className='space-y-2'>
                        {session[0].session.session_type === 'panel' ? (
                          <div className='flex items-center space-x-2'>
                            <Users
                              size={18}
                              className='text-muted-foreground'
                            />
                            <span>{session[0].session.title}</span>
                          </div>
                        ) : (
                          <div className='flex items-center space-x-2'>
                            <User size={18} className='text-muted-foreground' />
                            <span>{session[0].session.title}</span>
                          </div>
                        )}
                        <div className='flex items-center space-x-2'>
                          <Calendar
                            size={16}
                            className='text-muted-foreground'
                          />
                          <span>
                            {dayjsLocal(session[0].session.time.start).format(
                              'ddd, MMMM DD, YYYY',
                            )}
                          </span>
                        </div>
                        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                          <Clock size={16} className='text-muted-foreground' />
                          <span>{`${dayjsLocal(
                            session[0].session.time.start,
                          ).format('hh:mm')} - ${dayjsLocal(
                            session[0].session.time.end,
                          ).format('hh:mm')}`}</span>
                        </div>

                        <Badge className='flex items-center space-x-1'>
                          <Circle size={12} className='text-muted-foreground' />
                          <span>{session[0].session.status}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {session.map((int, index) => {
                        const isFeedBackEnabled =
                          int.session.status === 'completed';
                        return (
                          <FeedbackCardDetails
                            key={index}
                            isFeedBackEnabled={isFeedBackEnabled}
                            index={index}
                            setSelectedInterviewer={setSelectedInterviewer}
                            int={int}
                          />
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })
              .filter((item) => Boolean(item))
          : Object.values(sessions)[0]?.map((int, index) => {
              const isFeedBackEnabled = int.session.status === 'completed';
              return (
                <FeedbackCardDetails
                  key={index}
                  isFeedBackEnabled={isFeedBackEnabled}
                  index={index}
                  setSelectedInterviewer={setSelectedInterviewer}
                  int={int}
                />
              );
            })}
      </div>
      <EditFeedbackPopUp
        setSelectedInterviewer={setSelectedInterviewer}
        selectedInterviewer={selectedInterviewer}
        handelSubmit={handelSubmit}
      />
    </>
  );
};

function EditFeedbackPopUp({
  setSelectedInterviewer,
  selectedInterviewer,
  handelSubmit,
}: {
  selectedInterviewer: any;
  setSelectedInterviewer: any;
  handelSubmit: any;
}) {
  return (
    <>
      {selectedInterviewer?.interviewer && (
        <UIDialog
          title='My Feedback'
          size='xl'
          open={selectedInterviewer.interviewer !== null}
          onClose={() => setSelectedInterviewer(null)}
          slotButtons={<></>}
        >
          <FeedbackForm
            interviewerData={selectedInterviewer.interviewer}
            onSubmit={(feedback) =>
              handelSubmit(feedback).then(() => {
                toast.success('Feedback saved successfully.');
                setSelectedInterviewer({
                  index: null,
                  interviewer: null,
                });
              })
            }
            onCancel={() => {
              setSelectedInterviewer({
                index: null,
                interviewer: null,
              });
            }}
            onClose={() => {
              setSelectedInterviewer({
                index: null,
                interviewer: null,
              });
            }}
          />
        </UIDialog>
      )}
    </>
  );
}
function FeedbackCardDetails({
  index,
  int,
  user_id,
  isFeedBackEnabled,
  isAdmin = false,
  setSelectedInterviewer,
  handelFeedbackRequest,
}: {
  index: number;
  int: FeedbackWindowInterviewersType[string][number];
  user_id?: string;
  isFeedBackEnabled: boolean;
  isAdmin?: boolean;
  setSelectedInterviewer: any;
  // eslint-disable-next-line no-unused-vars
  handelFeedbackRequest?: any;
}) {
  return (
    <Card className='mb-4 w-full border-none bg-slate-50 shadow-none'>
      <CardHeader className='flex flex-row items-center gap-3 p-4'>
        <Avatar className='h-12 w-12 rounded-md'>
          <AvatarImage
            src={int.profile_image}
            alt={getFullName(int.first_name, int.last_name)}
          />
          <AvatarFallback className='h-12 w-12 rounded-md bg-slate-200'>
            {getFullName(int.first_name, int.last_name).charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <h3 className='text-md font-medium'>
            {getFullName(int.first_name, int.last_name)}
          </h3>
          <p className='text-sm text-muted-foreground'>{int.position}</p>
        </div>
        {isFeedBackEnabled && (
          <div className='flex-shrink-0'>
            {isAdmin ? (
              int.user_id === user_id ? (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    if (isFeedBackEnabled) {
                      setSelectedInterviewer({
                        index,
                        interviewer: int,
                      });
                    }
                  }}
                >
                  {int.feedback && int.feedback?.recommendation ? (
                    <>
                      <Pen className='mr-2 h-4 w-4' />
                      Edit Feedback
                    </>
                  ) : (
                    <>
                      <Plus className='mr-2 h-4 w-4' />
                      Add Feedback
                    </>
                  )}
                </Button>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='outline' size='sm'>
                      Re-request Feedback
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='bottom' align='end'>
                    <div className='flex flex-col space-y-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={(e) => {
                          handelFeedbackRequest({
                            e,
                            session_id: int.session.id,
                            relation_id: int.relation_id,
                            recruiter_user_id: int.user_id,
                            tool: 'slack',
                          });
                        }}
                      >
                        <MessageSquare className='mr-2 h-4 w-4' />
                        Slack
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={(e) => {
                          handelFeedbackRequest({
                            e,
                            session_id: int.session.id,
                            relation_id: int.relation_id,
                            recruiter_user_id: int.user_id,
                            tool: 'email',
                          });
                        }}
                      >
                        <Mail className='mr-2 h-4 w-4' />
                        Email
                      </Button>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            ) : (
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  if (isFeedBackEnabled) {
                    setSelectedInterviewer({
                      index,
                      interviewer: int,
                    });
                  }
                }}
              >
                {int.feedback && int.feedback?.objective ? (
                  <>
                    <Pen className='mr-2 h-4 w-4' />
                    Edit Feedback
                  </>
                ) : (
                  <>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Feedback
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <div className='space-y-2.5'>
          {int.feedback?.recommendation ? (
            <>
              <div className='mb-2 flex items-center space-x-2.5'>
                <Star className='h-6 w-6 text-yellow-400' />
                <span className='text-sm font-medium'>
                  Recommendation Level: {int.feedback.recommendation}
                </span>
              </div>
              <div
                className='prose prose-sm max-w-none'
                dangerouslySetInnerHTML={{
                  __html: int.feedback.objective,
                }}
              />
            </>
          ) : (
            <span className='text-sm text-muted-foreground'>
              Not Submitted Feedback
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const FeedbackForm = ({
  interviewerData,
  onSubmit,
  onCancel,
}: {
  interviewerData: FeedbackWindowInterviewersType[string][number];
  onSubmit: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
    // eslint-disable-next-line no-unused-vars
    relation_id,
    // eslint-disable-next-line no-unused-vars
    feedback,
  }: {
    session_id: string;
    relation_id: string;
    feedback: DatabaseTable['interview_session_relation']['feedback'];
  }) => void;
  onClose: () => void;
  onCancel: () => void;
}) => {
  const [interviewer, setInterviewer] = useState(interviewerData);
  return (
    // Feedback Popup Card

    <div className='flex w-full flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <Typography type='small' variant='p'>
          Recommendation Level
        </Typography>
        <div>
          <div className='flex gap-2'>
            {Array(10)
              .fill(1)
              .map((_, i) => {
                const is = (interviewer.feedback?.recommendation || 0) > i;
                return (
                  <Button
                    key={i}
                    variant='ghost'
                    size='sm'
                    className={`h-8 w-8 rounded-full ${
                      is
                        ? 'bg-primary text-primary-foreground hover:bg-slate-950 hover:text-white'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                    onClick={() => {
                      const temp = { ...interviewer };
                      temp.feedback = {
                        ...temp.feedback,
                        recommendation: i + 1,
                      };
                      setInterviewer(temp);
                    }}
                  >
                    {i + 1}
                  </Button>
                );
              })}
          </div>
          <Typography type='small' variant='p' className=''>
            {re_mapper[interviewer.feedback?.recommendation || 0]}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Typography type='small' variant='p'>
          Feedback
        </Typography>
        <div>
          <TipTapAIEditor
            placeholder='Your feedback.'
            initialValue={interviewer.feedback?.objective || ''}
            border
            height='300px'
            isSize={false}
            isAlign={false}
            handleChange={(html) => {
              const temp = { ...interviewer };
              temp.feedback = {
                ...temp.feedback,
                objective: html,
              };
              setInterviewer(temp);
            }}
          />
        </div>
      </div>
      <div className='flex justify-end gap-2 p-4'>
        <Button variant='outline' size='sm' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          size='sm'
          onClick={() => {
            if (!interviewer.feedback) {
              return toast.warning('Please provide feedback.');
            }
            onSubmit({
              relation_id: interviewer.relation_id,
              session_id: interviewer.session.id,
              feedback: interviewer.feedback,
            });
          }}
        >
          Submit Feedback
        </Button>
      </div>
    </div>
  );
};

const sendReminderForEmailAndStack = (
  body: API_request_feedback['request'],
) => {
  return axios
    .post<API_request_feedback['response']>('/api/request_feedback', body)
    .then(({ data }) => {
      return data;
    });
};
