/* eslint-disable no-console */
import { Box, Button, Stack } from '@mui/material';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import SpecializedDatePicker from '../Common/SpecializedDatePicker';
import UITextField from '../Common/UITextField';
import { supabaseWrap } from '../JobsDashboard/JobPostCreateUpdate/utils';
import { InitAgentBodyParams } from './types';

const ScheduleAgent = () => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));
  const [selectedCand, setSelectedCand] = useState({
    application_id: '681c0858-fb4d-4180-ab96-c2d13e52e58e',
  });
  const [status, setStatus] = useState<'loading' | 'done' | '' | 'error'>('');
  const [data, setData] = useState('');

  const { recruiter_id, recruiterUser } = useAuthDetails();

  const initConversation = async () => {
    try {
      setStatus('loading');
      const [rec] = supabaseWrap(
        await supabase
          .from('applications')
          .select(
            'id, candidate_files(resume_json,candidate_id),public_jobs(id,job_title), candidates(*)',
          )
          .eq('id', selectedCand.application_id),
      );
      let payload: InitAgentBodyParams = {
        application_id: rec.id,
        end_date: endDate,
        start_date: startDate,
        company_id: recruiter_id,
        recruiter_user_id: recruiterUser.user_id,
        organizer_time_zone: dayjs.tz.guess(),
        schedule_type: 'email',
      };
      setData(JSON.stringify(payload));
      await axios.post('/api/scheduling/mail-agent/init-agent', {
        ...payload,
      });
      setStatus('done');
      // console.log(data);
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  const makePhoneCal = async () => {
    try {
      setStatus('loading');

      let payload: InitAgentBodyParams = {
        application_id: selectedCand.application_id,
        end_date: endDate,
        start_date: startDate,
        company_id: recruiter_id,
        recruiter_user_id: recruiterUser.user_id,
        organizer_time_zone: dayjs.tz.guess(),
        schedule_type: 'phone',
      };
      setData(JSON.stringify(payload));
      const {
        data: { schedule_id },
      } = await axios.post('/api/scheduling/mail-agent/init-agent', {
        ...payload,
      });
      const phone_payload = {
        company_name: 'Figmatic',
        schedule_id: schedule_id,
        application_id: selectedCand.application_id,
        caq: 'Based  in Caalifornia',
        slots: `${startDate.format('DD MMMM')} - ${endDate.format('DD MMMM')}`,
        begin_call_sentence:
          'Hi Dileep, this is Raimon calling from Aglint. We wanted to schedule an interview for the position of SDE, Is this the right time to talk?',
        from: '+12025194968',
        to: '+919019664884',
        agent: 'dcc1869a822931ef646f28e185e7402e',
        types: 'Scheduling',
        title: 'initial',
        organizer_time_zone: 'Asia/colombo',
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_PHONE_CALL_SERVER}/api/create-phone-call`,

        {
          ...phone_payload,
        },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    //
  };

  return (
    <>
      <Box
        display='flex'
        // flexDirection='column'
        //   sx={{ backgroundColor: '#f0f0f0' }}
        height='100vh'
      >
        <Box
          sx={{
            width: '600px',
            padding: 2,
            overflowY: 'auto',
          }}
        >
          <Box marginTop={'100px'}>
            <Stack direction={'column'} gap={2}>
              <UITextField
                value={selectedCand.application_id}
                label='Candidate Application id'
                onChange={(e) => {
                  setSelectedCand((p) => {
                    p.application_id = e.target.value.trim();
                    return { ...p };
                  });
                }}
              />
              <SpecializedDatePicker
                onChange={(e) => {
                  setStartDate(e);
                }}
                value={startDate}
                label='Start Date'
              />
              <SpecializedDatePicker
                onChange={(e) => {
                  setEndDate(e);
                }}
                value={endDate}
                label='Start Date'
              />

              <Button
                type='submit'
                onClick={() => {
                  initConversation();
                }}
                variant='contained'
                color='primary'
              >
                Init Email{status}
              </Button>
              <Button
                type='submit'
                onClick={() => {
                  makePhoneCal();
                }}
                variant='contained'
                color='primary'
              >
                Init Phone call{status}
              </Button>
              <div>
                <>{status === 'done' && data}</>
              </div>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScheduleAgent;

// candidate booking status : pending, cancelled, booked, interview completed
