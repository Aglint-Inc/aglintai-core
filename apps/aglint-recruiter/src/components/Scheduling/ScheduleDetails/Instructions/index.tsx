import { Stack } from '@mui/material';
import { Edit } from 'lucide-react';
import { marked } from 'marked';
import { useState } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UITypography from '@/components/Common/UITypography';

function Instructions({
  instruction,
  setTextValue,
  updateInstruction,
  showEditButton,
  isBorder = false,
  isPadding = true,
  isWidth = true,
  isMinWidth = true,
}: {
  instruction: string;
  updateInstruction: any;
  showEditButton: boolean;
  setTextValue: any;
  isBorder?: boolean;
  isPadding?: boolean;
  isWidth?: boolean;
  isMinWidth?: boolean;
}) {
  const [edit, setEdit] = useState(false);

  function closeModal() {
    setEdit(false);
  }

  return (
    <>
      <UIDialog
        onClose={closeModal}
        open={edit}
        title={'Edit Instructions'}
        size='xl'
        slotButtons={
          <>
            <UIButton variant='secondary' onClick={closeModal}>
              Cancel
            </UIButton>
            <UIButton
              variant='default'
              onClick={async () => {
                await updateInstruction();
                closeModal();
              }}
            >
              Save
            </UIButton>
          </>
        }
      >
        <div className='flex flex-col gap-2'>
          <UITypography>
            Please provide detailed instructions on how to conduct the
            interview, including dos and don’ts, and a clear guideline.
          </UITypography>

          <div
            className='
            border border-neutral-600
            max-w-[800px]
            rounded-[var(--radius-2)]
            h-[500px] overflow-auto
          '
          >
            <TipTapAIEditor
              enablAI={false}
              placeholder={'Instructions'}
              handleChange={(html) => {
                setTextValue(html);
              }}
              initialValue={instruction}
            />
          </div>
        </div>
      </UIDialog>
      <Stack direction={'column'} p={'var(--space-5)'}>
        <Stack
          gap={2}
          bgcolor={'white'}
          padding={isPadding && 'var(--space-4)'}
          border={isBorder && '1px solid var(--neutral-6)'}
          borderRadius={'var(--radius-4)'}
          width={isWidth && '855px'}
          minWidth={isMinWidth && '100%'}
        >
          <ShowCode>
            <ShowCode.When isTrue={showEditButton}>
              <div className='flex items-center justify-between'>
                <p className='text-base font-medium'>Instructions</p>
                <UIButton
                  variant='secondary'
                  leftIcon={<Edit />}
                  size='sm'
                  onClick={setEdit.bind(null, true)}
                >
                  Edit
                </UIButton>
              </div>
            </ShowCode.When>
          </ShowCode>
          <div
            style={{
              maxWidth: '600px',
            }}
            dangerouslySetInnerHTML={{
              __html: marked(instruction || 'Instructions not given'),
            }}
          ></div>
        </Stack>
      </Stack>
    </>
  );
}

export default Instructions;
