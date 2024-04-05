import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';

import { GetAuthParams, getUserCalAuth } from '../event_book/book_session';
import { CalendarEvent, NewCalenderEvent } from '../schedule-utils/types';
import { supabaseAdmin } from '../supabase/supabaseAdmin';
import { decrypt_string } from './crypt-funcs';

const { google } = require('googleapis');

export class GoogleCalender {
  private recruiter_user_id;
  private auth_details: GetAuthParams;
  private user_auth: any;
  constructor(
    _auth_details: GetAuthParams | null,
    _recruiter_user_id: string = null,
  ) {
    if (_auth_details) {
      this.auth_details = _auth_details;
    }
    if (_recruiter_user_id) {
      this.recruiter_user_id = _recruiter_user_id;
    }
  }

  public async authorizeUser() {
    if (!this.auth_details) {
      const [rec_relns] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_relation')
          .select('recruiter(service_json),recruiter_user(email,schedule_auth)')
          .eq('user_id', this.recruiter_user_id),
      );
      this.auth_details = {
        company_cred: null,
        recruiter: {
          email: rec_relns.recruiter_user.email,
          schedule_auth: rec_relns.recruiter_user.schedule_auth,
          user_id: this.recruiter_user_id,
        },
      };
      if (rec_relns.recruiter.service_json) {
        this.auth_details.company_cred = JSON.parse(
          decrypt_string(rec_relns.recruiter.service_json),
        );
      }
    } else {
      this.user_auth = await getUserCalAuth({
        recruiter: this.auth_details.recruiter,
        company_cred: this.auth_details.company_cred,
      });
    }
    return this.user_auth;
  }
  public async getAllCalenderEvents(start_date: string, end_date: string) {
    if (!this.user_auth) {
      throw new Error('user not authorized');
    }
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: start_date,
      timeMax: end_date,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return events.data.items as CalendarEvent[];
  }
  public async getCalenderEventById(event_id: string) {
    if (!this.user_auth) throw new Error('Not Authenticated');
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
    const { data: event } = await calendar.events.get({
      calendarId: 'primary',
      eventId: event_id,
    });
    return event as CalendarEvent;
  }

  public async createCalenderEvent(new_cal_event: NewCalenderEvent) {
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
    const response = await calendar.events.insert({
      calendarId: 'primary', // 'primary' refers to the user's primary calendar
      resource: new_cal_event,
      conferenceDataVersion: 1,
      sendNotifications: true,
    });
    return response.data as CalendarEvent;
  }
  public async importEvent(event, attendeeEmail) {
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
    const response = await calendar.events.import({
      calendarId: attendeeEmail, // Use the attendee's email as the calendar ID
      resource: event,
      sendNotifications: true,
    });
    return response.data;
  }
  public async updateEventStatus(event_id: string, status: 'cancelled') {
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
    const response = await calendar.events.patch({
      calendarId: 'primary', // Change to specific calendar ID if needed
      eventId: event_id,
      requestBody: {
        status: status,
      },
      sendNotifications: true,
    });
    return response.data;
  }
}
