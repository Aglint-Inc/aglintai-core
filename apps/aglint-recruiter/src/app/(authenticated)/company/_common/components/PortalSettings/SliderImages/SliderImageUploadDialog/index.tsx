import { type Dispatch, type SetStateAction, useState } from 'react';

import { UIButton } from '@/common/UIButton';
import UIDialog from '@/common/UIDialog';
import { useTenant } from '@/company/hooks';

import ImagesUpload from './ImagesUpload';
import { useSlideUpdate } from './useSlideUpdate';

export const SliderImageUploadDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { mutateAsync, isPending } = useSlideUpdate();
  const {
    recruiter: { name },
  } = useTenant();
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
            disabled={isPending}
            isLoading={isPending}
            onClick={async () => {
              const formData = new FormData();
              selectedImages.forEach((selectedFile) =>
                formData.append('slideImages', selectedFile),
              );
              formData.append('recruiterName', name);
              await mutateAsync(formData);
              setIsDialogOpen(false);
              setSelectedImages([]);
            }}
          >
            Save Changes
          </UIButton>
        </>
      }
    >
      <p className='mb-2 text-sm text-muted-foreground'>
        Upload images for the slider on the candidate portal. You can upload up
        to 5 images, each less than 5MB. Landscape orientation is preferred.
      </p>
      <ImagesUpload
        setSelectedImages={setSelectedImages}
        selectedImages={selectedImages}
      />
    </UIDialog>
  );
};
