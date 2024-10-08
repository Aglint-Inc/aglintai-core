/* eslint-disable security/detect-object-injection */
import { Skeleton } from '@components/ui/skeleton';
import { GraduationCap, School } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { EmptyState } from '@/common/EmptyState';

import { useApplicationDetails } from '../../hooks/useApplicationDetails';
import ApplicationDetailAccordion from '../ui/ApplicationDetailAccordian';

const Education = () => {
  return (
    <>
      <ApplicationDetailAccordion
        title='Education'
        Icon={GraduationCap}
        headerSlot={<></>}
      >
        <Content />
      </ApplicationDetailAccordion>
    </>
  );
};

export { Education };

const Content = () => {
  const { data, status } = useApplicationDetails();

  if (status === 'pending')
    return (
      // Updated loading state with shadcn Skeleton
      <div className='space-y-4'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='rounded-md border p-4'>
            <Skeleton className='mb-2 h-6 w-1/3' />
            <Skeleton className='mb-1 h-4 w-1/2' />
            <Skeleton className='h-4 w-1/4' />
          </div>
        ))}
      </div>
    );

  if (
    !(
      (data?.resume_json?.schools ?? []).length &&
      data?.score_json?.relevance?.schools
    )
  )
    return (
      <EmptyState
      header='No education found'
      description="No education was identified from the candidate's resume."
      icon={School}
    />
    );

  return <Schools />;
};

const Schools = () => {
  const {
    data: {
      resume_json: { schools },
      score_json: {
        relevance: { schools: relevance },
      },
    },
  } = useApplicationDetails();

  // Combine schools with their relevance
  const schoolsWithRelevance = schools.map((school, i) => ({
    ...school,
    relevance: relevance[i] || 'low', // Default to 'low' if not specified
  }));

  // Sort schools with 'high' relevance first
  schoolsWithRelevance.sort((a, b) => {
    if (a.relevance === b.relevance) return 0;
    return a.relevance === 'high' ? -1 : 1;
  });

  // List of conjunctions to exclude from capitalization
  const conjunctions = [
    'and',
    'or',
    'but',
    'nor',
    'so',
    'for',
    'yet',
    'the',
    'in',
    'of',
  ];

  // State to control the collapsible
  const [isExpanded] = useState(false);

  // Determine the items to display
  const itemsToShow = isExpanded
    ? schoolsWithRelevance
    : schoolsWithRelevance.slice(0, 3);

  return (
    <>
      {itemsToShow.map(({ institution, degree, start, end }, i) => (
        <div key={i} className='flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-md border bg-white'>
            <ImageWithFallback
              src={`https://logo.clearbit.com/${institution.toLowerCase().replace(/\s+/g, '')}.com`}
              alt={`${institution} logo`}
              fallbackSrc={'/images/default/education.svg'}
              height={30}
              width={30}
            />
          </div>
          <div className='flex w-full flex-row items-center justify-between gap-1'>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-medium'>
                {' '}
                {capitalize(degree, conjunctions)}{' '}
              </span>
              <span className='text-sm text-muted-foreground'>
                {capitalize(institution, conjunctions)}
              </span>
            </div>
            <div className='text-sm text-muted-foreground'>
              {calculateDuration(start, end)} (
              {start.year && start.month && end.year && end.month
                ? timeRange(
                    String(
                      timeFormat({ year: start.year, month: start.month }),
                    ),
                    String(timeFormat({ year: end.year, month: end.month })),
                  )
                : ''}
              )
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Helper function to capitalize words excluding conjunctions
const capitalize = (text: string, conjunctions: string[]) => {
  return text
    .split(' ')
    .map((word) =>
      conjunctions.includes(word.toLowerCase())
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ');
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

// New function to calculate duration
const calculateDuration = (
  start: Record<string, any>,
  end: Record<string, any>,
) => {
  if (!start) return '';

  const startDate = new Date(start.year || 0, (start.month || 1) - 1);
  const endDate = end
    ? new Date(end.year || 0, (end.month || 1) - 1)
    : new Date(); // If end date is not provided, use current date

  let totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  // Ensure totalMonths is not negative
  if (totalMonths < 0) totalMonths = 0;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let duration = '';
  if (years > 0) {
    duration += `${years} year${years > 1 ? 's' : ''}`;
  }
  if (months > 0) {
    if (duration) duration += ' ';
    duration += `${months} month${months > 1 ? 's' : ''}`;
  }
  return duration || 'Less than a month';
};

const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc,
  width,
  height,
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
  width: number;
  height: number;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};
