import { DialogDescription } from '@components/ui/dialog';
import { useState } from 'react';

import { usePortalSettings } from '@/company/hooks/hook';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';

export const AboutCompanyDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const { data, updateAbout, isPortalUpdating } = usePortalSettings();
  const [text, setText] = useState(data?.about || '');
  const handleTextChange = (value) => {
    setText(value);
  };
  return (
    <UIDialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      title='Edit Company About'
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            className='w-full'
            onClick={() => {
              setText(data?.about || '');
              setIsDialogOpen(null); // Updated to close the dialog
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
              await updateAbout(text);
              setIsDialogOpen(false);
            }}
          >
            Save changes
          </UIButton>
        </>
      }
    >
      <DialogDescription>
        Edit the about section of your company.
      </DialogDescription>

      <div className='rounded-md border border-muted-foreground bg-background'>
        <TipTapAIEditor
          enablAI={false}
          placeholder={''}
          minHeight='360px'
          height='330px'
          padding={'10px'}
          editor_type='email'
          isSize
          handleChange={handleTextChange}
          initialValue={data?.about}
        />
      </div>
    </UIDialog>
  );
};
