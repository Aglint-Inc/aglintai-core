/* eslint-disable security/detect-object-injection */
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getOverallResumeScore } from '@/src/utils/support/supportUtils';

export const scoreWheelDependencies = {
  initialScoreWheelScores: {
    skills: 100,
    experience: 100,
    education: 100,
  } as ScoreWheelParams,
  initialScoreWheelWeights: {
    skills: 33,
    experience: 34,
    education: 33,
  } as ScoreWheelParams,
  wheelColors: ['bg-purple-500', 'bg-cyan-500', 'bg-blue-500'],
  parameterOrder: ['skills', 'experience', 'education'],
};

export type ScoreWheelParams = {
  skills: number;
  experience: number;
  education: number;
};

const ScoreWheel = ({
  id,
  scores,
  parameter_weights,
  fontSize = 14,
}: {
  id: string;
  scores?: ScoreWheelParams;
  parameter_weights: ScoreWheelParams;
  fontSize?: number;
}) => {
  const isSettings = scores === undefined;
  const [delay, setDelay] = useState(0);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const jdScore = !isSettings ? scores : null;
  const newScore = {
    ...scoreWheelDependencies.initialScoreWheelScores,
    ...jdScore,
  };

  useEffect(() => {
    if (delay === 100) return;

    const timer = setTimeout(() => {
      setDelay((prev) => (prev > 100 ? prev - 2 : prev + 2));
    }, 10);

    return () => clearTimeout(timer);
  }, [delay]);

  const overallScore = !isSettings
    ? getOverallResumeScore(scores, parameter_weights)
    : 0;

  return (
    <Card
      id={id}
      className='w-full aspect-square rounded-full flex items-center justify-center relative'
    >
      {scoreWheelDependencies.parameterOrder.map((key, index) => (
        <Progress
          key={key}
          value={(parameter_weights[key] * newScore[key] * delay) / 100}
          className={`absolute inset-0 -rotate-90 ${scoreWheelDependencies.wheelColors[index]}`}
          onMouseEnter={() => setHoverKey(key)}
          onMouseLeave={() => setHoverKey(null)}
        />
      ))}
      <div className='w-4/5 aspect-square rounded-full bg-white flex flex-col items-center justify-center text-center'>
        <div className={`text-[${fontSize * 2}px] font-semibold`}>
          {isSettings
            ? hoverKey
              ? `${parameter_weights[hoverKey]}%`
              : '100%'
            : `${
                hoverKey
                  ? Math.trunc(
                      (parameter_weights[hoverKey] * newScore[hoverKey]) / 100,
                    )
                  : overallScore
              }`}
        </div>
        <div className={`text-[${fontSize}px]`}>
          {isSettings
            ? hoverKey
              ? capitalize(hoverKey)
              : 'Complete'
            : hoverKey
              ? capitalize(hoverKey)
              : 'Overall Score'}
        </div>
      </div>
    </Card>
  );
};

export default ScoreWheel;
