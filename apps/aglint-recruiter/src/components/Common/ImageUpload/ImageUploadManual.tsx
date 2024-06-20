import { Avatar, Dialog, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { GlobalIcon } from '@/devlink3/GlobalIcon';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

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
  const router = useRouter();
  const [isStackHovered, setIsStackHovered] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  const [initImage, setInitImage] = useState<any>(image);

  const [deleteDialog, setDeleteDialog] = useState(false);
  function onImageChange(file) {
    if (file.size > 5 * 1000000) {
      setLoading(false);
      toast.error('size is maximum');
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
              src={
                initImage
                  ? initImage
                  : 'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'
              }
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
            {!initImage ? (
              <FileUploader
                handleChange={onImageChange}
                name='file'
                types={['PNG', 'JPEG', 'JPG']}
              >
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
                {initImage && (
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
                      handleChange={onImageChange}
                      name='file'
                      types={['PNG', 'JPEG', 'JPG']}
                    >
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
                    </FileUploader>

                    <Stack
                      onClick={async (e) => {
                        e.stopPropagation();
                        setDeleteDialog(true);
                      }}
                      sx={{ color: 'var(--white)', cursor: 'pointer' }}
                    >
                      <IconButtonSoft
                        iconSize={4}
                        color={'error'}
                        iconName='delete'
                      />
                    </Stack>
                    <Dialog open={deleteDialog}>
                      <DeletePopup
                        textDescription={
                          'Are you sure you want to delete this profile photot ?'
                        }
                        textTitle={'Delete profile photo'}
                        isIcon={false}
                        onClickCancel={{
                          onClick: () => {
                            setDeleteDialog(false);
                          },
                        }}
                        onClickDelete={{
                          onClick: () => {
                            setInitImage(null);
                            imageFile.current = null;
                            if (setChanges) setChanges();
                            setDeleteDialog(false);
                          },
                        }}
                      />
                    </Dialog>
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

export default ImageUploadManual;
