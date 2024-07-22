import { Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';

function ImageUpload({
  setImage,
  image,
  disabled = false,
  size,
  table,
  handleUpdateProfile = null,
  dynamic = false,
  changeCallback,
  error,
}: {
  setImage?: Dispatch<SetStateAction<string>>;
  image: string;
  disabled?: boolean;
  size: number;
  table: 'company-logo' | 'recruiter-user';
  handleUpdateProfile?: any;
  dynamic?: boolean;
  changeCallback?: any;
  error?: any;
}) {
  const router = useRouter();
  const [isStackHovered, setIsStackHovered] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const { userDetails } = useAuthDetails();

  image = image === null ? '/images/logo/company.png' : image;
  const setProfilePicture = async (file) => {
    if (disabled) return;
    setLoading(true);
    if (file.size > 5 * 1000000) {
      error && error(true);

      setLoading(false);
      return;
    }
    const { data } = await supabase.storage
      .from(table)
      .upload(`public/${userDetails?.user?.id}`, file, {
        cacheControl: '3600',
        upsert: true,
      });
    if (data?.path) {
      error && error(false);
      if (setImage)
        setImage(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${table}/${data?.path}?t=${new Date().toISOString()}`,
        );
      changeCallback &&
        changeCallback(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${table}/${data?.path}?t=${new Date().toISOString()}`,
        );

      if (handleUpdateProfile) {
        await handleUpdateProfile({
          profile_image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${table}/${data?.path}?t=${new Date().toISOString()}`,
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
            borderRadius: 'var(--radius-2)',
            borderColor: 'var(--neutral-6)',
          }}
          onMouseEnter={() => setIsStackHovered(true)}
          onMouseLeave={() => setIsStackHovered(false)}
        >
          <Stack>
            <Avatar
              src={image}
              sx={{
                width: dynamic ? '100%' : size,
                height: dynamic ? '100%' : size,
                borderRadius: 'var(--radius-4)',
                '& .MuiAvatar-img ': {
                  objectFit: 'cover',
                },
                textTransform: 'capitalize',
                bgcolor: 'transparent',
              }}
              variant='square'
            >
              {router.route.includes(ROUTES['/profile']()) ? (
                <GlobalIcon
                  iconName='UserSolo'
                  size={6}
                  color='var(--neutral-11)'
                />
              ) : (
                <GlobalIcon
                  iconName='CompanyOutlinedBig'
                  size={6}
                  color='var(--neutral-11)'
                />
              )}
            </Avatar>
            {/* {image && (
              <Stack position={'absolute'} bottom={-10} left={26}></Stack>
            )} */}
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
                {!disabled && (
                  <Stack
                    id={'image-upload'}
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.5s ease',
                      opacity: isStackHovered ? 1 : 0,
                      borderRadius: 'var(--radius-2)',
                      mt: 'var(--space-1)',
                    }}
                    height={`${size}px`}
                    width={`${size}px`}
                    direction={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <IconButtonSoft
                      iconSize={6}
                      color='neutral'
                      iconWeight='thin'
                      iconName='cloud_upload'
                      iconColor='neutral'
                    />
                  </Stack>
                )}
              </FileUploader>
            ) : (
              <Stack
                height={`${size}px`}
                width={`${size}px`}
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  transition: 'all 0.5s ease',
                  opacity: isStackHovered ? 1 : 0,
                  background: isStackHovered
                    ? 'var(--nutral-5)'
                    : 'transparent',
                  borderRadius: 'var(--radius-4)',
                }}
              >
                {image && (
                  <Stack
                    direction={'row'}
                    sx={{
                      transition: 'all 0.5s ease',
                      visibility: isStackHovered ? 'visible' : 'hidden',
                      opacity: isStackHovered ? 1 : 0,
                      background: 'var(--black)',
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 'var(--radius-4)',
                    }}
                  >
                    <FileUploader
                      handleChange={setProfilePicture}
                      name='file'
                      types={['PNG', 'JPEG', 'JPG']}
                    >
                      {!disabled && (
                        <Stack
                          id={'image-upload'}
                          sx={{
                            cursor: 'pointer',
                            color: 'var(--white)',
                            transition: '',
                          }}
                        >
                          <IconButtonSoft
                            iconSize={4}
                            color={'white'}
                            iconName='restart_alt'
                            iconColor='white'
                          />
                        </Stack>
                      )}
                    </FileUploader>

                    {!disabled && (
                      <Stack
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (setImage) setImage(null);
                          if (handleUpdateProfile)
                            await handleUpdateProfile({ profile_image: null });
                        }}
                        sx={{ color: 'var(--white)', cursor: 'pointer' }}
                      >
                        <IconButtonSoft
                          iconSize={4}
                          color={'error'}
                          iconName='delete'
                        />
                      </Stack>
                    )}
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default ImageUpload;
