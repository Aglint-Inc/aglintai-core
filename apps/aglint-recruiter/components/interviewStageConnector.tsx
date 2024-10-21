import React from 'react';

import { statusColors } from './statusColors';

interface InterviewStageConnectorProps {
  size: number;
  position: 'bottom' | 'right' | 'top';
  status: 'completed' | 'confirmed' | 'not_scheduled';
  isActive: boolean;
}

const InterviewStageConnector: React.FC<InterviewStageConnectorProps> = ({
  size,
  position,
  status,
  isActive,
}) => {
  const innerSize = (size / Math.sqrt(2)).toFixed(2);
  const absoluteStyle = size / 2 - 1;

  const parentDivStyle =
    position === 'bottom'
      ? {
          height: `${absoluteStyle}px`,
          bottom: `${-(absoluteStyle - 1)}px`,
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: '100%',
        }
      : position === 'top'
        ? {
            height: `${absoluteStyle}px`,
            top: `0px`,
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: '100%',
          }
        : {
            width: `${absoluteStyle}px`,
            right: `${-(absoluteStyle - 1)}px`,
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
          };

  return (
    <div className='absolute z-20 flex overflow-hidden' style={parentDivStyle}>
      <div
        className='flex items-center justify-center'
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div
          className={`absolute rotate-45 transform rounded-br-sm border ${
            position === 'bottom'
              ? isActive
                ? `${statusColors[status].activeBg} ${statusColors[status].activeBorder}`
                : `${statusColors[status].bg} ${statusColors[status].border}`
              : position === 'top'
                ? isActive
                  ? `bg-white dark:bg-background ${statusColors[status].activeBorder}`
                  : `bg-white dark:bg-background ${statusColors[status].border}`
                : ''
          }`}
          style={{ width: `${innerSize}px`, height: `${innerSize}px` }}
        ></div>
      </div>
    </div>
  );
};

export default InterviewStageConnector;
