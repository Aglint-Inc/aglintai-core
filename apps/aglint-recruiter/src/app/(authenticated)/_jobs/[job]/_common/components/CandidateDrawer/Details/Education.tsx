/* eslint-disable security/detect-object-injection */
import { Skeleton } from '@components/ui/skeleton';
import { GraduationCap, School } from 'lucide-react';
import Image from 'next/image';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { useApplication } from '@/context/ApplicationContext';

const Education = () => {
  return (
    <>
      <div className='flex items-center space-x-4'>
        <GraduationCap className='w-4 h-4' />
        <h3 className='text-lg font-semibold'>Education</h3>
      </div>
      <div className='mt-4'>
        <Content />
      </div>
    </>
  );
};

export { Education };

const Content = () => {
  const {
    details: { data, status },
  } = useApplication();
  if (status === 'pending') return <Skeleton />;
  if (
    !(
      (data?.resume_json?.schools ?? []).length &&
      data?.score_json?.relevance?.schools
    )
  )
    return (
      <GlobalEmpty
        iconSlot={<School className='text-gray-500' />}
        text={'No education found'}
      />
    );
  return <Schools />;
};

const Schools = () => {
  const {
    details: {
      data: {
        resume_json: { schools },
        score_json: {
          relevance: { schools: relevance },
        },
      },
    },
  } = useApplication();
  return schools.map(({ institution, start, end, degree }, i) => (
    <div key={i} className='flex items-center space-x-4 mb-4'>
      <div className='flex-shrink-0'>{/* Placeholder for school icon */}</div>
      <div className='flex-grow'>
        <h4 className='text-lg font-semibold'>{degree}</h4>
        <p className='text-sm text-gray-600'>{institution}</p>
        <p className='text-xs text-gray-500'>
          {timeRange(timeFormat(start), timeFormat(end))}
        </p>
      </div>
      <div className='flex-shrink-0'>
        {relevance && relevance[i] === 'high' ? (
          <Image
            src='/images/badges/knowledgable.svg'
            width={16}
            height={16}
            alt='Knowledgeable badge'
            className='w-4 h-4'
          />
        ) : null}
      </div>
    </div>
  ));
};

const timeRange = (startDate: string, endDate: string) => {
  return `${startDate ?? ''} ${startDate && endDate ? '-' : ''} ${
    endDate ?? ''
  }`;
};

const timeFormat = (
  obj: { year: number; month: number },
  isEndDate = false,
) => {
  if (obj) {
    if (obj.month) {
      const date = new Date();
      date.setMonth(obj.month - 1);
      return `${date.toLocaleString('en-US', { month: 'long' })}${
        obj.year ? ` ${obj.year}` : null
      }`;
    } else if (obj.year) return `${obj.year}`;
    else return null;
  } else if (isEndDate) return 'Present';
  else return null;
};
