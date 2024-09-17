import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { ScheduleDetailTabs } from '@devlink3/ScheduleDetailTabs';
import { useQueryClient } from '@tanstack/react-query';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { ShowCode } from '../../Common/ShowCode';
import Banners from './Banners';
import CancelScheduleDialog from './CancelScheduleDialog';
import DeclineScheduleDialog from './DeclineScheduleDialog';
import FeedbackWindow from './Feedback';
import { type useScheduleDetails } from './hooks';
import Instructions from './Instructions';
import JobDetails from './JobDetails';
import Overview from './Overview';

function DetailsOverview({
  data,
  refetch,
  isCancelOpen,
  setIsCancelOpen,
  viewScheduleTabs,
}: {
  data: ReturnType<typeof useScheduleDetails>['data'];
  refetch: () => void;
  isCancelOpen: boolean;
  setIsCancelOpen: Dispatch<SetStateAction<boolean>>;
  viewScheduleTabs: {
    name: string;
    tab: string;
    hide: boolean;
  }[];
}) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [textValue, setTextValue] = useState('');

  const queryClient = useQueryClient();

  const refetchInstruction = () => {
    queryClient.invalidateQueries({
      queryKey: ['schedule_details', schedule.interview_meeting.id],
    });
  };

  async function updateInstruction() {
    try {
      if (textValue) {
        const { error } = await supabase
          .from('interview_meeting')
          .update({ instructions: textValue })
          .eq('id', schedule.interview_meeting.id);
        if (error) throw Error(error.message);
        refetchInstruction();
        toast.success('Instruction updated successfully.');
      } else {
        toast.warning('Please provide instructions.');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const schedule = data?.schedule_data;

  // if logged in user is interviewer session relation will be there or else null
  const [sessionRelation, setSessionRelation] = useState<
    DatabaseTable['interview_session_relation'] | null
  >();

  const confirmedUsers = schedule?.users?.filter(
    (user) => user.interview_session_relation.is_confirmed,
  );

  useEffect(() => {
    if (confirmedUsers?.length > 0) {
      setSessionRelation(
        confirmedUsers.find(
          (user) => user.user_details.email === recruiterUser.email,
        )?.interview_session_relation,
      );
    }
  }, [confirmedUsers]);
  // if logged in user is interviewer session relation will be there or else null

  return (
    <div className='flex flex-col pb-8'>
      <ScheduleDetailTabs
        slotScheduleTabOverview={
          <div className='flex flex-col space-y-2'>
            <Banners
              sessionRelation={sessionRelation}
              refetch={refetch}
              setIsDeclineOpen={setIsDeclineOpen}
            />
            <Overview />
          </div>
        }
        slotDarkPills={viewScheduleTabs
          .filter((item) => !item.hide)
          .map((item, i: number) => {
            return (
              <Button
                key={i}
                variant={router.query.tab === item.tab ? 'default' : 'outline'}
                onClick={() => {
                  router.replace(
                    `/scheduling/view?meeting_id=${router.query.meeting_id}&tab=${item.tab}`,
                  );
                }}
              >
                {item.name}
              </Button>
            );
          })}
        slotTabContent={
          <ShowCode>
            <ShowCode.When isTrue={router.query.tab === 'instructions'}>
              <Instructions
                instruction={schedule?.interview_meeting.instructions as string}
                setTextValue={setTextValue}
                showEditButton={
                  recruiterUser.role === 'admin' ||
                  recruiterUser.role === 'recruiter'
                }
                updateInstruction={updateInstruction}
                isBorder={false}
                isPadding={false}
                isWidth={false}
              />
            </ShowCode.When>
            <ShowCode.When
              isTrue={
                router.query.tab === 'feedback' &&
                schedule.interview_session.session_type !== 'debrief'
              }
            >
              <div className='flex flex-col'>
                {schedule?.interview_meeting?.status === 'completed' ? (
                  <FeedbackWindow
                    interview_sessions={[
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
                    ]}
                    candidate={{
                      email: schedule?.candidates.email,
                      name: `${schedule?.candidates.first_name || ''} ${schedule?.candidates.last_name || ''}`.trim(),
                      job_id: schedule?.job?.id,
                      application_id: schedule?.application_id,
                    }}
                  />
                ) : (
                  <div className='flex flex-row w-full h-[200px] justify-center items-center'>
                    <GlobalEmpty
                      text={
                        'Feedback will be enabled once the interview is completed'
                      }
                      iconSlot={<MessageCircle className='text-gray-500' />}
                    />
                  </div>
                )}
              </div>
            </ShowCode.When>
            <ShowCode.When
              isTrue={router.query.tab === 'job_details' || !router.query.tab}
            >
              <JobDetails schedule={schedule} />
            </ShowCode.When>
          </ShowCode>
        }
      />
      <>
        <DeclineScheduleDialog
          sessionRelation={sessionRelation}
          isDeclineOpen={isDeclineOpen}
          setIsDeclineOpen={setIsDeclineOpen}
          schedule={schedule}
          refetch={refetch}
        />
        <CancelScheduleDialog
          isDeclineOpen={isCancelOpen}
          setIsDeclineOpen={setIsCancelOpen}
          refetch={refetch}
          metaDetails={[
            {
              application_id: schedule.application_id,
              meeting_id: schedule.interview_meeting.id,
              session_name: schedule.interview_session.name,
              session_id: schedule.interview_session.id,
            },
          ]}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          closeDialog={() => {}}
          application_log_id={null}
        />
      </>
    </div>
  );
}

export default DetailsOverview;
