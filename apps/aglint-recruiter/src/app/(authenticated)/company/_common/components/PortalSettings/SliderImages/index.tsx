import { Button } from '@components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { usePortalSettings } from '../../../hooks/hook';
import { SliderImageUploadDialog } from './SliderImageUploadDialog';

export function SliderImages() {
  const { data, deleteImages, isImageRemoving } = usePortalSettings();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

          <Button
            className='flex h-[150px] w-[150px] flex-col items-center justify-center gap-2'
            variant='outline'
            onClick={() => setIsDialogOpen(true)}
          >
            <ImagePlus strokeWidth={1.5} className='h-10 w-10' />
            <span className='text-sm font-normal'>Add Images</span>
          </Button>
          <SliderImageUploadDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </div>
    </div>
  );
}