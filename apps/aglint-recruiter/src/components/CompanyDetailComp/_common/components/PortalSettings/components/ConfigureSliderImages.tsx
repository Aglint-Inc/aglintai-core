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

import { usePortalSettings } from '@/components/CompanyDetailComp/_common/hooks/hook';

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
        <div className='grid auto-rows-auto grid-cols-4 gap-4'>
          {/* 5 Grey Background Divs */}
          {data?.company_images?.map((image, index) => (
            <div
              key={index}
              className='group relative flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-md bg-gray-300'
            >
              {/* Show delete button on hover */}
              <button
                onClick={() => deleteImages(image)}
                className='absolute right-2 top-2 z-20 flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'
                aria-label='Delete image' // Added for accessibility
              >
                <X strokeWidth={1} className='h-3 w-3' />
              </button>

              <Image
                src={image}
                alt='company image'
                width={150}
                height={150}
                className='relative z-10 h-full w-full object-cover'
              />
              {isImageRemoving === image && (
                <div className='absolute left-0 top-0 z-[21] flex h-[150px] w-[150px] items-center justify-center bg-white'>
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
                className='flex h-[150px] w-[150px] flex-col items-center justify-center gap-2'
                variant='outline'
                onClick={() => setIsDialogOpen('images')}
              >
                <ImagePlus strokeWidth={1.5} className='h-10 w-10' />
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
              <DialogFooter className='flex w-full flex-row justify-between gap-2'>
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
