import { FC } from 'react';

import { CardWithNumber, NoData } from '@/devlink3';
import { useJobDetails } from '@/src/context/JobDashboard';

const TenureAndExpSummary = () => {
  const {
    tenureAndExperience: { data }
  } = useJobDetails();
  if (!data) {
    return (
      <>
        <CardWithNumber isEmpty={true} slotEmpty={<NoData />} />
        <CardWithNumber isEmpty={true} slotEmpty={<NoData />} />
      </>
    );
  }
  return (
    <>
      <Tenure average_tenure={data.average_tenure} />
      <Experience average_experience={data.average_experience} />
    </>
  );
};

const Tenure: FC<{
  average_tenure: number;
}> = ({ average_tenure }) => {
  const years = (average_tenure / 12).toFixed(1);
  return (
    <CardWithNumber
      textDescription={'Average time before switching companies.'}
      textNumber={years}
      textNumberType={'Years'}
      textTitle={'Average Tenure'}
    />
  );
};

const Experience: FC<{ average_experience: number }> = ({
  average_experience
}) => {
  const years = (average_experience / 12).toFixed(1);
  return (
    <CardWithNumber
      textDescription={
        'Average of total full time experience of the candidates'
      }
      textNumber={years}
      textNumberType={'Years'}
      textTitle={'Average Experience'}
    />
  );
};

export default TenureAndExpSummary;
