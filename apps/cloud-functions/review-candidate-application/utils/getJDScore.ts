export function getJdScore(data: any) {
  return Object.entries(data.qualification).reduce(
    (acc, [key, value]: any) => {
      const relationScore =
        value.isRelated.reduce((acc: any, curr: any) => {
          return curr && acc !== 5 ? acc + 1 : acc;
        }, 0) * 10;
      const relevanceScore =
        value.relevance === 'less match'
          ? 0
          : value.relevance === 'average match'
          ? 25
          : 50;
      return { ...acc, [key]: relationScore + relevanceScore };
    },
    {
      skills: data.skills_score ? data.skills_score * 100 : 0,
    }
  );
}

export const getOverallResumeScore = (
  jd_score: any,
  parameter_weights: any
) => {
  return Math.trunc(
    Object.keys(parameter_weights).reduce((acc, curr) => {
      acc += (jd_score[curr] * parameter_weights[curr]) / 100;
      return acc;
    }, 0)
  );
};
