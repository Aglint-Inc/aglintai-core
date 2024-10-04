import { DialogDescription } from '@components/ui/dialog';
import type { Dispatch, SetStateAction } from 'react';

import { useFlags } from '@/company/hooks/useFlags';
import { usePortalSettings } from '@/company/hooks/usePortalSettings';
import { UIButton } from '@/common/UIButton';
import UIDialog from '@/common/UIDialog';
import { UITextArea } from '@/common/UITextArea';

export const GreetingEditDialog = ({
  setIsDialogOpen,
  isDialogOpen,
  setText,
  text,
}: {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  isDialogOpen: boolean;
  setText: Dispatch<SetStateAction<string>>;
  text: string;
}) => {
  const { updateGreetings, loading } = usePortalSettings();
  const { greetings } = useFlags();

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setText(event.target.value);
  };

  return (
    <UIDialog
      open={isDialogOpen}
      title='Edit Candidate Greeting'
      onClose={() => setIsDialogOpen(false)}
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            className='w-full'
            onClick={() => {
              setIsDialogOpen(false);
              setText(greetings || '');
            }}
          >
            Cancel
          </UIButton>
          <UIButton
            type='submit'
            className='w-full'
            isLoading={loading.isGreetingUpdating}
            disabled={loading.isGreetingUpdating}
            onClick={async () => {
              await updateGreetings(text);
              setIsDialogOpen(false);
            }}
          >
            Save changes
          </UIButton>
        </>
      }
    >
      <DialogDescription>
        Edit the greeting section for the candidate portal.
      </DialogDescription>

      <UITextArea
        value={text}
        onChange={handleTextChange}
        placeholder='Start typing here...'
        className='mt-4 min-h-[200px] rounded-md border border-muted-foreground bg-background p-4'
      />
    </UIDialog>
  );
};
