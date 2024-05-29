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
import ToggleBtn from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/utils/UIToggle';
import DateRange from '@/src/components/Tasks/Components/DateRange';
import { createTaskProgress } from '@/src/components/Tasks/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';

import { addScheduleActivity } from '../../Candidates/queries/utils';
import { useAllActivities } from '../hooks';
import { useSchedulingApplicationStore } from '../store';
import {
  createTask,
  insertCandidateRequestAvailability,
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

  const { selectedSessionIds, initialSessions, selectedApplication } =
    useSchedulingApplicationStore();
  const { refetch } = useAllActivities({
    application_id: selectedApplication?.id,
  });

  const selectedSessions = selectedSessionIds.length
    ? initialSessions.filter((ele) => selectedSessionIds.includes(ele.id))
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
  const [markCreateTicket, setMarkCreateTicket] = useState(false);

  // handle submit

  async function handleSubmit() {
    const result = await insertCandidateRequestAvailability({
      application_id: selectedApplication.id,
      recruiter_id: recruiter.id,
      availability: availability,
      date_range: [...selectedDate],
      is_task_created: markCreateTicket,
      number_of_days: selectedDays.value,
      number_of_slots: selectedSlots.value,
      session_ids: selectedSessions.map((session) => {
        return {
          id: session.id,
          name: session.name,
          session_duration: session.session_duration,
          break_duration: session.break_duration,
        };
      }),
      total_slots: null,
    });

    // send request availability email to candidate

    const body = fillEmailTemplate(
      recruiter.email_template['request_candidate_slot'].body,
      {
        company_name: recruiter.name,
        schedule_name: selectedSessions.map((ele) => ele.name).join(','),
        first_name: selectedApplication.candidates.first_name,
        last_name: selectedApplication.candidates.last_name,
        job_title: selectedApplication.public_jobs.job_title,
        availability_link: `<a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${result.id}'>Pick Your Slot</a>`,
      },
    );

    const subject = fillEmailTemplate(
      recruiter.email_template['request_candidate_slot'].subject,
      {
        company_name: recruiter.name,
        schedule_name: selectedSessions.map((ele) => ele.name).join(','),
        first_name: selectedApplication.candidates.first_name,
        last_name: selectedApplication.candidates.last_name,
        job_title: selectedApplication.public_jobs.job_title,
      },
    );

    await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
      fromEmail: `messenger@aglinthq.com`,
      fromName: 'Aglint',
      email: selectedApplication.candidates.email,
      subject: subject,
      text: body,
    });
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

    addScheduleActivity({
      application_id: selectedApplication.id,
      created_by: recruiterUser.user_id,
      logged_by: 'user',
      supabase: supabase,
      title: `Request Availability from ${getFullName(
        selectedApplication.candidates.first_name,
        selectedApplication.candidates.last_name,
      )} to Schedule Interviews for ${selectedSessions.map((ele) => ele.name).join(',')}`,
      type: 'schedule',
      task_id: task ? task.id : null,
    });
    refetch(); // refetching activities
    getDrawerClose();
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
        isFoundSlots={true}
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
              <Typography variant='body2' width={'450px'}>
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
              <Typography variant='body2' width={'450px'}>
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
        slotCheckboxAvailability={
          <Checkbox
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
