import { DialogDescription } from '@components/ui/dialog';

import { usePortalSettings } from '@/company/hooks/hook';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { UITextArea } from '@/components/Common/UITextArea';

export const GreetingEditDialog = ({
  setIsDialogOpen,
  isDialogOpen,
  setText,
  text,
}) => {
  const { data, updateGreetings, isPortalUpdating } = usePortalSettings();

  const handleTextChange = (event) => {
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
              setText(data?.greetings || '');
            }}
          >
            Cancel
          </UIButton>
          <UIButton
            type='submit'
            className='w-full'
            isLoading={isPortalUpdating}
            disabled={isPortalUpdating}
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
