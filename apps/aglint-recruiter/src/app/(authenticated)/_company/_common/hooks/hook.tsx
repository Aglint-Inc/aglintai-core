import type { schedulingSettingType } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { supabase } from '@/utils/supabase/client';

import {
  generateDepartments,
  generateRoles,
  generateSpecialities,
} from '../utils/utils';

export const useCompanyDetailComp = () => {
  const router = useRouterPro();
  const { recruiter, setRecruiter } = useAuthDetails();
  const [isSaving, setIsSaving] = useState<'saving' | 'saved'>('saved');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (recruiter?.id) {
      if (!localStorage?.getItem('departments')) {
        generateDepartments(recruiter.industry);
      }
      if (!localStorage?.getItem('specialities')) {
        generateSpecialities(recruiter.industry);
      }
      if (!localStorage?.getItem('roles')) {
        generateRoles(recruiter.industry);
      }
    }
  }, [recruiter]);

  // useEffect(() => {
  //   if (router.isReady && !router.queryParams?.tab) {
  //     router.replace('/company?tab=company-info');
  //   }
  // }, [router]);

  useEffect(() => {
    if (!isSaved && isSaving) setIsSaved(true);
  }, [isSaving]);

  async function updateSettings(schedulingSettingObj: schedulingSettingType) {
    setIsSaving('saving');
    toast({
      title: 'Saving changes',
      description: (
        <div className='flex items-center justify-start space-x-2 text-sm text-gray-600'>
          <Loader2 className='h-4 w-4 animate-spin' />
          <span>Please wait while we save your settings.</span>
        </div>
      ),
    });
    const { data: updatedRecruiter, error } = await supabase
      .from('recruiter')
      .update({ scheduling_settings: schedulingSettingObj })
      .eq('id', recruiter.id)
      .select(
        '*,office_locations(*), departments(id,name), recruiter_preferences(*)',
      )
      .single();
    if (!error) {
      setRecruiter({
        ...updatedRecruiter,
        socials: updatedRecruiter?.socials,
      });
    }
    setIsSaving('saved');

    toast({
      title: 'Saved',
      description: 'Settings saved successfully.',
      variant: 'default',
    });
  }

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isSaving === 'saving') {
      setShow(true);
    } else if (isSaving === 'saved') {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [isSaving]);

  const tab = router?.queryParams?.tab as string;

  return {
    isSaving,
    isSaved,
    updateSettings,
    show,
    tab,
    setIsSaving,
  };
};

export const usePortalSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<
    'greetings' | 'about' | 'images' | null
  >(null);

  const [isCoverUploading, setIsCoverUploading] = useState<boolean>(false);
  const [isCoverRemoving, setIsCoverRemoving] = useState<boolean>(false);
  const [isImageRemoving, setIsImageRemoving] = useState<string>(null);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const {
    recruiter: { name },
    recruiter_id,
  } = useAuthDetails();
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
    setIsDialogOpen(null);
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