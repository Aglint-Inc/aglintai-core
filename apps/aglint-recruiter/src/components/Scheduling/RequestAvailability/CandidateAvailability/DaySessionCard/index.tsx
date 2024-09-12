import { Button } from '@components/ui/button';
import { SessionInfo } from '@devlink/SessionInfo';
import { MultidayCard } from '@devlink2/MultidayCard';
import { SelectedSlot } from '@devlink2/SelectedSlot';

import { ShowCode } from '@/components/Common/ShowCode';
import { UIBadge } from '@/components/Common/UIBadge';
import dayjs from '@/utils/dayjs';

import { useRequestAvailabilityContext } from '../../RequestAvailabilityContext';
import { convertMinutesToHoursAndMinutes } from '../../utils';

function DaySessionCard({
  showDayCount = true,
  cardIndex,
  totalSessionMinutes,
  sessions,
  dates,
}: {
  showDayCount?: boolean;
  cardIndex: number;
  totalSessionMinutes: number;
  sessions: any;
  dates: any;
}) {
  const {
    setOpenDaySlotPopup,

    daySlots,
    isSubmitted,
  } = useRequestAvailabilityContext();
  const handleOpen = async (day: number) => {
    setOpenDaySlotPopup(day);
  };

  return (
    <>
      <MultidayCard
        textDayCount={showDayCount ? `Day ${cardIndex + 1}` : ''}
        isSelected={
          daySlots.length &&
          daySlots.map((ele) => ele.round).includes(cardIndex + 1)
        }
        textTotalDuration={convertMinutesToHoursAndMinutes(totalSessionMinutes)}
        slotSessionInfo={sessions.map((session, i) => {
          return (
            <SessionInfo
              textSessionName={session.name}
              textSessionDuration={convertMinutesToHoursAndMinutes(
                session.session_duration,
              )}
              key={i}
            />
          );
        })}
        slotPickDateButton={
          <ShowCode>
            <ShowCode.When
              isTrue={
                (daySlots.map((ele) => ele.round).includes(cardIndex) ||
                  cardIndex < 1) &&
                !daySlots.map((ele) => ele.round).includes(cardIndex + 1)
              }
            >
              <Button
                variant='secondary'
                size='sm'
                onClick={() => handleOpen(cardIndex + 1)}
              >
                Pick Slots
              </Button>
            </ShowCode.When>
          </ShowCode>
        }
        slotChangeButton={
          <ShowCode>
            <ShowCode.When
              isTrue={
                !isSubmitted &&
                daySlots.length &&
                daySlots.map((ele) => ele.round).includes(cardIndex + 1)
              }
            >
              <Button
                variant='ghost'
                size='sm'
                onClick={() => handleOpen(cardIndex + 1)}
              >
                Change
              </Button>
            </ShowCode.When>
          </ShowCode>
        }
        textSelectedSlots={`Selected ${dates.map((ele) => ele.slots).flat().length} slots across ${dates.length} days `}
        // date listing slots

        slotSelected={
          dates.length &&
          dates.map((ele, i) => {
            return (
              <SelectedSlot
                textDate={dayjs(ele.curr_day).format('DD MMMM YYYY')}
                slotBadge={ele.slots.map((slot, i) => {
                  return (
                    <UIBadge
                      color={isSubmitted ? 'success' : 'warning'}
                      key={i}
                      textBadge={`${dayjs(slot.startTime).format('hh:mm A')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
                    />
                  );
                })}
                key={i}
              />
            );
          })
        }
      />
    </>
  );
}

export default DaySessionCard;
