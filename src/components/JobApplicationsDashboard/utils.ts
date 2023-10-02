import { JobApplication } from '@/src/context/JobApplicationsContext/types';

export const capitalize = (str: string) => {
  if (!str) return '';
  const s = str.trim();
  if (s.length !== 0)
    return `${s.charAt(0).toUpperCase()}${s.slice(1, s.length)}`;
};

export const formatTimeStamp = (timeStamp: string) => {
  const date = new Date(timeStamp);
  const creationDate = `${date.getDate()} ${date.toLocaleString('default', {
    month: 'short',
  })} ${date.getFullYear()}`;
  const creationHour = date.getHours();
  const finalHour =
    creationHour % 12 === 0
      ? 12
      : creationHour % 12 < 10
      ? `0${creationHour % 12}`
      : creationHour % 12;
  const creationMinutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const creationTime = `${finalHour}:${creationMinutes} ${
    creationHour < 12 ? 'AM' : 'PM'
  }`;
  return `${creationDate}, ${creationTime}`;
};

export const getInterviewScore = (feedback) => {
  return feedback
    ? Math.ceil(
        feedback.reduce((acc, curr) => {
          return (acc += Number(curr.rating));
        }, 0) / feedback.length,
      )
    : 0;
};

export type FilterParameter = {
  parameter: 'resume_score' | 'interview_score';
  condition: 'eq' | 'neq' | 'lt' | 'le' | 'gt' | 'ge';
  count: number;
};

export const getFilteredApplications = (
  applications: JobApplication[],
  filterParameters: FilterParameter[],
) => {
  return applications.reduce((acc, curr) => {
    filterParameters.map((filter) => {
      if (handleFilterParameter(filter, curr)) acc.push(curr);
    });
    return acc;
  }, []);
};

const handleFilterParameter = (
  filterParameter: FilterParameter,
  application: JobApplication,
) => {
  switch (filterParameter.parameter) {
    case 'resume_score':
      return handleFilterCondition(filterParameter, application.score);

    case 'interview_score':
      return handleFilterCondition(
        filterParameter,
        getInterviewScore(application.feedback),
      );
  }
};

const handleFilterCondition = (
  filterParameter: FilterParameter,
  score: number,
) => {
  switch (filterParameter.condition) {
    case 'eq':
      return score === filterParameter.count;
    case 'ge':
      return score >= filterParameter.count;
    case 'gt':
      return score > filterParameter.count;
    case 'le':
      return score <= filterParameter.count;
    case 'lt':
      return score < filterParameter.count;
    case 'neq':
      return score !== filterParameter.count;
  }
};
