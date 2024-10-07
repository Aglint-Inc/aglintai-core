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
import { useState } from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';

import { EditFeedbackDialog } from './editFeedbackDialog';
import { FeedbackCardDetails } from './feedbackCard';
import type { FeedbackWindowInterviewersType } from './type';

export const InterviewerFeedback = ({
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
