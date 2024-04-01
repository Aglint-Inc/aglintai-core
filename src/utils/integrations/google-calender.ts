import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';

import {
  GetAuthParams,
  getUserCalAuth,
} from '../event_book/book_schedule_plan';
import { CalendarEvent } from '../schedule-utils/types';
import { decrypt } from '../scheduling_v2/utils';
import { supabaseAdmin } from '../supabase/supabaseAdmin';

const { google } = require('googleapis');

export class GoogleCalender {
  private recruiter_user_id;
  private auth_details: GetAuthParams;
  private user_auth: any;
  constructor(_auth_details: GetAuthParams | null, _recruiter_user_id: string) {
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
          decrypt(rec_relns.recruiter.service_json, process.env.ENCRYPTION_KEY),
        );
      }
    }
    this.user_auth = await getUserCalAuth(this.auth_details);
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
}
