import { Stack } from '@mui/material';
import { marked } from 'marked';
import { useState } from 'react';

import AUIButton from '@/src/components/Common/AUIButton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useModuleDetails, useScheduleDetails } from '..';

function Instructions() {
  const { recruiter, recruiterUser } = useAuthDetails();
  const [textValue, setTextValue] = useState(null);

  const { data: module } = useModuleDetails();
  const { data: schedule, refetch } = useScheduleDetails();
  async function updateInstruction() {
    if (textValue) {
      const { data } = await supabase
        .from('interview_meeting')
        .update({ instructions: textValue })
        .eq('id', schedule.interview_meeting.id)
        .select();
      if (data) {
        toast.success('Instruction updated!');
        refetch();
      }
    } else {
      toast.warning('Please give instructions!');
    }
  }

  return (
    <div>
      <ShowCode>
        <ShowCode.When isTrue={recruiter?.email === recruiterUser?.email}>
          <>
            <Stack
              sx={{
                margin: '20px',
                maxWidth: '600px',
                border: '1px solid',
                borderColor: palette.grey[300],
                borderRadius: '4px',
              }}
            >
              <TipTapAIEditor
                enablAI={false}
                placeholder={'Instructions'}
                handleChange={(html) => {
                  setTextValue(html);
                }}
                initialValue={
                  schedule.interview_meeting.instructions ||
                  module?.instructions
                }
              />
            </Stack>
            <Stack
              mt={'10px'}
              direction={'row'}
              justifyContent={'end'}
              maxWidth='600px'
            >
              <AUIButton onClick={updateInstruction}>Update</AUIButton>
            </Stack>
          </>
        </ShowCode.When>
        <ShowCode.Else>
          <div
            dangerouslySetInnerHTML={{
              __html: marked(
                schedule.interview_meeting.instructions ||
                  module?.instructions ||
                  'Instructions not given',
              ),
            }}
          ></div>
        </ShowCode.Else>
      </ShowCode>
    </div>
  );
}

export default Instructions;
