/* eslint-disable no-unused-vars */
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
          job_id: 'b6fe81e7-759b-4947-b950-a8d8ec0c70f0',
          company_id: 'd353b3a0-3e19-45d0-8623-4bd35577f548',
          start_date: '2024-03-18T14:59:55.247Z',
          end_date: '2024-03-21T14:59:55.247Z'
        }
      );
      setData(r);
      setIsFinding(false);
    } catch (err) {
      setIsFinding(false);
      // console.log(err);
    }
  };

  const test = async () => {
    try {
      const payload = {
        schedule_id: 'XfDhm0F8ZFxikCcA-8GLq',
        plan: [
          {
            isBreak: false,
            duration: 30,
            end_time: '2024-03-14T11:30:00.000Z',
            module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
            start_time: '2024-03-14T11:00:00.000Z',
            module_name: 'H R',
            attended_inters: [
              {
                id: '627fedcf-7b6f-490a-97ee-3ba93f3fee2d',
                name: 'Ravi K',
                email: 'ravi@aglinthq.com',
                profile_img: ''
              }
            ]
          },
          {
            isBreak: true,
            duration: 30,
            end_time: '2024-03-14T12:00:00.000Z',
            module_id: '',
            start_time: '2024-03-14T11:30:00.000Z',
            module_name: '',
            attended_inters: []
          },
          {
            isBreak: false,
            duration: 30,
            end_time: '2024-03-14T12:30:00.000Z',
            module_id: '43387b96-2390-4406-8a93-73c14cc3a668',
            start_time: '2024-03-14T12:00:00.000Z',
            module_name: 'Next JS Developer',
            attended_inters: [
              {
                id: '9afe3700-c509-4f65-af0d-7892718ecde2',
                name: 'Chinmai C R',
                email: 'chinmai@aglinthq.com',
                profile_img:
                  'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/recruiter-user/public/9afe3700-c509-4f65-af0d-7892718ecde2?t=2024-02-22T05:06:18.313Z'
              }
            ]
          }
        ]
      };
      const { data } = await axios.post(
        '/api/scheduling/v2/book_schedule_plan',
        {
          plan: payload,
          candidate_email: 'ogyen@aglinthq.com',
          schedule_id: '8e7f04cd-916a-48a7-ba4e-9b3c1c12f2b5'
        }
      );
    } catch (error) {
      // console.log(error);
    }

    // try {

    //   const { data } = await axios.post(
    //     '/api/scheduling/v2/cancel_calender_event',
    //     {
    //       calender_event: {
    //         id: '4k51rbd4p5q16b9ns7etddt36s',
    //         end: {
    //           dateTime: '2024-03-11T11:00:55+05:30',
    //           timeZone: 'Asia/Kolkata'
    //         },
    //         etag: '"3420481039798000"',
    //         kind: 'calendar#event',
    //         start: {
    //           dateTime: '2024-03-11T10:30:55+05:30',
    //           timeZone: 'Asia/Kolkata'
    //         },
    //         status: 'confirmed',
    //         created: '2024-03-12T10:48:40.000Z',
    //         creator: {
    //           self: true,
    //           email: 'dileepwert@gmail.com'
    //         },
    //         iCalUID: '4k51rbd4p5q16b9ns7etddt36s@google.com',
    //         summary: 'Node JS Developer',
    //         updated: '2024-03-12T10:48:39.899Z',
    //         htmlLink:
    //           'https://www.google.com/calendar/event?eid=NGs1MXJiZDRwNXExNmI5bnM3ZXRkZHQzNnMgZGlsZWVwd2VydEBt',
    //         sequence: 0,
    //         attendees: [
    //           {
    //             email: 'ogyen@aglinthq.com',
    //             responseStatus: 'needsAction'
    //           }
    //         ],
    //         eventType: 'default',
    //         organizer: {
    //           self: true,
    //           email: 'dileepwert@gmail.com'
    //         },
    //         reminders: {
    //           overrides: [
    //             {
    //               method: 'email',
    //               minutes: 1440
    //             },
    //             {
    //               method: 'popup',
    //               minutes: 10
    //             }
    //           ],
    //           useDefault: false
    //         },
    //         hangoutLink: 'https://meet.google.com/jzx-vaxn-vrd',
    //         conferenceData: {
    //           entryPoints: [
    //             {
    //               uri: 'https://meet.google.com/jzx-vaxn-vrd',
    //               label: 'meet.google.com/jzx-vaxn-vrd',
    //               entryPointType: 'video'
    //             }
    //           ],
    //           conferenceId: 'jzx-vaxn-vrd',
    //           createRequest: {
    //             status: {
    //               statusCode: 'success'
    //             },
    //             requestId: '1d2b07b1-2fa1-4f63-9fc2-8654045fddbf',
    //             conferenceSolutionKey: {
    //               type: 'hangoutsMeet'
    //             }
    //           },
    //           conferenceSolution: {
    //             key: {
    //               type: 'hangoutsMeet'
    //             },
    //             name: 'Google Meet',
    //             iconUri:
    //               'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png'
    //           }
    //         }
    //       }
    //     }
    //   );
    // } catch (error) {
    //   // eslint-disable-next-line no-console
    // }
  };

  return (
    <Stack direction={'column'} display={'flex'} height={'600px'} px={'20px'}>
      <AUIButton onClick={handlSubmit}>
        {`${isFinding ? 'finding' : 'Find'}${
          data && `       (${data.length} combinations)`
        }`}
      </AUIButton>
      <AUIButton onClick={test}>Test</AUIButton>
      <p>
        {data.map((schedule) => {
          return (
            <div key={schedule.id} style={{ marginBottom: '20px' }}>
              <h5>ScheduleId {schedule.id}</h5>
              <p>
                {schedule.plans.map((m) => {
                  if (m.isBreak) {
                    return (
                      <p key={m.module_id} style={{ marginBottom: '10px' }}>
                        {dayjs(m.start_time).format('HH:mm')} -{' '}
                        {m.isBreak && '--------BREAK-------'}
                        {dayjs(m.end_time).format('HH:mm')}
                      </p>
                    );
                  } else
                    return (
                      <p key={m.module_id} style={{ marginBottom: '10px' }}>
                        <h6>
                          module name {m.module_name}
                          {'      '}
                          {dayjs(m.start_time).format('DD')} -{' '}
                          {dayjs(m.start_time).format('HH:mm')} -{' '}
                          {dayjs(m.end_time).format('HH:mm')} -{' '}
                        </h6>

                        <p>
                          <b>Interviewers</b>{' '}
                          {m.selectedIntervs.map((int) => int.name).join(' ')}
                        </p>
                        <p>
                          <b>Shadow Interviewers</b>{' '}
                          {m.shadowIntervs.map((int) => int.name).join(' ')}
                        </p>
                        <p>
                          <b>Shadow Interviewers</b>{' '}
                          {m.revShadowIntervs.map((int) => int.name).join(' ')}
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
