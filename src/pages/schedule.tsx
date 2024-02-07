import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

import AUIButton from '../components/Common/AUIButton';
import { API_FAIL_MSG } from '../components/JobsDashboard/JobPostCreateUpdate/utils';
import toast from '../utils/toast';

const ScheduleConsent = () => {
  const router = useRouter();
  const getConsent = async () => {
    try {
      const { data } = await axios.get('/api/scheduling/google-consent');
      return router.push(data);
    } catch (error) {
      toast.error(API_FAIL_MSG);
    }
  };

  return (
    <div
      style={{
        width: '90vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AUIButton onClick={getConsent}>Connect Google auth</AUIButton>
    </div>
  );
};

export default ScheduleConsent;
