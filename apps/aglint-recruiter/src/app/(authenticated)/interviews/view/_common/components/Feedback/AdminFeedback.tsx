import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import axios from 'axios';
import {
  AlertCircle,
  Calendar,
  Circle,
  Clock,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';
import { type API_request_feedback } from '@/pages/api/request_feedback/type';
import toast from '@/utils/toast';

import { EditFeedbackDialog } from './editFeedbackDialog';
import { FeedbackCardDetails } from './feedbackCard';
import type { FeedbackWindowInterviewersType } from './type';

export const AdminFeedback = ({
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
const sendReminderForEmailAndStack = (
  body: API_request_feedback['request'],
) => {
  return axios
    .post<API_request_feedback['response']>('/api/request_feedback', body)
    .then(({ data }) => {
      return data;
    });
};
