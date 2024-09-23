import { DialogDescription } from '@components/ui/dialog';
import { useState } from 'react';

import { usePortalSettings } from '@/company/hooks/hook';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';

import ImagesUpload from './ImagesUpload';

export const SliderImageUploadDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const { updateImages, isImageUploading } = usePortalSettings();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  return (
    <UIDialog
      open={isDialogOpen}
      title='Upload Slider Images'
      onClose={() => setIsDialogOpen(false)}
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            className='w-full'
            onClick={() => {
              setIsDialogOpen(false);
            }}
          >
            Cancel
          </UIButton>
          <UIButton
            type='submit'
            className='w-full'
            disabled={isImageUploading}
            isLoading={isImageUploading}
            onClick={async () => {
              await updateImages(selectedImages, setSelectedImages);
              setIsDialogOpen(false);
            }}
          >
            Save Changes
          </UIButton>
        </>
      }
    >
      <DialogDescription>
        Upload images for the slider on the candidate portal. You can upload up
        to 5 images, each less than 5MB. Landscape orientation is preferred.
      </DialogDescription>

      <ImagesUpload
        setSelectedImages={setSelectedImages}
        selectedImages={selectedImages}
      />
    </UIDialog>
  );
};
