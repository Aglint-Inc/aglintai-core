'use client';

import { usePortalSettings } from '../../hooks/hook';
import AboutCompany from './AboutCompany';
import CandidateGreeting from './CandidateGreeting';
import { CoverImage } from './CoverImage';
import { SliderImages } from './SliderImages';
import CandidatePoratlSettingsSkeleton from './ui/skeleton/CandidatePoratlSettingsSkeleton';

function CandidatePortalSettings() {
  const { isPending } = usePortalSettings();
  if (isPending) return <CandidatePoratlSettingsSkeleton />;
  return (
    <div className='flex flex-col gap-5'>
      <CoverImage />
      <CandidateGreeting />
      <AboutCompany />
      <SliderImages />
    </div>
  );
}

export default CandidatePortalSettings;
