'use client';
import InterviewScheduler from '@/src/components/CandiatePortal/Home/InterviewScheduler';
import { Overview } from '@/src/components/CandiatePortal/Home/Overview';
import { Footer } from '@/src/components/CandiatePortal/Layout/Footer';
import Navbar from '@/src/components/CandiatePortal/Layout/Navbar';
import { PageHeader } from '@/src/components/CandiatePortal/Layout/PageHeader';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className='w-full'>
        <PageHeader />
      </div>
      <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8'>
        <main className='lg:w-[70%] space-y-6'>
          <Overview />
        </main>
        <aside className='lg:w-[30%] space-y-6'>
          <InterviewScheduler />
        </aside>
      </div>
      <Footer />
    </div>
  );
}
