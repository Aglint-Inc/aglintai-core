/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import Image from 'next/image';
import { ReactNode } from 'react';

import { Badge as BadgeDev } from '@/devlink/Badge';
import { useApplication } from '@/src/context/ApplicationContext';
import { ApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { BADGE_CONSTANTS } from '@/src/queries/job-applications';

const Badges = () => {
  const {
    application: { data, status },
  } = useApplication();
  if (status === 'pending') return <>Loading...</>;
  const badges = Object.entries(data.score_json.badges).reduce(
    (acc, [key, value]) => {
      if (value > BADGE_CONSTANTS[key]) acc.push(BADGE_ICONS[key]);
      return acc;
    },
    [] as ReactNode[],
  );
  return (
    <Stack style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {badges}
    </Stack>
  );
};

export { Badges };

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
