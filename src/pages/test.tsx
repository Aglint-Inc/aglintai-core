import React, { useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

function PageTest() {
  useEffect(async () => {
    const { data: applications, error } = await supabase.rpc(
      'batchcalcresumejdscore',
    );
    console.log(applications);
  }, []);

  return <div>PageTest</div>;
}

export default PageTest;
