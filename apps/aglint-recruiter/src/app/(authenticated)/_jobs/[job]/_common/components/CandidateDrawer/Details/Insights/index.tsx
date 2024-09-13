import { type PropsWithChildren } from 'react';

import { Badges } from './Badges';
import { Overview } from './Overview';

const Insights = (props: PropsWithChildren) => {
  return (
    <div className='flex flex-col space-y-1'>
      {props.children ?? (
        <>
          <Badges />
          <Overview />
        </>
      )}
    </div>
  );
};

export { Insights };
