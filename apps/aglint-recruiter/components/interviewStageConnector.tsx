import React from 'react';

interface InterviewStageConnectorProps {
  size: number;
  position: 'bottom' | 'right'; 
}

const InterviewStageConnector: React.FC<InterviewStageConnectorProps> = ({
  size,
  position,
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
        className='flex items-center justify-center bg-red-500'
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div
          className='absolute rotate-45 transform border border-blue-500 bg-green-500 '
          style={{ width: `${innerSize}px`, height: `${innerSize}px` }}
        ></div>
      </div>
    </div>
  );
};

export default InterviewStageConnector;