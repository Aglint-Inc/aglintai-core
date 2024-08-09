import { DatabaseFunctions } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import dayjs from '@utils/dayjs';

import { supabase } from '@/src/utils/supabase/client';
import timeZones from '@/src/utils/timeZone';

import { TimezoneObj } from '../../CompanyDetailComp/SettingsSchedule';

export const getDurationText = (duration: number) => {
  const hours = Math.trunc(duration / 60);
  const minutes = Math.trunc(duration % 60);
  const durationText = `${
    hours ? `${hours} hour${hours === 1 ? '' : 's'}` : ''
  }${hours && minutes ? ' ' : ''}${
    minutes ? `${minutes} minute${minutes === 1 ? '' : 's'}` : ''
  }`;
  return durationText;
};

export const dayJS = (timestamp: string, tz: TimezoneObj['tzCode']) => {
  return dayjs(timestamp).tz(tz);
};

const getLocalIANATimezone = () => {
  const tz = dayjs.tz.guess();
  return timeZones.find(({ tzCode }) => tzCode === tz).tzCode;
};

export const getCalenderEventUrl = ({
  title,
  description,
  start_time,
  end_time,
  location,
}: {
  start_time: string;
  end_time: string;
  location: string;
  title: string;
  description: string;
}) => {
  const tz = encodeURIComponent(getLocalIANATimezone());

  return `https://calendar.google.com/calendar/r/eventedit?action=TEMPLATE&dates=${encodeURIComponent(new Date(start_time).toISOString().replaceAll(/-|:|.ddd/g, ''))}%2F${encodeURIComponent(new Date(end_time).toISOString().replaceAll(/-|:|.ddd/g, ''))}&ctz=${tz}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(String(location))}&text=${encodeURIComponent(title)}`;
};

export const createRescheduleRequest = async ({
  application_id,
  new_dates,
  session_ids,
  candidate_name,
  organizer_id,
}: {
  session_ids: string[];
  application_id: string;
  new_dates: { start_date: string; end_date: string };
  candidate_name: string;
  organizer_id: string;
}) => {
  let details: DatabaseFunctions['create_session_requests']['Args'] = {
    applications: [application_id],
    request: {
      assignee_id: organizer_id,
      assigner_id: organizer_id,
      priority: 'urgent',
      schedule_end_date: new_dates.start_date,
      schedule_start_date: new_dates.end_date,
      status: 'to_do',
      title: `${candidate_name} Requested for rescheduling Interview`,
      type: 'reschedule_request',
    },
    sessions: session_ids,
  };
  supabaseWrap(await supabase.rpc('create_session_requests', details));
};
//
// export const createCancelRequest = async (session_ids: string) => {
//   let details: DatabaseFunctions['create_session_requests']['Args'] = {
//     applications: [],
//     request: {
//       assignee_id: '',
//       assigner_id: '',
//       priority: 'urgent',
//       schedule_end_date: '',
//       schedule_start_date: '',
//       status: 'to_do',
//       title: '',
//       type: '',
//     },
//     sessions: [],
//   };
//   const [request_rec] = supabaseWrap(
//     await supabase.rpc('create_session_requests', {
//       sessions: session_ids,
//       applications,
//     }),
//   );
// };
