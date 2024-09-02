import {
  DatabaseTable,
  EmailTemplateAPi,
  InterviewSessionTypeDB,
} from '@aglint/shared-types';
import { ScheduleUtils } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  Autocomplete,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalInfo } from '@/devlink2/GlobalInfo';
import { GlobalCta } from '@/devlink3/GlobalCta';
import { ReqAvailability } from '@/devlink3/ReqAvailability';
import { ScheduleSelectPill } from '@/devlink3/ScheduleSelectPill';
import { ToggleWithText } from '@/devlink3/ToggleWithText';
import PopUpArrowIcon from '@/src/components/Common/Icons/PopUpArrowIcon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import ToggleBtn from '@/src/components/Common/UIToggle';
import {
  IndividualIcon,
  PanelIcon,
} from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { meetingCardType } from '@/src/components/Tasks/TaskBody/ViewTask/Progress/SessionCard';
import { createTaskProgress } from '@/src/components/Tasks/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getCompanyDaysCnt } from '@/src/services/CandidateScheduleV2/utils/companyWorkingDays';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import { handleMeetingsOrganizerResetRelations } from '@/src/utils/scheduling/upsertMeetingsWithOrganizerId';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../Candidates/queries/utils';
import { useAllActivities, useGetScheduleApplication } from '../queries/hooks';
import {
  setStepScheduling,
  useSchedulingFlowStore,
} from '../SchedulingDrawer/store';
import { setSelectedSessionIds, useSchedulingApplicationStore } from '../store';
import { ApiResponseFindAvailability } from '../types';
import EmailPreview from './Components/EmailPriview';
import {
  createTask,
  insertCandidateRequestAvailability,
  updateCandidateRequestAvailability,
  updateTask,
  useRequestAvailabilityContext,
} from './RequestAvailabilityContext';
import {
  availabilityArrayList,
  convertMinutesToHoursAndMinutes,
  filterSchedulingOptionsArray,
  getAvailability,
  getAvailabilitySlots,
  requestDaysListOptions,
  slotsListOptions,
} from './utils';

function RequestAvailability() {
  const { recruiter, recruiterUser } = useAuthDetails();

  const { requestSessionIds, initialSessions, selectedApplication } =
    useSchedulingApplicationStore();
  const { scheduleFlow, updateRequestAvailibityId, selectedTaskId } =
    useSchedulingFlowStore();
  const { fetchInterviewDataByApplication } = useGetScheduleApplication();
  const { selectedDate } = useRequestAvailabilityContext();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { refetch } = useAllActivities({
    application_id: selectedApplication?.id,
  });
  const [requestDetails, setRequestDetails] =
    useState<DatabaseTable['candidate_request_availability']>(null);

  const selectedSessions = requestSessionIds.length
    ? initialSessions.filter((ele) =>
        requestSessionIds.includes(ele.interview_session.id),
      )
    : [];

  const totalSessionMinutes = selectedSessions.reduce(
    (accumulator, session) =>
      accumulator + session.interview_session.session_duration,
    0,
  );
  // function getDrawerClose() {
  //   setIsScheduleNowOpen(false);
  //   const currentPath = router.pathname;
  //   const currentQuery = { ...router.query };
  //   delete currentQuery.task_id;
  //   router.replace({
  //     pathname: currentPath,
  //     query: currentQuery,
  //   });
  // }

  const [availability, setAvailability] = useState<
    DatabaseTable['candidate_request_availability']['availability']
  >({
    day_offs: false,
    free_keywords: true,
    outside_work_hours: false,
    recruiting_block_keywords: true,
  });
  const [selectedDays, setSelectedDays] = useState(requestDaysListOptions[1]);
  const [selectedSlots, setSelectedSlots] = useState(slotsListOptions[1]);
  type AvailabilitySlotType = {
    day: 0;
    slots: any;
  }[];
  type FilteredAvailabilitySlotType = {
    day: 0;
    slots: { date: string; count: number }[];
  }[];

  const [selectedAvailabilitySlots, setSelectedAvailabilitySlots] =
    useState<AvailabilitySlotType | null>(null);

  const [filteredAvailabilitySlots, setFilteredAvailabilitySlots] =
    useState<FilteredAvailabilitySlotType | null>(null);
  const [isFindingSlots, setIsFindingSlots] = useState(false);
  const [requestSteps, setRequestSteps] = useState<
    'finding_slots' | 'preview' | 'success'
  >('finding_slots');

  const [markCreateTicket, setMarkCreateTicket] = useState(true);

  const meetingsRound = ScheduleUtils.getSessionRounds(
    selectedSessions.map(
      (ele) =>
        ({
          ...ele.interview_session,
        }) as InterviewSessionTypeDB,
    ),
  ) as unknown as InterviewSessionTypeDB[][];
  // handle submit
  const maxDays =
    getCompanyDaysCnt(
      recruiter.scheduling_settings,
      selectedDate[0].format('DD/MM/YYYY'),
      selectedDate[1].format('DD/MM/YYYY'),
    ) -
    (meetingsRound.length - 1);
  async function handleSubmit() {
    if (loading) {
      return null;
    }
    setLoading(true);

    try {
      let localSessions = selectedSessions;

      if (scheduleFlow === 'update_request_availibility') {
        const result = await updateCandidateRequestAvailability({
          id: updateRequestAvailibityId,
          data: {
            availability: availability,
            date_range: selectedDate.map((ele) => ele.format('DD/MM/YYYY')),
            number_of_days: selectedDays.value,
            number_of_slots: selectedSlots.value,
            slots: null,
            booking_confirmed: false,
          },
        });
        setRequestDetails(result);

        const { data: requestData } = await axios.post(
          `/api/scheduling/request_availability/getTaskIdDetailsByRequestId`,
          {
            request_id: updateRequestAvailibityId,
          },
        );
        const task_id = requestData.id;
        if (task_id) {
          createTaskProgress({
            data: {
              created_by: {
                id: recruiterUser.user_id,
                name: getFullName(
                  recruiterUser.first_name,
                  recruiterUser.last_name,
                ),
              },
              task_id: task_id,
              progress_type: 'request_availability',
            },
            type: 're_request_availability',
            optionData: {
              assignerId: recruiterUser.user_id,
              assignerName: getFullName(
                recruiterUser.first_name,
                recruiterUser.last_name,
              ),
            },
          });
        }
        await addScheduleActivity({
          application_id: selectedApplication.id,
          created_by: recruiterUser.user_id,
          logged_by: 'user',
          supabase: supabase,
          title: `Resend request availability to Schedule Interviews for ${selectedSessions.map((ele) => ele.interview_session.name).join(',')}`,
          module: 'scheduler',
          task_id: task_id,
        });
      }

      if (scheduleFlow === 'create_request_availibility') {
        await handleMeetingsOrganizerResetRelations({
          application_id: selectedApplication.id,
          job_id: selectedApplication.job_id,
          recruiter_id: selectedApplication.recruiter_id,
          meeting_flow: 'candidate_request',
          selectedSessions: localSessions.map((ses) => ({
            interview_session_id: ses.interview_session.id,
            interview_meeting_id: ses.interview_meeting.id,
            interview_schedule_id: ses.interview_meeting.interview_schedule_id,
          })),
          supabase,
        });
        const result = await insertCandidateRequestAvailability({
          application_id: String(selectedApplication.id),
          recruiter_id: String(recruiter.id),
          availability: availability,
          date_range: selectedDate.map((ele) => ele.format('DD/MM/YYYY')),
          is_task_created: markCreateTicket,
          number_of_days: selectedDays.value,
          number_of_slots: selectedSlots.value,
          total_slots: null,
        });
        setRequestDetails(result);
        await supabase.from('request_session_relation').insert(
          localSessions.map((ele) => ({
            session_id: ele.interview_session.id,
            request_availability_id: result.id,
          })),
        );

        // send request availability email to candidate
        try {
          const payload: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
            {
              organizer_user_id: recruiterUser.user_id,
              avail_req_id: result.id,
            };
          await axios.post(
            `/api/emails/sendAvailabilityRequest_email_applicant`,
            {
              ...payload,
            },
          );
        } catch (error) {
          toast.message('Failed to send email');
        }
        // end
        let task = null as null | DatabaseTable['new_tasks'];
        if (markCreateTicket) {
          if (selectedTaskId) {
            task = await updateTask({
              status: 'in_progress',
              request_availability_id: result.id,
              type: 'availability',
            });
          } else {
            task = await createTask({
              assignee: [recruiterUser.user_id],
              created_by: recruiterUser.user_id,
              name: `Request Availability ${getFullName(selectedApplication.candidates.first_name, selectedApplication.candidates.last_name)} - ${selectedApplication.public_jobs.job_title.trim()}.`,
              agent: null,
              application_id: selectedApplication.id,
              due_date: selectedDate[0].toString(),
              priority: 'medium',
              recruiter_id: recruiter.id,
              schedule_date_range: {
                end_date: selectedDate[0].toString(),
                start_date: selectedDate[1].toString(),
              },
              start_date: dayjs().toString(),
              task_owner: recruiterUser.user_id,

              status: 'in_progress',
              type: 'availability',
              request_availability_id: result.id,
            });
            await supabase.from('task_session_relation').insert(
              localSessions.map((ele) => ({
                session_id: ele.interview_session.id,
                task_id: task.id,
              })),
            );
          }

          await createTaskProgress({
            data: {
              created_by: {
                id: recruiterUser.user_id,
                name: getFullName(
                  recruiterUser.first_name,
                  recruiterUser.last_name,
                ),
              },
              task_id: task.id,
              progress_type: 'request_availability',
            },
            type: 'request_availability',
            optionData: {
              sessions: selectedSessions as any as meetingCardType[],
              candidateName: getFullName(
                selectedApplication.candidates.first_name,
                selectedApplication.candidates.last_name,
              ),
            },
          });
        }
        await addScheduleActivity({
          application_id: selectedApplication.id,
          created_by: recruiterUser.user_id,
          logged_by: 'user',
          supabase: supabase,
          title: `Request Availability from ${getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          )} to Schedule Interviews for ${selectedSessions.map((ele) => ele.interview_session.name).join(',')}`,
          module: 'scheduler',
          task_id: task ? task.id : null,
        });
      }

      refetch(); // refetching activities
      fetchInterviewDataByApplication(); // refetching interview data
      setSelectedSessionIds([]); // resetting selected sessions
    } catch (error) {
      toast.error(error.message);
    }
    setRequestSteps('success');
    setLoading(false);
  }

  useEffect(() => {
    setFilteredAvailabilitySlots([]);
    if (selectedAvailabilitySlots?.length === meetingsRound.length) {
      selectedAvailabilitySlots.map((ele, i) => {
        //@ts-ignore
        setFilteredAvailabilitySlots((pre) => {
          if (!pre) {
            return [
              {
                day: i + 1,
                slots:
                  filterSchedulingOptionsArray({
                    filters: availability,
                    schedulingOptions: ele.slots || [],
                  }) || [],
              },
            ];
          } else {
            return [
              ...pre,
              {
                day: i + 1,
                slots:
                  filterSchedulingOptionsArray({
                    filters: availability,
                    schedulingOptions: ele.slots || [],
                  }) || [],
              },
            ];
          }
        });
      });
      setIsFindingSlots(false);
    }
  }, [availability, selectedAvailabilitySlots]);

  useEffect(() => {
    setSelectedAvailabilitySlots(null);
    setIsFindingSlots(true);
    meetingsRound.map((ele, i) => {
      getAvailabilitySlots({
        session_ids: ele.map((ele) => ele.id),
        recruiter_id: recruiter.id,
        start_date_str: dayjs(selectedDate[0]).format('DD/MM/YYYY'),
        end_date_str: dayjs(selectedDate[1]).format('DD/MM/YYYY'),
        candidate_tz:
          selectedApplication.candidates.timezone || userTzDayjs.tz.guess(),
        options: {
          include_free_time: true,
          use_recruiting_blocks: true,
          include_conflicting_slots: {
            out_of_working_hrs: true,
            day_off: true,
          },
        },
      }).then(({ data }) => {
        //@ts-ignore
        setSelectedAvailabilitySlots((pre) => {
          if (!pre) {
            return [
              {
                day: i + 1,
                slots: data,
              },
            ];
          }
          return [
            ...pre,
            {
              day: i + 1,
              slots: data,
            },
          ];
        });
      });
    });
  }, []);
  const sumCounts = (availability: FilteredAvailabilitySlotType): number => {
    if (availability) {
      return availability.reduce((total, currentDay) => {
        const dayTotal = currentDay.slots.length
          ? currentDay.slots.reduce((daySum, slot) => daySum + slot.count, 0)
          : 0;
        return total + dayTotal;
      }, 0);
    }
  };
  const totalCount = sumCounts(filteredAvailabilitySlots);

  return (
    <Stack>
      <ShowCode>
        <ShowCode.When isTrue={requestSteps === 'finding_slots'}>
          <ReqAvailability
            // textDateAvailability={`Availability on ${selectedDate[0].format('DD MMMM YYYY')}`}
            textDateAvailability={`${selectedDate[0].format('DD MMMM YYYY')} - ${selectedDate[1].format('DD MMMM YYYY')}`}
            isCheckingSlotsVisible={isFindingSlots}
            isFoundSlots={!isFindingSlots}
            textFoundSlotsCount={`Found ${totalCount} slots for the suggestion`}
            slotBadge={
              !!filteredAvailabilitySlots &&
              filteredAvailabilitySlots.map((ele) => {
                return (
                  <>
                    <Stack spacing={1} direction={`column`}>
                      <Typography variant='body1'>Day-{ele.day}</Typography>
                      {ele.slots.length ? (
                        <Stack
                          flexDirection={'row'}
                          flexWrap={'wrap'}
                          gridColumn={'var(--space-2)'}
                          gridRow={'var(--space-2)'}
                          gap={1}
                        >
                          {ele.slots.map((ele, i) => {
                            return (
                              <GlobalBadge
                                key={i}
                                color={'accent'}
                                textBadge={`${dayjsLocal(ele.date).format('DD MMMM')} - ${ele.count} slots`}
                              />
                            );
                          })}
                        </Stack>
                      ) : (
                        <GlobalInfo
                          color={'warning'}
                          textTitle={
                            'No available slots found. Please try expanding the date ranges.'
                          }
                          showDescription={false}
                          showWidget={true}
                          slotWidget={
                            <ul>
                              {(
                                selectedAvailabilitySlots &&
                                (selectedAvailabilitySlots[Number(ele.day - 1)]
                                  .slots as ApiResponseFindAvailability['slots'])
                              )
                                .map((ele) => ele?.interview_rounds)
                                .flat()
                                .map((error) => {
                                  const formatDateTange = dayjsLocal(
                                    error?.curr_date,
                                  ).format('MMM DD');
                                  const allReasons = [
                                    ...new Set(
                                      error?.plans
                                        .flatMap(
                                          (plan) => plan?.no_slot_reasons,
                                        )
                                        .flatMap((reason) => reason?.reason)
                                        .flat(),
                                    ),
                                  ];
                                  if (allReasons.length)
                                    return (
                                      <li key={error.curr_date}>
                                        {formatDateTange} :{' '}
                                        {allReasons.join(', ')}
                                      </li>
                                    );
                                })}
                            </ul>
                          }
                        />
                      )}
                    </Stack>
                  </>
                );
              })
            }
            slotReqToggle={availabilityArrayList.map((ele, i) => (
              <ToggleWithText
                slotToggle={
                  <ToggleBtn
                    handleChange={() => {
                      const newValue = getAvailability({
                        preValue: availability,
                        taskActionType: ele.key,
                      });
                      setAvailability({ ...newValue });
                    }}
                    isChecked={availability[ele.key]}
                  />
                }
                key={i}
                textToggleLight={ele.label}
              />
            ))}
            slotAvailabilityCriteria={
              <>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'var(--space-2)'}
                  width={'370px'}
                >
                  <Typography variant='body1' width={'520px'}>
                    Minimum Number of Days:
                  </Typography>
                  <Autocomplete
                    fullWidth
                    disableClearable
                    disablePortal
                    value={selectedDays}
                    options={requestDaysListOptions}
                    sx={{ width: 200 }}
                    renderOption={(props, option, i) => {
                      if (i.index + 1 < maxDays)
                        return <li {...props}>{option.label}</li>;
                    }}
                    renderInput={(params) => (
                      <TextField
                        style={{ width: '110px' }}
                        {...params}
                        placeholder='Days'
                      />
                    )}
                    onChange={(_, value) => {
                      setSelectedDays(value);
                    }}
                    popupIcon={<PopUpArrowIcon />}
                  />
                </Stack>

                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'var(--space-2)'}
                  width={'370px'}
                >
                  <Typography variant='body1' width={'520px'}>
                    Minimum Slots Per Day:
                  </Typography>
                  <Autocomplete
                    fullWidth
                    disableClearable
                    disablePortal
                    value={selectedSlots}
                    options={slotsListOptions}
                    sx={{ width: 200 }}
                    renderOption={(props, option) => {
                      return <li {...props}>{option.label}</li>;
                    }}
                    renderInput={(params) => (
                      <TextField
                        style={{ width: '110px' }}
                        {...params}
                        placeholder='Days'
                      />
                    )}
                    onChange={(_, value) => {
                      setSelectedSlots(value);
                    }}
                    popupIcon={<PopUpArrowIcon />}
                  />
                </Stack>
              </>
            }
            textScheduleSelected={`${selectedSessions.length} Schedule selected`}
            textDuration={`${convertMinutesToHoursAndMinutes(totalSessionMinutes)}`}
            slotScheduleSelectPill={
              selectedSessions.length
                ? selectedSessions.map((ele, i) => {
                    return (
                      <ScheduleSelectPill
                        isCloseVisible={false}
                        slotIcons={
                          <ShowCode>
                            <ShowCode.When
                              isTrue={
                                ele.interview_session.session_type ==
                                'individual'
                              }
                            >
                              <IndividualIcon />
                            </ShowCode.When>
                            <ShowCode.When
                              isTrue={
                                ele.interview_session.session_type == 'panel'
                              }
                            >
                              <PanelIcon />
                            </ShowCode.When>
                          </ShowCode>
                        }
                        textTime={convertMinutesToHoursAndMinutes(
                          ele.interview_session.session_duration,
                        )}
                        key={i}
                        textScheduleName={ele.interview_session.name}
                      />
                    );
                  })
                : null
            }
            isCheckbox={
              scheduleFlow === 'create_request_availibility' && !selectedTaskId
            }
            slotCheckboxAvailability={
              <Checkbox
                defaultChecked={markCreateTicket}
                onChange={(e) => {
                  setMarkCreateTicket(e.target.checked);
                }}
              />
            }
            slotButton={
              <>
                <ButtonSoft
                  color={'neutral'}
                  size={2}
                  onClickButton={{
                    onClick: () => {
                      setStepScheduling('pick_date');
                    },
                  }}
                  textButton={'Back'}
                />
                <ButtonSolid
                  size={2}
                  isDisabled={totalCount === 0}
                  textButton={'Continue'}
                  onClickButton={{
                    onClick: () => {
                      setRequestSteps('preview');
                    },
                  }}
                />
              </>
            }
          />
        </ShowCode.When>
        <ShowCode.When isTrue={requestSteps === 'preview'}>
          <EmailPreview
            setRequestSteps={setRequestSteps}
            requestAvailabilityId={requestDetails?.id}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </ShowCode.When>
        <ShowCode.When isTrue={requestSteps === 'success'}>
          <GlobalCta
            textTitle={'Availability requested successfully'}
            textDescription={`Candidate received a link to submit availability between ${selectedDate[0].format('DD MMMM YYYY')} to ${selectedDate[1].format('DD MMMM YYYY')}4.`}
            slotButton={
              <ButtonSolid
                size={1}
                color={'neutral'}
                textButton={copied ? 'Copied' : 'Copy link'}
                onClickButton={{
                  onClick: () => {
                    if (!copied) {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${requestDetails.id}`,
                      );
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    }
                  },
                }}
              />
            }
          />
        </ShowCode.When>
      </ShowCode>
    </Stack>
  );
}

export default RequestAvailability;
