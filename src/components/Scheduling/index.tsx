import { useEffect } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { setInterviewPanels } from './store';

function ShecdulingMainComp() {
  const { recruiter } = useAuthDetails();

  useEffect(() => {
    if (recruiter?.id) {
      fetchIntervieWPanel();
    }
  }, [recruiter?.id]);

  const fetchIntervieWPanel = async () => {
    try {
      const { data, error } = await supabase
        .from('interview_panel')
        .select('*')
        .eq('recruiter_id', recruiter.id);
      if (error) {
        throw error;
      }
      setInterviewPanels(data);
    } catch (e) {
      toast.error('Error fetching interview panel');
    }
  };
  return <div>ShecdulingMainComp</div>;
}

export default ShecdulingMainComp;
