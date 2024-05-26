/* eslint-disable no-unused-vars */
import { DatabaseTableInsert } from '@aglint/shared-types';
import { createContext, useContext, useState } from 'react';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

interface ContextValue {
  openDrawer: boolean;
  setOpenDrawer: (x: boolean) => void;
}

const defaultProvider: ContextValue = {
  openDrawer: false,
  setOpenDrawer: () => {},
};
const RequestAvailabilityContext = createContext<ContextValue>(defaultProvider);
const useRequestAvailabilityContext = () =>
  useContext(RequestAvailabilityContext);
function RequestAvailabilityProvider({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <RequestAvailabilityContext.Provider
      value={{
        openDrawer,
        setOpenDrawer,
      }}
    >
      {children}
    </RequestAvailabilityContext.Provider>
  );
}

export { RequestAvailabilityProvider, useRequestAvailabilityContext };

export async function insertCandidateRequestAvailability(
  data: DatabaseTableInsert['candidate_request_availability'],
) {
  try {
    const { error, data: result } = await supabase
    .from('candidate_request_availability')
    .insert({ ...data })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return result;
  } catch (error) {
    toast.error(error.message)
  }
}
