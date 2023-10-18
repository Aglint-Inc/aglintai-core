import React, { useEffect, useState } from 'react';

import Support from '@/src/components/Support/Create';
import { EmployeeType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

function SupportPage() {
  const [userDetails, setUserDetails] = useState<EmployeeType>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        supabase
          .from('employee')
          .select()
          .eq('user_id', data.session.user.id)
          .then(({ data, error }) => {
            if (!error && data.length) {
              setUserDetails(data[0]);
            }
          });
      }
    });
  }, []);

  return <Support {...{ userDetails }} />;
}

export default SupportPage;
SupportPage.getLayout = (page) => {
  return <>{page}</>;
};
