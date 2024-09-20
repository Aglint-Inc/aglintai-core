import React, { useState } from 'react';
import Instructions from 'src/app/_common/components/Instructions';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { useScheduleDetails } from '../../hooks/useScheduleDetails';

function ScheduleDetailInstructions() {
  const { recruiterUser } = useAuthDetails();
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
      toast.error(error.message);
    }
  }
  return (
    <div className='max-w-4xl'>
      <Instructions
        instruction={schedule?.interview_meeting.instructions as string}
        setTextValue={setTextValue}
        showEditButton={
          recruiterUser.role === 'admin' || recruiterUser.role === 'recruiter'
        }
        updateInstruction={updateInstruction}
      />
    </div>
  );
}

export default ScheduleDetailInstructions;
