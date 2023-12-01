/* eslint-disable security/detect-object-injection */
import { ScoringParam } from '../resultParser';
import { ResumeJson } from '../types';
import { getFinalScore } from '../utils';

export const candidateInsights = (
  resultObj: ScoringParam,
  resumeJson: ResumeJson,
) => {
  return {
    skills: relevantSkills(resultObj.skills),
    schools: relevantEntry(resultObj.schools),
    positions: relevantEntry(resultObj.positions),
    leadership: leadershipSkills(resultObj.positions, resumeJson.positions),
    jobStability: jobStability(resultObj.positions, resumeJson.positions),
    careerGrowth: careerGrowth(resultObj.positions, resumeJson.positions),
  };
};

const relevantSkills = (skills: ScoringParam['skills']) => {
  if (skills) {
    return Object.values(skills.list).reduce((acc, curr) => {
      if (curr === 'high') acc += 1;
      return acc;
    }, 0);
  }
  return 0;
};

const relevantEntry = (entries: ScoringParam['schools']) => {
  if (entries) {
    return entries.filter((e) => e.rating === 'high').length;
  }
  return 0;
};

const leadershipSkills = (
  entries: ScoringParam['positions'],
  positions: ResumeJson['positions'],
) => {
  const leadershipParams = {
    levels: { low: 25, medium: 50, high: 100 },
    rFactor: 0.82,
  };
  if (entries) {
    const seniorRoles = entries.reduce((acc, curr) => {
      const level = positions[curr.index].level;
      if (level === 'Senior-level' || level === 'Executive-level')
        acc.push(curr);
      return acc;
    }, []);
    const count = entries.length;
    const score = seniorRoles.reduce((acc, curr) => {
      const positionObj = positions[curr.index];
      const duration = getDuration(positionObj.start, positionObj.end);
      if (curr.rating === 'high')
        return (
          acc +
          getFinalScore(
            leadershipParams.levels.high,
            duration,
            leadershipParams.rFactor,
          )
        );
      if (curr.rating === 'medium')
        return (
          acc +
          getFinalScore(
            leadershipParams.levels.medium,
            duration,
            leadershipParams.rFactor,
          )
        );
      if (curr.rating === 'low')
        return (
          acc +
          getFinalScore(
            leadershipParams.levels.low,
            duration,
            leadershipParams.rFactor,
          )
        );
    }, 0);
    return seniorRoles.length !== 0
      ? getFinalScore(score / count, count, 0.4)
      : 0;
  }
  return 0;
};

const getDuration = (
  start: ResumeJson['positions'][0]['start'],
  end: ResumeJson['positions'][0]['end'],
) => {
  if (start && end && start.year && end.year) {
    const { newStart, newEnd } =
      start.year <= end.year
        ? { newStart: start, newEnd: end }
        : { newStart: end, newEnd: start };
    const months =
      newStart.month && newEnd.month ? newStart.month - newEnd.month : 0;
    return (newEnd.year - newStart.year) * 12 - months;
  } else {
    return 12;
  }
};

const jobStability = (
  entries: ScoringParam['positions'],
  positions: ResumeJson['positions'],
) => {
  const careerProgressionParams = {
    levels: { low: 60, medium: 80, high: 100 },
  };
  const companies = [];
  const { switches, duration } = positions.reduce(
    (acc, curr, i) => {
      const duration = getDuration(curr.start, curr.end);
      const relevanceFactor =
        careerProgressionParams.levels[entries[i].rating] / 100;
      const currentCompany = curr.org.trim().toLowerCase();
      if (companies.includes(currentCompany)) {
        return {
          switches: acc.switches,
          duration: acc.duration + duration * relevanceFactor,
        };
      } else {
        companies.push(currentCompany);
        return {
          switches: acc.switches + 1,
          duration: acc.duration + duration * relevanceFactor,
        };
      }
    },
    { switches: 0, duration: 0 },
  );
  const progressionScore =
    90 - Math.atan2(switches, duration) * (180 / Math.PI);
  return progressionScore;
};

const careerGrowth = (
  entries: ScoringParam['positions'],
  positions: ResumeJson['positions'],
) => {
  const careerProgressionParams = {
    levels: { low: 60, medium: 80, high: 100 },
  };
  const { score, duration } = positions.reduce(
    (acc, curr, i) => {
      const duration = getDuration(curr.start, curr.end);
      const relevanceFactor =
        careerProgressionParams.levels[entries[i].rating] / 100;
      switch (curr.level) {
        case 'Fresher-level':
          return {
            score: acc.score + 1 * relevanceFactor,
            duration: acc.duration + duration,
          };
        case 'Associate-level':
          return {
            score: acc.score + 2 * relevanceFactor,
            duration: acc.duration + duration,
          };
        case 'Mid-level':
          return {
            score: acc.score + 3 * relevanceFactor,
            duration: acc.duration + duration,
          };
        case 'Senior-level':
          return {
            score: acc.score + 4 * relevanceFactor,
            duration: acc.duration + duration,
          };
        case 'Executive-level':
          return {
            score: acc.score + 5 * relevanceFactor,
            duration: acc.duration + duration,
          };
      }
    },
    { score: 0, duration: 0 },
  );
  const progressionScore = 90 - Math.atan2(duration, score) * (180 / Math.PI);
  return progressionScore;
};
