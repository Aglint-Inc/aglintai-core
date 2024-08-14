import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { MyScheduleLanding } from '@/devlink/MyScheduleLanding';
import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { InterviewMemberSide } from '@/devlink2/InterviewMemberSide';
import { NewMyScheduleCard } from '@/devlink3/NewMyScheduleCard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useAllIntegrations } from '@/src/queries/intergrations';
import toast from '@/src/utils/toast';

import SearchField from '../../Common/SearchField/SearchField';
import { ShowCode } from '../../Common/ShowCode';
import { DateIcon } from '../../CompanyDetailComp/SettingsSchedule/Components/DateSelector';
import ScheduleMeetingCard from '../Common/ModuleSchedules/ScheduleMeetingCard';
import {
  fetchSchedulesCountByUserId,
  useAllSchedulesByUserId,
} from '../Interviewers/InterviewerDetail/query';
import { transformDataSchedules } from '../schedules-query';

function MySchedule() {
  const { recruiterUser } = useAuthDetails();
  const [filter, setFilter] =
    useState<DatabaseTable['interview_meeting']['status']>('confirmed');
  const [changeText, setChangeText] = useState('');
  const [counts, setCounts] = useState({
    upcomingCount: 0,
    completedCount: 0,
    cancelledCount: 0,
  });

  useEffect(() => {
    (async () => {
      const res = await fetchSchedulesCountByUserId(recruiterUser.user_id);
      setCounts(res);
    })();
  }, []);

  const router = useRouter();

  const getConsent = async () => {
    try {
      localStorage.setItem(
        'gmail-redirect-path',
        `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling?tab=myschedules`,
      );
      const { data } = await axios.get('/api/scheduling/google-consent');

      return router.push(data);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const {
    data: { schedules: allSchedules },
    isLoading,
  } = useAllSchedulesByUserId({
    filter,
    member_id: recruiterUser.user_id,
  });

  const { data: allIntegrations } = useAllIntegrations();

  return (
    <>
      <ShowCode>
        <ShowCode.When
          isTrue={
            (!!allIntegrations?.service_json &&
              allIntegrations?.google_workspace_domain?.split('//')[1] ===
                recruiterUser.email.split('@')[1]) ||
            !!(recruiterUser.schedule_auth as any)?.access_token
          }
        >
          <InterviewMemberSide
            slotInterview={
              <Stack>
                <SearchField
                  value={changeText}
                  onChange={(e) => {
                    setChangeText(e.target.value);
                  }}
                  onClear={() => setChangeText('')}
                  placeholder={'Search by session name'}
                />
              </Stack>
            }
            isUpcomingActive={filter === 'confirmed'}
            isCancelActive={filter === 'cancelled'}
            isCompletedActive={filter === 'completed'}
            textUpcomingCount={counts.upcomingCount}
            textCancelledCount={counts.cancelledCount}
            textPastCount={counts.completedCount}
            onClickUpcoming={{
              onClick: () => setFilter('confirmed'),
            }}
            onClickCancelled={{
              onClick: () => setFilter('cancelled'),
            }}
            onClickCompleted={{
              onClick: () => setFilter('completed'),
            }}
            slotInterviewCard={
              <>
                {isLoading ? (
                  ''
                ) : allSchedules.length === 0 ? (
                  <AllInterviewEmpty textDynamic='No schedule found' />
                ) : (
                  <>
                    {transformDataSchedules(allSchedules).map((sch, ind) => {
                      const date = Object.keys(sch)[0];
                      const schedules = sch[String(date)];
                      return (
                        <NewMyScheduleCard
                          key={ind}
                          textDate={
                            date != 'undefined'
                              ? dayjsLocal(date).format('DD')
                              : null
                          }
                          textDay={
                            date != 'undefined'
                              ? dayjsLocal(date).format('ddd')
                              : null
                          }
                          textMonth={
                            date != 'undefined' ? (
                              dayjsLocal(date).format('MMM')
                            ) : (
                              <DateIcon />
                            )
                          }
                          slotMyScheduleSubCard={schedules.map(
                            (meetingDetails, i) => {
                              return (
                                <ScheduleMeetingCard
                                  key={i}
                                  meetingDetails={meetingDetails}
                                />
                              );
                            },
                          )}
                        />
                      );
                    })}
                  </>
                )}
              </>
            }
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            !allIntegrations?.service_json || !recruiterUser.schedule_auth
          }
        >
          <MyScheduleLanding
            onClickConnectCalender={{
              onClick: getConsent,
            }}
            textConnectedTo={`Connected to ${(recruiterUser.schedule_auth as any)?.email}`}
            isConnectedVisible={!!recruiterUser.schedule_auth}
            isConnectCalenderVisible={!recruiterUser.schedule_auth}
          />
        </ShowCode.When>
      </ShowCode>
    </>
  );
}

export default MySchedule;
