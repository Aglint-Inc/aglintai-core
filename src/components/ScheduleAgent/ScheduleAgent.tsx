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

import { InitAgentBodyParams } from './types';
import SpecializedDatePicker from '../Common/SpecializedDatePicker';
import UITextField from '../Common/UITextField';
import { supabaseWrap } from '../JobsDashboard/JobPostCreateUpdate/utils';

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
      console.log(rec.candidate_files.resume_json);
      console.log(payload);
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
                Init {status}
              </Button>
              <div>
                <>{data}</>
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
