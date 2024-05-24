import { Dialog, Drawer, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { ScheduleOptions } from '@/devlink2/ScheduleOptions';
import { ButtonPrimaryDefaultRegular } from '@/devlink3/ButtonPrimaryDefaultRegular';
import { CandidateSchedule } from '@/devlink3/CandidateSchedule';
import { ConflictHard } from '@/devlink3/ConflictHard';
import { ConflictSoft } from '@/devlink3/ConflictSoft';
import { DateOption } from '@/devlink3/DateOption';
import { DatePickerBody } from '@/devlink3/DatePickerBody';
import { MemberRow } from '@/devlink3/MemberRow';
import { NoConflicts } from '@/devlink3/NoConflicts';
import { ScheduleOption } from '@/devlink3/ScheduleOption';
import { ScheduleOptionsList } from '@/devlink3/ScheduleOptionsList';
import { SessionDetails } from '@/devlink3/SessionDetails';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { SingleDaySchedule } from '@/devlink3/SingleDaySchedule';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { DateIcon } from '../../Settings/Components/DateSelector';
import SchedulingOptionComp from '../Common/ScheduleOption';
import {
  setDateRange,
  setinitialSessions,
  setIsScheduleNowOpen,
  setSchedulingOptions,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../store';

function GetScheduleOptionsDialog() {
  const currentDate = dayjs();
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    dateRange,
    noOptions,
    selectedApplication,
    initialSessions,
    isScheduleNowOpen,
    selectedSessionIds,
    schedulingOptions,
    totalSlots,
    selCoordinator,
  } = useSchedulingApplicationStore((state) => ({
    dateRange: state.dateRange,
    noOptions: state.noOptions,
    selectedApplication: state.selectedApplication,
    initialSessions: state.initialSessions,
    isScheduleNowOpen: state.isScheduleNowOpen,
    selectedSessionIds: state.selectedSessionIds,
    schedulingOptions: state.schedulingOptions,
    totalSlots: state.totalSlots,
    selCoordinator: state.selCoordinator,
  }));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return () => {
      setIsScheduleNowOpen(false);
      setSchedulingOptions([]);
      setSelectedSessionIds([]);
    };
  }, []);

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

  const onClickSendToCandidate = async () => {
    try {
      setSaving(true);
      if (isDebrief && !selectedId) {
        toast.warning('Please select a time slot to schedule.');
      } else {
        const res = await axios.post(
          '/api/scheduling/application/sendtocandidate',
          {
            dateRange,
            initialSessions,
            is_mail: true,
            is_debrief: isDebrief,
            recruiter_id: recruiter.id,
            recruiterUser,
            schedulingOptions,
            selCoordinator,
            selected_comb_id: selectedId,
            selectedApplication,
            selectedSessionIds,
            user_tz: dayjs.tz.guess(),
          } as ApiBodyParamsSendToCandidate,
        );

        if (res.status === 200 && res.data) {
          setinitialSessions(
            initialSessions.map((session) => ({
              ...session,
              interview_meeting: selectedSessionIds.includes(session.id)
                ? session.interview_meeting
                  ? {
                      ...session.interview_meeting,
                      status: 'waiting',
                    }
                  : { status: 'waiting', interview_schedule_id: null }
                : session.interview_meeting
                  ? { ...session.interview_meeting }
                  : null,
            })),
          );
        }
        setSelectedSessionIds([]);
        setIsScheduleNowOpen(false);
      }
    } catch (e) {
      //
    } finally {
      setSaving(false);
    }
  };

  const resetState = () => {
    setIsScheduleNowOpen(false);
    setSchedulingOptions([]);
    setSelectedSessionIds([]);
  };

  return (
    <>
      <Drawer
        anchor={'right'}
        open={true || isScheduleNowOpen}
        onClose={() => {
          resetState();
        }}
      >
        <SideDrawerLarge
          slotSideDrawerbody={
            <>
              {/* <DatePickerBody
                slotMuiDatePicker={'date picker'}
                isEmailAgent={false}
                isPhoneAgent={false}
                isRequestAvailability={false}
                isContinueButton={true}
                isSelfScheduling={true}
              /> */}
              <ScheduleOptionsList
                slotDateOption={
                  <>
                    <DateOption
                      isSelected={true}
                      slotScheduleOption={
                        <>
                          <ScheduleOption
                            isSelected={true}
                            isCheckbox={false}
                            isRadio={false}
                            slotSingleDaySchedule={
                              <SingleDaySchedule
                                slotConflicts={
                                  <>
                                    <NoConflicts />
                                    <ConflictSoft textConflict={1} />
                                    <ConflictHard textConflict={2} />
                                  </>
                                }
                                slotSessionDetails={
                                  <>
                                    <SessionDetails
                                      isMemberRow={true}
                                      slotMemberRow={
                                        <>
                                          <MemberRow
                                            slotConflicts={
                                              <>
                                                <ConflictSoft />
                                              </>
                                            }
                                          />
                                          <MemberRow />
                                          <MemberRow />
                                        </>
                                      }
                                    />
                                    <SessionDetails
                                      isMemberRow={false}
                                      textSessionName={'Break'}
                                      textSessionDuration={'duration'}
                                    />
                                  </>
                                }
                              />
                            }
                          />
                          <ScheduleOption
                            isCheckbox={false}
                            isRadio={false}
                            slotSingleDaySchedule={
                              <>
                                <SingleDaySchedule isMultiDay={true} />
                                <SingleDaySchedule isMultiDay={true} />
                              </>
                            }
                          />
                        </>
                      }
                    />
                  </>
                }
              />
            </>
          }
          isBottomBar={true}
        />
        {/* <ScheduleOptions
          onClickClose={{
            onClick: () => {
              resetState();
            },
          }}
          slotSendtoCandidateButton={
            <>
              <ButtonPrimaryDefaultRegular
                buttonText={
                  isDebrief ? 'Schedule Now' : 'Send Booking Link to Candidate'
                }
                buttonProps={{
                  onClick: () => {
                    if (!saving) onClickSendToCandidate();
                  },
                }}
                endIconSlot={
                  saving && (
                    <Stack height={'16px'} width={'16px'}>
                      <LoaderGrey />
                    </Stack>
                  )
                }
              />
            </>
          }
          isBasicDetailsVisible={false}
          isMultipleOptionVisible={true}
          slotAvailableCard={
            <SchedulingOptionComp
              schedulingOptions={schedulingOptions}
              isBadgeVisible={true}
              isInterviewVisible={true}
              total={totalSlots}
              isDebrief={isDebrief}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          }
          isNoOptionsFoundVisible={noOptions}
          slotCandidateImage={
            <MuiAvatar
              level={getFullName(
                selectedApplication?.candidates.first_name,
                selectedApplication?.candidates.last_name,
              )}
              src={selectedApplication?.candidates.avatar}
              variant={'circular'}
              width={'100%'}
              height={'100%'}
              fontSize={'12px'}
            />
          }
          slotDateRangeInput={
            <Stack direction={'row'} width={'100%'} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(dateRange?.start_date)}
                  onChange={(newValue) => {
                    if (dayjs(newValue) < dayjs(dateRange?.end_date)) {
                      setDateRange({
                        start_date: dayjs(newValue)?.toISOString(),
                        end_date: dateRange?.end_date,
                      });
                    } else {
                      setDateRange({
                        start_date: dayjs(newValue).isValid()
                          ? dayjs(newValue)?.toISOString()
                          : null,
                        end_date: null,
                      });
                    }
                  }}
                  minDate={currentDate}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      placeholder: 'Start Date',
                    },
                  }}
                  slots={{
                    openPickerIcon: DateIcon,
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(dateRange?.end_date)}
                  minDate={dayjs(dateRange?.start_date)}
                  maxDate={dayjs(dateRange?.start_date).add(1, 'month')}
                  onChange={(newValue) => {
                    setDateRange({
                      start_date: dateRange?.start_date,
                      end_date: dayjs(newValue)?.toISOString(),
                    });
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      placeholder: 'End Date',
                    },
                  }}
                  slots={{
                    openPickerIcon: DateIcon,
                  }}
                />
              </LocalizationProvider>
            </Stack>
          }
          textCandidateName={getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          )}
          textPopHeader={isDebrief ? 'Pick a slot' : 'Available Options'}
        /> */}
      </Drawer>
    </>
  );
}

export default GetScheduleOptionsDialog;
