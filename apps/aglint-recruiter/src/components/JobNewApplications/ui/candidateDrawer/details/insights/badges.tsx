/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import Image from 'next/image';
import { ReactNode } from 'react';

import { Badge as BadgeDev } from '@/devlink/Badge';
import { Skeleton } from '@/devlink2/Skeleton';
import { useApplication } from '@/src/context/ApplicationContext';
import { ApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { BADGE_CONSTANTS } from '@/src/queries/job-applications';

import { Loader } from '../../common';

const Badges = () => {
  return (
    <Stack style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      <Content />
    </Stack>
  );
};

export { Badges };

const Content = () => {
  const {
    meta: { data, status },
  } = useApplication();
  if (status === 'pending')
    return (
      <Loader count={10}>
        <Stack style={{ position: 'relative', width: '70px', height: '20px' }}>
          <Skeleton />
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
  [id in ApplicationsStore['filters']['badges'][number]]: ReactNode;
} = {
  careerGrowth: <Ambitious />,
  jobStability: <Reliable />,
  leadership: <Leader />,
  jobHopping: <JobHopper />,
  positions: <Experienced />,
  schools: <Knowledgable />,
  skills: <Skilled />,
};
