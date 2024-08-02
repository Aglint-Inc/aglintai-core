import { DatabaseTable } from '@aglint/shared-types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { InterviewerDetail } from '@/devlink3/InterviewerDetail';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useTeamMembers } from '@/src/components/CompanyDetailComp/TeamManagement';
import EditMember from '@/src/components/CompanyDetailComp/TeamManagement/EditMemberDialog';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import DynamicLoader from '../../DynamicLoader';
import Interviews from '../../Interviews';
import { TabInterviewerDetail } from '..';
import { useImrQuery } from '../hooks';
import InterviewerLevelSettings from '../InterviewerLevelSettings';
import Overview from '../Overview';
import AddInterviewTypeDialog from '../Popups/AddInterviewTypeDialog';
import { EditProfileDialog } from '../Popups/EditProfileDialog';
import { useAllSchedulesByUserId } from '../query';
import TabInterviewModules from '../TabModules';
import Availibility from '../TabModules/Availibility';
import Tabs from '../Tabs';

function BodyComp() {
  const router = useRouter();

  const { handleMemberUpdate } = useAuthDetails();

  const [filter, setFilter] =
    useState<DatabaseTable['interview_meeting']['status']>('confirmed');
  const [changeText, setChangeText] = useState('');

  const user_id = router.query.user_id as string;

  const {
    data: interviewerDetails,
    isLoading: isLoadingInterviewer,
    refetch: interviewerDetailsRefetch,
  } = useImrQuery({ user_id });

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
    member_id: user_id,
    textSearch: changeText,
  });

  const tab = (router.query.tab || 'overview') as TabInterviewerDetail;

  const [isOpen, setIsOpen] = useState(router.query.edit_enable || false);
  const { recruiterUser } = useAuthDetails();
  const { activeMembers } = useTeamMembers();

  return (
    <>
      {isLoadingInterviewer || isLoading ? (
        <DynamicLoader />
      ) : (
        <>
          {recruiterUser.role === 'admin' ? (
            <EditMember
              open={Boolean(isOpen)}
              memberList={activeMembers
                .map((mem) => ({
                  id: mem.user_id,
                  name: getFullName(mem.first_name, mem.last_name),
                }))
                .filter((mem) => mem.id !== recruiterUser.user_id)}
              member={interviewerDetails}
              refetch={interviewerDetailsRefetch}
              onClose={() => {
                setIsOpen(null);
              }}
            />
          ) : (
            <EditProfileDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              interviewerDetailsRefetch={interviewerDetailsRefetch}
            />
          )}

          <InterviewerDetail
            slotNewTabPill={<Tabs />}
            slotEditButton={
              interviewerDetails.user_id === recruiterUser.user_id ||
              (recruiterUser.role === 'admin' &&
                interviewerDetails.recruiter_relation[0].roles.name !==
                  'admin') ? (
                <ButtonSoft
                  textButton={'Edit'}
                  size={2}
                  color={'neutral'}
                  onClickButton={{
                    onClick: () => {
                      setIsOpen(true);
                    },
                  }}
                />
              ) : (
                <></>
              )
            }
            slotTabContent={
              <>
                {tab === 'overview' && (
                  <Overview
                    scheduleList={allSchedules}
                    interviewerDetails={interviewerDetails}
                    totalHoursThisWeek={totalHoursThisWeek}
                    totalHoursToday={totalHoursToday}
                    totalInterviewsThisWeek={totalInterviewsThisWeek}
                    totalInterviewsToday={totalInterviewsToday}
                  />
                )}
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
                  <Availibility
                    interviewerDetailsRefetch={interviewerDetailsRefetch}
                    interviewerDetails={interviewerDetails}
                    totalHoursThisWeek={totalHoursThisWeek}
                    totalHoursToday={totalHoursToday}
                    totalInterviewsThisWeek={totalInterviewsThisWeek}
                    totalInterviewsToday={totalInterviewsToday}
                    updateSettings={(x) => {
                      return handleMemberUpdate({
                        user_id: interviewerDetails.user_id,
                        data: { scheduling_settings: x },
                      });
                    }}
                  />
                )}
                {tab === 'qualified' && (
                  <TabInterviewModules type='qualified' />
                )}
                {tab === 'training' && <TabInterviewModules type='training' />}
                {/* {tab === 'interviewtypes' && <TabInterviewModules />} */}
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
            textPhone={interviewerDetails.phone || '- -'}
            isLinkedInVisible={!!interviewerDetails.linked_in}
            onClickLinkedIn={{
              onClick: () => {
                window.open(interviewerDetails.linked_in, '_blank');
              },
            }}
            textLocation={`${interviewerDetails.office_locations.city}, ${interviewerDetails.office_locations.region}, ${interviewerDetails.office_locations.country}`}
            textMail={interviewerDetails.email}
            textRole={interviewerDetails.departments.name}
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
            textTimeZone={
              interviewerDetails.scheduling_settings?.timeZone.label
            }
          />
        </>
      )}
      <AddInterviewTypeDialog />
    </>
  );
}

export default BodyComp;
