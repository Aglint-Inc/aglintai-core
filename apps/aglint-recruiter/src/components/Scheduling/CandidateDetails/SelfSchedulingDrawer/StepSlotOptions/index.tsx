import dayjs from 'dayjs';

import { DateOption } from '@/devlink3/DateOption';
import { ScheduleOption } from '@/devlink3/ScheduleOption';
import { ScheduleOptionsList } from '@/devlink3/ScheduleOptionsList';

import { setSelectedCombIds, useSchedulingApplicationStore } from '../../store';
import SingleDayCard from './SingleDayCard';
import { extractPlanData, groupByDateRange } from './utils';

export type GroupByDateRange = ReturnType<typeof groupByDateRange>;

function StepSlotOptions({ isDebrief }: { isDebrief: boolean }) {
  const schedulingOptions = useSchedulingApplicationStore(
    (state) => state.schedulingOptions,
  );
  const selectedCombIds = useSchedulingApplicationStore(
    (state) => state.selectedCombIds,
  );

  const groupedData: GroupByDateRange = groupByDateRange(
    extractPlanData(schedulingOptions),
  );

  return (
    <ScheduleOptionsList
      slotDateOption={
        <>
          {groupedData?.map((item) => {
            const dates = item?.dateArray || [];
            const header = dates
              .map((date) => dayjs(date).format('MMMM DD dddd'))
              .join(' , ');
            const slots = item?.plans || [];
            const isMultiDay = dates.length > 1 ? true : false;

            return (
              <DateOption
                key={header}
                textdate={header}
                textOptionCount={`${slots.length} options`}
                slotScheduleOption={
                  <>
                    {slots?.map((slot) => {
                      const daySessions = dates.map((date) => {
                        return {
                          date: date,
                          sessions: slot.sessions.filter(
                            (session) =>
                              dayjs(session.start_time).format('MMMM DD') ===
                              dayjs(date).format('MMMM DD'),
                          ),
                        };
                      });

                      return (
                        <>
                          <ScheduleOption
                            isSelected={selectedCombIds.includes(
                              slot.plan_comb_id,
                            )}
                            isCheckbox={false}
                            onClickSelect={{
                              onClick: () => {
                                if (isDebrief)
                                  setSelectedCombIds([slot.plan_comb_id]);
                              },
                            }}
                            isRadio={isDebrief}
                            slotSingleDaySchedule={daySessions?.map(
                              (item, ind) => {
                                return (
                                  <SingleDayCard
                                    key={ind}
                                    item={item}
                                    ind={ind}
                                    isMultiDay={isMultiDay}
                                  />
                                );
                              },
                            )}
                          />
                        </>
                      );
                    })}
                  </>
                }
              />
            );
          })}
        </>
      }
    />
  );
}

export default StepSlotOptions;
