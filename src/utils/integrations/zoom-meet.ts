import axios from 'axios';

import { ZOOM_API_URL } from './constants';
import { TokenType, ZoomCreateMeetingParams, ZoomMeetingResp } from './types';

export class ZoomMeet {
  private recruiter_id;
  private user_auth: TokenType;
  constructor(_recruiter_id: string) {
    this.recruiter_id = _recruiter_id;
  }
  public async authorizeUser() {
    const client_id = 'XCHwT3TQR6KXCWqn7fTHYw';
    const client_secret = 'cJ2w5Q9M0mZZ27soJ07RcjHwXdNjB0pw';
    const account_id = 'XhuslCbVRLGMY1qIRZmBDw';
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
  public async;
  public async cancel_meet() {
    //
  }
}
