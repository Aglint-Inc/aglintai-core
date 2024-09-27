import { Button } from '@components/ui/button';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { type ChangeEvent, type DragEvent, useRef, useState } from 'react';

import { Loader } from '@/components/Common/Loader';
import UISectionCard from '@/components/Common/UISectionCard';

import { usePortalSettings } from '../../../hooks/hook';

export function CoverImage() {
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
      <UISectionCard
        description=' This image will be displayed on the candidate portal as the cover
              image.'
        title='Company Cover Image'
      >
        <div className='flex flex-col'>
          {/* if there is no image show this button */}
          {data?.banner_image ? (
            <div className='flex h-48 w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-md bg-gray-100'>
              <ImageWithLoading src={data.banner_image} />
            </div>
          ) : (
            <div className='relative'>
              <Button
                className='flex h-48 w-96 flex-col items-center gap-4'
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
                <ImagePlus className='h-10 w-10' />
                Add Cover Image
              </Button>
              {isCoverUploading && <Loader />}
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
      </UISectionCard>
    </div>
  );
}

// ------------------------------------------------------------------------
const ImageWithLoading = ({ src }) => {
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
            fontSize: '1.2em',
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
