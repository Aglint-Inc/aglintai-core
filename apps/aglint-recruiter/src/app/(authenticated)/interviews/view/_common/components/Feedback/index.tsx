import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import {
  AlertCircle,
  Calendar,
  Circle,
  Clock,
  User,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import axios from '@/client/axios';
import { Loader } from '@/common/Loader';
import { useTenant } from '@/company/hooks';
import { ShowCode } from '@/components/Common/ShowCode';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type API_request_feedback } from '@/pages/api/request_feedback/type';
import toast from '@/utils/toast';

import { useScheduleDetails } from '../../hooks/useScheduleDetails';
import { EditFeedbackDialog } from './editFeedbackDialog';
import { FeedbackCardDetails } from './feedbackCard';
import type { FeedbackWindowInterviewersType } from './type';
import {
  saveInterviewerFeedback,
  useInterviewerRelations,
} from './util.function';

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
  const interviewersData = Object.keys(sessions) as string[];
  const sessionsData = Object.values(sessions)[0];
  return (
    <>
      <div className='flex flex-col space-y-2 p-2'>
        {router.pathName !== '/interviews/view' ? (
          interviewersData
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
        ) : sessionsData?.length ? (
          sessionsData.map((int, index) => {
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
          })
        ) : (
          <Alert variant='info'>
            <AlertCircle strokeWidth={1.5} className='text-muted-foreground' />
            <AlertTitle>No Interviewers Assigned</AlertTitle>
            <AlertDescription>
              Interviewers will be decided once the interview is confirmed.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <EditFeedbackDialog
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
  const sessionsData = Object.values(sessions)[0];
  return (
    <>
      <div className='flex flex-col space-y-2 p-2'>
        {router.pathName !== '/interviews/view' ? (
          Object.keys(sessions)
            .map((key) => {
              const session = sessions[key] || [];
              if (!session.length) return null;
              return (
                <Card key={key}>
                  <CardHeader>
                    <div className='space-y-2'>
                      {session[0].session.session_type === 'panel' ? (
                        <div className='flex items-center space-x-2'>
                          <Users size={18} className='text-muted-foreground' />
                          <span>{session[0].session.title}</span>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <User size={18} className='text-muted-foreground' />
                          <span>{session[0].session.title}</span>
                        </div>
                      )}
                      <div className='flex items-center space-x-2'>
                        <Calendar size={16} className='text-muted-foreground' />
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
        ) : sessionsData.length ? (
          sessionsData?.map((int, index) => {
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
          })
        ) : (
          <Alert variant='info'>
            <AlertCircle strokeWidth={1.5} className='text-muted-foreground' />
            <AlertTitle>No Interviewers Assigned</AlertTitle>
            <AlertDescription>
              Interviewers will be decided once the interview is confirmed.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <EditFeedbackDialog
        setSelectedInterviewer={setSelectedInterviewer}
        selectedInterviewer={selectedInterviewer}
        handelSubmit={handelSubmit}
      />
    </>
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
