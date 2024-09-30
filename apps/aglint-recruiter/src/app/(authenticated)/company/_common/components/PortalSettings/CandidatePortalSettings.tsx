'use client';

import { usePortalSettings } from '@/company/hooks/usePortalSettings';

import AboutCompany from './AboutCompany';
import CandidateGreeting from './CandidateGreeting';
import { CoverImage } from './CoverImage';
import { SliderImages } from './SliderImages';
import { useFlags } from '@/company/hooks/useFlags';

function CandidatePortalSettings() {
  return (
    <div className='flex flex-col gap-5'>
      <CoverImage />
      <AboutCompany />
      <CandidateGreeting />

      <SliderImages />
    </div>
  );
}

export default CandidatePortalSettings;
