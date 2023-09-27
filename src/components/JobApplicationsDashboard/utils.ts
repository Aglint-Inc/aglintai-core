import { JobApplication } from '@/src/context/JobApplicationsContext/types';

export const capitalize = (str: string) => {
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

export const getApplicantCount = (applications: JobApplication[]) => {
  return applications.reduce(
    (acc, curr) => {
      return { ...acc, [curr.status]: acc[curr.status] + 1, all: acc.all + 1 };
    },
    {
      all: 0,
      applied: 0,
      screening: 0,
      shortlisted: 0,
      selected: 0,
    },
  );
};
