const axios = require('axios');

export async function refreshTokenMicrosoftGraph(
  refresh_token,
  client_id,
  client_secret,
) {
  const token_endpoint =
    'https://login.microsoftonline.com/common/oauth2/v2.0/token';

  const request_body = {
    grant_type: 'refresh_token',
    client_id: client_id,
    client_secret: client_secret,
    refresh_token: refresh_token,
  };

  const response = await axios.post(
    token_endpoint,
    {
      ...request_body,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  const data = response.data;
  const access_token = data.access_token;
  return access_token;
}
