import { Button } from '@components/ui/button';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';

export function ConfigureCoverImage() {
  return (
    <div>
      <div className='w-full max-w-2xl space-y-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Cover Image</h1>
          <p className='text-sm text-muted-foreground'>
            This image will be displayed on the candidate portal as the cover
            image.
          </p>
        </div>
        <div className='flex flex-col gap-2 '>
          {/* if there is no image show this button */}
          <Button
            className='flex flex-col items-center gap-4 w-96 h-48 '
            variant='outline'
          >
            <ImagePlus className='w-10 h-10 ' />
            Add Cover Image
          </Button>
          <div className='flex flex-col items-center justify-center gap-4 w-96 h-48 bg-gray-100 rounded-md overflow-hidden'>
            {/* if image is there , Cover image here */}
            <Image
              width={600}
              height={400}
              className='object-cover'
              src='https://placehold.co/600x400'
              alt='Cover Image'
            />
          </div>
          {/* Button to edit and remove the image only if there is an image */}
          <div className='flex flex-row gap-2 '>
            <Button variant='outline' className='mt-4'>
              Edit Cover Image
            </Button>
            <Button variant='outline' className='mt-4'>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
