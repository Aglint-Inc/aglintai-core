import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { type ChangeEvent, type DragEvent, useRef, useState } from 'react';

import { Loader } from '@/common/Loader';
import UISectionCard from '@/common/UISectionCard';
import { usePortalSettings } from '@/company/context/PortalsettingsContext';
import { useTenant } from '@/company/hooks';

import { useCoverUpdate } from './useCoverUpdate';
export function CoverImage() {
  const {
    recruiter: { name },
  } = useTenant();

  const {
    data: { banner_image },
  } = usePortalSettings();

  const { mutateAsync, isPending } = useCoverUpdate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFile = Array.from(event.target.files)[0];

      if (newFile.size > 5 * 1000000) {
        toast({
          title: 'Please use a file less than 5MB',
          variant: 'destructive',
        });
        return;
      }
      await imageUpdateToDb(newFile);
    }
  };

  const imageUpdateToDb = async (newFile: File) => {
    try {
      const formData = new FormData();
      const fileName = `${name}-cover-${Date.now()}`.replace(/\s+/g, '');
      formData.append('coverImage', newFile);
      formData.append('fileName', fileName);
      formData.append('oldCover', banner_image || '');
      await mutateAsync(formData);
    } catch (error) {
      console.error('Error uploading the file:', error);
      toast({
        title: 'File upload failed. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveImage = async () => {
    const formData = new FormData();
    formData.append('oldCover', banner_image || '');
    await mutateAsync(formData);
  };

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && banner_image) {
      const newFile = Array.from(event.dataTransfer.files)[0];
      if (newFile.size < 5 * 1000000) imageUpdateToDb(newFile);
    }
  };

  return (
    <div>
      <UISectionCard
        description=' This image will be displayed on the candidate portal as the cover
              image.'
        title='Company Cover Image'
      >
        <div className='flex flex-col'>
          {banner_image ? (
            <div className='relative flex h-48 w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-md bg-muted'>
              <ImageWithLoading src={banner_image} />
              {isPending && (
                <div className='absolute flex h-full w-full items-center justify-center bg-gray-100 opacity-30'>
                  <Loader className='' />
                </div>
              )}
            </div>
          ) : (
            <div className='w-fil relative w-fit'>
              <Button
                className='flex h-48 w-96 flex-col items-center gap-4'
                variant='outline'
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {!isPending && (
                  <>
                    <input
                      type='file'
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept='image/*'
                      className='hidden'
                    />
                    <ImagePlus
                      className='h-10 w-10 text-muted-foreground'
                      strokeWidth={1.5}
                    />
                    Add Cover Image
                  </>
                )}
              </Button>
              {isPending && (
                <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                  <Loader />
                </div>
              )}
            </div>
          )}
          {/* Button to edit and remove the image only if there is an image */}
          {banner_image && !isPending && (
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
                Change Cover Image
              </Button>

              <Button
                variant='outline'
                className='mt-4'
                onClick={handleRemoveImage}
              >
                {isPending ? 'Remove...' : 'Remove'}
              </Button>
            </div>
          )}
        </div>
      </UISectionCard>
    </div>
  );
}

// ------------------------------------------------------------------------
const ImageWithLoading = ({ src }: { src: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div style={{ position: 'relative', width: '24rem', height: '12rem' }}>
      {loading && !error && (
        <div
          className='loading-spinner'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Loading...
        </div>
      )}
      {!error && (
        <Image
          width={600}
          height={400}
          src={src}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          alt='Company Cover'
          className='h-full object-cover'
        ></Image>
      )}
      {error && <p>Error loading image.</p>}
    </div>
  );
};
