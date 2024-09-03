'use client';
import { Avatar, Stack } from '@mui/material';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { Button } from '@/components/ui/button';

function ImageUploadManual({
  image,
  size,
  imageFile,
  setChanges = null,
}: {
  image: string;
  size: number;
  imageFile: any;
  setChanges?: () => void;
}) {
  const [loading, setLoading] = useState<boolean>();

  const [initImage, setInitImage] = useState<any>(image);

  function onImageChange(file) {
    if (file.size > 5 * 1000000) {
      setLoading(false);
      // toast.error('size is maximum');
      return;
    }
    imageFile.current = file;
    if (setChanges) setChanges();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      setInitImage(e.target.result);
    };
  }

  return (
    <Stack
      direction={'row'}
      alignItems={'flex-end'}
      gap={2}
      position={'relative'}
      sx={{
        borderRadius: 'var(--radius-2)',
        borderColor: 'var(--neutral-6)',
      }}
      className='mb-2'
    >
      <Stack>
        <div className='rounded-lg overflow-hidden '>
        <Avatar
          src={initImage ? initImage : '/images/emptyProfile.jpg'}
          sx={{
            width: size ? size : '100%',
            height: size ? size : '100%',
            borderRadius: 'var(--radius-4)',
            '& .MuiAvatar-img ': {
              objectFit: 'cover',
            },
            textTransform: 'capitalize',
            bgcolor: 'transparent'
          }}
          variant='square'
        >
          
        </Avatar>
        </div>
      </Stack>
      {loading && (
        <Stack
          height={`${size}px`}
          width={`${size}px`}
          sx={{
            zIndex: 10,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          Loading
        </Stack>
      )}
      <div className='flex flex-col gap-2'>
      <div className='text-sm '>Please upload an image that is less than 5 MB in size and in either PNG or JPEG format.</div>
      <div className='flex flex-row gap-2'>
      <FileUploader
        handleChange={onImageChange}
        name='file'
        types={['PNG', 'JPEG', 'JPG']}
      >
        <Button
          variant='secondary'
          type='submit'
          size='sm'
          className='p-4 h-[10px] text-[12px]'
          disabled={loading}
        >
          Upload Image
        </Button>
      </FileUploader>
      
      <Button
        variant='outline'
        type='submit'
        disabled={loading}
        size='sm'
        className='p-4 h-[10px] text-[12px]'
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          setInitImage(null);
          imageFile.current = null;
          if (setChanges) setChanges();
        }}
      >
        Remove
      </Button>
      </div>
      </div>
    </Stack>
  );
}

export default ImageUploadManual;
