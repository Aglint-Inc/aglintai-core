import '@styles/fullcalendar-theme.css';

import { type DatabaseTable } from '@aglint/shared-types';
import { getShortTimeZone } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Loader2, Mail, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import CalendarComp from '@/components/Common/Calendar/Calendar';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { UITextArea } from '@/components/Common/UITextArea';
import { useTeamMembers } from '@/components/CompanyDetailComp/TeamManagement';
import EditMember from '@/components/CompanyDetailComp/TeamManagement/EditMemberDialog';
import { UserListThreeDot } from '@/components/CompanyDetailComp/TeamManagement/MemberList/ThreeDot';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { updateMember } from '@/context/AuthContext/utils';
import { useAllIntegrations } from '@/queries/intergrations';
import dayjs from '@/utils/dayjs';
import { getFullName } from '@/utils/jsonResume';
import { capitalizeAll } from '@/utils/text/textUtils';

import IconSessionType from '../../../../Common/Icons/IconSessionType';
import { type TabInterviewerDetail } from '..';
import { AiBookingInstruction } from '../_common/AiBookingInstruction';
import { UpcomingInterviewList } from '../_common/UpcomingInterviewList';
import { UserLayout } from '../_common/UserLayout';
import { useImrQuery } from '../hooks';
import Overview from '../Overview';
import AddInterviewTypeDialog from '../Popups/AddInterviewTypeDialog';
import { EditProfileDialog } from '../Popups/EditProfileDialog';
import { useAllSchedulesByUserId } from '../query';
import TabInterviewModules from '../TabModules';
import Availibility from '../TabModules/Availibility';
import Tabs from '../Tabs';

function BodyComp() {
  const router = useRouter();

  const [filter, setFilter] = useState<
    DatabaseTable['interview_meeting']['status'][]
  >(['completed', 'confirmed', 'cancelled']);
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
  });

  const tab = (router.query.tab || 'overview') as TabInterviewerDetail;

  const [isOpen, setIsOpen] = useState(router.query.edit_enable || false);
  const { recruiterUser, recruiter } = useAuthDetails();
  const { activeMembers } = useTeamMembers();
  const { data: allIntegrations } = useAllIntegrations();

  const isEditOpen = router.query.edit_enable;

  useEffect(() => {
    setIsOpen(isEditOpen);
  }, [isEditOpen]);

  const [dialogOpen, setDialogOpen] = React.useState<'email' | 'slack' | null>(
    null,
  );

  const handleClickOpen = (type: 'email' | 'slack') => {
    setDialogOpen(type);
  };

  const handleClose = () => {
    setDialogOpen(null);
  };

  // const upcomingSchedules = allSchedules;
  const upcomingSchedules = allSchedules.filter((schedule) => {
    const itemDateTime = dayjs(schedule.start_time);
    const now = dayjs();
    return itemDateTime.isAfter(now);
  });
  const [value, setValue] =
    useState(`Prefer to take interviews on Tuesday and Friday afternoons.
Cannot take interviews on Sundays.
Available on Monday mornings before 10 AM.
Unavailable for interviews on Tuesdays.`);

  return (
    <>
      {isLoadingInterviewer || isLoading ? (
        <div className='flex justify-center items-center'>
          <Loader2 className='w-6 h-6 animate-spin text-primary' />
        </div>
      ) : (
        <>
          {recruiterUser.role === 'admin' ? (
            <EditMember
              open={Boolean(isOpen)}
              memberList={activeMembers
                .map((mem) => ({
                  id: mem.user_id,
                  name: getFullName(mem.first_name, mem?.last_name),
                }))
                .filter((mem) => mem.id !== recruiterUser.user_id)}
              member={interviewerDetails}
              refetch={interviewerDetailsRefetch}
              onClose={() => {
                setIsOpen(null);
                //remove query param
                const { pathname, query } = router;
                const updatedQuery = { ...query };
                delete updatedQuery['edit_enable'];
                router.push({
                  pathname,
                  query: updatedQuery,
                });
              }}
            />
          ) : (
            <EditProfileDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              interviewerDetailsRefetch={interviewerDetailsRefetch}
            />
          )}
          {renderCalendarConnectionReminder({
            allIntegrations,
            interviewerDetails,
            recruiterUser,
            dialogOpen,
            handleClickOpen,
            handleClose,
          })}
          <UserLayout
            isUpcomingInterviewVisible={true}
            slotUpcomingList={
              upcomingSchedules.length > 0 ? (
                upcomingSchedules.map((schedule) => (
                  <UpcomingInterviewList
                    onClick={() =>
                      router.push(
                        `/scheduling/view?meeting_id=${schedule.id}&tab=candidate_details`,
                      )
                    }
                    key={schedule.application_id}
                    textPanelName={schedule.session_name}
                    slotPanelIcon={
                      <IconSessionType type={schedule.session_type} size={4} />
                    }
                    textDate={dayjs(schedule.start_time).format(
                      'ddd, MMM DD,YYYY',
                    )}
                    textTime={`${dayjs(schedule.start_time).format('hh:mm A')} - ${dayjs(schedule.end_time).format('hh:mm A')} ${getShortTimeZone(
                      schedule.meeting_interviewers[0].tz_code,
                    )}`}
                  />
                ))
              ) : (
                <div className='flex flex-col items-center justify-center p-8 text-center'>
                  <svg
                    className='w-12 h-12 text-gray-400 mb-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  <h3 className='text-lg font-medium text-gray-900 mb-1'>
                    No Interviews found
                  </h3>
                  <p className='text-sm text-gray-500'>
                    There are no interviews scheduled at the moment.
                  </p>
                </div>
              )
            }
            slotNewTabPill={<Tabs />}
            slotEditButton={
              interviewerDetails.user_id === recruiterUser.user_id ||
              (recruiterUser.role === 'admin' &&
                interviewerDetails.recruiter_relation[0].roles.name !==
                  'admin') ||
              recruiter.primary_admin === recruiterUser.user_id ? (
                <UserListThreeDot member={interviewerDetails} />
              ) : (
                <></>
              )
            }
            slotTabContent={
              <>
                {tab === 'overview' && (
                  <Overview interviewerDetails={interviewerDetails} />
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
                      return updateMember({
                        data: {
                          user_id: interviewerDetails.user_id,
                          scheduling_settings: x,
                        },
                      });
                    }}
                  />
                )}
                {tab === 'qualified' && (
                  <TabInterviewModules type='qualified' />
                )}
                {tab === 'aglintaiinstruction' && (
                  <AiBookingInstruction
                    textHowTo='Set availability and preferences to optimize the interview scheduling process.'
                    textExample='Prefer to take interviews on Tuesday and Friday afternoons. Unavailable for interviews on Sundays.'
                    slotTextArea={
                      <UITextArea
                        rows={6}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    }
                  />
                )}
                {tab === 'training' && <TabInterviewModules type='training' />}
                {/* {tab === 'interviewtypes' && <TabInterviewModules />} */}
                {tab === 'calendar' && (
                  <CalendarComp
                    allSchedules={allSchedules}
                    isLoading={isLoading}
                    filter={filter}
                    setFilter={setFilter}
                  />
                )}
              </>
            }
            textPhone={interviewerDetails.phone || '- -'}
            isLinkedInVisible={!!interviewerDetails.linked_in}
            onClickLinkedIn={() =>
              window.open(interviewerDetails.linked_in, '_blank')
            }
            textLocation={
              interviewerDetails?.office_locations
                ? `${interviewerDetails.office_locations.city}, ${interviewerDetails.office_locations.region}, ${interviewerDetails.office_locations.country}`
                : '- -'
            }
            textMail={interviewerDetails.email}
            textInterviewer={capitalizeAll(
              interviewerDetails?.recruiter_relation[0]?.roles?.name,
            )}
            textRole={interviewerDetails.departments?.name ?? '- -'}
            textDepartment={interviewerDetails.position}
            textInterviewerName={
              interviewerDetails.first_name +
              ' ' +
              (interviewerDetails.last_name ? interviewerDetails.last_name : '')
            }
            slotInterviewerAvatar={
              <Avatar
                key={interviewerDetails.user_id}
                className='w-full h-full rounded-lg'
              >
                <AvatarImage
                  src={interviewerDetails.profile_image}
                  alt={getFullName(
                    interviewerDetails.first_name,
                    interviewerDetails.last_name,
                  )}
                />
                <AvatarFallback>
                  {getFullName(
                    interviewerDetails.first_name,
                    interviewerDetails.last_name,
                  ).charAt(0)}
                </AvatarFallback>
              </Avatar>
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

// Define the props interface
interface CalendarConnectionReminderProps {
  allIntegrations: any;
  interviewerDetails: any;
  recruiterUser: any;
  dialogOpen: 'email' | 'slack' | null;
  // eslint-disable-next-line no-unused-vars
  handleClickOpen: (type: 'email' | 'slack') => void;
  handleClose: () => void;
}
const renderCalendarConnectionReminder = ({
  allIntegrations,
  interviewerDetails,
  recruiterUser,
  dialogOpen,
  handleClickOpen,
  handleClose,
}: CalendarConnectionReminderProps) => {
  return (
    allIntegrations?.service_json === null &&
    allIntegrations?.google_workspace_domain?.split('//')[1] ===
      interviewerDetails.email.split('@')[1] &&
    interviewerDetails.schedule_auth === null &&
    (interviewerDetails.user_id === recruiterUser.user_id ||
      recruiterUser.role === 'admin') && (
      <>
        <div className='max-w-[870px] ml-2 mt-2'>
          <UIAlert
            color={'error'}
            title={
              interviewerDetails.user_id === recruiterUser.user_id
                ? 'Your calendar is not connected yet. Please connect it to schedule interviews.'
                : `
                ${getFullName(
                  interviewerDetails.first_name,
                  interviewerDetails.last_name,
                )} calendar is not connected yet. Click 'Connect Calender' button to send reminder `
            }
            actions={
              <Popover>
                <PopoverTrigger>
                  {' '}
                  <UIButton size='sm'>Connect Calender</UIButton>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-2'>
                  <div
                    className='flex gap-2 items-center w-full hover:bg-neutral-200 rounded-lg p-2 mt-0 cursor-pointer'
                    onClick={() => {
                      handleClickOpen('email');
                    }}
                  >
                    <Mail className='w-4 h-4' />
                    <span className='text-sm'>Via Email</span>
                  </div>

                  <div
                    className='flex gap-2 items-center w-full hover:bg-neutral-200 rounded-lg p-2 mt-0 cursor-pointer'
                    onClick={() => {
                      handleClickOpen('slack');
                    }}
                  >
                    <MessageSquare className='w-4 h-4' />
                    <span className='text-sm'>Via Slack</span>
                  </div>
                </PopoverContent>
              </Popover>
            }
          />
        </div>
        <UIDialog
          open={!!dialogOpen}
          onClose={handleClose}
          title={
            dialogOpen === 'email'
              ? 'Send Email Reminder'
              : 'Send Slack Reminder'
          }
          slotButtons={
            <>
              <UIButton variant='secondary' size='sm' onClick={handleClose}>
                Cancel
              </UIButton>
              <UIButton size='sm'>Send</UIButton>
            </>
          }
        >
          <div>
            <p className='font-normal'>
              Sending calendar connect reminder to{' '}
              <span className='font-medium'>
                {getFullName(recruiterUser.first_name, recruiterUser.last_name)}
              </span>
            </p>
            <p className='mt-2 font-medium'>
              {dialogOpen === 'email' ? 'Email' : 'Slack'} Body
            </p>
            <div className='mt-2 border border-[var(--neutral-6)] rounded-[var(--radius-2)]'>
              <TipTapAIEditor
                enablAI={false}
                disabled
                toolbar={false}
                placeholder={''}
                height='360px'
                minHeight='360px'
                editor_type='email'
              />
            </div>
          </div>
        </UIDialog>
      </>
    )
  );
};

export default BodyComp;
