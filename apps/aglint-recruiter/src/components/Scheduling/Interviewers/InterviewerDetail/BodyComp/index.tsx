import { DatabaseTable } from '@aglint/shared-types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { InterviewerDetail } from '@/devlink3/InterviewerDetail';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import DynamicLoader from '../../DynamicLoader';
import Interviews from '../../Interviews';
import { TabInterviewerDetail } from '..';
import { useImrQuery } from '../hooks';
import InterviewerLevelSettings from '../InterviewerLevelSettings';
import Overview from '../Overview';
import AddInterviewTypeDialog from '../Popups/AddInterviewTypeDialog';
import { useAllSchedulesByUserId } from '../query';
import TabInterviewModules from '../TabModules';
import Tabs from '../Tabs';

function BodyComp() {
  const router = useRouter();

  const { handleMemberUpdate } = useAuthDetails();

  const [filter, setFilter] =
    useState<DatabaseTable['interview_meeting']['status']>('confirmed');
  const [changeText, setChangeText] = useState('');

  const user_id = router.query.member_id as string;

  const { data: interviewerDetails, isLoading: isLoadingInterviewer } =
    useImrQuery({ user_id });

  const {
    data: {
      schedules: allSchedules,
      totalHoursThisWeek,
      totalHoursToday,
      totalInterviewsThisWeek,
      totalInterviewsToday,
    },
    isLoading,
  } = useAllSchedulesByUserId({
    filter,
    member_id: router.query.member_id as string,
    textSearch: changeText,
  });

  const tab = (router.query.tab || 'overview') as TabInterviewerDetail;
  return (
    <>
      {isLoadingInterviewer || isLoading ? (
        <DynamicLoader />
      ) : (
        <InterviewerDetail
          slotNewTabPill={<Tabs />}
          slotTabContent={
            <>
              {tab === 'overview' && <Overview scheduleList={allSchedules} />}
              {tab === 'keywords' && (
                <InterviewerLevelSettings
                  initialData={interviewerDetails?.scheduling_settings}
                  updateSettings={(x) => {
                    return handleMemberUpdate({
                      user_id: interviewerDetails.user_id,
                      data: { scheduling_settings: x },
                    });
                  }}
                  isAvailability={false}
                />
              )}
              {tab === 'availibility' && (
                <InterviewerLevelSettings
                  initialData={interviewerDetails?.scheduling_settings as any}
                  updateSettings={(x) => {
                    return handleMemberUpdate({
                      user_id: interviewerDetails.user_id,
                      data: { scheduling_settings: x },
                    });
                  }}
                  isAvailability={true}
                />
              )}
              {tab === 'interviewtypes' && <TabInterviewModules />}
              {tab === 'allschedules' && (
                <Interviews
                  allSchedules={allSchedules}
                  isLoading={isLoading}
                  filter={filter}
                  setFilter={setFilter}
                  changeText={changeText}
                  setChangeText={setChangeText}
                />
              )}
            </>
          }
          textMail={interviewerDetails?.email}
          textDepartment={interviewerDetails.position}
          textInterviewerName={
            interviewerDetails.first_name +
            ' ' +
            (interviewerDetails.last_name ? interviewerDetails.last_name : '')
          }
          slotInterviewerAvatar={
            <MuiAvatar
              key={interviewerDetails.user_id}
              src={interviewerDetails.profile_image}
              level={getFullName(
                interviewerDetails.first_name,
                interviewerDetails.last_name,
              )}
              variant='rounded'
              height='100%'
              width='100%'
            />
          }
          textTimeZone={interviewerDetails.scheduling_settings?.timeZone.label}
          textInterviewPerDay={
            <ShowCode>
              <ShowCode.When
                isTrue={
                  interviewerDetails?.scheduling_settings?.interviewLoad
                    ?.dailyLimit.type === 'Interviews'
                }
              >
                {totalInterviewsToday +
                  ' / ' +
                  interviewerDetails.scheduling_settings?.interviewLoad
                    ?.dailyLimit.value || 0}{' '}
                Interviews
              </ShowCode.When>
              <ShowCode.When
                isTrue={
                  interviewerDetails?.scheduling_settings?.interviewLoad
                    ?.dailyLimit.type === 'Hours'
                }
              >
                {totalHoursToday +
                  ' / ' +
                  interviewerDetails.scheduling_settings?.interviewLoad
                    ?.dailyLimit.value || 0}{' '}
                Hours
              </ShowCode.When>
            </ShowCode>
          }
          textInterviewPerWeek={
            <ShowCode>
              <ShowCode.When
                isTrue={
                  interviewerDetails?.scheduling_settings?.interviewLoad
                    ?.weeklyLimit.type === 'Interviews'
                }
              >
                {totalInterviewsThisWeek +
                  ' / ' +
                  interviewerDetails.scheduling_settings?.interviewLoad
                    ?.weeklyLimit.value || 0}{' '}
                Interviews
              </ShowCode.When>
              <ShowCode.When
                isTrue={
                  interviewerDetails?.scheduling_settings?.interviewLoad
                    ?.weeklyLimit.type === 'Hours'
                }
              >
                {totalHoursThisWeek +
                  ' / ' +
                  interviewerDetails.scheduling_settings?.interviewLoad
                    ?.weeklyLimit.value || 0}{' '}
                Hours
              </ShowCode.When>
            </ShowCode>
          }
        />
      )}
      <AddInterviewTypeDialog />
    </>
  );
}

export default BodyComp;
