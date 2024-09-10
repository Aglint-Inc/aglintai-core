/* eslint-disable security/detect-object-injection */
import { Skeleton } from '@components/ui/skeleton';
import { Badge as BadgeDev } from '@devlink/Badge';
import { Stack } from '@mui/material';
import Image from 'next/image';
import { type ReactNode } from 'react';

import { useApplication } from '@/context/ApplicationContext';
import type { ApplicationsParams } from '@/job/hooks/useApplicationParams';
import { BADGE_CONSTANTS } from '@/queries/job-applications';

import { Loader } from '../../Common/Loader';

export const Badges = () => {
  return (
    <Stack style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      <Content />
    </Stack>
  );
};

const Content = () => {
  const {
    meta: { data, status },
  } = useApplication();
  if (status === 'pending')
    return (
      <Loader count={10}>
        <Stack style={{ position: 'relative', width: '70px', height: '20px' }}>
          <Skeleton className='h-10 w-full' />
        </Stack>
      </Loader>
    );
  return Object.entries(data?.badges ?? {}).reduce((acc, [key, value]) => {
    if (value > BADGE_CONSTANTS[key]) acc.push(BADGE_ICONS[key]);
    return acc;
  }, [] as ReactNode[]);
};

const Leader = () => (
  <BadgeDev
    isIcon={true}
    slotIcon={
      <Image src={'/images/badges/leader.svg'} width={16} height={16} alt='' />
    }
    text={'Leader'}
  />
);

const Ambitious = () => (
  <BadgeDev
    isIcon={true}
    slotIcon={
      <Image
        src={'/images/badges/ambitious.svg'}
        width={16}
        height={16}
        alt=''
      />
    }
    text={'Ambitious'}
  />
);

const Reliable = () => (
  <BadgeDev
    isIcon={true}
    slotIcon={
      <Image
        src={'/images/badges/ambitious.svg'}
        width={16}
        height={16}
        alt=''
      />
    }
    text={'Ambitious'}
  />
);

const JobHopper = () => (
  <BadgeDev
    isIcon={true}
    slotIcon={
      <Image
        src={'/images/badges/jobhopper.svg'}
        width={16}
        height={16}
        alt=''
      />
    }
    text={'Job Hopper'}
  />
);

const Skilled = () => (
  <BadgeDev
    isIcon={true}
    slotIcon={
      <Image src={'/images/badges/skilled.svg'} width={16} height={16} alt='' />
    }
    text={'Skilled'}
  />
);

const Experienced = () => (
  <BadgeDev
    isIcon={true}
    slotIcon={
      <Image
        src={'/images/badges/experienced.svg'}
        width={16}
        height={16}
        alt=''
      />
    }
    text={'Experienced'}
  />
);

const Knowledgable = () => (
  <BadgeDev
    isIcon={true}
    slotIcon={
      <Image
        src={'/images/badges/knowledgable.svg'}
        width={16}
        height={16}
        alt=''
      />
    }
    text={'Knowledgable'}
  />
);

export const BADGE_ICONS: {
  // eslint-disable-next-line no-unused-vars
  [id in ApplicationsParams['filters']['badges'][number]]: ReactNode;
} = {
  careerGrowth: <Ambitious />,
  jobStability: <Reliable />,
  leadership: <Leader />,
  jobHopping: <JobHopper />,
  positions: <Experienced />,
  schools: <Knowledgable />,
  skills: <Skilled />,
};
