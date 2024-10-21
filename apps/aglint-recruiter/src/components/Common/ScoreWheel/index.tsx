'use client';

import { Card } from '@components/ui/card';
import capitalize from 'lodash/capitalize';
import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

export type ScoreWheelParams = {
  skills: number;
  experience: number;
  education: number;
};

const ScoreWheel = ({
  scores,
  parameter_weights,
}: {
  scores?: ScoreWheelParams;
  parameter_weights: ScoreWheelParams;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const isSettings = scores === undefined;
  const totalWeight = Object.values(parameter_weights).reduce(
    (sum, weight) => sum + weight,
    0,
  );
  const unusedPercentage = 100 - totalWeight;

  const data = useMemo(() => {
    const result = Object.entries(parameter_weights).map(([key, value]) => ({
      name: key,
      value: isSettings
        ? value
        : (value * (scores?.[key as keyof ScoreWheelParams] || 0)) / 100,
    }));
    if (unusedPercentage > 0) {
      result.push({ name: 'unused', value: unusedPercentage });
    }
    return result;
  }, [parameter_weights, scores, isSettings, unusedPercentage]);

  const COLORS = ['#886BD8', '#30AABC', '#5D7DF5', '#e9ebed'];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const getCenterContent = () => {
    if (activeIndex !== undefined) {
      const activeData = data[activeIndex];
      return {
        value: isSettings
          ? `${activeData.value}%`
          : Math.trunc(activeData.value),
        label: capitalize(activeData.name),
      };
    }
    if (isSettings) {
      return unusedPercentage > 0
        ? { value: `${unusedPercentage}%`, label: 'Unused' }
        : { value: '100%', label: 'Complete' };
    }
    return {
      value: Math.trunc(data.reduce((sum, item) => sum + item.value, 0)),
      label: 'Overall Score',
    };
  };

  const centerContent = getCenterContent();

  return (
    <Card className='flex h-64 w-64 items-center justify-center border-none bg-transparent shadow-none'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey='value'
            onMouseEnter={onPieEnter}
            stroke='#00000000'
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='absolute text-center'>
        <div className='text-2xl font-semibold'>{centerContent.value}</div>
        <div>{centerContent.label}</div>
      </div>
    </Card>
  );
};

export default ScoreWheel;
