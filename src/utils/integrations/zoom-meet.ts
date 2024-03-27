import axios from 'axios';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';

import { supabaseAdmin } from '../supabase/supabaseAdmin';
import { ZOOM_API_URL } from './constants';
import { decrypt_string } from './crypt-funcs';
import { TokenType, ZoomCreateMeetingParams } from './types';

export class ZoomMeet {
  private recruiter_id;
  private user_auth: TokenType;
  constructor(_recruiter_id: string) {
    this.recruiter_id = _recruiter_id;
  }
  public async authorizeUser() {
    const [rec] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter')
        .select('zoom_auth')
        .eq('id', this.recruiter_id),
    );
    if (!rec.zoom_auth) {
      throw new Error('Zoom not integrated');
    }
    const zoom_auth = JSON.parse(decrypt_string(rec.zoom_auth)) as TokenType;
    const authHeader = `Basic ${Buffer.from(
      `${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`,
    ).toString('base64')}`;
    const { data } = await axios.post(
      'https://zoom.us/oauth/token',
      {
        refresh_token: zoom_auth.refresh_token,
        grant_type: 'refresh_token',
      },
      {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    this.user_auth = data;
  }
  public async createMeeting(meet_info: ZoomCreateMeetingParams) {
    const { data } = await axios.post(
      `${ZOOM_API_URL}/users/me/meetings`,
      {
        ...meet_info,
      },
      {
        headers: {
          Authorization: `Bearer ${this.user_auth.access_token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  }
  public async;
  public async cancel_meet() {
    //
  }
}
