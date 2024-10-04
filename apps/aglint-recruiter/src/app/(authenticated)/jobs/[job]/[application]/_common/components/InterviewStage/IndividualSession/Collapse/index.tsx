import { type DatabaseTable } from '@aglint/shared-types';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Collapsible, CollapsibleContent } from '@components/ui/collapsible';
import { BriefcaseBusiness, User } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import UITypography from '@/components/Common/UITypography';
import InterviewerUserDetail from '@/components/Scheduling/Common/InterviewerUserDetail';
import { formatTimeWithTimeZone } from '@/components/Scheduling/utils';
import { numberToText } from '@/utils/number/numberToText';

import { type StageWithSessions } from '../../../../hooks/useInterviewStages';
import CancelBanners from './AdminCancelBanners';

function CollapseContent({
  currentSession,
  collapsed,
  candidate,
}: {
  currentSession: NonNullable<StageWithSessions>[0]['sessions'][0];
  collapsed: boolean;
  candidate?: {
    name: string;
    current_job_title: string;
    timezone: string;
  } | null;
}) {
  let users = currentSession.users;

  const interview_meeting = currentSession?.interview_meeting;
  const interview_session = currentSession?.interview_session;

  if (
    interview_meeting?.status === 'confirmed' ||
    interview_meeting?.status === 'completed'
  ) {
    users = currentSession.users?.filter(
      (user) => user.interview_session_relation.is_confirmed,
    );
  }
  const cancelReasons = currentSession?.cancel_reasons;
  const count = users?.length ?? 0;

  return (
    <Collapsible open={collapsed}>
      <CollapsibleContent>
        {!!currentSession && (
          <div className='space-y-4 p-4 pt-0'>
            <>
              {candidate &&
                candidate.timezone &&
                interview_meeting?.start_time && (
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        {candidate.name && (
                          <Avatar
                            style={{
                              height: '50px',
                              width: '50px',
                            }}
                          >
                            <AvatarImage
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=random`}
                              alt={candidate.name}
                            />
                            <AvatarFallback>
                              {candidate.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <div className='flex-grow'>
                        <p className='text-sm font-medium text-gray-900'>
                          {candidate.name}
                        </p>
                        {candidate.current_job_title && (
                          <div className='mt-1 flex items-center text-xs text-muted-foreground'>
                            <BriefcaseBusiness className='mr-1 h-3 w-3' />
                            <span>{candidate.current_job_title}</span>
                          </div>
                        )}
                        <p className='mt-1 text-xs text-muted-foreground'>
                          {interview_meeting?.start_time
                            ? formatTimeWithTimeZone({
                                start_time: interview_meeting.start_time,
                                end_time: interview_meeting.end_time,
                                timeZone: candidate.timezone,
                              })
                            : '--'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              <div className='space-y-2'>
                {count !== 0 && (
                  <UITypography className='text-xs text-muted-foreground'>
                    {interview_meeting?.status === 'confirmed' ||
                    interview_meeting?.status === 'completed'
                      ? 'Interviewer(s)'
                      : interview_session.session_type === 'panel'
                        ? `${numberToText(
                            interview_session.interviewer_cnt,
                          )} of the member below will be picked as interviewer`
                        : interview_session.session_type === 'individual'
                          ? `One of the member below will be picked as interviewer`
                          : 'Interviewer(s)'}
                  </UITypography>
                )}

                {count === 0 ? (
                  <>
                  <GlobalEmpty icon={<User/>} header='No interviewers assigned.' description='Assign interviewers to this session to schedule'/>
                  </>
                  
                ) : (
                  users.map((user) => {
                    const item = user.user_details;
                    const pause_json = user.interview_module_relation
                      ?.pause_json as DatabaseTable['interview_module_relation']['pause_json'];
                    const isPaused = !!pause_json;
                    const isCalendarConnected =
                      user.user_details.is_calendar_connected;

                    const cancelReason = cancelReasons?.find(
                      (can) =>
                        can.interview_session_cancel.session_relation_id ===
                        user.interview_session_relation.id,
                    )
                      ?.interview_session_cancel as DatabaseTable['interview_session_cancel'];

                    return (
                      <InterviewerUserDetail
                        key={item?.user_id}
                        accepted_status={
                          user.interview_session_relation.accepted_status
                        }
                        cancelReason={cancelReason}
                        interview_meeting={{
                          end_time: interview_meeting?.end_time,
                          start_time: interview_meeting?.start_time,
                          status: interview_meeting?.status,
                        }}
                        interviewerTimeZone={
                          item.scheduling_settings?.timeZone?.tzCode ?? ''
                        }
                        isCalendarConnected={Boolean(isCalendarConnected)}
                        isPaused={isPaused}
                        pause_json={pause_json}
                        userDetails={{
                          first_name: item?.first_name ?? '',
                          last_name: item?.last_name ?? '',
                          user_id: item?.user_id ?? '',
                          position: item?.position ?? '',
                          profile_image: item?.profile_image ?? '',
                        }}
                        trainingType={
                          user.interview_session_relation.training_type
                        }
                        interviewerType={
                          user.interview_session_relation.interviewer_type
                        }
                      />
                    );
                  })
                )}
              </div>
            </>

            <CancelBanners session={currentSession} />
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default CollapseContent;
