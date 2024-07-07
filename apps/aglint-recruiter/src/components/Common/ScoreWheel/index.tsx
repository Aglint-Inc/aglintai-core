/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

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
  wheelColors: ['#886BD8', '#30AABC', '#5D7DF5'],
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
  scores?: DatabaseTable['applications']['score_json']['scores'];
  parameter_weights: ScoreWheelParams;
  fontSize?: number;
}) => {
  const isSettings = scores === undefined;
  const [delay, setDelay] = useState(0);
  const [degree, setDegree] = useState(null);
  const jdScore = !isSettings ? (scores as ScoreWheelParams) : null;
  const newScore = {
    ...scoreWheelDependencies.initialScoreWheelScores,
    ...jdScore,
  };
  const { conicGradient, hoverKey, unused } = getStyles(
    delay,
    parameter_weights,
    newScore,
    degree,
  );
  useEffect(() => {
    if (delay === 100) {
      return;
    }
    if (delay > 100) {
      const timer = setTimeout(() => {
        setDelay((prev) => prev - 2);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDelay((prev) => prev + 2);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  const overallScore = !isSettings
    ? getOverallResumeScore(scores, parameter_weights)
    : 0;
  return (
    <>
      <Stack
        id={id}
        width={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={'50%'}
        sx={{
          aspectRatio: 1,
          background: `conic-gradient(${conicGradient})`,
        }}
        onMouseMove={(e) => {
          setDegree(getCursorDegrees(e, id));
        }}
        onMouseOut={() => {
          setDegree(null);
        }}
        style={{ cursor: 'pointer' }}
      >
        <Stack
          width={'80%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={'50%'}
          textAlign={'center'}
          sx={{
            aspectRatio: 1,
            backgroundColor: 'var(--white)',
          }}
          style={{
            color:
              isSettings &&
              (hoverKey === null || hoverKey === 'unused') &&
              unused.isUnused
                ? 'red'
                : 'black',
          }}
        >
          <Stack
            fontSize={`${fontSize}px`}
            sx={{ transform: 'translateY(2px)' }}
          >
            <Stack fontSize={'200%'} sx={{ fontWeight: 600 }}>
              {isSettings
                ? hoverKey
                  ? `${parameter_weights[hoverKey] ?? unused.count}%`
                  : unused.isUnused
                    ? `${unused.count}%`
                    : '100%'
                : `${
                    hoverKey
                      ? Math.trunc(
                          (parameter_weights[hoverKey] * jdScore[hoverKey]) /
                            100,
                        )
                      : overallScore
                  }`}
            </Stack>
            {isSettings
              ? hoverKey
                ? capitalize(hoverKey)
                : unused.isUnused
                  ? 'Unused'
                  : 'Complete'
              : hoverKey
                ? capitalize(hoverKey)
                : 'Overall Score'}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

const getStyles = (
  delay: number,
  weights: ScoreWheelParams,
  score: ScoreWheelParams,
  degree?: number,
) => {
  const lightColors = ['#e7e1f7', '#d6eef2', '#dfe5fd'];
  const disabledColor = '#e9ebed';
  const unusedColor = '#ddd';
  const count = Object.keys(weights).length;
  let hoverKey = null;
  const conicGradientObj = scoreWheelDependencies.parameterOrder.reduce(
    (acc, key, i) => {
      const startDegree = acc.start;
      let scoreDegree =
        acc.start + (3.6 * weights[key] * score[key] * delay) / 10000;
      const unused = acc.unused - weights[key];
      const endDegree = acc.start + 3.6 * weights[key];
      if (scoreDegree > endDegree - 1) scoreDegree = endDegree - 1;
      else if (scoreDegree < startDegree + 1) scoreDegree = startDegree + 1;
      const isDisabled = getDisabledState(degree, startDegree, endDegree);
      hoverKey = isDisabled && degree !== null ? key : hoverKey;
      const currentDarkColor = isDisabled
        ? scoreWheelDependencies.wheelColors[
            i % scoreWheelDependencies.wheelColors.length
          ]
        : disabledColor;
      const currentLightColor = isDisabled
        ? lightColors[i % scoreWheelDependencies.wheelColors.length]
        : disabledColor;
      let newConicGradient =
        acc.conicGradient +
        `white ${startDegree + 1}deg, ${currentDarkColor} ${
          startDegree + 1
        }deg, ${currentDarkColor} ${scoreDegree}deg, ${currentLightColor} ${scoreDegree}deg, ${currentLightColor} ${
          endDegree - 1
        }deg, white ${endDegree - 1}deg, `;
      const newStart = endDegree;
      if (i === count - 1 && newStart !== 360) {
        const isUnusedHover = getDisabledState(degree, endDegree, 360);
        hoverKey = isUnusedHover && degree !== null ? 'unused' : hoverKey;
        newConicGradient += `white ${newStart + 1}deg, ${
          isUnusedHover ? unusedColor : disabledColor
        } ${startDegree + 1}deg,  ${
          isUnusedHover ? unusedColor : disabledColor
        } ${359}deg, white ${359}deg, `;
      }
      return {
        conicGradient: newConicGradient,
        start: newStart,
        unused: unused,
      };
    },
    { conicGradient: '', start: 0, unused: 100 },
  );
  return {
    lightColors,
    disabledColor,
    count,
    hoverKey,
    conicGradient: conicGradientObj.conicGradient.replace(
      /(^\s*,)|(,\s*$)/g,
      '',
    ),
    unused: {
      count: conicGradientObj.unused,
      isUnused: conicGradientObj.unused !== 0,
    },
  };
};

const getDisabledState = (degree: number, start: number, end: number) => {
  return degree === null || (degree <= end && degree >= start);
};

const getCursorDegrees = (e: any, id: string) => {
  const div = document.getElementById(id);
  const coords = div.getBoundingClientRect();
  const center = {
    x: coords.left + coords.width / 2,
    y: coords.top + coords.height / 2,
  };
  const x = e.clientX - center.x;
  const y = center.y - e.clientY;
  const radians = Math.atan2(y, x);
  const degrees = 90 - radians * (180 / Math.PI);
  const correctedDegrees = degrees < 0 ? 360 + degrees : degrees;
  return correctedDegrees;
};

export default ScoreWheel;
