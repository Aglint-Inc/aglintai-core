import { DialogDescription } from '@components/ui/dialog';
import type { Dispatch, SetStateAction } from 'react';

import { UIButton } from '@/common/UIButton';
import UIDialog from '@/common/UIDialog';
import { UITextArea } from '@/common/UITextArea';
import { useFlags } from '@/company/hooks/useFlags';
import { api } from '@/trpc/client';

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
  const { mutateAsync, isPending } =
    api.candidatePortal.update_portal_detail.useMutation();
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
            isLoading={isPending}
            disabled={isPending}
            onClick={async () => {
              await mutateAsync({ greetings: text });
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
        className='mt-4 min-h-[200px] rounded-md border border-muted bg-background p-4'
      />
    </UIDialog>
  );
};
