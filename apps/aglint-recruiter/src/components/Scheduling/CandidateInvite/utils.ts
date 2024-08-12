import { DatabaseFunctions, DatabaseTable } from '@aglint/shared-types';
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

export const createRequest = async ({
  application_id,
  new_dates,
  session_ids,
  candidate_name,
  organizer_id,
  type,
  avail_req_id,
}: {
  session_ids: string[];
  application_id: string;
  new_dates: { start_date: string; end_date: string };
  candidate_name: string;
  organizer_id: string;
  type: DatabaseTable['interview_session_cancel']['type'];
  avail_req_id: string;
}) => {
  let details: DatabaseFunctions['create_session_request']['Args'] = {
    application: application_id,
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
  if (type === 'declined') {
    details.request.title = `${candidate_name} Requested for Cancelling Interview`;
    details.request.type = 'cancel_schedule_request';
  }

  const request_id = supabaseWrap(
    await supabase.rpc('create_session_request', details),
  );
  supabaseWrap(
    await supabase
      .from('candidate_request_availability')
      .update({
        request_id: request_id,
      })
      .eq('id', avail_req_id),
  );
};
