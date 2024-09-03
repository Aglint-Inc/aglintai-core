/* eslint-disable security/detect-object-injection */
import { capitalize } from 'lodash';
import { RefreshCw } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

import { type ScoreWheelParams, scoreWheelDependencies } from '.';

const ScoreWheelControls = ({
  weights,
  setWeights,
}: {
  weights: ScoreWheelParams;
  setWeights: React.Dispatch<React.SetStateAction<ScoreWheelParams>>;
}) => {
  const limit = Object.values(weights).reduce((acc, curr) => acc - curr, 100);

  const handleEqualise = () => {
    const count = Object.keys(weights).length;
    const newWeights = Object.fromEntries(
      Object.keys(weights).map((key, index) => {
        const currentScore = Math.trunc(100 / count);
        return [
          key,
          index === count - 1 ? 100 - (count - 1) * currentScore : currentScore,
        ];
      }),
    );
    setWeights(newWeights as ScoreWheelParams);
  };

  return (
    <Card className='p-6 space-y-6'>
      {scoreWheelDependencies.parameterOrder.map((key, i) => (
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
      ))}
      <Button variant='outline' onClick={handleEqualise} className='w-full'>
        <RefreshCw className='w-4 h-4 mr-2' />
        Reset
      </Button>
    </Card>
  );
};

const ScoreWheelSlider = ({
  id,
  label,
  weight,
  setWeights,
  color,
}: {
  id: number;
  label: string;
  weight: number;
  limit: number;
  setWeights: React.Dispatch<React.SetStateAction<ScoreWheelParams>>;
  color: string;
}) => {
  const handleChange = (value: number[]) => {
    setWeights((prev) => ({ ...prev, [label]: value[0] }));
  };

  return (
    <div className='flex items-center space-x-4'>
      <div className='font-semibold w-24'>{capitalize(label)}</div>
      <Slider
        id={`ScoreWheelSliders${id}`}
        value={[weight]}
        min={0}
        max={100}
        step={1}
        onValueChange={handleChange}
        className={`flex-grow ${color}`}
      />
      <div className='font-semibold w-16 text-right'>{`${weight}%`}</div>
    </div>
  );
};

export default ScoreWheelControls;
