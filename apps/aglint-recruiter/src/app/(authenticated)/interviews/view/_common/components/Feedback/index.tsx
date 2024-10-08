import { type DatabaseTable } from '@aglint/shared-types';
import { useMemo } from 'react';

import { Loader } from '@/common/Loader';
import { useTenant } from '@/company/hooks';
import { ShowCode } from '@/components/Common/ShowCode';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import { useScheduleDetails } from '../../hooks/useScheduleDetails';
import { AdminFeedback } from './AdminFeedback';
import { InterviewerFeedback } from './InterviewerFeedback';
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
            checkPermissions && checkPermissions(['manage_interview']),
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
