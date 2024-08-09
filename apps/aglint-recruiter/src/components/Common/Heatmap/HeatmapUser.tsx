import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

import { IconButtonSoft } from '@/devlink/IconButtonSoft';

import { Meeting } from './type';
import {
  filling2dArray,
  getDatesArray,
  transposeArray,
  useUserSchedules,
} from './utils';

export default function Heatmap({
  loadSetting,
}: {
  loadSetting: {
    dailyLimit: { value: number; type: string };
    weeklyLimit: { value: number; type: string };
  };
}) {
  const [arrayDates, setArrayDates] = useState([]);
  const [dayCount, setDayCount] = useState<{ start: number; end: number }>({
    start: -7,
    end: 21,
  });
  const [maxCount, setMaxCountInterviews] = useState(
    loadSetting.dailyLimit.value,
  );
  const router = useRouter();

  const user_id = router?.query?.user_id as string;

  const { data } = useUserSchedules(user_id);

  useEffect(() => {
    setMaxCountInterviews(
      Math.max(loadSetting?.dailyLimit.value, data?.maxInterviewsCount),
    );
  }, [data]);

  //dates
  const startDate = dayjsLocal(
    new Date().setDate(new Date().getDate() + dayCount.start),
  ).format('YYYY-MM-DD');

  const endDate = dayjsLocal(
    new Date().setDate(new Date().getDate() + dayCount.end),
  ).format('YYYY-MM-DD');

  const startDateUI = dayjsLocal(
    new Date().setDate(new Date().getDate() + dayCount.start),
  ).format('MMM DD YYYY');

  const endDateUI = dayjsLocal(
    new Date().setDate(new Date().getDate() + dayCount.end),
  ).format('MMM DD YYYY');

  const datesArray = getDatesArray(startDate, endDate, 'YYYY-MM-DD');

  useEffect(() => {
    setArrayDates(getDatesArray(startDate, endDate, 'YYYY-MM-DD'));
  }, [dayCount]);

  const todayTypeText =
    loadSetting?.dailyLimit.type === 'Interviews' ? 'Interview' : 'Hour';

  const weeklyTypeText =
    loadSetting?.weeklyLimit.type === 'Interviews' ? 'Interview' : 'Hour';

  const heatMapData = arrayStructure({
    datesArray,
    gridData: data?.groupedData,
    maxCount,
  });
  const yLabel: string[] = maxCount
    ? new Array(Math.ceil(maxCount)).fill('')
    : [];
  const xLabel: string[] = datesArray.map(() => 'd');

  const mapDatas: number[][] = heatMapData.map((data) => data.map(() => 1));

  return (
    <Stack m={2}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={1}
        maxWidth={'870px'}
      >
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Typography minWidth={'250px'}>
            Activity on{' '}
            <span style={{ fontWeight: 500 }}>
              {startDateUI} - {endDateUI}
            </span>
          </Typography>
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

        <Stack direction={'row'} spacing={1}>
          <Stack direction={'row'} spacing={1}>
            <Typography fontWeight={500}>Daily :</Typography>
            <Typography>{loadSetting?.dailyLimit.value}</Typography>
            <Typography>{todayTypeText}</Typography>
            <Typography fontWeight={500}> Weekly : </Typography>
            <Typography>{loadSetting?.weeklyLimit.value}</Typography>
            <Typography>{weeklyTypeText}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <HeatMapGrid
        data={mapDatas}
        xLabels={xLabel}
        yLabels={yLabel}
        square
        cellHeight='30px'
        xLabelsPos='bottom'
        onClick={(x, y) => {
          // eslint-disable-next-line security/detect-object-injection
          if (heatMapData[x][y].meeting_id)
            router.push(
              // eslint-disable-next-line security/detect-object-injection
              `/scheduling/view?meeting_id=${heatMapData[x][y].meeting_id}&tab=candidate_details`,
            );
        }}
        yLabelsPos='left'
        xLabelsStyle={(index) => {
          // eslint-disable-next-line security/detect-object-injection
          const isToday = dayjsLocal(arrayDates[index]).isToday();
          return {
            visibility: isToday ? 'visible' : 'hidden',
            backgroundColor: isToday ? 'var(--error-8)' : 'transparent',
            borderRadius: '20px',
            height: '2px ',
            padding: 0,
            marginTop: '2px',
            width: isToday ? '25px' : '30px',
          };
        }}
        yLabelsStyle={(index) => ({
          color: index % 1 === 0 ? '#777' : 'transparent',
          fontSize: '10px',
        })}
        cellStyle={(x: number, y: number) => {
          // eslint-disable-next-line security/detect-object-injection
          const value = heatMapData[x][y];

          return {
            background:
              value?.status === 'completed'
                ? `var(--success-${8 - x})`
                : value?.status === 'confirmed'
                  ? `var(--info-${8 - x})`
                  : value?.status === 'cancelled'
                    ? `var(--error-${8 - x})`
                    : `var(--neutral-3)`,
            fontSize: '4px',
            borderRadius: '3px',
            width: '29px',
            height: '29px',
            color: 'white',
          };
        }}
      />
    </Stack>
  );
}

const arrayStructure = ({ datesArray, gridData, maxCount }): Meeting[][] => {
  if (gridData) {
    Object.keys(gridData).forEach((date) => {
      if (datesArray.includes(date)) {
        const index = datesArray.indexOf(date);
        // eslint-disable-next-line security/detect-object-injection
        datesArray[index] = gridData[date];
      }
    });
  }

  const newDataFill1Array: Meeting[][] = datesArray?.map((data) =>
    typeof data === 'string' ? [] : data,
  );

  const filled2d = filling2dArray(newDataFill1Array, maxCount);
  return transposeArray(filled2d);
};
