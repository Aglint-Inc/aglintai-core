/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import Slider from '@mui/material/Slider';
import { capitalize } from 'lodash';
import { type Dispatch, type SetStateAction } from 'react';

import { ButtonPrimaryOutlinedRegular } from '@/devlink3/ButtonPrimaryOutlinedRegular';

import { type ScoreWheelParams,scoreWheelDependencies } from '.';

const ScoreWheelControls = ({
  weights,
  setWeights,
}: {
  weights: ScoreWheelParams;
  setWeights: Dispatch<SetStateAction<ScoreWheelParams>>;
}) => {
  const limit = Object.values(weights).reduce((acc, curr) => {
    acc -= curr;
    return acc;
  }, 100);
  const sliders = scoreWheelDependencies.parameterOrder.map((key, i) => (
    <ScoreWheelSlider
      key={i}
      id={i}
      label={key}
      weight={weights[key]}
      limit={limit}
      setWeights={setWeights}
      color={
        scoreWheelDependencies.wheelColors[
          i % scoreWheelDependencies.wheelColors.length
        ]
      }
    />
  ));
  const handleEqualise = () => {
    const count = Object.keys(weights).length;
    const newWeights = Object.assign(
      {},
      ...Object.keys(weights).reduce(
        (acc, curr, i) => {
          const currentScore = Math.trunc(100 / count);
          if (i === count - 1) {
            return {
              ...acc,
              weights: [...acc.weights, { [curr]: acc.residue }],
              residue: 0,
            };
          } else {
            return {
              ...acc,
              weights: [...acc.weights, { [curr]: currentScore }],
              residue: acc.residue - currentScore,
            };
          }
        },
        { weights: [], residue: 100 },
      ).weights,
    );
    setWeights(newWeights);
  };
  return (
    <Stack gap={2} display={'flex'} alignItems={'flex-start'}>
      {sliders}
      <ButtonPrimaryOutlinedRegular
        buttonText={'Reset'}
        buttonProps={{ onClick: () => handleEqualise() }}
      />
    </Stack>
  );
};

const ScoreWheelSlider = ({
  id,
  label,
  weight,
  limit,
  setWeights,
  color,
}: {
  id;
  label: string;
  weight: number;
  limit: number;
  setWeights: Dispatch<SetStateAction<ScoreWheelParams>>;
  color: string;
}) => {
  let marks = [];
  for (let i = 0; i <= limit + weight; i++) marks.push({ value: i });
  const handleChange = (e: any) => {
    setWeights((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <Stack width={'550px'} flexDirection={'row'} alignItems={'center'}>
      <Stack fontWeight={600}>{capitalize(label)}</Stack>
      <Stack width={'300px'} ml={'auto'}>
        <Slider
          id={`ScoreWheelSliders${id}`}
          name={label}
          valueLabelDisplay='auto'
          value={weight}
          min={0}
          max={100}
          step={null}
          marks={marks}
          onChange={(e) => handleChange(e)}
          sx={{ color: color }}
        />
      </Stack>
      <Stack
        fontWeight={600}
        width={'80px'}
        textAlign={'right'}
      >{`${weight}%`}</Stack>
    </Stack>
  );
};
export default ScoreWheelControls;
