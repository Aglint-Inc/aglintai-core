import debounce from 'lodash/debounce';

import { supabase } from '@/src/utils/supabaseClient';

export const saveToDatabase = async (recruit, id) => {
  await supabase.from('recruiter').update(recruit).eq('id', id).select();
};

export const debouncedSave = debounce(saveToDatabase, 1000);
