/* eslint-disable security/detect-object-injection */
import Image from 'next/image';

import { CandidateDetail } from '@/devlink/CandidateDetail';
import { EducationItem } from '@/devlink/EducationItem';
import { ExperienceSkeleton } from '@/devlink/ExperienceSkeleton';
import { Skeleton } from '@/devlink2/Skeleton';
import { GlobalIcon } from '@/devlink3/GlobalIcon';
import { useApplication } from '@/src/context/ApplicationContext';

import { Loader } from '../Common/Loader';
import { getIconName } from '../utils';
import { EmptyDetailState } from './Common/EmptyDetailState';

const Education = () => {
  return (
    <CandidateDetail
      slotIcon={<GlobalIcon size={5} iconName={getIconName('Education')} />}
      slotBody={<Content />}
      textTitle={'Education'}
      slotBadge={<></>}
    />
  );
};

export { Education };

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
      (data?.resume_json?.schools ?? []).length &&
      data?.score_json?.relevance?.schools
    )
  )
    return <EmptyDetailState section='Education' />;
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
    <EducationItem
      key={i}
      slotSchoolIcon={null}
      textEducation={degree}
      textSchool={institution}
      slotBadge={
        relevance && relevance[i] === 'high' ? (
          <Image
            src={'/images/badges/knowledgable.svg'}
            width={16}
            height={16}
            alt=''
          />
        ) : (
          <></>
        )
      }
      textDate={timeRange(timeFormat(start), timeFormat(end))}
    />
  ));
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
