import {
  type CalendarEvent,
  type NewCalenderEvent,
} from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';
import { google } from 'googleapis';

import {
  type CalEventAttendeesAuthDetails,
  type GetAuthParams,
} from '@/utils/event_book/types';
import { getSuperAdminAuth } from '@/utils/scheduling/getSuperAdminAuth';
import { getUserCalAuth } from '@/utils/scheduling/getUserCalAuth';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { decrypt_string } from '../../utils/integrations/crypt-funcs';
import { fetchRecruiterDBAuthDetails } from './utils';

export class GoogleCalender {
  private recruiter_user_id;
  private auth_details: GetAuthParams;
  private user_auth: any;
  private supabaseAdmin = getSupabaseServer();
  constructor(
    _comp_domain_cred_hash: string | null,
    _recruiter_auth: CalEventAttendeesAuthDetails | null,
    _recruiter_user_id: string | null = null,
  ) {
    this.user_auth = null;
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
    if (this.recruiter_user_id) {
      const { auth_details, user_auth } = await fetchRecruiterDBAuthDetails(
        this.recruiter_user_id,
        this.supabaseAdmin,
      );
      this.user_auth = user_auth;
      this.auth_details = auth_details;
    } else {
      if (!this.auth_details) {
        throw new CApiError('SERVER_ERROR', 'Auth Details not found');
      }
      this.user_auth = await getUserCalAuth({
        recruiter: this.auth_details.recruiter,
        company_cred: this.auth_details.company_cred,
      });
    }
    return this.user_auth;
  }
  public async authSuperAdmin(company_id: string) {
    const company = (
      await this.supabaseAdmin
        .from('recruiter_relation')
        .select(
          'recruiter!inner(integrations!inner(service_json,domain_admin_email))',
        )
        .eq('recruiter_id', company_id)
        .single()
        .throwOnError()
    ).data;
    if (!company) {
      throw new CApiError('SERVER_ERROR', 'Company not found');
    }
    if (!company.recruiter.integrations.service_json) {
      throw new Error('Invalid Company Service Cred');
    }
    this.auth_details = {
      company_cred: JSON.parse(
        decrypt_string(company.recruiter.integrations.service_json),
      ),
      recruiter: null,
    };
    this.user_auth = await getSuperAdminAuth(
      this.auth_details.company_cred,
      company.recruiter.integrations.domain_admin_email!,
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
    //@ts-expect-error
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: new_cal_event,
      conferenceDataVersion: 1,
      sendNotifications: true,
    });
    //@ts-expect-error
    return response.data as CalendarEvent;
  }
  public async importEvent(event: CalendarEvent, attendeeEmail: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
    //@ts-expect-error
    const response = await calendar.events.import({
      calendarId: attendeeEmail, // Use the attendee's email as the calendar ID
      resource: event,
      sendNotifications: true,
    });
    //@ts-expect-error
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
  public async watchEvents(organizer_id: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });

    const watchResponse = await calendar.events.watch({
      requestBody: {
        id: `${process.env.NEXT_PUBLIC_ENV}-${organizer_id}`,
        type: 'web_hook',
        address:
          (process.env.NEXT_PUBLIC_NGROK ?? process.env.NEXT_PUBLIC_HOST_NAME) +
          '/api/google-calender/webhook',
        // params: {
        //   ttl: '3600',
        // },
      },
      calendarId: 'primary',
    });
    return watchResponse.data;
  }
  public async stopWatch(channel_id: string, resource_id: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
    const response = await calendar.channels.stop({
      requestBody: {
        id: channel_id, // The unique channel ID
        resourceId: resource_id, // The resource ID from the watch response
      },
    });
    return response.data;
  }
  public async fullCalendarSync(sync_token: string | undefined | null) {
    let events: CalendarEvent[] = [];
    let pageToken = null;
    let syncToken = sync_token; // Initially, this will be null for the first sync

    do {
      const requestParams: any = {
        calendarId: 'primary',
        singleEvents: true,
        showDeleted: true,
        maxResults: 2500,
        pageToken: pageToken,
        syncToken,
      };

      if (syncToken) {
        delete requestParams.pageToken;
      }
      const calendar = google.calendar({ version: 'v3', auth: this.user_auth });
      const response = await calendar.events.list(requestParams);
      if (response.data.items && response.data.items.length > 0) {
        events = events.concat(response.data.items as CalendarEvent[]);
      }
      pageToken = response.data.nextPageToken;
      syncToken = response.data.nextSyncToken;
    } while (pageToken);

    return { events, syncToken };
  }
}
