import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import DaySessionCard from './DaySessionCard';

function DaySessions({ singleDay }: { singleDay: boolean }) {
  const { multiDaySessions, selectedSlots } = useRequestAvailabilityContext();

  return (
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
            singleDay={singleDay}
            key={i}
            cardIndex={i}
            totalSessionMinutes={totalSessionMinutes}
            sessions={sessions}
            dates={dates}
          />
        );
      })}
    </div>
  );
}

export default DaySessions;
