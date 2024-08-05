// import './headmap.css';

import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { supabase } from '@/src/utils/supabase/client';

type Meeting = {
  status: string;
  startTime: string;
  endTime: string;
  meeting_id: string;
};

type Meetings = {
  [date: string]: Meeting[];
};

export default function Heatmap({ loadSetting }) {
  const [gridData, setGridData] = useState<Meetings | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dayCount, setDayCount] = useState<{ start: number; end: number }>({
    start: -7,
    end: 21,
  });
  const [maxCount, setMaxCountInterviews] = useState(
    loadSetting.dailyLimit.value,
  );
  const router = useRouter();

  const user_id = router?.query?.user_id as string;

  const fet = async () => {
    try {
      const {
        groupedData,
        maxInterviewsCount,
      }: Awaited<ReturnType<typeof fetchFunction>> = await fetchFunction({
        user_id,
      });
      setGridData(groupedData);
      setMaxCountInterviews(
        Math.max(loadSetting.dailyLimit.value, maxInterviewsCount),
      );
    } catch (e) {
      // console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fet();
  }, []);

  const startDate = dayjsLocal(
    new Date().setDate(new Date().getDate() + dayCount.start),
  ).format('YYYY-MM-DD');

  const endDate = dayjsLocal(
    new Date().setDate(new Date().getDate() + dayCount.end),
  ).format('YYYY-MM-DD');

  const datesArray = getDatesArray(startDate, endDate, 'YYYY-MM-DD');
  const datesArrayLable: string[] = getDatesArray(startDate, endDate, 'D');

  Object.keys(gridData).forEach((date) => {
    if (datesArray.includes(date)) {
      const index = datesArray.indexOf(date);
      // eslint-disable-next-line security/detect-object-injection
      datesArray[index] = gridData[date];
    }
  });

  const newDataFill1Array: Meeting[][] = datesArray.map((data) =>
    typeof data === 'string' ? [] : data,
  );

  const filled2d = filling2dArray(newDataFill1Array, maxCount);

  const rest = transposeArray(filled2d);

  const yLabels: string[] = new Array(maxCount).fill('');

  const startDateUI = dayjsLocal(
    new Date().setDate(new Date().getDate() + dayCount.start),
  ).format('MMM DD YYYY');

  const endDateUI = dayjsLocal(
    new Date().setDate(new Date().getDate() + dayCount.end),
  ).format('MMM DD YYYY');

  if (rest.length) {
    return (
      <Stack m={2}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={1}
          maxWidth={'870px'}
        >
          <Typography>
            Activity on{' '}
            <span style={{ fontWeight: 500 }}>
              {startDateUI} - {endDateUI}
            </span>
          </Typography>
          <Stack direction={'row'} spacing={1}>
            <IconButtonSoft
              iconName='arrow_back_ios'
              color={'neutral'}
              size={1}
              iconSize={2}
              onClickButton={{
                onClick: () =>
                  setDayCount((pre) => ({
                    start: pre.start === 21 ? -7 : pre.start - 28,
                    end: pre.end - 28,
                  })),
              }}
            />
            <IconButtonSoft
              iconName='arrow_forward_ios'
              color={'neutral'}
              size={1}
              iconSize={2}
              onClickButton={{
                onClick: () =>
                  setDayCount((pre) => ({
                    start: pre.start === -7 ? 21 : pre.start + 28,
                    end: pre.end + 28,
                  })),
              }}
            />
          </Stack>
        </Stack>
        <HeatMapGrid
          data={rest}
          xLabels={datesArrayLable}
          yLabels={yLabels}
          square
          cellHeight='30px'
          xLabelsPos='bottom'
          onClick={(x, y) => {
            // eslint-disable-next-line security/detect-object-injection
            if (rest[x][y].meeting_id)
              router.push(
                // eslint-disable-next-line security/detect-object-injection
                `/scheduling/view?meeting_id=${rest[x][y].meeting_id}&tab=candidate_details`,
              );
          }}
          yLabelsPos='right'
          xLabelsStyle={(index) => ({
            color: index % 6 === 0 ? '#777' : 'transparent',
            fontSize: '10px',
          })}
          cellStyle={(_x, _y) => {
            // eslint-disable-next-line security/detect-object-injection
            const value = rest[_x][_y];

            return {
              background:
                value?.status === 'completed'
                  ? `var(--success-${8 - _x})`
                  : value?.status === 'confirmed'
                    ? `var(--info-${8 - _x})`
                    : value?.status === 'cancelled'
                      ? `var(--error-${8 - _x})`
                      : `var(--neutral-3)`,
              fontSize: '4px',
              borderRadius: '3px',
              width: '29px',
              height: '29px',
              color: 'white',
            };
          }}
        />
        {/* <HeatmapCom
          xLabels={datesArrayLable}
          yLabels={yLabels}
          yLabelWidth={0}
          xLabelWidth={0}
          xLabelsLocation={'bottom'}
          xLabelsVisibility={xLabelsVisibility}
          data={rest}
          squares
          height={15}
          onClick={(x, y) => {
            // eslint-disable-next-line security/detect-object-injection
            if (rest[y][x].meeting_id)
              router.push(
                // eslint-disable-next-line security/detect-object-injection
                `/scheduling/view?meeting_id=${rest[y][x].meeting_id}&tab=candidate_details`,
              );
          }}
          cellStyle={(background, value, min, max, data, x, y) => {
            return {
              background:
                value?.status === 'completed'
                  ? `var(--success-${8 - y})`
                  : value?.status === 'confirmed'
                    ? `var(--info-${8 - y})`
                    : value?.status === 'cancelled'
                      ? `var(--error-${8 - y})`
                      : `var(--neutral-3)`,
              fontSize: '4px',
              borderRadius: '3px',
              width: '29px',
              height: '29px',
              color: 'white',
            };
          }}
          // cellRender={(value) => value && <div>{value}</div>}
        /> */}
      </Stack>
    );
  }
  return (
    <Stack height={'140px'} bgcolor={'var(--neutral-2)'} p={1}>
      Loading {isLoading ? '...' : ''}
    </Stack>
  );
}

const getDatesArray = (startDate, endDate, format) => {
  const dates = [];
  let currentDate = dayjsLocal(startDate);

  while (currentDate <= dayjsLocal(endDate)) {
    dates.push(currentDate.format(format));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

const fetchFunction = async ({ user_id }) => {
  try {
    const { data } = await supabase
      .from('meeting_details')
      .select(
        '*,applications(candidates(first_name,last_name)), public_jobs(id,company,job_title), meeting_interviewers!public_interview_session_meeting_id_fkey(*)',
      )
      .contains('confirmed_user_ids', [user_id])
      .eq('meeting_interviewers.is_confirmed', true);

    const filteredData = data
      .filter(
        (curr) =>
          curr.status === 'completed' ||
          curr.status === 'confirmed' ||
          curr.status === 'cancelled',
      )
      .map((curr) => ({
        status: curr.status,
        startTime: curr.start_time,
        endTime: curr.end_time,
        meeting_id: curr.id,
      }));

    const groupedData = groupByStartDate({ events: filteredData });

    const maxInterviewsCount = findMaxGroupCount(groupedData);

    return { groupedData, maxInterviewsCount };
  } catch (e) {
    //
  }
};

function groupByStartDate({
  events,
}: {
  events: {
    status:
      | 'waiting'
      | 'confirmed'
      | 'completed'
      | 'cancelled'
      | 'reschedule'
      | 'not_scheduled';
    startTime: string;
    endTime: string;
    meeting_id: string;
  }[];
}): Meetings {
  const res = events.reduce((acc, event) => {
    const startDate = dayjsLocal(event.startTime).format('YYYY-MM-DD');

    // eslint-disable-next-line security/detect-object-injection
    if (!acc[startDate]) {
      // eslint-disable-next-line security/detect-object-injection
      acc[startDate] = [];
    }

    // eslint-disable-next-line security/detect-object-injection
    acc[startDate].push(event);

    return acc;
  }, {});

  return res;
}

function findMaxGroupCount(groupedData: Meetings) {
  const groupSizes = Object.values(groupedData).map((group) => group?.length);
  const maxCount = Math.max(...groupSizes);
  return maxCount;
}

function transposeArray(array) {
  if (array.length > 0) {
    return [
      // eslint-disable-next-line security/detect-object-injection
      ...array[0].map((_, colIndex) => array.map((row) => row[colIndex])),
    ].reverse();
  }
  return [];
}

const filling2dArray = (data, maxCount) => {
  // const maxCount = data.reduce(
  //   (max, subArray) => Math.max(max, subArray.length),
  //   0,
  // );
  return data.map((subArray) => {
    const fillCount = maxCount - subArray.length;
    return subArray.concat(Array.from({ length: fillCount }, () => ({})));
  });
};

// rest[2][7] = rest[3][7];
// rest[1][7] = rest[3][7];
// rest[0][7] = rest[3][7];

// rest[3][6] = {
//   status: 'completed',
//   startTime: '2024-08-05T03:30:00+00:00',
//   endTime: '2024-08-05T05:30:00+00:00',
//   meeting_id: '2c3fd477-4cf0-4ee3-8109-358cd49fd308',
// };
// rest[2][6] = rest[3][6];
// rest[1][6] = rest[3][6];
// rest[0][6] = rest[3][6];

// rest[3][5] = {
//   status: 'cancelled',
//   startTime: '2024-08-05T03:30:00+00:00',
//   endTime: '2024-08-05T05:30:00+00:00',
//   meeting_id: '2c3fd477-4cf0-4ee3-8109-358cd49fd308',
// };
// rest[2][5] = rest[3][5];
// rest[1][5] = rest[3][5];
// rest[0][5] = rest[3][5];
