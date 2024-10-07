/* eslint-disable security/detect-object-injection */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'; // Import shadcn Collapsible
import { Skeleton } from '@components/ui/skeleton'; // shadcn Skeleton
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'; // shadcn Table components
import { GraduationCap, School } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { useApplicationDetails } from '../../hooks/useApplicationDetails';

const Education = () => {
  const { data } = useApplicationDetails();

  const schoolLogos = getSchoolLogos(data);

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='education'>
        <AccordionTrigger>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <GraduationCap size={16} className='text-muted-foreground' />
              <span className='font-medium'>Education</span>
            </div>
            {schoolLogos.length > 0 && (
              <div className='flex space-x-1'>{schoolLogos} </div>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Content />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { Education };

const getSchoolLogos = (data: any) => {
  if (!data?.resume_json?.schools) return [];
  const schools: any[] = data.resume_json.schools.slice(0, 3); // Get top 3 schools
  return schools.map((school, i) => (
    <ImageWithFallback
      key={i}
      src={`https://logo.clearbit.com/${school.institution?.toLowerCase().replace(/\s+/g, '')}.com`}
      alt={`${school?.institution || 'Institution'} logo`}
      fallbackSrc={'/images/scoring/education.svg'}
    />
  ));
};

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
      <div className='flex flex-col items-center justify-center p-4'>
        <School className='mb-2 h-12 w-12 text-muted-foreground' />
        <p className='text-sm text-gray-600'>No education found</p>
      </div>
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
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine the items to display
  const itemsToShow = isExpanded
    ? schoolsWithRelevance
    : schoolsWithRelevance.slice(0, 3);

  return (
    <>
      <Table>
        <TableHeader className='bg-gray-100'>
          <TableRow>
            <TableHead className='w-1/4'>Institution</TableHead>
            <TableHead className='w-1/2'>Degree</TableHead>
            <TableHead className='w-1/4'>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemsToShow.map(({ institution, degree, start, end }, i) => (
            <TableRow key={i}>
              <TableCell className='flex w-1/4 items-center space-x-2'>
                <ImageWithFallback
                  src={`https://logo.clearbit.com/${institution.toLowerCase().replace(/\s+/g, '')}.com`}
                  alt={`${institution} logo`}
                  fallbackSrc={'/images/de/education.png'}
                />
                <span>{capitalize(institution, conjunctions)}</span>
              </TableCell>
              <TableCell className='w-1/2'>
                {capitalize(degree, conjunctions)}
              </TableCell>
              <TableCell className='w-1/4'>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {schoolsWithRelevance.length > 3 && (
        <div className='mt-2'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='text-blue-500 hover:underline'
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
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
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={24}
      height={24}
      onError={() => setImgSrc(fallbackSrc)}
      className='rounded-full'
    />
  );
};
