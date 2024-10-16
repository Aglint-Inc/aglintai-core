import { DialogDescription } from '@components/ui/dialog';
import { type Dispatch, type SetStateAction, useState } from 'react';

import { UIButton } from '@/common/UIButton';
import UIDialog from '@/common/UIDialog';
import { usePortalSettings } from '@/company/context/PortalsettingsContext';

import ImagesUpload from './ImagesUpload';

export const SliderImageUploadDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { updateImages, loading } = usePortalSettings();
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
            disabled={loading.isImageUploading}
            isLoading={loading.isImageUploading}
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
