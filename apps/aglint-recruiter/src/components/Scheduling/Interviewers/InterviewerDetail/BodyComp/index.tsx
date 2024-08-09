import '@styles/fullcalendar-theme.css';

import { DatabaseTable } from '@aglint/shared-types';
import { Dialog, Popover, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { InterviewerDetail } from '@/devlink3/InterviewerDetail';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import { useTeamMembers } from '@/src/components/CompanyDetailComp/TeamManagement';
import EditMember from '@/src/components/CompanyDetailComp/TeamManagement/EditMemberDialog';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useAllIntegrations } from '@/src/queries/intergrations';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import DynamicLoader from '../../DynamicLoader';
import FullCalendar from '../../Interviews/FullCalendar';
import { TabInterviewerDetail } from '..';
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

  const { handleMemberUpdate } = useAuthDetails();

  const [filter, setFilter] = useState<
    DatabaseTable['interview_meeting']['status'][]
  >(['completed', 'confirmed', 'cancelled']);
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
  const { recruiterUser, recruiter } = useAuthDetails();
  const { activeMembers } = useTeamMembers();
  const { data: allIntegrations } = useAllIntegrations();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const open = Boolean(anchorEl);

  const [dialogOpen, setDialogOpen] = React.useState<'email' | 'slack' | null>(
    null,
  );

  const handleClickOpen = (type: 'email' | 'slack') => {
    setDialogOpen(type);
  };

  const handleClose = () => {
    setDialogOpen(null);
  };

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
          {allIntegrations?.service_json === null &&
            allIntegrations?.google_workspace_domain?.split('//')[1] ===
              interviewerDetails.email.split('@')[1] &&
            interviewerDetails.schedule_auth === null &&
            (interviewerDetails.user_id === recruiterUser.user_id ||
              recruiterUser.role === 'admin') && (
              <>
                <Stack maxWidth={'870px'} ml={2} mt={2}>
                  <GlobalBannerInline
                    color={'error'}
                    textContent={
                      interviewerDetails.user_id === recruiterUser.user_id
                        ? 'Your calendar is not connected yet. Please connect it to schedule interviews.'
                        : `
                        ${getFullName(
                          interviewerDetails.first_name,
                          interviewerDetails.last_name,
                        )} calendar is not connected yet. Click 'Connect Calender' button to send reminder `
                    }
                    slotButton={
                      <ButtonSolid
                        textButton='Connect Calender'
                        color={'error'}
                        onClickButton={{
                          onClick: (event) => setAnchorEl(event.currentTarget),
                        }}
                      />
                    }
                  />
                  <Popover
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <FilterDropdown
                      slotOption={
                        <>
                          <Stack
                            direction={'row'}
                            sx={{
                              width: '100px',
                              alignItems: 'center',
                              ':hover': { bgcolor: 'var(--neutral-2)' },
                              borderRadius: 'var(--radius-2)',
                            }}
                            spacing={1}
                            padding={'var(--space-1) var(--space-2)'}
                            marginTop={'0px !important'}
                            onClick={() => {
                              handleClickOpen('email');
                              setAnchorEl(null);
                            }}
                          >
                            <GlobalIcon iconName='email' />
                            <Typography
                              sx={{
                                fontSize: '14px',
                                cursor: 'pointer',
                              }}
                            >
                              Via Email
                            </Typography>
                          </Stack>
                          <Stack
                            direction={'row'}
                            sx={{
                              width: '100px',
                              alignItems: 'center',
                              ':hover': { bgcolor: 'var(--neutral-2)' },
                              borderRadius: 'var(--radius-2)',
                            }}
                            spacing={1}
                            padding={'var(--space-1) var(--space-2)'}
                            marginTop={'0px !important'}
                            onClick={() => {
                              handleClickOpen('slack');
                              setAnchorEl(null);
                            }}
                          >
                            <GlobalIcon iconName='sms' />
                            <Typography
                              sx={{
                                fontSize: '14px',
                                cursor: 'pointer',
                              }}
                            >
                              Via Slack
                            </Typography>
                          </Stack>
                        </>
                      }
                      isRemoveVisible={false}
                      isResetVisible={false}
                    />
                  </Popover>
                </Stack>
                <Dialog open={!!dialogOpen} onClose={handleClose}>
                  <DcPopup
                    onClickClosePopup={{
                      onClick: handleClose,
                    }}
                    popupName={
                      dialogOpen === 'email'
                        ? 'Send Email Reminder'
                        : 'Send Slack Reminder'
                    }
                    slotBody={
                      <Stack>
                        <Typography>
                          Sending calendar connect reminder to{' '}
                          <span style={{ fontWeight: '500' }}>
                            {getFullName(
                              recruiterUser.first_name,
                              recruiterUser.last_name,
                            )}
                          </span>
                        </Typography>
                        <Typography mt={2} fontWeight={500}>
                          {dialogOpen === 'email' ? 'Email' : 'Slack'} Body
                        </Typography>
                        <Stack
                          sx={{
                            mt: '8px',
                            border: '1px solid',
                            borderColor: 'var(--neutral-6)',
                            borderRadius: 'var(--radius-2)',
                          }}
                        >
                          <TipTapAIEditor
                            enablAI={false}
                            disabled
                            toolbar={false}
                            placeholder={''}
                            height='360px'
                            minHeight='360px'
                            editor_type='email'
                            // onfocus={onFocus}
                            // onblur={onBlur}
                            // template_type={selectedTemplate.type}
                            // handleChange={emailBodyChange}
                            // initialValue={selectedTemplate.body}
                          />
                        </Stack>
                      </Stack>
                    }
                    slotButtons={
                      <>
                        <ButtonSoft
                          size={2}
                          color={'neutral'}
                          onClickButton={{ onClick: handleClose }}
                          textButton='Cancel'
                        />
                        <ButtonSolid size={2} textButton='Send' />
                      </>
                    }
                  />
                </Dialog>
              </>
            )}
          <InterviewerDetail
            slotNewTabPill={<Tabs />}
            slotEditButton={
              interviewerDetails.user_id === recruiterUser.user_id ||
              (recruiterUser.role === 'admin' &&
                interviewerDetails.recruiter_relation[0].roles.name !==
                  'admin') ||
              recruiter.primary_admin === recruiterUser.user_id ? (
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
                  />
                )}
                {/* {tab === 'keywords' && (
                 
                )} */}
                {tab === 'availibility' && (
                  <Availibility
                    interviewerDetailsRefetch={interviewerDetailsRefetch}
                    interviewerDetails={interviewerDetails}
                    totalHoursThisWeek={totalHoursThisWeek}
                    totalHoursToday={totalHoursToday}
                    totalInterviewsThisWeek={totalInterviewsThisWeek}
                    totalInterviewsToday={totalInterviewsToday}
                    handleMemberUpdate={handleMemberUpdate}
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
                {tab === 'calendar' && (
                  <FullCalendar
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
