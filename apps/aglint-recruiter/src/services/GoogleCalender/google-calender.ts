import { CalendarEvent, NewCalenderEvent } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import {
  CalEventAttendeesAuthDetails,
  GetAuthParams,
  getSuperAdminAuth,
  getUserCalAuth,
} from '../../utils/event_book/book_session';
import { decrypt_string } from '../../utils/integrations/crypt-funcs';
import { supabaseAdmin } from '../../utils/supabase/supabaseAdmin';

const { google } = require('googleapis');

export class GoogleCalender {
  private recruiter_user_id;
  private auth_details: GetAuthParams;
  private user_auth: any;
  constructor(
    _comp_domain_cred_hash: string | null,
    _recruiter_auth: CalEventAttendeesAuthDetails,
    _recruiter_user_id: string = null,
  ) {
    this.auth_details = {
      company_cred: _comp_domain_cred_hash
        ? JSON.parse(decrypt_string(_comp_domain_cred_hash))
        : null,
      recruiter: _recruiter_auth,
    };
    if (_recruiter_user_id) {
      this.recruiter_user_id = _recruiter_user_id;
    }
  }

  public async authorizeUser() {
    if (!this.auth_details) {
      const [rec_relns] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_relation')
          .select(
            'recruiter(service_json),recruiter_user!public_recruiter_relation_user_id_fkey(email,schedule_auth)',
          )
          .eq('user_id', this.recruiter_user_id)
          .then(({ data, error }) => ({
            data: data.filter((d) => d.recruiter_user),
            error,
          })),
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
      this.user_auth = await getUserCalAuth({
        recruiter: this.auth_details.recruiter,
        company_cred: this.auth_details.company_cred,
      });
    } else {
      this.user_auth = await getUserCalAuth({
        recruiter: this.auth_details.recruiter,
        company_cred: this.auth_details.company_cred,
      });
    }
    return this.user_auth;
  }
  public async authSuperAdmin(company_id: string) {
    const [company] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_relation')
        .select('recruiter(service_json,domain_admin_email)')
        .eq('recruiter_id', company_id),
    );
    if (!company.recruiter.service_json) {
      throw new Error('Invalid Company Service Cred');
    }
    this.auth_details = {
      company_cred: JSON.parse(decrypt_string(company.recruiter.service_json)),
      recruiter: null,
    };
    this.user_auth = await getSuperAdminAuth(
      this.auth_details.company_cred,
      company.recruiter.domain_admin_email,
    );
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
  public async updateEvent(updated_event: Partial<CalendarEvent>) {
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
    const response = await calendar.events.patch({
      calendarId: 'primary', // Change to specific calendar ID if needed
      eventId: updated_event.id,
      requestBody: {
        ...updated_event,
      },
      sendNotifications: true,
    });
    return response.data as CalendarEvent;
  }
  public async changeMeetingOrganizer(
    from_calender: string,
    event_id: string,
    new_organizer_email: string,
  ) {
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
    const result = await calendar.events.move({
      calendarId: from_calender,
      eventId: event_id,
      destination: new_organizer_email,
    });

    return result.data;
  }
}
