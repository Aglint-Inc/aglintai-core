/* eslint-disable security/detect-object-injection */
import { Skeleton } from '@components/ui/skeleton';
import { CandidateDetail } from '@devlink/CandidateDetail';
import { EducationItem } from '@devlink/EducationItem';
import { ExperienceSkeleton } from '@devlink/ExperienceSkeleton';
import { GraduationCap, School } from 'lucide-react';
import Image from 'next/image';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { useApplication } from '@/context/ApplicationContext';

import { Loader } from '../Common/Loader';

const Education = () => {
  return (
    <CandidateDetail
      slotIcon={<GraduationCap size={16} />}
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
    return <GlobalEmpty iconSlot={<School className='text-gray-500'/>} text={'No education found'}/>;
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
