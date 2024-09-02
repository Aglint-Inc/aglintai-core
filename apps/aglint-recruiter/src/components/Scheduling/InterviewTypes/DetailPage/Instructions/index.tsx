import { Stack } from '@mui/material';
import { useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useModuleAndUsers } from '../../queries/hooks';
import { type ModuleType } from '../../types';

function InstructionsComp({ editModule }: { editModule: ModuleType }) {
  const [textValue, setTextValue] = useState(null);
  const { refetch } = useModuleAndUsers();
  async function updateInstruction() {
    if (textValue) {
      const { data } = await supabase
        .from('interview_module')
        .update({ instructions: textValue })
        .eq('id', editModule?.id)
        .select();
      if (data) {
        toast.success('Instructions updated successfully.');
        refetch();
      }
    }
  }

  return (
    <>
      <Stack maxWidth={'800px'} p={'var(--space-5)'}>
        <Stack
          sx={{
            border: '1px solid',
            borderColor: 'var(--neutral-6)',
            borderRadius: 'var(--radius-2)',
          }}
        >
          <TipTapAIEditor
            enablAI={false}
            placeholder={'Type interview instructions here.'}
            handleChange={(html) => {
              setTextValue(html);
            }}
            initialValue={editModule?.instructions}
          />
        </Stack>
        <Stack
          direction={'row'}
          width={'100%'}
          justifyContent={'flex-end'}
          pt={2}
        >
          <ButtonSolid
            textButton='Update'
            size={2}
            onClickButton={{
              onClick: () => {
                updateInstruction();
              },
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default InstructionsComp;
