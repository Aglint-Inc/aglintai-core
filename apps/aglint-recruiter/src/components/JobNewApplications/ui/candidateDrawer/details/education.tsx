/* eslint-disable security/detect-object-injection */
import { CandidateDetail } from '@/devlink/CandidateDetail';
import { EducationItem } from '@/devlink/EducationItem';
import { useApplication } from '@/src/context/ApplicationContext';

const Education = () => {
  const {
    application: { data, status },
  } = useApplication();
  if (status === 'pending') return <>Loading experience ...</>;
  if (
    !(
      (data?.resume?.resume_json?.schools ?? []).length &&
      data?.score_json?.relevance?.schools
    )
  )
    return <></>;
  return (
    <CandidateDetail
      slotBody={<Schools />}
      textTitle={'Education'}
      slotBadge={<></>}
    />
  );
};

export { Education };

const Schools = () => {
  const {
    application: {
      data: {
        resume: {
          resume_json: { schools },
        },
        // score_json: {
        //   relevance: { schools: relevance },
        // },
      },
    },
  } = useApplication();
  return schools.map(({ institution, start, end, degree }, i) => (
    <EducationItem
      key={i}
      slotSchoolIcon={<></>}
      textEducation={degree}
      textSchool={institution}
      //   slotBadge={
      //     relevance && relevance[i] === 'high' ? (
      //       <Image
      //         src={'/images/badges/experienced.svg'}
      //         width={16}
      //         height={16}
      //         alt=''
      //       />
      //     ) : (
      //       <></>
      //     )
      //   }
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
