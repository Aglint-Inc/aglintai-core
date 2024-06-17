import { supabaseWrap } from '@aglint/shared-utils';
import axios from 'axios';

import { supabaseAdmin } from '../supabase/supabaseAdmin';
import { ZOOM_API_URL } from './constants';
import { decrypt_string } from './crypt-funcs';
import {
  TokenType,
  ZoomCreateMeetingParams,
  ZoomMeetCred,
  ZoomMeetingResp,
} from './types';

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
      throw new Error('Zoom credential not found.');
    }
    const zoom_cred: ZoomMeetCred = JSON.parse(decrypt_string(rec.zoom_auth));
    const client_id = zoom_cred.client_id;
    const client_secret = zoom_cred.client_secret;
    const account_id = zoom_cred.account_id;
    const authHeader = `Basic ${Buffer.from(
      `${client_id}:${client_secret}`,
    ).toString('base64')}`;
    const { data } = await axios.post(
      'https://zoom.us/oauth/token',
      {
        grant_type: 'account_credentials',
        account_id: account_id,
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
    if (!this.user_auth.access_token) {
      throw new Error('zoom not authorized');
    }
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
    return data as ZoomMeetingResp;
  }
  public async cancel_meet() {
    //
  }
}
