/* eslint-disable security/detect-object-injection */
import {
  DB,
  InterviewMeetingTypeDb
} from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';


export interface TimeSlot {
  startTime: string;
  endTime: string;
  user_ids: string[];
  isSelected?: boolean;
}

export type MailHandlerparam = {
  application_id: string;
  filter_id: string;
  supabase: ReturnType<typeof createServerClient<DB>>;
  task_id: string;
};

const TYPE_LABELS = {
  google_meet: 'Google Meet',
  in_person_meeting: 'In Person Meeting',
  phone_call: 'Phone Call',
  zoom: 'Zoom',
};

export const getScheduleType = (
  schedule_type: DB['public']['Enums']['interview_schedule_type'],
) => TYPE_LABELS[schedule_type] || 'Google Meet';

export const getScheduleBgcolor = (
  status: InterviewMeetingTypeDb['status'],
) => {
  return status === 'completed'
    ? '#228F67'
    : status === 'confirmed'
      ? '#337FBD'
      : status === 'cancelled'
        ? '#D93F4C'
        : status === 'waiting'
          ? '#F79A3E'
          : '#C2C8CC';
};

export const getScheduleTextcolor = (
  status: InterviewMeetingTypeDb['status'],
) => {
  return status === 'completed'
    ? '#186146'
    : status === 'confirmed'
      ? '#0F3554'
      : status === 'waiting'
        ? '#703815'
        : '#681219';
};
