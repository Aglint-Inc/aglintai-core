/* eslint-disable security/detect-object-injection */
import { ScoringParam } from "../resultParser";
import { ResumeJson } from "../types";
import { getFinalScore } from "../util";

export const candidateInsights = (
  resultObj: ScoringParam,
  resumeJson: ResumeJson
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

const relevantSkills = (skills: ScoringParam["skills"]) => {
  if (skills && Object.keys(skills).length !== 0) {
    return Object.values(skills.list).reduce((acc, curr) => {
      if (curr === "high") acc += 1;
      return acc;
    }, 0);
  }
  return 0;
};

const relevantEntry = (entries: ScoringParam["schools"]) => {
  if (entries && entries.length !== 0) {
    return entries.filter((e) => e.rating === "high").length;
  }
  return 0;
};

const leadershipSkills = (
  entries: ScoringParam["positions"],
  positions: ResumeJson["positions"]
) => {
  const leadershipParams = {
    levels: { low: 25, medium: 50, high: 100 },
    rFactor: 0.82,
  };
  if (entries && entries.length !== 0) {
    const seniorRoles = entries.reduce((acc, curr) => {
      const level = positions[curr.index].level;
      if (level === "Senior-level" || level === "Executive-level")
        acc.push(curr);
      return acc;
    }, [] as ScoringParam["positions"]);
    const count = entries.length;
    const { score, duration } = seniorRoles.reduce(
      (acc, curr) => {
        const positionObj = positions[curr.index];
        const duration = getDuration(positionObj.start, positionObj.end);
        if (curr.rating === "high")
          return {
            score:
              acc.score +
              getFinalScore(
                leadershipParams.levels.high,
                duration,
                leadershipParams.rFactor
              ),
            duration: acc.duration + duration,
          };
        if (curr.rating === "medium")
          return {
            score:
              acc.score +
              getFinalScore(
                leadershipParams.levels.medium,
                duration,
                leadershipParams.rFactor
              ),
            duration: acc.duration + duration,
          };
        if (curr.rating === "low")
          return {
            score:
              acc.score +
              getFinalScore(
                leadershipParams.levels.low,
                duration,
                leadershipParams.rFactor
              ),
            duration: acc.duration + duration,
          };

        return acc;
      },
      { score: 0, duration: 0 }
    );
    return seniorRoles.length !== 0 && duration >= 24
      ? Math.trunc(getFinalScore(score / count, count, 0.4))
      : 0;
  }
  return 0;
};

const getDuration = (
  start: ResumeJson["positions"][0]["start"],
  end: ResumeJson["positions"][0]["end"],
  customDuration: number = 12
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
    return customDuration;
  }
};

const jobStability = (
  entries: ScoringParam["positions"],
  positions: ResumeJson["positions"]
) => {
  const jobStabilityParams = {
    levels: { low: 80, medium: 90, high: 100 },
  };
  if (entries && entries.length !== 0) {
    const len = entries.length;
    const { score, duration } = positions.reduce(
      (acc, curr, i) => {
        const duration = getDuration(curr.start, curr.end);
        const relevanceFactor =
          jobStabilityParams.levels[entries[i].rating] / 100;
        switch (curr.level) {
          case "Fresher-level":
            return {
              score:
                acc.score + getFinalScore(65 * relevanceFactor, duration, 0.93),
              duration: acc.duration + duration,
            };
          case "Associate-level":
            return {
              score:
                acc.score + getFinalScore(80 * relevanceFactor, duration, 0.93),
              duration: acc.duration + duration,
            };
          case "Mid-level":
            return {
              score:
                acc.score + getFinalScore(90 * relevanceFactor, duration, 0.93),
              duration: acc.duration + duration,
            };
          case "Senior-level":
            return {
              score:
                acc.score + getFinalScore(95 * relevanceFactor, duration, 0.93),
              duration: acc.duration + duration,
            };
          case "Executive-level":
            return {
              score:
                acc.score +
                getFinalScore(100 * relevanceFactor, duration, 0.93),
              duration: acc.duration + duration,
            };
        }
        return acc;
      },
      { score: 0, duration: 0 }
    );
    const progressionScore = getFinalScore(score / len, len, 0.4);
    return duration >= 24 ? Math.trunc(progressionScore) : 0;
  }
  return 0;
};

const careerGrowth = (
  entries: ScoringParam["positions"],
  positions: ResumeJson["positions"]
) => {
  if (entries && entries.length !== 0) {
    const careerProgressionParams = {
      levels: { low: 60, medium: 80, high: 100 },
    };
    const {
      score: switchingScore,
      duration,
      promotion,
    } = positions.reduce(
      (acc, curr, i) => {
        const duration = getDuration(curr.start, curr.end, 24);
        const relevanceFactor =
          careerProgressionParams.levels[entries[i].rating] / 100;
        switch (curr.level) {
          case "Fresher-level":
            return {
              score: acc.score + 1 * relevanceFactor,
              duration: acc.duration + duration,
              promotion: { ...acc.promotion, [curr.level]: true },
            };
          case "Associate-level":
            return {
              score: acc.score + 1.5 * relevanceFactor,
              duration: acc.duration + duration,
              promotion: { ...acc.promotion, [curr.level]: true },
            };
          case "Mid-level":
            return {
              score: acc.score + 2 * relevanceFactor,
              duration: acc.duration + duration,
              promotion: { ...acc.promotion, [curr.level]: true },
            };
          case "Senior-level":
            return {
              score: acc.score + 2.5 * relevanceFactor,
              duration: acc.duration + duration,
              promotion: { ...acc.promotion, [curr.level]: true },
            };
          case "Executive-level":
            return {
              score: acc.score + 3 * relevanceFactor,
              duration: acc.duration + duration,
              promotion: { ...acc.promotion, [curr.level]: true },
            };
          default:
            return {
              score: acc.score,
              duration: acc.duration + duration,
              promotion: acc.promotion,
            };
        }
      },
      {
        score: 0,
        duration: 0,
        promotion: {
          "Fresher-level": false,
          "Associate-level": false,
          "Mid-level": false,
          "Senior-level": false,
          "Executive-level": false,
        },
      }
    );
    const score = Object.entries(promotion).reduce((acc, [key, value]) => {
      if (value) {
        switch (key) {
          case "Fresher-level":
            acc += 0;
            break;
          case "Associate-level":
            acc += 2;
            break;
          case "Mid-level":
            acc += 4;
            break;
          case "Senior-level":
            acc += 6;
            break;
          case "Executive-level":
            acc += 8;
            break;
        }
      }
      return acc;
    }, switchingScore);
    const progressionScore =
      90 - Math.atan2(duration / 24, score) * (180 / Math.PI);
    return duration >= 24 ? Math.trunc((progressionScore * 100) / 90) : 0;
  }
  return 0;
};
