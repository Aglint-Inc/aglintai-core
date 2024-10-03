import { type SchedulingSettingType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Skeleton } from '@components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

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
  loadSetting: SchedulingSettingType['interviewLoad'];
}) {
  const [arrayDates, setArrayDates] = useState([]);
  const [dayCount, setDayCount] = useState<{ start: number; end: number }>({
    start: -7,
    end: 22,
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
        <Section>
          <SectionHeader>
            <SectionHeaderText>
              <SectionTitle>Meetings overview</SectionTitle>
            </SectionHeaderText>
            <SectionActions>
              <div className='mt-1 flex items-center justify-between gap-2'>
                <div className='flex gap-4'>
                  <div className='flex gap-1'>
                    <p className='text-sm'>Daily :</p>
                    <p className='text-sm'>{loadSetting?.dailyLimit.value}</p>
                    <p className='text-sm'>{todayTypeText}</p>
                  </div>
                  <div className='flex gap-1'>
                    <p className='text-sm'> Weekly : </p>
                    <p className='text-sm'>{loadSetting?.weeklyLimit.value}</p>
                    <p className='text-sm'>{weeklyTypeText}</p>
                  </div>
                </div>

                <div className='flex flex-row items-center gap-2'>
                  <p className='text-sm'>
                    Activity on{' '}
                    <span className=''>
                      {startDateUI} - {endDateUI}
                    </span>
                  </p>
                  <div
                    className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-gray-100'
                    onClick={() =>
                      setDayCount((pre) => ({
                        start: pre.start === 21 ? -7 : pre.start - 28,
                        end: pre.end - 28,
                      }))
                    }
                  >
                    <ChevronLeft className='h-3 w-3' />
                  </div>
                  <div
                    className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-gray-100'
                    onClick={() =>
                      setDayCount((pre) => ({
                        start: pre.start === -7 ? 21 : pre.start + 28,
                        end: pre.end + 28,
                      }))
                    }
                  >
                    <ChevronRight className='h-3 w-3' />
                  </div>
                </div>
              </div>
            </SectionActions>
          </SectionHeader>
          <div className='ml-[-10px]' style={{ marginLeft: '-10px' }}>
            <HeatMapGrid
              data={mapDatas}
              xLabels={xLabel}
              yLabels={yLabel}
              square
              cellHeight='24px'
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
                  width: '24px',
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

                  fontSize: '4px',
                  borderRadius: '3px',
                  width: '24px',
                  height: '24px',
                  color: 'white',
                };
              }}
            />
          </div>
        </Section>
        // <UISectionCard
        //   type='compact'
        //   title='Meetings overview'
        //   isHoverEffect={false}
        //   // action={
        //   //   <div className='mb-4 flex max-w-[1000px] items-center gap-2'>
        //   //     <div className='flex space-x-1'>
        //   //       <p className='font-medium'>Daily :</p>
        //   //       <p>{loadSetting?.dailyLimit.value}</p>
        //   //       <p>{todayTypeText}</p>
        //   //       <p className='font-medium'> Weekly : </p>
        //   //       <p>{loadSetting?.weeklyLimit.value}</p>
        //   //       <p>{weeklyTypeText}</p>
        //   //     </div>
        //   //     <div className='w-[10px]'>|</div>
        //   //     <p className='min-w-[280px]'>
        //   //       Activity on{' '}
        //   //       <span className='font-medium'>
        //   //         {startDateUI} - {endDateUI}
        //   //       </span>
        //   //     </p>
        //   //     <UIButton
        //   //       size='sm'
        //   //       variant='secondary'
        //   //       onClick={() =>
        //   //         setDayCount((pre) => ({
        //   //           start: pre.start === 21 ? -7 : pre.start - 28,
        //   //           end: pre.end - 28,
        //   //         }))
        //   //       }
        //   //       icon={<ChevronLeft className='h-4 w-4' />}
        //   //     />
        //   //     <UIButton
        //   //       size='sm'
        //   //       variant='secondary'
        //   //       onClick={() =>
        //   //         setDayCount((pre) => ({
        //   //           start: pre.start === -7 ? 21 : pre.start + 28,
        //   //           end: pre.end + 28,
        //   //         }))
        //   //       }
        //   //       icon={<ChevronRight className='h-4 w-4' />}
        //   //     />
        //   //   </div>
        //   // }
        // >
        //   <div className=''>

        //   </div>
        // </UISectionCard>
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
