import { type schedulingSettingType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Skeleton } from '@components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

import { UIButton } from '../UIButton';
import { type Meeting } from './type';
import {
  filling2dArray,
  getDatesArray,
  transposeArray,
  useUserSchedules,
} from './utils';

export default function Heatmap({
  loadSetting,
}: {
  loadSetting: schedulingSettingType['interviewLoad'];
}) {
  const [arrayDates, setArrayDates] = useState([]);
  const [dayCount, setDayCount] = useState<{ start: number; end: number }>({
    start: -7,
    end: 24,
  });
  const [maxCount, setMaxCountInterviews] = useState(
    loadSetting.dailyLimit.value,
  );
  const user_id = useParams().user as string;
  const router = useRouter();

  const { data, isLoading } = useUserSchedules(user_id);

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
    <>
      {isLoading ? (
        <Skeleton className='h-[150] w-[1000px]' />
      ) : (
        <div className='m-2'>
          <div className='mb-4 flex max-w-[1000px] items-center justify-between'>
            <div className='flex items-center space-x-1'>
              <p className='min-w-[280px]'>
                Activity on{' '}
                <span className='font-medium'>
                  {startDateUI} - {endDateUI}
                </span>
              </p>
              <UIButton
                size='sm'
                variant='secondary'
                onClick={() =>
                  setDayCount((pre) => ({
                    start: pre.start === 21 ? -7 : pre.start - 28,
                    end: pre.end - 28,
                  }))
                }
                icon={<ChevronLeft className='h-4 w-4' />}
              />
              <UIButton
                size='sm'
                variant='secondary'
                onClick={() =>
                  setDayCount((pre) => ({
                    start: pre.start === -7 ? 21 : pre.start + 28,
                    end: pre.end + 28,
                  }))
                }
                icon={<ChevronRight className='h-4 w-4' />}
              />
            </div>

            <div className='flex space-x-1'>
              <div className='flex space-x-1'>
                <p className='font-medium'>Daily :</p>
                <p>{loadSetting?.dailyLimit.value}</p>
                <p>{todayTypeText}</p>
                <p className='font-medium'> Weekly : </p>
                <p>{loadSetting?.weeklyLimit.value}</p>
                <p>{weeklyTypeText}</p>
              </div>
            </div>
          </div>
          <HeatMapGrid
            data={mapDatas}
            xLabels={xLabel}
            yLabels={yLabel}
            square
            cellHeight='30.5px'
            xLabelsPos='bottom'
            onClick={(x, y) => {
              if (heatMapData[x][y].meeting_id)
                router.push(
                  `/interviews/view?meeting_id=${heatMapData[x][y].meeting_id}&tab=candidate_details`,
                );
            }}
            yLabelsPos='left'
            xLabelsStyle={(index) => {
              const isToday = dayjsLocal(arrayDates[index]).isToday();
              return {
                visibility: isToday ? 'visible' : 'hidden',
                backgroundColor: isToday
                  ? 'hsl(var(--chart-5))'
                  : 'transparent',
                borderRadius: '20px',
                height: '2px ',
                padding: 0,
                marginTop: '2px',
                width: '30.5px',
              };
            }}
            yLabelsStyle={(index) => ({
              color: index % 1 === 0 ? '#777' : 'transparent',
              fontSize: '10px',
            })}
            cellStyle={(x: number, y: number) => {
              const value = heatMapData[x][y];

              return {
                background:
                  value?.status === 'completed'
                    ? `hsl(var(--chart-1))`
                    : value?.status === 'confirmed'
                      ? `hsl(var(--chart-4))` // need confirm color
                      : value?.status === 'cancelled'
                        ? `hsl(var(--chart-2))`
                        : '#ebebeb',
                // background:
                //   value?.status === 'completed'
                //     ? `bg-green-${900 - x * 100}`
                //     : value?.status === 'confirmed'
                //       ? `bg-blue-${900 - x * 100}`
                //       : value?.status === 'cancelled'
                //         ? `bg-red-${900 - x * 100}`
                //         : 'grey',
                fontSize: '4px',
                borderRadius: '3px',
                width: '29px',
                height: '29px',
                color: 'white',
              };
            }}
          />
        </div>
      )}
    </>
  );
}

const arrayStructure = ({ datesArray, gridData, maxCount }): Meeting[][] => {
  if (gridData) {
    Object.keys(gridData).forEach((date) => {
      if (datesArray.includes(date)) {
        const index = datesArray.indexOf(date);
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
