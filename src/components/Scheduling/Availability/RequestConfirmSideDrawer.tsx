import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

import {
  GroupedSlots,
  RequestConfirmationSidebar,
  TimeRangeAvailable,
} from '@/devlink2';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { InterviewerGroup } from './Availability';
import {
  setCheckedInterSlots,
  setInterviewers,
  useAvailableStore,
} from './store';
import { mergeInterviewerEvents, updateTimeSlotStatusUtil } from './utils';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

const SideDrawer = ({ onClose }) => {
  const checkedInterSlots = useAvailableStore(
    (state) => state.checkedInterSlots,
  );
  const interviewers = useAvailableStore((state) => state.interviewers);

  const timeSlot = useAvailableStore((state) => state.timeSlot);

  const groupedSlots = mergeInterviewerEvents(checkedInterSlots);
  const filteredDateSlotKeys = Object.keys(groupedSlots).filter(
    (key) => !isEmpty(groupedSlots[String(key)]),
  );
  const cntSlots = checkedInterSlots.reduce(
    (tot, curr) => tot + curr.countCheckedSlots,
    0,
  );

  const cntPanelMembs = checkedInterSlots.filter(
    (i) => i.countCheckedSlots > 0,
  ).length;

  const handleSubmit = async () => {
    try {
      const { updCheckedInterSlots, updInterviewers } =
        updateTimeSlotStatusUtil(
          interviewers,
          checkedInterSlots,
          'requested',
          timeSlot,
        );

      const promises = updInterviewers.map(async (int) => {
        supabaseWrap(
          await supabase
            .from('interview_availabilties')
            .update({ slot_availability: int.slots as any })
            .eq('user_id', int.interviewerId),
        );
      });

      await Promise.all(promises);
      setCheckedInterSlots(updCheckedInterSlots);
      setInterviewers(updInterviewers);
      toast.success('Email sent  slot confirmation');
      onClose();
    } catch (error) {
      toast.error(API_FAIL_MSG);
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <RequestConfirmationSidebar
        textSelectedInfo={`You have selected ${cntSlots} slots across ${cntPanelMembs} panel ${
          cntPanelMembs == 1 ? 'member' : 'members'
        }.`}
        onClickRequest={{
          onClick: handleSubmit,
        }}
        slotSelectedSlots={filteredDateSlotKeys.map((dateKey) => {
          let eventsKey = Object.keys(groupedSlots[String(dateKey)]).filter(
            (timeKey) =>
              groupedSlots[String(dateKey)][String(timeKey)].length > 0,
          );
          return (
            <GroupedSlots
              key={dateKey}
              textDate={dayjs(dateKey).format('MMMM DD YYYY')}
              slotTimeRange={eventsKey.map((timeKey) => {
                let inters = groupedSlots[String(dateKey)][String(timeKey)].map(
                  (i) => ({ name: i.interviewerName, url: i.profileImg }),
                );
                let timeRange =
                  groupedSlots[String(dateKey)][String(timeKey)][0];
                let textTime = `${dayjs(timeRange?.startTime).format(
                  'hh:mm A',
                )} - ${dayjs(timeRange?.endTime).format('hh:mm A')}`;

                return (
                  <TimeRangeAvailable
                    key={timeKey}
                    textTimeRange={textTime}
                    isAvatarGroup
                    slotAvatarGroup={<InterviewerGroup profileUrls={inters} />}
                  />
                );
              })}
            />
          );
        })}
        // slotSelectedSlots={Object.keys(groupedSlots)
        //   .filter((dateStr) => groupedSlots[String(dateStr)].length > 0)
        //   .map((dateStr) => {
        //     return (
        //       <GroupedSlots
        //         key={dateStr}
        //         textDate={dateStr}
        //         slotTimeRange={
        //           <>
        //             <TimeRangeAvailable
        //               isAvatarGroup
        //               slotAvatarGroup={
        //                 <InterviewerGroup
        //                   profileUrls={[{ name: 'femwkl', url: 'fmewlkm' }]}
        //                 />
        //               }
        //             />
        //           </>
        //         }
        //       />
        //     );
        //   })}
        // slotSelectedSlots={checkedInterSlots.map((int) => {
        //   const selectedTimeSlots = int.slots.find(
        //     (s) => s.timeDuration === timeSlot,
        //   ).availability;
        //   let groupedSlots = [];

        //   return (
        //     <GroupedSlots
        //       key={int.interviewerId}
        //       textDate
        //       slotTimeRange={Object.keys(selectedTimeSlots)
        //         .filter(
        //           (dayKey) => selectedTimeSlots[String(dayKey)].length > 0,
        //         )
        //         .map((dayKey) => {
        //           return selectedTimeSlots[String(dayKey)].map((timeRange) => {
        //             return (
        //               <TimeRangeAvailable
        //                 key={timeRange.startTime.toString()}
        //                 textTimeRange={dayjs(timeRange.startTime).format('')}
        //                 // isAvatarGroup={true}
        //                 // slotAvatarGroup={<></>}
        //               />
        //             );
        //           });
        //         })}
        //     />
        //   );
        // })}
        onClickClose={{
          onClick: () => {
            onClose();
          },
        }}
      />
    </div>
  );
};

export default SideDrawer;
