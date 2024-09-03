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
    >
      <Stack>
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
            bgcolor: 'transparent',
          }}
          variant='square'
        >
          route
        </Avatar>
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

      <FileUploader
        handleChange={onImageChange}
        name='file'
        types={['PNG', 'JPEG', 'JPG']}
      >
        <Button
          type='submit'
          size='sm'
          className='p-4 h-[10px] text-[12px]'
          disabled={loading}
        >
          Upload Image
        </Button>
      </FileUploader>
      <Button
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
    </Stack>
  );
}

export default ImageUploadManual;
