import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { usePortalSettings } from '@/components/CompanyDetailComp/hook';

import ImagesUpload from './ImagesUpload';

export function ConfigureSliderImages() {
  const {
    data,
    updateImages,
    deleteImages,
    setIsDialogOpen,
    isDialogOpen,
    isImageRemoving,
    isImageUploading,
  } = usePortalSettings();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const dialogClose = () => {
    setIsDialogOpen(null);
  };
  return (
    <div>
      <div className='w-full max-w-2xl space-y-4'>
        <div className='flex flex-col'>
          <h1 className='text-md font-semibold'>Company Images</h1>
          <p className='text-sm text-muted-foreground'>
            These images will be displayed on the candidate portal as the
            slider.
          </p>
        </div>
        <div className='grid grid-cols-4 gap-4 auto-rows-auto'>
          {/* 5 Grey Background Divs */}
          {data?.company_images?.map((image, index) => (
            <div
              key={index}
              className='bg-gray-300 rounded-md flex items-center justify-center w-[150px] h-[150px] relative overflow-hidden group'
            >
              {/* Show delete button on hover */}
              <button
                onClick={() => deleteImages(image)}
                className='absolute top-2 right-2 z-20 w-5 h-5 rounded-sm bg-white border border-gray-300 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'
                aria-label='Delete image' // Added for accessibility
              >
                <X strokeWidth={1} className='w-3 h-3' />
              </button>

              <Image
                src={image}
                alt='company image'
                width={150}
                height={150}
                className='w-full h-full object-cover relative z-10'
              />
              {isImageRemoving === image && (
                <div className='w-[150px] h-[150px] absolute top-0 left-0 bg-white z-[21] flex items-center justify-center'>
                  Removing ...
                </div>
              )}
            </div>
          ))}

          <Dialog
            open={isDialogOpen === 'images'}
            onOpenChange={() => setIsDialogOpen('images')}
          >
            <DialogTrigger asChild>
              <Button
                className='flex flex-col items-center gap-2 justify-center w-[150px] h-[150px]'
                variant='outline'
                onClick={() => setIsDialogOpen('images')}
              >
                <ImagePlus strokeWidth={1.5} className='w-10 h-10 ' />
                <span className='text-sm font-normal'>Add Images</span>
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px]'>
              <DialogHeader>
                <DialogTitle>Upload Slider Images</DialogTitle>
                <DialogDescription>
                  Upload images for the slider on the candidate portal. You can
                  upload up to 5 images, each less than 5MB. Landscape
                  orientation is preferred.
                </DialogDescription>
              </DialogHeader>
              <ImagesUpload
                setSelectedImages={setSelectedImages}
                selectedImages={selectedImages}
              />
              <DialogFooter className='w-full flex flex-row gap-2 justify-between'>
                <Button
                  variant='secondary'
                  className='w-full'
                  onClick={dialogClose}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isImageUploading}
                  onClick={() => {
                    updateImages(selectedImages, setSelectedImages);
                  }}
                >
                  {isImageUploading ? 'Uploading...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
