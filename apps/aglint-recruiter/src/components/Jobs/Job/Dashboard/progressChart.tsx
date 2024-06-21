import { Stack, Tooltip } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { scoreMatchesScore } from './utils';

function ProgressChart({ score_matches }) {
  let totalCount = 0;
  Object.values(score_matches).map((ele: scoreMatchesScore) => {
    totalCount = totalCount + Number(ele.score);
  });
  return (
    <>
      <Stack
        borderRadius={'var(--radius-4)'}
        // bgcolor={'grey.200'}
        direction={'row'}
        width={'100%'}
        height={'100%'}
        spacing={'2px'}
        overflow={'hidden'}
      >
        {Object.entries(score_matches).map((ele, i) => {
          const keyValue = ele[0];
          const value = ele[1] as scoreMatchesScore;
          const bgColor = value.color;
          const widthvalue = (value.score / totalCount) * 100 + 1;

          return (
            <Tooltip
              key={i}
              title={`${capitalize(keyValue.replaceAll('_', ' '))} (${
                value.score
              })`}
            >
              <Stack
                width={`${widthvalue}%`}
                bgcolor={bgColor}
                height={'var(--space-6)'}
                key={i}
                sx={{
                  cursor: 'pointer',
                  transition: 'width 0.5s',
                  '&:hover': {
                    width: `${widthvalue + 1}%`,
                  },
                }}
              ></Stack>
            </Tooltip>
          );
        })}
      </Stack>
    </>
  );
}

export default ProgressChart;
