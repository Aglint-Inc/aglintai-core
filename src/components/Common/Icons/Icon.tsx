import React from 'react';

import { svgList } from './svgList';

const Icon = ({
  variant,
  height = '22',
  width = '22',
  color = 'currentColor',
}: {
  variant: keyof typeof svgList;
  height?: string;
  width?: string;
  color?: string;
}) => {
  const svgData = svgList[String(variant)];
  if (!svgData) return <></>;

  return (
    <svg
      width={width}
      height={height}
      viewBox={svgData.viewBox}
      xmlns='http://www.w3.org/2000/svg'
    >
      {svgData.paths.map((path, i) => {
        const others = svgData?.others || {};
        return <path key={i} d={path} fill={color} {...others} />;
      })}
    </svg>
  );
};

export default Icon;
