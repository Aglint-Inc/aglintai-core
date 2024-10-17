'use client';
import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';

import AboutCompany from './AboutCompany';
import CandidateGreeting from './CandidateGreeting';
import { CoverImage } from './CoverImage';
import { SliderImages } from './SliderImages';

function CandidatePortalSettings() {
  return (
    <div className='flex w-full flex-col gap-5'>
      <div className='ml-auto'>
        <Popover>
          <PopoverTrigger>
            <Button size={'sm'}>Preview</Button>
          </PopoverTrigger>
          <PopoverContent side='left' align='start' className='w-[1032px] p-4'>
            <iframe
              src='/candidate/home?isPreview=true'
              title='Example Website'
              width='1000'
              height='700'
              style={{ border: 'none' }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <CoverImage />
      <AboutCompany />
      <CandidateGreeting />
      <SliderImages />
    </div>
  );
}

export default CandidatePortalSettings;
