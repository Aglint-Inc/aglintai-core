/* eslint-disable no-console */
import { Box, Button, Stack } from '@mui/material';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { CandidateFileTypeDB, PublicJobsType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

import SpecializedDatePicker from '../Common/SpecializedDatePicker';
import UITextField from '../Common/UITextField';
import { supabaseWrap } from '../JobsDashboard/JobPostCreateUpdate/utils';

const ScheduleAgent = () => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));
  const [selectedCand, setSelectedCand] = useState({
    application_id: '681c0858-fb4d-4180-ab96-c2d13e52e58e',
  });
  const [data, setData] = useState('');

  const { recruiter_id, recruiterUser } = useAuthDetails();

  const initConversation = async () => {
    try {
      const [rec] = supabaseWrap(
        await supabase
          .from('applications')
          .select(
            'candidate_files(resume_json,candidate_id),public_jobs(id,job_title)',
          )
          .eq('id', selectedCand.application_id),
      ) as {
        candidate_files: CandidateFileTypeDB;
        public_jobs: PublicJobsType;
      }[];
      let resumeJson = rec.candidate_files.resume_json as any;
      setData(
        JSON.stringify({
          application_id: selectedCand.application_id,
          job_id: rec.public_jobs.id,
          company_id: rec.public_jobs.recruiter_id,
          candidate_email: resumeJson.basics.email,
          date_range: [startDate.toISOString(), endDate.toISOString()],
          candidate_name: resumeJson.firstName,
          recruiter_user_id: recruiterUser.user_id,
        }),
      );
      await axios.post('/api/scheduling/mail-agent/init-agent', {
        application_id: selectedCand.application_id,
        job_id: rec.public_jobs.id,
        candidate_email: resumeJson.basics.email,
        candidate_name: resumeJson.basics.firstName,
        date_range: [startDate.toISOString(), endDate.toISOString()],
        company_id: recruiter_id,
        recruiter_user_id: recruiterUser.user_id,
      });
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('fewkjnekfwj');
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
                Init
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
