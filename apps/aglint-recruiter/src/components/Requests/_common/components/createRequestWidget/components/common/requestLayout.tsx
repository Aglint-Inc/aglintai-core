import type { PropsWithChildren } from 'react';

import { CONTAINER_HEIGHT } from '../../constants';

export const RequestLayout = (props: PropsWithChildren) => {
  return (
    <div
      className={`flex w-full h-[${CONTAINER_HEIGHT}px] items-center justify-center`}
    >
      {props.children}
    </div>
  );
};
