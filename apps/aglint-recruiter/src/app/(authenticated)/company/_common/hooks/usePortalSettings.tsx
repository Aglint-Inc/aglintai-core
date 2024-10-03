import { toast } from '@components/hooks/use-toast';
import { type Dispatch, type SetStateAction, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

import { useFlags } from './useFlags';

export const usePortalSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<
    'greetings' | 'about' | 'images' | null
  >(null);
  const {
    recruiter: { name },
  } = useTenant();
  const { banner_image, company_images: tempCompany_images } = useFlags();
  const company_images = tempCompany_images || [];
  const { mutateAsync } = api.tenant.updateCandidatePortal.useMutation();
  const [loading, setLoading] = useState<{
    isCoverUploading: boolean;
    isCoverRemoving: boolean;
    isImageRemoving: string[] | null;
    isImageUploading: boolean;
    isGreetingUpdating: boolean;
    isAboutUpdating: boolean;
  }>({
    isCoverUploading: false,
    isCoverRemoving: false,
    isImageRemoving: [],
    isImageUploading: false,
    isGreetingUpdating: false,
    isAboutUpdating: false,
  });

  const updateImages = async (
    images: File[],
    setSelectedImages: Dispatch<SetStateAction<File[]>>,
  ) => {
    const newImages: string[] = [];
    try {
      setLoading((pre) => ({ ...pre, isImageUploading: true }));
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

      const new_company_images = [...(company_images || []), ...newImages];
      await mutateAsync({ company_images: new_company_images });
      setSelectedImages([]);
    } catch (err) {
      toast({ title: 'Images upload failed', description: err?.message });
    } finally {
      setLoading((pre) => ({ ...pre, isImageUploading: false }));
    }
  };

  const deleteImages = async (imageUrl: string) => {
    try {
      setLoading((pre) => ({
        ...pre,
        isImageRemoving: [imageUrl, ...(pre.isImageRemoving || [])],
      }));
      const path = extractPath(imageUrl);
      if (path.length === 0) throw new Error('wrong image');

      await supabase.storage.from('company-images').remove(path);

      // const { data, error } = await supabase.storage
      //   .from('company-images')
      //   .remove(path);

      // if (data.length === 0 || error ) {
      //   throw new Error(`Image deleting failed : ${error?.message}`);
      // }

      await mutateAsync({
        company_images: company_images.filter(
          (image) => !imageUrl.includes(image),
        ),
      });
    } catch (error) {
      toast({ title: 'Images delete failed', description: error?.message });
    } finally {
      setLoading((pre) => ({
        ...pre,
        isImageRemoving: (pre.isImageRemoving || []).filter(
          (imageRem) => imageRem !== imageUrl,
        ),
      }));
    }
  };

  const updateGreetings = async (message: string) => {
    try {
      setLoading((pre) => ({
        ...pre,
        isGreetingUpdating: true,
      }));
      await mutateAsync({
        greetings: message,
      });
    } catch (e) {
      //
    } finally {
      setLoading((pre) => ({
        ...pre,
        isGreetingUpdating: false,
      }));
    }
  };
  const updateAbout = async (about: string) => {
    try {
      setLoading((pre) => ({
        ...pre,
        isAboutUpdating: true,
      }));
      await mutateAsync({
        about,
      });
    } catch (e) {
      //
    } finally {
      setLoading((pre) => ({
        ...pre,
        isAboutUpdating: false,
      }));
    }
  };

  const updateCover = async (image: File, oldCover: string) => {
    try {
      setLoading((pre) => ({ ...pre, isCoverUploading: true }));

      const fileName = removeSpaces(`${name}-cover-${Date.now()}`);

      if (oldCover) await removeCover(oldCover);

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

      await mutateAsync({
        banner_image: img || banner_image,
      });
    } catch (error) {
      toast({ title: 'update cover failed', description: error?.message });
    } finally {
      setLoading((pre) => ({ ...pre, isCoverUploading: false }));
    }
  };

  const removeCover = async (imageUrl: string) => {
    try {
      setLoading((pre) => ({ ...pre, isCoverRemoving: true }));
      const path = extractPath(imageUrl);
      if (path.length === 0) throw new Error('wrong image');

      const { data, error } = await supabase.storage
        .from('company-images')
        .remove(path);

      if (error) {
        throw new Error(error.message);
      }

      if (data.length === 0) {
        throw new Error('Image deleting failed');
      }

      await mutateAsync({
        banner_image: null,
      });
    } catch (error) {
      toast({
        title: 'Remove cover image failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading((pre) => ({ ...pre, isCoverRemoving: false }));
    }
  };

  return {
    updateCover,
    removeCover,
    updateImages,
    deleteImages,
    updateAbout,
    updateGreetings,
    setIsDialogOpen,
    isDialogOpen,
    loading,
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
