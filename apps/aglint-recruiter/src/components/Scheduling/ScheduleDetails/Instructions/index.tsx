import { Dialog, Stack } from '@mui/material';
import { marked } from 'marked';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { Text } from '@/devlink/Text';
import { GeneralPopupLarge } from '@/devlink3/GeneralPopupLarge';
import { ShowCode } from '@/src/components/Common/ShowCode';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';

function Instructions({
  instruction,
  setTextValue,
  updateInstruction,
  showEditButton,
  isBorder = false,
  isPadding = true,
}: {
  instruction: string;
  updateInstruction: any;
  showEditButton: boolean;
  setTextValue: any;
  isBorder?: boolean;
  isPadding?: boolean;
}) {
  const [edit, setEdit] = useState(false);

  function closeModal() {
    setEdit(false);
  }

  return (
    <>
      <Dialog
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        onClose={closeModal}
        open={edit}
        maxWidth={'md'}
      >
        <GeneralPopupLarge
          isDescriptionVisibe={false}
          textPopupTitle={'Edit Instructions'}
          isIcon={false}
          textDescription={
            'Please provide detailed instructions on how to conduct the interview, including dos and don’ts, and a clear guideline.'
          }
          slotPopup={
            <Stack
              sx={{
                border: '1px solid var(--neutral-6)',
                // margin: '20px',
                maxWidth: '800px',
                minWidth: '800px',
                // border: '1px solid',
                // borderColor: 'var(--neutral-6)',
                borderRadius: 'var(--radius-2)',
              }}
              height={'500px'}
              overflow={'auto'}
            >
              <TipTapAIEditor
                enablAI={false}
                placeholder={'Instructions'}
                handleChange={(html) => {
                  setTextValue(html);
                }}
                initialValue={instruction}
              />
            </Stack>
          }
          textPopupButton={'Save'}
          onClickAction={{
            onClick: async () => {
              await updateInstruction();
              closeModal();
            },
          }}
          onClickClose={{
            onClick: closeModal,
          }}
        />
      </Dialog>
      <Stack direction={'column'} p={'var(--space-5)'}>
        <Stack
          gap={2}
          bgcolor={'white'}
          padding={isPadding && 'var(--space-4)'}
          border={isBorder && '1px solid var(--neutral-6)'}
          borderRadius={'var(--radius-4)'}
          width={'800px'}
        >
          <ShowCode>
            <ShowCode.When isTrue={showEditButton}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Text content='Instructions' weight={'medium'} />
                <ButtonSoft
                  color={'neutral'}
                  isLeftIcon={true}
                  slotIcon={<GlobalIcon iconName={'edit'} size={'3'} />}
                  size={1}
                  textButton={'Edit'}
                  onClickButton={{
                    onClick: () => {
                      setEdit(true);
                    },
                  }}
                />
              </Stack>
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
