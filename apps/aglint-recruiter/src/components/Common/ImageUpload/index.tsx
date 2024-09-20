import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Building,
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';

/* eslint-disable */
interface ImageUploadProps {
  setImage?: (url: string) => void;
  image: string;
  disabled?: boolean;
  size: number;
  table: 'company-logo' | 'recruiter-user';
  handleUpdateProfile?: (data: {
    profile_image: string | null;
  }) => Promise<void>;
  dynamic?: boolean;
  changeCallback?: (url: string) => void;
  error?: (hasError: boolean) => void;
}
/* eslint-enable */

function ImageUpload({
  setImage,
  image,
  disabled = false,
  size,
  table,
  handleUpdateProfile,
  dynamic = false,
  changeCallback,
  error,
}: ImageUploadProps) {
  const router = useRouterPro();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { recruiterUser } = useAuthDetails();

  const defaultImage = '/images/logo/company.png';
  const displayImage = image || defaultImage;

  const setProfilePicture = async (file: File) => {
    if (disabled) return;
    setLoading(true);

    if (file.size > 5 * 1000000) {
      error?.(true);
      setLoading(false);
      return;
    }

    const { data } = await supabase.storage
      .from(table)
      .upload(`public/${recruiterUser?.user_id}`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (data?.path) {
      error?.(false);
      const newImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${table}/${data.path}?t=${new Date().toISOString()}`;

      setImage?.(newImageUrl);
      changeCallback?.(newImageUrl);

      if (handleUpdateProfile) {
        await handleUpdateProfile({ profile_image: newImageUrl });
      }

      setTimeout(() => setLoading(false), 2000);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage?.(null);
    handleUpdateProfile?.({ profile_image: null });
  };

  return (
    <div className='flex justify-center'>
      <div
        className='relative'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Avatar
          className={`${dynamic ? 'h-full w-full' : `w-${size} h-${size}`} rounded-lg`}
        >
          <AvatarImage src={displayImage} alt='Profile' />
          <AvatarFallback>
            {router.pathName.includes(ROUTES['/profile']()) ? (
              <User className='h-6 w-6' />
            ) : (
              <Building className='h-6 w-6' />
            )}
          </AvatarFallback>
        </Avatar>

        {loading && (
          <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50'>
            <Loader2 className='h-8 w-8 animate-spin text-white' />
          </div>
        )}

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          {!image ? (
            <FileUploader
              handleChange={setProfilePicture}
              name='file'
              types={['PNG', 'JPEG', 'JPG']}
            >
              {!disabled && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='bg-black bg-opacity-50 text-white'
                >
                  <Upload className='h-6 w-6' />
                </Button>
              )}
            </FileUploader>
          ) : (
            <div className='flex space-x-2 rounded-lg bg-black bg-opacity-50 p-2'>
              <FileUploader
                handleChange={setProfilePicture}
                name='file'
                types={['PNG', 'JPEG', 'JPG']}
              >
                {!disabled && (
                  <Button variant='ghost' size='sm' className='text-white'>
                    <RefreshCw className='h-4 w-4' />
                  </Button>
                )}
              </FileUploader>

              {!disabled && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-white'
                  onClick={handleDelete}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
