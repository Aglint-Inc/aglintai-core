import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import DaySessionCard from './DaySessionCard';

function MultiDaySessions() {
  const {
    multiDaySessions,

    selectedSlots,
  } = useRequestAvailabilityContext();
  return (
    <>
      <div className='flex flex-col items-center'>
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
