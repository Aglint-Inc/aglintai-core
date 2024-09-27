import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type Dispatch, type SetStateAction, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { supabase } from '@/utils/supabase/client';

export const usePortalSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<
    'greetings' | 'about' | 'images' | null
  >(null);

  const [isCoverUploading, setIsCoverUploading] = useState<boolean>(false);
  const [isCoverRemoving, setIsCoverRemoving] = useState<boolean>(false);
  const [isImageRemoving, setIsImageRemoving] = useState<string>(null);
  const [isPortalUpdating, setIsPortalUpdating] = useState<boolean>(false);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const {
    recruiter: { name },
    recruiter_id,
  } = useTenant();
  const fetchPortalSettings = async () => {
    return (
      await supabase
        .from('recruiter_preferences')
        .select('banner_image,company_images,greetings,about')
        .eq('recruiter_id', recruiter_id)
        .single()
        .throwOnError()
    ).data;
  };

  const query = useQuery({
    queryKey: ['portalSettings'],
    queryFn: () => fetchPortalSettings(),
    enabled: !!recruiter_id,
  });

  const updatePortalSetting = async (
    arg: Awaited<ReturnType<typeof fetchPortalSettings>>,
  ) => {
    setIsPortalUpdating(true);
    const { error } = await supabase
      .from('recruiter_preferences')
      .update(arg)
      .eq('recruiter_id', recruiter_id);

    if (error) {
      throw new Error(error.message);
    }

    await queryClient.invalidateQueries({
      queryKey: ['portalSettings'],
    });
    setIsPortalUpdating(false);
  };

  const updateImages = async (
    images: File[],
    setSelectedImages: Dispatch<SetStateAction<File[]>>,
  ) => {
    const newImages = [];
    try {
      setIsImageUploading(true);
      for (const image of images) {
        const fileName = removeSpaces(`${name}-image-${Date.now()}`);

        const { data, error } = await supabase.storage
          .from('company-images')
          .upload(fileName, image);

        if (error) {
          throw new Error(error.message);
        }

        let img = '';
        if (data?.path) {
          img = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/company-images/${data?.path}?t=${new Date().toISOString()}`;
          newImages.push(img);
        }
      }

      const previewImages = query.data?.company_images || [];
      await updatePortalSetting({
        ...query.data,
        company_images: [...previewImages, ...newImages],
      });
      setSelectedImages([]);
    } catch (err) {
      // console.error('Error uploading images: ', error.message);
      //chandruAddToast
      return null;
    } finally {
      setIsImageUploading(false);
    }
  };

  const deleteImages = async (imageUrl: string) => {
    try {
      setIsImageRemoving(imageUrl);
      const path = extractPath(imageUrl);
      if (path.length === 0) throw new Error('wrong image');

      const { data, error } = await supabase.storage
        .from('company-images')
        .remove(path);

      if (data.length === 0 || error) {
        throw new Error(`Image deleting failed : ${error?.message}`);
      }

      await updatePortalSetting({
        ...query.data,
        company_images: query.data.company_images.filter(
          (image) => !imageUrl.includes(image),
        ),
      });
    } catch (error) {
      //chandruAddToast
      // console.error('Error uploading images: ', error?.message);
    } finally {
      setIsImageRemoving(null);
    }
  };

  const updateGreetings = async (message: string) => {
    try {
      await updatePortalSetting({ ...query.data, greetings: message });
      //chandruAddToast
    } catch (e) {
      //chandruAddToast
      // console.log('greeting update failed:', e.message);
    }
  };
  const updateAbout = async (about: string) => {
    try {
      await updatePortalSetting({ ...query.data, about: about });
      //chandruAddToasts
    } catch (e) {
      //chandruAddToasts
      // console.log('about update failed:', e.message);
    }
  };

  const updateCover = async (image: File, oldCover: string) => {
    try {
      setIsCoverUploading(true);
      const fileName = removeSpaces(`${name}-cover-${Date.now()}`);

      await removeCover(oldCover);

      const { data, error } = await supabase.storage
        .from('company-images')
        .upload(fileName, image);

      if (error) {
        throw new Error(error.message);
      }

      let img = '';
      if (data?.path) {
        img = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/company-images/${data?.path}?t=${new Date().toISOString()}`;
      }

      await updatePortalSetting({
        ...query.data,
        banner_image: img || query.data?.banner_image,
      });
    } catch (error) {
      // console.error('Error uploading cover: ', error.message);
      //ChandurAddToast
      return null;
    } finally {
      setIsCoverUploading(false);
    }
  };

  const removeCover = async (imageUrl: string) => {
    try {
      setIsCoverRemoving(true);
      const path = extractPath(imageUrl);
      if (path.length === 0) throw new Error('wrong image');

      const { data, error } = await supabase.storage
        .from('company-images')
        .remove(path);

      if (data.length === 0 || error) {
        throw new Error(`cover remove failed : ${error?.message}`);
      }

      await updatePortalSetting({
        ...query.data,
        banner_image: null,
      });
    } catch (error) {
      // console.error('Error uploading images: ', error?.message);
      //chandruAddToast
    } finally {
      setIsCoverRemoving(false);
    }
  };

  return {
    ...query,
    updateCover,
    removeCover,
    updatePortalSetting,
    updateImages,
    deleteImages,
    updateAbout,
    updateGreetings,
    setIsDialogOpen,
    isDialogOpen,
    isCoverUploading,
    isCoverRemoving,
    isImageUploading,
    isImageRemoving,
    isPortalUpdating,
  };
};

function extractPath(url) {
  const pathMatch = url.match(/\/company-images\/(.*?)(?:\?|$)/);
  if (pathMatch) {
    // Remove spaces from the extracted path
    return pathMatch[1].replace(/\s+/g, '');
  }
  return '';
}

function removeSpaces(str) {
  return str.replace(/\s+/g, '');
}
