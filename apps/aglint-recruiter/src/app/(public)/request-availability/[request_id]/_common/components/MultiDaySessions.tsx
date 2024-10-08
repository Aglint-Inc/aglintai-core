import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import DaySessionCard from './DaySessionCard';

function MultiDaySessions() {
  const {
    multiDaySessions,

    selectedSlots,
  } = useRequestAvailabilityContext();
  return (
    <>
      <div className='flex max-h-[60vh] w-full flex-col items-center gap-4 overflow-auto'>
        <div className='flex w-full flex-col gap-2'>
          {multiDaySessions.map((sessions, i) => {
            const totalSessionMinutes = sessions.reduce(
              (accumulator, session) => accumulator + session.session_duration,
              0,
            );
            const dates =
              selectedSlots.find((ele) => ele.round === i + 1)?.dates || [];
            return (
              <DaySessionCard
                key={i}
                cardIndex={i}
                totalSessionMinutes={totalSessionMinutes}
                sessions={sessions}
                dates={dates}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MultiDaySessions;
