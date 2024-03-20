import { Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { ButtonPrimaryRegular } from '@/devlink';
import { ScheduleOptions } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import { useGetScheduleOptions } from '../../hooks';
import {
  setDateRange,
  setScheduleName,
  useSchedulingApplicationStore,
} from '../../store';

function GetScheduleOptions() {
  const { recruiter } = useAuthDetails();
  const currentDate = dayjs();
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );
  const scheduleName = useSchedulingApplicationStore(
    (state) => state.scheduleName,
  );
  const dateRange = useSchedulingApplicationStore((state) => state.dateRange);

  const { findScheduleOptions, noOptions } = useGetScheduleOptions();

  return (
    <ScheduleOptions
      slotInterviewCordinator={''}
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
      slotPrimaryButton={
        <Stack width={'100%'}>
          <ButtonPrimaryRegular
            textLabel={'Get Schedule Options'}
            onClickButton={{
              onClick: async () => {
                if (dateRange.start_date && dateRange.end_date)
                  await findScheduleOptions({
                    dateRange: dateRange,
                    selectedApplication: selectedApplication,
                    rec_id: recruiter.id,
                  });
              },
            }}
          />
        </Stack>
      }
      slotInputName={
        <UITextField
          placeholder='Name your Schedule'
          onChange={(e) => {
            setScheduleName(e.target.value);
          }}
          value={scheduleName}
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
                  InputProps: { disableUnderline: true },
                  placeholder: 'Start Date',
                },
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
                  InputProps: { disableUnderline: true },
                  placeholder: 'End Date',
                },
              }}
            />
          </LocalizationProvider>
        </Stack>
      }
      textCandidateName={getFullName(
        selectedApplication.candidates.first_name,
        selectedApplication.candidates.last_name,
      )}
    />
  );
}

export default GetScheduleOptions;
