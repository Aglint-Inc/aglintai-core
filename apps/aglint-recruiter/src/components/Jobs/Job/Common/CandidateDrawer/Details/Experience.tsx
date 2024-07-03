/* eslint-disable security/detect-object-injection */
import { Avatar } from '@mui/material';
import Image from 'next/image';

import { CandidateDetail } from '@/devlink/CandidateDetail';
import { ExperienceItem } from '@/devlink/ExperienceItem';
import { ExperienceSkeleton } from '@/devlink/ExperienceSkeleton';
import { Skeleton } from '@/devlink2/Skeleton';
import { GlobalIcon } from '@/devlink3/GlobalIcon';
import { useApplication } from '@/src/context/ApplicationContext';

import { Loader } from '../Common/Loader';
import { getIconName } from '../utils';
import { EmptyDetailState } from './Common/EmptyDetailState';

const Experience = () => {
  return (
    <CandidateDetail
      slotIcon={<GlobalIcon size={5} iconName={getIconName('Experience')} />}
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
    return <EmptyDetailState section='Experience' />;
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
    <ExperienceItem
      key={i}
      slotBadge={
        relevance && relevance[i] === 'high' ? (
          <Image
            src={'/images/badges/experienced.svg'}
            width={16}
            height={16}
            alt=''
          />
        ) : (
          <></>
        )
      }
      slotCompanyLogo={
        <CompanyLogo companyName={org ? org.trim().toLowerCase() : null} />
      }
      textCompanyName={org}
      textDate={timeRange(timeFormat(start), timeFormat(end))}
      textRole={title}
    />
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
    <Avatar
      variant='square'
      sx={{
        bgcolor: 'white.700',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        '& .MuiAvatar-img ': {
          objectFit: 'contain',
          borderRadius: `10px`,
        },
      }}
      style={{ color: 'black' }}
      src={
        companyLogo ||
        `https://logo.clearbit.com/${name.replaceAll(' ', '')}.com `
      }
      alt={name}
    >
      <UnknownCompany />
    </Avatar>
  ) : (
    <Avatar
      variant='square'
      sx={{
        bgcolor: 'white.700',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        '& .MuiAvatar-img ': {
          objectFit: 'contain',
          borderRadius: '10px',
        },
      }}
      style={{ color: 'black' }}
    >
      <UnknownCompany />
    </Avatar>
  );
};

const UnknownCompany = () => {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z'
        fill='#F1F0EF'
      />
      <path
        d='M32.2762 14.069H25.3796C24.9773 14.069 24.6469 14.1983 24.3882 14.4569C24.1296 14.7155 24.0003 15.046 24.0003 15.4483V32C24.0003 32.4023 24.1296 32.7328 24.3882 32.9914C24.6469 33.25 24.9773 33.3793 25.3796 33.3793H32.2762C32.6785 33.3793 33.0089 33.25 33.2675 32.9914C33.5262 32.7328 33.6555 32.4023 33.6555 32V15.4483C33.6555 15.046 33.5262 14.7155 33.2675 14.4569C33.0089 14.1983 32.6785 14.069 32.2762 14.069ZM25.3796 12.6897H32.2762C33.052 12.7184 33.6986 12.9914 34.2158 13.5086C34.7331 14.0259 35.0061 14.6724 35.0348 15.4483V32C35.0061 32.7759 34.7331 33.4224 34.2158 33.9397C33.6986 34.4569 33.052 34.7299 32.2762 34.7586H25.3796C24.6038 34.7299 23.9572 34.4569 23.44 33.9397C22.9227 33.4224 22.6497 32.7759 22.621 32V15.4483C22.6497 14.6724 22.9227 14.0259 23.44 13.5086C23.9572 12.9914 24.6038 12.7184 25.3796 12.6897ZM21.2417 18.2069V19.5862H15.7244C15.3221 19.5862 14.9917 19.7155 14.7331 19.9741C14.4744 20.2328 14.3451 20.5632 14.3451 20.9655V32C14.3451 32.4023 14.4744 32.7328 14.7331 32.9914C14.9917 33.25 15.3221 33.3793 15.7244 33.3793H21.4572C21.6583 33.8966 21.9313 34.3563 22.2762 34.7586H15.7244C14.9486 34.7299 14.302 34.4569 13.7848 33.9397C13.2675 33.4224 12.9946 32.7759 12.9658 32V20.9655C12.9946 20.1897 13.2675 19.5431 13.7848 19.0259C14.302 18.5086 14.9486 18.2356 15.7244 18.2069H21.2417ZM16.7589 26.4828H18.8279C19.4601 26.5402 19.8049 26.8851 19.8624 27.5172V29.5862C19.8049 30.2184 19.4601 30.5632 18.8279 30.6207H16.7589C16.1267 30.5632 15.7819 30.2184 15.7244 29.5862V27.5172C15.7819 26.8851 16.1267 26.5402 16.7589 26.4828ZM17.1038 29.2414H18.4831V27.8621H17.1038V29.2414ZM26.7589 29.5862V27.5172C26.8164 26.8851 27.1612 26.5402 27.7934 26.4828H29.8624C30.4946 26.5402 30.8394 26.8851 30.8969 27.5172V29.5862C30.8394 30.2184 30.4946 30.5632 29.8624 30.6207H27.7934C27.1612 30.5632 26.8164 30.2184 26.7589 29.5862ZM28.1382 29.2414H29.5175V27.8621H28.1382V29.2414ZM16.7589 20.9655H18.8279C19.4601 21.023 19.8049 21.3678 19.8624 22V24.069C19.8049 24.7011 19.4601 25.046 18.8279 25.1034H16.7589C16.1267 25.046 15.7819 24.7011 15.7244 24.069V22C15.7819 21.3678 16.1267 21.023 16.7589 20.9655ZM17.1038 23.7241H18.4831V22.3448H17.1038V23.7241ZM26.7589 16.4828C26.8164 15.8506 27.1612 15.5057 27.7934 15.4483H29.8624C30.4946 15.5057 30.8394 15.8506 30.8969 16.4828V18.5517C30.8394 19.1839 30.4946 19.5287 29.8624 19.5862H27.7934C27.1612 19.5287 26.8164 19.1839 26.7589 18.5517V16.4828ZM28.1382 16.8276V18.2069H29.5175V16.8276H28.1382ZM27.7934 25.1034C27.1612 25.046 26.8164 24.7011 26.7589 24.069V22C26.8164 21.3678 27.1612 21.023 27.7934 20.9655H29.8624C30.4946 21.023 30.8394 21.3678 30.8969 22V24.069C30.8394 24.7011 30.4946 25.046 29.8624 25.1034H27.7934ZM28.1382 22.3448V23.7241H29.5175V22.3448H28.1382Z'
        fill='#82827C'
      />
    </svg>
  );
};

const timeRange = (startDate: string, endDate: string) => {
  return `${startDate ?? ''} ${startDate && endDate ? '-' : ''} ${
    endDate ?? ''
  }`;
};

const timeFormat = (
  obj: { year: number; month: number },
  isEndDate: boolean = false,
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
