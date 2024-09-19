'use client';

import React from 'react';

import { usePortalSettings } from '../../hooks/hook';
import CandidatePoratlSettingsSkeleton from './components/CandidatePoratlSettingsSkeleton';
import ConfigureCandidateGreeting from './components/ConfigureCandidateGreeting';
import ConfigureCompanyEdit from './components/ConfigureCompanyEdit';
import { ConfigureCoverImage } from './components/ConfigureCoverImage';
import { ConfigureSliderImages } from './components/ConfigureSliderImages';

function CandidatePortalSettings() {
  const { isPending } = usePortalSettings();
  if (isPending) return <CandidatePoratlSettingsSkeleton />;
  return (
    <div className='flex flex-col gap-8 p-4 pb-32 pl-6'>
      <ConfigureCoverImage />
      <ConfigureCandidateGreeting />
      <ConfigureCompanyEdit />
      <ConfigureSliderImages />
    </div>
  );
}

export default CandidatePortalSettings;
