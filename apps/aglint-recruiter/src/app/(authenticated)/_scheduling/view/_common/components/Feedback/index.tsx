/* eslint-disable security/detect-object-injection */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Dialog, DialogContent } from '@components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import {
  Calendar,
  Circle,
  Clock,
  Edit,
  Loader2,
  Mail,
  MessageSquare,
  Plus,
  Star,
  User,
  Users,
  X,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import axios from '@/client/axios';
import { ShowCode } from '@/components/Common/ShowCode';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type API_request_feedback } from '@/pages/api/request_feedback/type';
import { getFullName } from '@/utils/jsonResume';
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
    email: schedule?.candidates.email,
    name: `${schedule?.candidates.first_name || ''} ${schedule?.candidates.last_name || ''}`.trim(),
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

  const { recruiterUser } = useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();
  const user_id = recruiterUser?.user_id;
  const isAdmin = recruiterUser?.role === 'admin';

  const tempRelations = useMemo(() => {
    const tempData = (
      (relationsData || []) as unknown as {
        session_id: string;
        feedback: (typeof relationsData)[number]['feedback'];
        interview_module_relation: (typeof relationsData)[number]['interview_module_relation'];
      }[]
    ).filter((item) => Boolean(item.interview_module_relation?.id));

    const tempRelation: {
      [key: string]: {
        feedback: (typeof relationsData)[number]['feedback'];
        relation_id: string;
        user_id: string;
      }[];
    } = {};

    for (const item of tempData) {
      const temp = tempRelation[item.session_id] || [];
      temp.push({
        feedback: item.feedback,
        relation_id: item.interview_module_relation.id,
        user_id: item.interview_module_relation.user_id,
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
          const tempMem = relationsData.find(
            (item) =>
              item.interview_module_relation.user_id === memRelation.user_id,
          ).interview_module_relation.recruiter_user;
          if (!tempMem) return;
          interviewers[String(session.id)] = [
            ...(interviewers[String(session.id)] || []),
            {
              user_id: tempMem.user_id,
              session,
              relation_id: memRelation.relation_id,
              first_name: tempMem.first_name,
              last_name: tempMem.last_name,
              email: tempMem.email,
              profile_image: tempMem.profile_image,
              position: tempMem.position,
              feedback: memRelation.feedback,
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
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
          </div>
        </ShowCode.When>
        <ShowCode.When isTrue={checkPermissions(['scheduling_actions'])}>
          <AdminFeedback
            {...{
              user_id,
              isAdmin,

              interviewers: Object.keys(interviewers)
                .map((key) => interviewers[String(key)])
                .flat(),
              handelSubmit,
              candidate,
            }}
          />
        </ShowCode.When>
        <ShowCode.Else>
          <InterviewerFeedback
            interviewers={Object.keys(interviewers)
              .map((key) => interviewers[String(key)])
              .flat()
              .filter((item) => item.user_id === user_id)}
            handelSubmit={handelSubmit}
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
    index: number;
    interviewer: (typeof interviewers)[number];
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
    recruiter_user_id;
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
      feedback: { recommendation: null, objective: null },
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
        {router.pathName !== '/scheduling/view'
          ? Object.keys(sessions)
              .map((key) => {
                const session = sessions[key] || [];
                if (!session.length) return null;
                return (
                  <Card key={key} className='p-4'>
                    <CardHeader className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        {session[0].session.session_type === 'panel' ? (
                          <Users size={18} className='text-gray-500' />
                        ) : (
                          <User size={18} className='text-gray-500' />
                        )}
                        <span className='text-lg font-medium'>
                          {session[0].session.title}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2 text-sm text-gray-500'>
                        <Calendar className='h-4 w-4' />
                        <span>
                          {dayjsLocal(session[0].session.time.start).format(
                            'ddd, MMMM DD, YYYY',
                          )}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2 text-sm text-gray-500'>
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
  }) => Promise<boolean>;
}) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<{
    index: number;
    interviewer: (typeof interviewers)[number];
  }>({ index: null, interviewer: null });

  const sessions: { [key: string]: typeof interviewers } = {};
  interviewers.forEach((item) => {
    sessions[item.session.id] = [...(sessions[item.session.id] || []), item];
  });
  const router = useRouter();
  return (
    <>
      <div className='flex flex-col space-y-2 p-2'>
        {router.pathname !== '/scheduling/view'
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
                            <Users size={18} />
                            <span>{session[0].session.title}</span>
                          </div>
                        ) : (
                          <div className='flex items-center space-x-2'>
                            <User size={18} />
                            <span>{session[0].session.title}</span>
                          </div>
                        )}
                        <div className='flex items-center space-x-2'>
                          <Calendar size={16} />
                          <span>
                            {dayjsLocal(session[0].session.time.start).format(
                              'ddd, MMMM DD, YYYY',
                            )}
                          </span>
                        </div>
                        <div className='flex items-center space-x-2 text-sm text-neutral-500'>
                          <Clock size={16} />
                          <span>{`${dayjsLocal(
                            session[0].session.time.start,
                          ).format('hh:mm')} - ${dayjsLocal(
                            session[0].session.time.end,
                          ).format('hh:mm')}`}</span>
                        </div>

                        <Badge className='flex items-center space-x-1'>
                          <Circle size={12} />
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
        <Dialog
          open={selectedInterviewer.interviewer !== null}
          onOpenChange={() => setSelectedInterviewer(null)}
        >
          <DialogContent className='sm:max-w-[650px]'>
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
          </DialogContent>
        </Dialog>
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
    <Card className='w-full'>
      <CardHeader className='flex items-center space-x-4'>
        <Avatar className='h-10 w-10'>
          <AvatarImage
            src={int.profile_image}
            alt={getFullName(int.first_name, int.last_name)}
          />
          <AvatarFallback>
            {getFullName(int.first_name, int.last_name).charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className='font-semibold'>
            {getFullName(int.first_name, int.last_name)}
          </h3>
          <p className='text-sm text-muted-foreground'>{int.position}</p>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {isFeedBackEnabled && isAdmin ? (
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
                  <Edit className='mr-2 h-4 w-4' />
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
                <Edit className='mr-2 h-4 w-4' />
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
        <div className='space-y-2.5'>
          {int.feedback?.recommendation ? (
            <>
              <div className='flex items-center space-x-2.5'>
                <Star className='h-7 w-7 text-yellow-400' />
                <span>Recommendation Level: {int.feedback.recommendation}</span>
              </div>
              <div
                className='prose prose-sm'
                dangerouslySetInnerHTML={{
                  __html: int.feedback.objective,
                }}
              />
            </>
          ) : (
            <span className='text-muted-foreground'>
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
  onClose,
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

    <div className='flex w-[650px] items-center justify-center'>
      <div className='w-full max-w-lg rounded-lg bg-white shadow-lg'>
        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
          <h2 className='font-semibold'>My Feedback</h2>
          <UIButton onClick={() => onClose()} variant='ghost' size='sm'>
            <X className='h-4 w-4' />
          </UIButton>
        </div>
        <div className='p-4'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <p>Recommendation Level</p>
              <div>
                <div className='flex gap-2'>
                  {Array(10)
                    .fill(1)
                    .map((_, i) => {
                      return (
                        <Button
                          key={i}
                          variant='ghost'
                          size='sm'
                          className={`h-8 w-8 rounded-full ${
                            (interviewer.feedback?.recommendation || 0) > i
                              ? 'bg-primary text-primary-foreground'
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
                <p>{re_mapper[interviewer.feedback?.recommendation || 0]}</p>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <p>Feedback</p>
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
          </div>
        </div>
        <div className='flex justify-end gap-2 border-t border-gray-200 p-4'>
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
