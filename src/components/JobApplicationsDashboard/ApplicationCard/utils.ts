export const getScoreColor = (finalScore: number) => {
  const green = '#228F67';
  const yellow = '#F79A3E';
  const red = '#D93F4C';
  return finalScore > 33 ? (finalScore > 66 ? green : yellow) : red;
};

export const getStatusColor = (status: string) => {
  const statusColors = {
    applied: {
      color: '#49545C',
      backgroundColor: '#E9EBED',
    },
    interviewing: {
      color: '#1F73B7',
      backgroundColor: '#EDF7FF',
    },
    selected: {
      color: '#0B3B29',
      backgroundColor: '#EDF8F4',
    },
    rejected: {
      color: '#681219',
      backgroundColor: '#FFF0F1',
    },
  };
  // eslint-disable-next-line security/detect-object-injection
  return statusColors[status];
};

export const getInterviewScore = (feedback) => {
  return Math.ceil(
    feedback.reduce((acc, curr) => {
      return (acc += Number(curr.rating));
    }, 0) / feedback.length,
  );
};
