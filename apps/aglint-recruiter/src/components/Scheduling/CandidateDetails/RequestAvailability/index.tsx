import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import {
  Autocomplete,
  Checkbox,
  Popover,
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
import ToggleBtn from '@/src/components/Common/UIToggle';
import DateRange from '@/src/components/Tasks/Components/DateRange';
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
import { setSelectedSessionIds, useSchedulingApplicationStore } from '../store';
import {
  createTask,
  insertCandidateRequestAvailability,
  sendEmailToCandidate,
  updateCandidateRequestAvailability,
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
  const { fetchInterviewDataByApplication } = useGetScheduleApplication();
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
    const currentPath = router.pathname; // Get current path
    const currentQuery = { ...router.query }; // Get current query parameters

    delete currentQuery.candidate_request_availability; // Remove the specific query parameter

    router.replace({
      pathname: currentPath,
      query: currentQuery,
    });
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
  const [selectedDate, setSelectedDate] = useState([
    dayjs(),
    dayjs().add(10, 'day'),
  ]);
  const [markCreateTicket, setMarkCreateTicket] = useState(true);

  // handle submit

  async function handleSubmit() {
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

      if (router.query?.candidate_request_availability !== 'true') {
        const result = await updateCandidateRequestAvailability({
          id: String(router.query?.candidate_request_availability),
          data: {
            availability: availability,
            date_range: selectedDate.map((ele) => ele.format('DD/MM/YYYY')),
            number_of_days: selectedDays.value,
            number_of_slots: selectedSlots.value,
            slots: null,
          },
        });

        sendEmailToCandidate({
          email: selectedApplication.candidates.email,
          emailBody: recruiter.email_template['request_candidate_slot'].body,
          emailSubject:
            recruiter.email_template['request_candidate_slot'].subject,
          first_name: selectedApplication.candidates.first_name,
          last_name: selectedApplication.candidates.last_name,
          job_title: selectedApplication.public_jobs.job_title,
          recruiter,
          sessionNames: selectedSessions.map((ele) => ele.name),
          request_id: result.id,
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
      } else {
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

        sendEmailToCandidate({
          email: selectedApplication.candidates.email,
          emailBody: recruiter.email_template['request_candidate_slot'].body,
          emailSubject:
            recruiter.email_template['request_candidate_slot'].subject,
          first_name: selectedApplication.candidates.first_name,
          last_name: selectedApplication.candidates.last_name,
          job_title: selectedApplication.public_jobs.job_title,
          recruiter,
          sessionNames: selectedSessions.map((ele) => ele.name),
          request_id: result.id,
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
            type: 'schedule',
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
    } catch {
      toast.error('Unable to send');
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Stack>
      <ReqAvailability
        textDateAvailability={
          <Stack>
            {`${selectedDate[0]?.format('MMMM DD')} - ${selectedDate[1]?.format('MMMM DD')}`}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiPopover-paper': {
                  // border: 'none',
                  scale: 0.5,
                },
              }}
            >
              <DateRange
                calendars={1}
                onChange={(e) => {
                  setSelectedDate(e);
                }}
                value={[dayjs(selectedDate[0]), dayjs(selectedDate[1])]}
              />
            </Popover>
          </Stack>
        }
        onClickEditDate={{
          onClick: (e) => {
            setAnchorEl(e.target);
          },
        }}
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
            <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
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

            <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
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
                    slotIcons={ele.session_type == 'debrief'}
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
        isCheckbox={router.query.candidate_request_availability === 'true'}
        slotCheckboxAvailability={
          <Checkbox
            defaultChecked={markCreateTicket}
            onChange={(e) => {
              setMarkCreateTicket(e.target.checked);
            }}
          />
        }
        onClickReqAvailability={{
          onClick: handleSubmit,
        }}
        onClickClose={{ onClick: getDrawerClose }}
        onClickCancel={{ onClick: getDrawerClose }}
      />
    </Stack>
  );
}

export default RequestAvailability;
