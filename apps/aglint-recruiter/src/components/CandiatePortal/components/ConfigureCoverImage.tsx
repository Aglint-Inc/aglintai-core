import { Button } from '@components/ui/button';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { type ChangeEvent, type DragEvent, useRef } from 'react';

import { usePortalSettings } from '@/components/CompanyDetailComp/hook';

export function ConfigureCoverImage() {
  const { data, removeCover, updateCover, isCoverUploading, isCoverRemoving } =
    usePortalSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFile = Array.from(event.target.files)[0];
      if (newFile.size < 5 * 1000000) updateCover(newFile, data?.banner_image);
      //chandruAddToast
    }
  };

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const newFile = Array.from(event.dataTransfer.files)[0];

      if (newFile.size < 5 * 1000000) updateCover(newFile, data?.banner_image);
      //chandruAddToast
    }
  };

  return (
    <div>
      <div className='w-full max-w-2xl space-y-4'>
        <div className='flex flex-col'>
          <h1 className='text-md font-semibold'>Company Cover Image</h1>
          <p className='text-sm text-muted-foreground'>
            This image will be displayed on the candidate portal as the cover
            image.
          </p>
        </div>
        <div className='flex flex-col '>
          {/* if there is no image show this button */}
          {data?.banner_image ? (
            <div className='flex flex-col  items-center justify-center gap-4 w-96 h-48 bg-gray-100 rounded-md '>
              <Image
                width={600}
                height={400}
                src={data.banner_image}
                alt='Company Cover'
                className='object-cover h-full'
              ></Image>
            </div>
          ) : (
            <div className='relative'>
              <Button
                className='flex flex-col items-center gap-4 w-96 h-48 '
                variant='outline'
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept='image/*'
                  className='hidden'
                />
                <ImagePlus className='w-10 h-10 ' />
                Add Cover Image
              </Button>
              {isCoverUploading && (
                <div className='w-[380px] h-[190px] absolute top-0 left-0 bg-white z-10 flex items-center justify-center'>
                  Uploading ...
                </div>
              )}
            </div>
          )}
          {/* Button to edit and remove the image only if there is an image */}
          {data?.banner_image && (
            <div className='flex flex-row gap-2'>
              <Button
                variant='outline'
                className='mt-4'
                onClick={() => fileInputRef2.current?.click()}
              >
                <input
                  type='file'
                  ref={fileInputRef2}
                  onChange={handleFileChange}
                  accept='image/*'
                  className='hidden'
                />
                Edit Cover Image
              </Button>

              <Button
                variant='outline'
                className='mt-4'
                onClick={() => removeCover(data.banner_image)}
              >
                {isCoverRemoving ? 'Remove...' : 'Remove'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
