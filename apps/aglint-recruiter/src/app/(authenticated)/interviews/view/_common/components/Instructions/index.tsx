import { useState } from 'react';
import Instructions from 'src/app/_common/components/Instructions';

import { useTenant } from '@/company/hooks';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { useScheduleDetails } from '../../hooks/useScheduleDetails';

function ScheduleDetailInstructions() {
  const { recruiter_user } = useTenant();
  const {
    data: { schedule_data: schedule },
    refetch,
  } = useScheduleDetails();
  const [textValue, setTextValue] = useState('');

  async function updateInstruction() {
    try {
      if (textValue) {
        const { error } = await supabase
          .from('interview_meeting')
          .update({ instructions: textValue })
          .eq('id', schedule.interview_meeting.id);
        if (error) throw Error(error.message);
        refetch();
        toast.success('Instruction updated successfully.');
      } else {
        toast.warning('Please provide instructions.');
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  return (
    <div className='min-h-[calc(100vh-310px)] max-w-4xl'>
      <Instructions
        instruction={schedule?.interview_meeting.instructions as string}
        setTextValue={setTextValue}
        showEditButton={
          recruiter_user?.role === 'admin' ||
          recruiter_user?.role === 'recruiter'
        }
        updateInstruction={updateInstruction}
      />
    </div>
  );
}

export default ScheduleDetailInstructions;
