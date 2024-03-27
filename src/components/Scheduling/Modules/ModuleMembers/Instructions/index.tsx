import { Drawer, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { Instructions, InstructionsButton } from '@/devlink3';
import AUIButton from '@/src/components/Common/AUIButton';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import { palette } from '@/src/context/Theme/Theme';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useModuleAndUsers } from '../../queries/hooks';
import { ModuleType } from '../../types';

function InstructionsComp({ editModule }: { editModule: ModuleType }) {
  const [openInstructions, setOpenInstructions] = useState(false);
  const [hideGotIt, setHideGotIt] = useState(false);

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
        toast.success('Instruction updated!');
        setOpenInstructions(false);
        refetch();
      }
    }
  }

  useEffect(() => {
    setHideGotIt(localStorage.getItem('hideModuleInstructionsWork') === 'true');
  }, []);
  return (
    <>
      <InstructionsButton
        onClickInstructions={{
          onClick: () => {
            setOpenInstructions(true);
          },
        }}
      />
      <Drawer
        anchor={'right'}
        open={openInstructions}
        onClose={() => {
          setOpenInstructions(false);
        }}
      >
        <Stack width={500}>
          <Instructions
            onClickGotit={{
              onClick: () => {
                setHideGotIt(true);
                localStorage.setItem('hideModuleInstructionsWork', 'true');
              },
            }}
            isHowWorkVisible={!hideGotIt}
            onClickClose={{
              onClick: () => {
                setOpenInstructions(false);
              },
            }}
            slotButton={
              <Stack direction={'row'} justifyContent={'end'}>
                <AUIButton
                  onClick={() => {
                    updateInstruction();
                  }}
                >
                  Update
                </AUIButton>
              </Stack>
            }
            slotInstructions={
              <>
                <Stack
                  sx={{
                    mt: '8px',
                    border: '1px solid',
                    borderColor: palette.grey[300],
                    borderRadius: '4px',
                    maxHeight: '600px',
                    overflow: 'auto',
                  }}
                >
                  <TipTapAIEditor
                    enablAI={false}
                    placeholder={'Instructions'}
                    handleChange={(html) => {
                      setTextValue(html);
                    }}
                    initialValue={editModule?.instructions}
                  />
                </Stack>
              </>
            }
          />
        </Stack>
      </Drawer>
    </>
  );
}

export default InstructionsComp;
