'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';

import CompanySlider from './companySlider';

export default function CompanyTabs({
  companyImages,
  aboutContent,
  job,
}: {
  companyImages: any;
  aboutContent: any;
  job: any;
}) {
  return (
    <Tabs defaultValue='about' className='p-8'>
      <TabsList className='mb-4'>
        <TabsTrigger value='about'>About</TabsTrigger>
        <TabsTrigger value='job-description'>Job description</TabsTrigger>
      </TabsList>
      <TabsContent value='about'>
        <h2 className='mb-4 text-xl font-semibold'>About us</h2>
        <div
          className='rich-text-content'
          dangerouslySetInnerHTML={{ __html: aboutContent }}
        />
        {companyImages.length > 0 && (
          <div className='relative mt-8'>
            <CompanySlider slides={companyImages} />
          </div>
        )}
      </TabsContent>
      <TabsContent value='job-description'>
        <h2 className='mb-4 text-xl font-semibold'>{job.name}</h2>
        <div
          className='rich-text-content'
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </TabsContent>
    </Tabs>
  );
}
