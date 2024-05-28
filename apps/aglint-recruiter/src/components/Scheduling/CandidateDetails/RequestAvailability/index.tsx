import { DatabaseTable } from '@aglint/shared-types';
import {
  Autocomplete,
  Checkbox,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { useSchedulingApplicationStore } from '../store';
import { insertCandidateRequestAvailability } from './RequestAvailabilityContext';
import {
  availabilityArrayList,
  convertMinutesToHoursAndMinutes,
  getAvailability,
  requestDaysListOptions,
  slotsListOptions,
} from './utils';

function RequestAvailability() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();

  const { selectedSessionIds, initialSessions, selectedApplication } =
    useSchedulingApplicationStore();

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
          onClick: () => {
            insertCandidateRequestAvailability({
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

            getDrawerClose();
          },
        }}
        onClickClose={{ onClick: getDrawerClose }}
        onClickCancel={{ onClick: getDrawerClose }}
      />
    </Stack>
  );
}

export default RequestAvailability;
