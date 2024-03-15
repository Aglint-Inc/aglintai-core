/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import AUIButton from '../components/Common/AUIButton';
import SpecializedDatePicker from '../components/Common/SpecializedDatePicker';
import { InterviewPlanScheduleDbType } from '../components/JobInterviewPlan/types';
import ToggleBtn from '../components/Scheduling/Settings/Components/ToggleBtn';
import {
  InterDetailsType,
  TimeDurationType
} from '../utils/scheduling_v2/types';

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
  return (
    <Stack direction={'column'} display={'flex'} height={'600px'} px={'20px'}>
      <Combination />
      {/* <FreeTime /> */}
    </Stack>
  );
};

// Page.getLayout = ({ page }) => {
//   return <>{page}</>;
// };

export default Page;

const Combination = () => {
  const [isFinding, setIsFinding] = useState(false);
  const [data, setData] = useState<InterviewPlanScheduleDbType[]>([]);

  const handlSubmit = async () => {
    try {
      setIsFinding(true);
      const { data: r } = await axios.post(
        '/api/scheduling/v2/find_availability',
        {
          job_id: '6781035e-47ac-486f-baff-ccb121fce8c2',
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
        id: 'rF4V1t-mh4bU-9Sb1rDtK',
        plans: [
          {
            module_id: '3e225dce-67d2-45c1-aee5-dcdf36ddaaac',
            isBreak: false,
            selectedIntervs: [
              {
                interv_id: '9afe3700-c509-4f65-af0d-7892718ecde2',
                email: 'chinmai@aglinthq.com',
                profile_img:
                  'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/recruiter-user/public/9afe3700-c509-4f65-af0d-7892718ecde2?t=2024-02-22T05:06:18.313Z',
                name: 'Chinmai C R',
                pause_json: null
              }
            ],
            duration: 30,
            start_time: '2024-03-18T04:00:55.247Z',
            end_time: '2024-03-18T04:30:55.247Z',
            module_name: 'Cloud Architect',
            session_name: 'Session 1',
            revShadowIntervs: [
              {
                interv_id: 'da3fbdd1-4403-44e3-b94a-1601bca8787a',
                email: 'ogyen@aglinthq.com',
                profile_img: '',
                name: 'Ogyen Togga',
                pause_json: null
              }
            ],
            shadowIntervs: []
          },
          {
            module_id: 'c26261d0-8a74-4aae-a8b1-6c6586862a8e',
            isBreak: false,
            start_time: '2024-03-18T04:30:55.247Z',
            end_time: '2024-03-18T05:00:55.247Z',
            selectedIntervs: [
              {
                interv_id: '3521d240-eb11-4ae5-ac27-d4f4e2ac5ea5',
                email: 'dileep@aglinthq.com',
                profile_img: '',
                name: 'Dileep B C',
                pause_json: null
              }
            ],
            duration: 30,
            module_name: 'Typescipt Interview',
            session_name: 'Session 2',
            revShadowIntervs: [],
            shadowIntervs: []
          }
        ]
      };
      const { data } = await axios.post(
        '/api/scheduling/v2/book_schedule_plan',
        {
          plan: payload,
          candidate_email: 'ogyen@aglinthq.com',
          schedule_id: '84e4c494-80a4-411d-b08d-68a480052910'
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
    <>
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
    </>
  );
};

const FreeTime = () => {
  const [isFinding, setIsFinding] = useState(false);
  const [showLocalTime, setShowLocalTime] = useState(false);
  const [data2, set2Data] = useState<{
    d1: InterDetailsType[];
    d2: TimeDurationType[];
  } | null>(null);
  const [dateRange, setDateRange] = useState<{
    start_date: Dayjs;
    end_date: Dayjs;
  }>({
    start_date: dayjs(),
    end_date: dayjs()
  });
  const handleSubmit2 = async () => {
    try {
      setIsFinding(true);
      const { data: r } = await axios.post(
        '/api/scheduling/v2/find_availability',
        {
          job_id: '6781035e-47ac-486f-baff-ccb121fce8c2',
          company_id: 'd353b3a0-3e19-45d0-8623-4bd35577f548',
          start_date: dateRange.start_date,
          end_date: dateRange.end_date
        }
      );
      set2Data(r);
      setIsFinding(false);
    } catch (err) {
      setIsFinding(false);
      // console.log(err);
    }
  };
  const localTimeZone = 'Asia/Colombo';

  return (
    <>
      <Stack my={5} direction={'row'} gap={2}>
        <SpecializedDatePicker
          label='Start'
          onChange={(e) => {
            setDateRange((prev) => {
              prev.start_date = e;
              return { ...prev };
            });
          }}
          value={dateRange.start_date}
        />
        <SpecializedDatePicker
          label='End'
          onChange={(e) => {
            setDateRange((prev) => {
              prev.end_date = e;
              return { ...prev };
            });
          }}
          value={dateRange.end_date}
        />
      </Stack>
      <AUIButton onClick={handleSubmit2}>
        {`${isFinding ? 'finding  ' : 'Find '}`}
        Free times
      </AUIButton>
      <div>
        show time in local
        <ToggleBtn
          isActive={showLocalTime}
          handleCheck={() => {
            setShowLocalTime((p) => !p);
          }}
        />
      </div>
      <p style={{ marginTop: '50px' }}>
        {data2 &&
          data2.d1.map((i) => {
            return (
              <p key={i.email} style={{ marginTop: '20px' }}>
                <h6>
                  {i.name} (
                  {showLocalTime
                    ? localTimeZone
                    : i.shedule_settings.timeZone.tzCode}
                  )
                </h6>
                <p>
                  {i.freeTimes.map((t, idx) => {
                    let d1 = dayjs(t.startTime);
                    let d2 = dayjs(t.endTime);
                    if (showLocalTime) {
                      d1 = d1.tz(localTimeZone);
                      d2 = d2.tz(localTimeZone);
                    }
                    return (
                      <p key={idx}>
                        {d1.format('DD------HH:mm')} -{' '}
                        {d2.format('DD----HH:mm')}
                      </p>
                    );
                  })}
                </p>
              </p>
            );
          })}
      </p>
      <p style={{ marginTop: '50px' }}>
        <h3>common time</h3>
        {data2 &&
          data2.d2.map((i, idx) => {
            let d1 = dayjs(i.startTime);
            let d2 = dayjs(i.endTime);
            if (showLocalTime) {
              d1 = d1.tz(localTimeZone);
              d2 = d2.tz(localTimeZone);
            }
            return (
              <p key={idx} style={{ marginTop: '20px' }}>
                {d1.format('DD----HH:mm')} - {d2.format('DD---- HH:mm')}
              </p>
            );
          })}
      </p>
    </>
  );
};
