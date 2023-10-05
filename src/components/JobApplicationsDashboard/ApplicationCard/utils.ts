export const getScoreColor = (finalScore: number) => {
  return finalScore >= 90
    ? '#228F67'
    : finalScore >= 70
    ? '#f79a3e'
    : finalScore >= 50
    ? '#de701d'
    : '#d93f4c';
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
  return feedback.length > 0
    ? Math.floor(
        feedback.reduce((acc, curr) => {
          return (acc += Number(curr.rating));
        }, 0) / feedback.length,
      )
    : 0;
};
