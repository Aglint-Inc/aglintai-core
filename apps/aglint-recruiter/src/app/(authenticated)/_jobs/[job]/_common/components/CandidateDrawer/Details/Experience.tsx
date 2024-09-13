/* eslint-disable security/detect-object-injection */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { CandidateDetail } from '@devlink/CandidateDetail';
import { ExperienceSkeleton } from '@devlink/ExperienceSkeleton';
import { Briefcase, Building2 } from 'lucide-react';
import Image from 'next/image';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { useApplication } from '@/context/ApplicationContext';

import { Loader } from '../Common/Loader';

const Experience = () => {
  return (
    <CandidateDetail
      slotIcon={<Briefcase size={16} />}
      slotBody={<Content />}
      textTitle={'Experience'}
      slotBadge={<></>}
    />
  );
};

export { Experience };

const Content = () => {
  const {
    details: { data, status },
  } = useApplication();
  if (status === 'pending')
    return (
      <Loader count={3}>
        <ExperienceSkeleton slotLoader={<Skeleton />} />
      </Loader>
    );
  if (
    !(
      (data?.resume_json?.positions ?? []).length &&
      data?.score_json?.relevance?.positions
    )
  )
    return (
      <GlobalEmpty
        iconSlot={<Briefcase className='text-gray-500' />}
        text={'No experience found'}
      />
    );
  return <Experiences />;
};

const Experiences = () => {
  const {
    details: {
      data: {
        resume_json: { positions },
        score_json: {
          relevance: { positions: relevance },
        },
      },
    },
  } = useApplication();
  return positions.map(({ org, start, end, title }, i) => (
    <Card key={i} className='mb-4'>
      <CardHeader className='flex flex-row items-center space-x-4'>
        <div className='flex-shrink-0'>
          <CompanyLogo companyName={org ? org.trim().toLowerCase() : null} />
        </div>
        <div className='flex-grow'>
          <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
          <CardDescription>{org}</CardDescription>
        </div>
        {relevance && relevance[i] === 'high' && (
          <div className='flex-shrink-0'>
            <Image
              src={'/images/badges/experienced.svg'}
              width={16}
              height={16}
              alt='Experienced badge'
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-500'>
          {timeRange(timeFormat(start), timeFormat(end))}
        </p>
      </CardContent>
    </Card>
  ));
};

const CompanyLogo = ({
  companyLogo,
  companyName,
}: {
  companyLogo?: string;
  companyName: string;
}) => {
  const name =
    typeof companyName === 'string' ? companyName.toLowerCase().trim() : '';
  return name && !(name.includes('pvt') || name.includes('ltd')) ? (
    <div className='w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden'>
      <Image
        src={
          companyLogo ||
          `https://logo.clearbit.com/${name.replaceAll(' ', '')}.com`
        }
        alt={name}
        width={48}
        height={48}
        className='object-contain'
      />
    </div>
  ) : (
    <div className='w-12 h-12 rounded-lg bg-white flex items-center justify-center'>
      <Building2 className='w-6 h-6 text-gray-500' />
    </div>
  );
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
