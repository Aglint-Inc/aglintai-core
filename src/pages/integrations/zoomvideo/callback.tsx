import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ZOOM_REDIRECT_URI } from '@/src/utils/integrations/constants';
import toast from '@/src/utils/toast';

const Page = () => {
  const { recruiter_id } = useAuthDetails();
  const handleClick = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post('/api/test', {
        recruiter_id,
      });
    } catch (error) {
      //
    }
  };

  const handleGetAuthUri = async () => {
    try {
      let zoom_auth_url = `https://zoom.us/oauth/authorize?redirect_uri=${ZOOM_REDIRECT_URI}&client_id=${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}&response_type=code`;
      const popup = window.open(zoom_auth_url, 'popup', 'popup=true');
      const checkPopup = setInterval(() => {
        if (popup && !popup.closed) {
          try {
            if (popup.window.location.href.includes('zoom-auth=sucess')) {
              toast.success('Zoom auth sucess');
              popup.close();
              clearInterval(checkPopup);
            }
            if (popup.window.location.href.includes('zoom-auth=failed')) {
              toast.error('Zoom auth failed');
            }
          } catch (error) {
            // console.log(error);
          }
        }
      }, 1000);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div>
      <>
        <Button onClick={handleGetAuthUri}>Get authUrl</Button>
        <Button onClick={handleClick}>TEST API</Button>
      </>
    </div>
  );
};

export default Page;
