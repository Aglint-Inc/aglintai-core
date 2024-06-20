import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import {
  Autocomplete,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ReqAvailability } from '@/devlink3/ReqAvailability';
import { ScheduleSelectPill } from '@/devlink3/ScheduleSelectPill';
import { ToggleWithText } from '@/devlink3/ToggleWithText';
import GreenBgCheckedIcon from '@/src/components/Common/Icons/GreenBgCheckedIcon';
import PopUpArrowIcon from '@/src/components/Common/Icons/PopUpArrowIcon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import ToggleBtn from '@/src/components/Common/UIToggle';
import { IndividualIcon, PanelIcon } from '@/src/components/JobNewInterviewPlan/sessionForms';
import { createTaskProgress } from '@/src/components/Tasks/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  ApiBodyParamsSessionCache,
  ApiResponseSessionCache,
} from '@/src/pages/api/scheduling/application/candidatesessioncache';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../Candidates/queries/utils';
import { useAllActivities, useGetScheduleApplication } from '../hooks';
import {
  setIsScheduleNowOpen,
  setStepScheduling,
  useSchedulingFlowStore,
} from '../SelfSchedulingDrawer/store';
import { setSelectedSessionIds, useSchedulingApplicationStore } from '../store';
import {
  createTask,
  insertCandidateRequestAvailability,
  updateCandidateRequestAvailability,
  useRequestAvailabilityContext,
} from './RequestAvailabilityContext';
import {
  availabilityArrayList,
  convertMinutesToHoursAndMinutes,
  getAvailability,
  requestDaysListOptions,
  slotsListOptions,
} from './utils';

function RequestAvailability() {
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();

  const {
    requestSessionIds,
    initialSessions,
    selectedApplication,
    selectedSchedule,
  } = useSchedulingApplicationStore();

  const { scheduleFlow } = useSchedulingFlowStore();
  const { fetchInterviewDataByApplication } = useGetScheduleApplication();
  const { selectedDate } = useRequestAvailabilityContext();
  const [loading, setLoading] = useState(false);
  const { refetch } = useAllActivities({
    application_id: selectedApplication?.id,
  });

  const selectedSessions = requestSessionIds.length
    ? initialSessions.filter((ele) => requestSessionIds.includes(ele.id))
    : [];

  const totalSessionMinutes = selectedSessions.reduce(
    (accumulator, session) => accumulator + session.session_duration,
    0,
  );
  function getDrawerClose() {
    setIsScheduleNowOpen(false);
  }

  const [availability, setAvailability] = useState<
    DatabaseTable['candidate_request_availability']['availability']
  >({
    day_offs: false,
    free_keywords: false,
    outside_work_hours: false,
    recruiting_block_keywords: false,
  });
  const [selectedDays, setSelectedDays] = useState(requestDaysListOptions[3]);
  const [selectedSlots, setSelectedSlots] = useState(slotsListOptions[1]);

  const [markCreateTicket, setMarkCreateTicket] = useState(true);

  // handle submit

  async function handleSubmit() {
    if (loading) {
      return null;
    }
    setLoading(true);

    try {
      let localSessions = selectedSessions;

      if (!selectedSchedule) {
        const resClone = await axios.post(
          '/api/scheduling/application/candidatesessioncache',
          {
            allSessions: initialSessions,
            application_id: selectedApplication.id,
            coordinator_id: null,
            is_get_more_option: false,
            scheduleName: `Interview for ${selectedApplication.public_jobs.job_title} - ${selectedApplication.candidates.first_name}`,
            session_ids: [],
            recruiter_id: recruiter.id,
            rec_user_id: recruiterUser.user_id,
          } as ApiBodyParamsSessionCache,
        );
        if (resClone.status === 200) {
          const resData = resClone.data as ApiResponseSessionCache;

          localSessions = selectedSessions.map((ses) => {
            const newSession = resData.refSessions.find(
              (ele) => ele.id === ses.id,
            );

            return {
              ...ses,
              id: newSession.newId,
              interview_meeting: newSession.interview_meeting,
            };
          });
        } else {
          throw new Error();
        }
      }

      if (scheduleFlow === 'update_request_availibility') {
        const result = await updateCandidateRequestAvailability({
          id: String(router.query?.candidate_request_availability),
          data: {
            availability: availability,
            date_range: selectedDate.map((ele) => ele.format('DD/MM/YYYY')),
            number_of_days: selectedDays.value,
            number_of_slots: selectedSlots.value,
            slots: null,
            booking_confirmed: false,
          },
        });

        axios.post(`/api/emails/availabilityReqResend_email_candidate`, {
          meta: {
            avail_req_id: result.id,
            recruiter_user_id: recruiterUser.user_id,
          },
        });
        toast.message('Request sent successfully!');
        const { data: requestData } = await axios.post(
          `/api/scheduling/request_availability/getTaskIdDetailsByRequestId`,
          {
            request_id: router.query?.candidate_request_availability,
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
              progress_type: 'standard',
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
          title: `Resend request availability to Schedule Interviews for ${selectedSessions.map((ele) => ele.name).join(',')}`,
          module: 'scheduler',
          task_id: task_id,
        });
      }

      if (scheduleFlow === 'create_request_availibility') {
        const result = await insertCandidateRequestAvailability({
          application_id: selectedApplication.id,
          recruiter_id: recruiter.id,
          availability: availability,
          date_range: selectedDate.map((ele) => ele.format('DD/MM/YYYY')),
          is_task_created: markCreateTicket,
          number_of_days: selectedDays.value,
          number_of_slots: selectedSlots.value,
          session_ids: localSessions.map((session) => {
            return {
              id: session.id,
              name: session.name,
              session_duration: session.session_duration,
              break_duration: session.break_duration,
              session_order: session.session_order,
              location: session.location,
              session_type: session.session_type,
            };
          }),
          total_slots: null,
        });

        const updateMeetings: DatabaseTableInsert['interview_meeting'][] =
          localSessions.map((ses) => {
            return {
              id: ses.interview_meeting.id,
              interview_schedule_id:
                ses.interview_meeting.interview_schedule_id,
              status: 'waiting',
              meeting_flow: 'candidate_request',
            };
          });
        await supabase.from('interview_meeting').upsert(updateMeetings);

        // send request availability email to candidate

        axios.post(`/api/emails/sendAvailabilityRequest_email_applicant`, {
          meta: {
            avail_req_id: result.id,
            recruiter_user_id: recruiterUser.user_id,
          },
        });
        toast.message('Request sent successfully!');
        // end
        let task = null as null | DatabaseTable['new_tasks'];
        if (markCreateTicket) {
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
            session_ids: selectedSessions.map((ele) => {
              return {
                id: ele.id,
                name: ele.name,
              } as DatabaseTableInsert['new_tasks']['session_ids'][number];
            }),
            status: 'in_progress',
            type: 'availability',
            request_availability_id: result.id,
          });
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
              progress_type: 'standard',
            },
            type: 'request_availability',
            optionData: {
              sessions: task.session_ids,
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
          )} to Schedule Interviews for ${selectedSessions.map((ele) => ele.name).join(',')}`,
          module: 'scheduler',
          task_id: task ? task.id : null,
        });
      }

      refetch(); // refetching activities
      fetchInterviewDataByApplication(); // refetching interview data
      getDrawerClose(); // closing drawer
      setSelectedSessionIds([]); // resetting selected sessions
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  }

  return (
    <Stack>
      <ReqAvailability
        isCheckingSlotsVisible={false}
        isFoundSlots={false}
        textFoundSlots={`Found 126 slots for the sugeestion`}
        slotCheckingIcon={<GreenBgCheckedIcon />}
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
            >
              <Typography variant='body1' width={'450px'}>
                Minimum number of days should be selected.
              </Typography>
              <Autocomplete
                fullWidth
                disableClearable
                disablePortal
                value={selectedDays}
                options={requestDaysListOptions}
                // sx={{ width: 200 }}
                renderOption={(props, option) => {
                  return <li {...props}>{option.label}</li>;
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder='Days' />
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
            >
              <Typography variant='body1' width={'450px'}>
                Minimum number of slots selected per each day.
              </Typography>
              <Autocomplete
                fullWidth
                disableClearable
                disablePortal
                value={selectedSlots}
                options={slotsListOptions}
                // sx={{ width: 200 }}
                renderOption={(props, option) => {
                  return <li {...props}>{option.label}</li>;
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder='Days' />
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
                    slotIcons={
                      <ShowCode>
                        <ShowCode.When isTrue={ele.session_type == 'individual'}>
                          <IndividualIcon />
                        </ShowCode.When>
                        <ShowCode.When isTrue={ele.session_type == 'panel'}>
                          <PanelIcon />
                        </ShowCode.When>
                      </ShowCode>
                    }
                    textTime={convertMinutesToHoursAndMinutes(
                      ele.session_duration,
                    )}
                    key={i}
                    textScheduleName={ele.name}
                  />
                );
              })
            : null
        }
        isCheckbox={scheduleFlow === 'create_request_availibility'}
        slotCheckboxAvailability={
          <Checkbox
            defaultChecked={markCreateTicket}
            onChange={(e) => {
              setMarkCreateTicket(e.target.checked);
            }}
          />
        }
        isLoading={loading}
        onClickReqAvailability={{
          onClick: handleSubmit,
        }}
        onClickClose={{ onClick: getDrawerClose }}
        onClickCancel={{
          onClick: () => {
            setStepScheduling('pick_date');
          },
        }}
      />
    </Stack>
  );
}

export default RequestAvailability;
