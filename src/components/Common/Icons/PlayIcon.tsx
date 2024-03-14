import React from 'react';

function PlayIcon({
  size = 20,
  color = '#F79A3E'
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.625 10.125L9.375 6L2.625 1.875V10.125ZM2.08594 0.890625C2.46094 0.6875 2.83594 0.695313 3.21094 0.914062L9.96094 5.03906C10.3047 5.25781 10.4844 5.57812 10.5 6C10.4844 6.42188 10.3047 6.74219 9.96094 6.96094L3.21094 11.0859C2.83594 11.3047 2.46094 11.3125 2.08594 11.1094C1.71094 10.8906 1.51562 10.5625 1.5 10.125V1.875C1.51562 1.4375 1.71094 1.10937 2.08594 0.890625Z'
        fill={color}
      />
    </svg>
  );
}

export default PlayIcon;
