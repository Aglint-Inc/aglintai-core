import { schedulingSettingType } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { supabase } from '@/utils/supabase/client';

import {
  generateDepartments,
  generateRoles,
  generateSpecialities,
} from './utils';

export const useCompanyDetailComp = () => {
  const router = useRouter();
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

  useEffect(() => {
    if (router.isReady && !router.query?.tab) {
      router.replace('/company?tab=company-info');
    }
  }, [router]);

  useEffect(() => {
    if (!isSaved && isSaving) setIsSaved(true);
  }, [isSaving]);

  async function updateSettings(schedulingSettingObj: schedulingSettingType) {
    setIsSaving('saving');
    const { data: updatedRecruiter, error } = await supabase
      .from('recruiter')
      .update({ scheduling_settings: schedulingSettingObj })
      .eq('id', recruiter.id)
      .select(
        '*,office_locations(*), departments(id,name), recruiter_preferences(*)',
      )
      .single();
    if (!error) {
      setRecruiter(
        {
          ...updatedRecruiter,
          socials: updatedRecruiter?.socials,
        }!,
      );
    }
    setIsSaving('saved');
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

  const tab = router?.query?.tab as string;

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

  const queryClient = useQueryClient();
  const {
    recruiter: { name },
    recruiter_id,
  } = useAuthDetails();
  const fetchPortalSettings = async () => {
    return (
      await supabase
        .from('recruiter_preferences')
        .select('banner_image,company_images,greetings')
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
    try {
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
    } catch {
      //
    }
  };

  const updateImages = async (
    images: File[],
    setSelectedImages: Dispatch<SetStateAction<File[]>>,
  ) => {
    try {
      const newImages = [];
      for (let image of images) {
        const fileName = `${name}-${recruiter_id}-${Date.now()}`;

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

      await updatePortalSetting({
        ...query.data,
        company_images: [...query.data.company_images, ...newImages],
      });
      setSelectedImages([]);
    } catch (error) {
      console.error('Error uploading images: ', error.message);
      return null;
    }
  };

  return {
    ...query,
    updatePortalSetting,
    updateImages,
    setIsDialogOpen,
    isDialogOpen,
  };
};
