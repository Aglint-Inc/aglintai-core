import { palette } from '@context/Theme/Theme';
import UploadIcon from '@mui/icons-material/Upload';
import { Avatar, Stack } from '@mui/material';
import { supabase } from '@utils/supabaseClient';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { LoaderSvg } from '@/devlink';
import Icon from '@/src/components/Common/Icons/Icon';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

function ImageUpload({
  setImage,
  image,
  size,
  table,
  handleUpdateProfile = null,
}: {
  setImage?: Dispatch<SetStateAction<string>>;
  image: string;
  size: number;
  table: 'company-logo' | 'recruiter-user';
  handleUpdateProfile?: any;
}) {
  const [isStackHovered, setIsStackHovered] = useState<boolean>();
  const [fileSizeError, setFileSizeError] = useState('');
  const [loading, setLoading] = useState<boolean>();
  const { userDetails } = useAuthDetails();

  const setProfilePicture = async (file) => {
    setLoading(true);
    if (file.size > 5 * 1000000) {
      setFileSizeError(
        'The file you uploaded exceeds the maximum allowed size. Please ensure that the file size is less than 5 MB',
      );
      setLoading(false);
      return;
    }
    setFileSizeError('');
    const { data } = await supabase.storage
      .from(table)
      .upload(`public/${userDetails?.user?.id}`, file, {
        cacheControl: '3600',
        // Overwrite file if it exis
        upsert: true,
      });
    if (data?.path) {
      if (setImage)
        setImage(
          `${
            process.env.NEXT_PUBLIC_SUPABASE_URL
          }/storage/v1/object/public/${table}/${data?.path}?t=${new Date().toISOString()}`,
        );
      if (handleUpdateProfile) {
        await handleUpdateProfile({
          profile_image: `${
            process.env.NEXT_PUBLIC_SUPABASE_URL
          }/storage/v1/object/public/${table}/${data?.path}?t=${new Date().toISOString()}`,
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <Stack direction={'row'} justifyContent={'center'}>
        <Stack
          position={'relative'}
          sx={{
            borderRadius: '10px',
            borderColor: palette.grey[400],
          }}
          onMouseEnter={() => setIsStackHovered(true)}
          onMouseLeave={() => setIsStackHovered(false)}
        >
          <Stack>
            <Avatar
              src={image}
              sx={{
                width: size,
                height: size,
                borderRadius: '10px',
                '& .MuiAvatar-img ': {
                  objectFit: 'contain',
                },
                textTransform: 'capitalize',
                bgcolor: 'transparent',
              }}
              variant='square'
            >
              <Icon
                variant='CompanyOutlinedBig'
                height='32'
                width='32'
                color='#87929D'
              />
            </Avatar>
            {image && (
              <Stack position={'absolute'} bottom={-10} left={26}></Stack>
            )}
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
              <LoaderSvg />
            </Stack>
          )}
          <Stack
            sx={{
              zIndex: 1,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {!image ? (
              <FileUploader
                handleChange={setProfilePicture}
                name='file'
                types={['PNG', 'JPEG', 'JPG']}
              >
                <Stack
                  id={'image-upload'}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.5s ease', // Adjust the duration and easing as needed
                    opacity: isStackHovered ? 100 : 0,
                    borderRadius: '10px',
                    mt: '4px',
                  }}
                  height={`${size}px`}
                  width={`${size}px`}
                  direction={'row'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <UploadIcon
                    fontSize='medium'
                    sx={{
                      position: 'absolute',
                      color: palette.grey[500],
                      top: 0,
                      right: 0,
                    }}
                  />
                </Stack>
              </FileUploader>
            ) : (
              <Stack
                height={`${size}px`}
                width={`${size}px`}
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  transition: 'all 0.5s ease', // Adjust the duration and easing as needed
                  opacity: isStackHovered ? 100 : 0,
                  background: isStackHovered ? '#2F3941B2' : 'transparent',
                  borderRadius: '10px',
                }}
              >
                {image && (
                  <Stack
                    direction={'row'}
                    spacing={1}
                    sx={{
                      transition: 'all 0.5s ease', // Adjust the duration and easing as needed
                      visibility: isStackHovered ? 'visible' : 'hidden',
                      opacity: isStackHovered ? 1 : 0,
                    }}
                  >
                    <FileUploader
                      handleChange={setProfilePicture}
                      name='file'
                      types={['PNG', 'JPEG', 'JPG']}
                    >
                      <Stack
                        id={'image-upload'}
                        sx={{
                          cursor: 'pointer',
                          color: '#fff',
                          transition: '',
                        }}
                      >
                        <Icon variant='ReloadFilled' />
                      </Stack>
                    </FileUploader>

                    <Stack
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (setImage) setImage(null);
                        if (handleUpdateProfile)
                          await handleUpdateProfile({ profile_image: null });
                      }}
                      sx={{ color: '#fff', cursor: 'pointer' }}
                    >
                      <Icon variant='DeleteIcon' />
                    </Stack>
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems={'center'}>
        {fileSizeError && (
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            mt={'5px'}
            textAlign={'center'}
            maxWidth={'400px'}
          >
            <UITypography type='small' color={palette.red[400]}>
              {fileSizeError}
            </UITypography>
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default ImageUpload;
