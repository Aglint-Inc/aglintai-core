import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import AUIButton from '../components/Common/AUIButton';
import { InterviewPlanScheduleDbType } from '../components/JobInterviewPlan/types';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
const Page = () => {
  return (
    <>
      <Comp />
    </>
  );
};

const Comp = () => {
  const [isFinding, setIsFinding] = useState(false);
  const [data, setData] = useState<InterviewPlanScheduleDbType[]>([]);

  const handlSubmit = async () => {
    try {
      setIsFinding(true);
      const { data: r } = await axios.post(
        '/api/scheduling/v2/find_availability',
        {
          job_id: '770a61d3-c20b-4ee7-bf1d-e89345df37c6',
          company_id: 'ce4f1b5c-431d-47cc-9826-ca376a8d031b',
          start_date: '2024-03-06T06:38:10.120Z',
          end_date: '2024-03-06T06:38:10.120Z'
        }
      );
      setData(r);
      setIsFinding(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Stack direction={'column'} display={'flex'} height={'600px'} px={'20px'}>
      <AUIButton onClick={handlSubmit}>
        {isFinding ? 'finding' : 'find'}
      </AUIButton>
      <p>
        {data.map((schedule) => {
          return (
            <div key={schedule.schedule_id} style={{ marginBottom: '10px' }}>
              <h5>ScheduleId {schedule.schedule_id}</h5>
              <p>
                {schedule.plan.map((m) => {
                  return (
                    <p key={m.module_id}>
                      <h6>module {m.module_id}</h6>
                      <p>
                        {dayjs(m.start_time).format('HH:mm')} -{' '}
                        {dayjs(m.end_time).format('HH:mm')}
                        {m.isBreak && '--------BREAK'}
                      </p>
                      <p>
                        Interviewers{' '}
                        {m.attended_inters.map((int) => int.email).join(' ')}
                      </p>
                    </p>
                  );
                })}
              </p>
            </div>
          );
        })}
      </p>
    </Stack>
  );
};

// Page.getLayout = ({ page }) => {
//   return <>{page}</>;
// };

export default Page;
