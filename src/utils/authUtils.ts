// @ts-ignore
import { ProgressStatusType } from '@types/data.types';
import { supabase } from '@utils/supabaseClient';

export const getProgressStatusFromDb = async (id: string) => {
  const { error, data } = await supabase
    .from('progress_status')
    .select()
    .eq('user_id', id);
  if (!error) {
    return data[0];
  }
  return null;
};

export const setDataProgressStatusInDb = async (
  employee_id: string,
  user_id: string
) => {
  const { error, data } = await supabase
    .from('progress_status')
    .insert({ user_id, employee_id })
    .select();
  if (!error) {
    return data[0];
  }
  return null;
};

export const updateProgressStatusInDb = async (
  progressData: Partial<ProgressStatusType>,
  id: string
) => {
  const { error, data } = await supabase
    .from('progress_status')
    .update(progressData)
    .eq('user_id', id)
    .select();
  if (!error) {
    return data[0];
  }
  return null;
};

// setDataProgressStatusInDb(
//     { interview: { first_interview: true } },
//     employeeDtails[0].employee_id,
//     user_id
//   ).then((data) => {
//     console.log(data);
//   });
