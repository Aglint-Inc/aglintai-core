/* eslint-disable no-unused-vars */
import { Dialog, Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import toast from '@/src/utils/toast';

import { ApiResponse } from '../type';
import { transformData } from '../../AllSchedules/utils';

function CheckAvailibility({
  changeTime,
  setChangeTime,
  dateRange,
  setDateRange,
  schedule,
  setSchedule
}: {
  changeTime: any;
  setChangeTime: any;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  setDateRange: ({
    start_date,
    end_date
  }: {
    start_date: string;
    end_date: string;
  }) => void;
  schedule: ApiResponse;
  setSchedule: (schedule: ApiResponse) => void;
}) {
  const currentDate = dayjs();
  const [fetchingPlan, setFetchingPlan] = useState(false);

  const findScheduleOptions = async () => {
    try {
      setFetchingPlan(true);
      const res = await axios.post('/api/scheduling/v2/find_availability', {
        job_id: schedule.job.id,
        company_id: schedule.recruiter.id,
        start_date: dateRange.start_date,
        end_date: dateRange.end_date
      });
      if (res.data) {
        setSchedule({
          ...schedule,
          schedulingOptions: res.data.map((option) => {
            return { ...option, transformedPlan: transformData(option.plans) };
          })
        });
        setFetchingPlan(false);
      } else {
        toast.error('Error fetching schedule options');
        setFetchingPlan(false);
      }
    } catch (e) {
      toast.error('Error fetching schedule options');
      //
    } finally {
      setChangeTime(false);
    }
  };
  return (
    <Dialog
      maxWidth={'lg'}
      open={changeTime}
      onClose={() => {
        setChangeTime(false);
      }}
    >
      <Stack p={2} spacing={2}>
        <Typography variant={'body1'}>Choose suitable date range</Typography>
        <Stack direction={'row'} width={'100%'} spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(dateRange?.start_date)}
              onChange={(newValue) => {
                if (dayjs(newValue) < dayjs(dateRange?.end_date)) {
                  setDateRange({
                    start_date: dayjs(newValue).toISOString(),
                    end_date: dateRange?.end_date
                  });
                } else {
                  setDateRange({
                    start_date: dayjs(newValue).toISOString(),
                    end_date: null
                  });
                }
              }}
              minDate={currentDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  InputProps: { disableUnderline: true },
                  placeholder: 'Start Date'
                }
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(dateRange?.end_date)}
              minDate={dayjs(dateRange?.start_date)}
              maxDate={dayjs(dateRange?.start_date).add(7, 'day')}
              onChange={(newValue) => {
                setDateRange({
                  start_date: dateRange?.start_date,
                  end_date: dayjs(newValue).toISOString()
                });
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  InputProps: { disableUnderline: true },
                  placeholder: 'Start Date'
                }
              }}
            />
          </LocalizationProvider>
        </Stack>
        <ButtonPrimaryRegular
          isStartIcon={fetchingPlan}
          slotStartIcon={
            <Stack height={'100%'}>
              <LoaderGrey />
            </Stack>
          }
          isDisabled={fetchingPlan}
          textLabel={'Get Schedule Options'}
          onClickButton={{
            onClick: findScheduleOptions
          }}
        />
      </Stack>
    </Dialog>
  );
}

export default CheckAvailibility;
