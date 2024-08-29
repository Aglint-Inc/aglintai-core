import InterviewScheduler from '@/src/components/CandiatePortal/Home/InterviewScheduler';
import { Overview } from '@/src/components/CandiatePortal/Home/Overview';

export default function HomePage() {
  return (
    <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8 p-6'>
      <main className='lg:w-[70%] space-y-6'>
        <Overview />
      </main>
      <aside className='lg:w-[30%] space-y-6'>
        <InterviewScheduler />
      </aside>
    </div>
  );
}
