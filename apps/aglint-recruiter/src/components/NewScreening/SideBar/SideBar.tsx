/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

const SideBar = ({ appId, openDrawer }) => {
  const { recruiter_id } = useAuthDetails();
  const [details, setDetails] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [id, setId] = useState('');
  const fetchApplicantsId = async () => {
    const { data, error } = await supabase.rpc('get_screening_candidates', {
      p_recruiter_id: recruiter_id,
    });

    if (error) {
      toast.error('Failed to Fetch Details');
    } else {
      setDetails(data);
    }

    return data;
  };

  useEffect(() => {
    fetchApplicantsId();
    setId(appId);
    setDrawerOpen(openDrawer);
  }, [appId]);
  return (
    <Stack
      style={{
        display: drawerOpen ? 'flex' : 'none',
        transition: 'width 0.4s',
        width: drawerOpen ? '420px' : '0px',
        height: '100%',
        pointerEvents: drawerOpen ? 'auto' : 'none',
        overflow: drawerOpen ? 'visible' : 'auto',
      }}
    ></Stack>
  );
};

export default SideBar;
