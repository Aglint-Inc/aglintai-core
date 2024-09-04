import { schedulingSettingType } from '@aglint/shared-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

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
