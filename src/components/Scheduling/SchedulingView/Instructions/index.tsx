import { Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { marked } from 'marked';
import { useState } from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import { ShowCode } from '@/src/components/Common/ShowCode';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { TransformSchedule } from '../../Modules/types';

function Instructions({ schedule }: { schedule: TransformSchedule }) {
  const { recruiterUser } = useAuthDetails();
  const [textValue, setTextValue] = useState(null);

  const queryClient = useQueryClient();
  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ['schedule_details', schedule.interview_meeting.id],
    });
  };

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
        toast.warning('Please give instructions.');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <ShowCode>
        <ShowCode.When
          isTrue={
            recruiterUser.role === 'admin' ||
            recruiterUser.role === 'recruiter' ||
            schedule.schedule.coordinator_id === recruiterUser.user_id
          }
        >
          <>
            <Stack
              sx={{
                margin: '20px',
                maxWidth: '800px',
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
                initialValue={schedule.interview_meeting.instructions}
              />
            </Stack>
            <Stack direction={'row'} justifyContent={'end'} maxWidth='820px'>
              <ButtonPrimaryRegular
                textLabel={'Save'}
                onClickButton={{
                  onClick: () => {
                    updateInstruction();
                  },
                }}
              />
            </Stack>
          </>
        </ShowCode.When>
        <ShowCode.Else>
          <div
            style={{
              padding: '20px',
            }}
            dangerouslySetInnerHTML={{
              __html: marked(
                schedule.interview_meeting.instructions ||
                  'Instructions not given',
              ),
            }}
          ></div>
        </ShowCode.Else>
      </ShowCode>
    </>
  );
}

export default Instructions;
