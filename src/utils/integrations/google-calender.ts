import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { RecruiterType, RecruiterUserType } from '@/src/types/data.types';

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
  private user_auth;
  constructor(_recruiter_user_id: string) {
    this.recruiter_user_id = _recruiter_user_id;
  }

  public async authorizeUser() {
    const [rec_relns] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_relation')
        .select('recruiter(service_json),recruiter_user(email,schedule_auth)')
        .eq('user_id', this.recruiter_user_id),
    ) as {
      recruiter: Pick<RecruiterType, 'service_json'>;
      recruiter_user: Pick<RecruiterUserType, 'email' | 'schedule_auth'>;
    }[];
    const authDetails: GetAuthParams = {
      company_cred: null,
      recruiter: {
        email: rec_relns.recruiter_user.email,
        schedule_auth: rec_relns.recruiter_user.schedule_auth,
        user_id: this.recruiter_user_id,
      },
    };
    if (rec_relns.recruiter.service_json) {
      authDetails.company_cred = JSON.parse(
        decrypt(rec_relns.recruiter.service_json, process.env.ENCRYPTION_KEY),
      );
    }
    this.user_auth = await getUserCalAuth(authDetails);
  }

  public async getAllCalenderEvents() {
    //
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
