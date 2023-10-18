/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

const initialScores: ScoreWheelParams = {
  experience: 100,
  education: 100,
  projects: 100,
  certifications: 100,
  skills: 100,
};

export type ScoreWheelParams = {
  experience: number;
  education: number;
  projects: number;
  certifications: number;
  skills: number;
};

const ScoreWheel = ({
  weights,
  score,
}: {
  weights: ScoreWheelParams;
  score?: ScoreWheelParams;
}) => {
  const newScore = { ...initialScores, ...score };
  const isSettings = score === undefined;
  const [delay, setDelay] = useState(0);
  const [degree, setDegree] = useState(null);
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
  const { conicGradient, hoverKey, unused } = getStyles(
    delay,
    weights,
    newScore,
    degree,
  );
  const overallScore = getOverallScore(weights, newScore);
  return (
    <>
      <Stack
        id={'ResumeScoreWheel'}
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
          setDegree(getCursorDegrees(e));
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
            backgroundColor: '#FFF',
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
          <Stack fontSize={'12px'} sx={{ transform: 'translateY(2px)' }}>
            <Stack fontSize={'30px'} sx={{ fontWeight: 600 }}>
              {isSettings
                ? hoverKey
                  ? `${weights[hoverKey] ?? unused.count}%`
                  : unused.isUnused
                  ? `${unused.count}%`
                  : '100%'
                : `${score[hoverKey] ?? overallScore}%`}
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

export const wheelColors = [
  '#E8A838',
  '#F1E15B',
  '#F47560',
  '#E8C1A0',
  '#97E3D5',
];
const getStyles = (
  delay: number,
  weights: ScoreWheelParams,
  score: ScoreWheelParams,
  degree?: number,
) => {
  const lightColors = ['#fdf6eb', '#fefcef', '#fef1ef', '#fdf9f6', '#f5fcfb'];
  const disabledColor = '#e9ebed';
  const unusedColor = '#f4f5f6';
  const count = Object.keys(weights).length;
  let hoverKey = null;
  const conicGradientObj = Object.entries(weights).reduce(
    (acc, [key, value], i) => {
      const startDegree = acc.start;
      let scoreDegree = acc.start + (3.6 * value * score[key] * delay) / 10000;
      const unused = acc.unused - weights[key];
      const endDegree = acc.start + 3.6 * value;
      if (scoreDegree > endDegree - 1) scoreDegree = endDegree - 1;
      else if (scoreDegree < startDegree + 1) scoreDegree = startDegree + 1;
      const isDisabled = getDisabledState(degree, startDegree, endDegree);
      hoverKey = isDisabled && degree !== null ? key : hoverKey;
      const currentDarkColor = isDisabled
        ? wheelColors[i % wheelColors.length]
        : disabledColor;
      const currentLightColor = isDisabled
        ? lightColors[i % wheelColors.length]
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

const getCursorDegrees = (e: any) => {
  const div = document.getElementById('ResumeScoreWheel');
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

const getOverallScore = (weight: ScoreWheelParams, score: ScoreWheelParams) => {
  return score
    ? Math.trunc(
        Object.keys(weight).reduce((acc, curr) => {
          acc += (score[curr] * weight[curr]) / 100;
          return acc;
        }, 0),
      )
    : 0;
};

export default ScoreWheel;
