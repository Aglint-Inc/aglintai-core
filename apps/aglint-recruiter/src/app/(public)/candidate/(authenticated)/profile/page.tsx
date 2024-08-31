import CandidateForm from '@/src/components/CandiatePortal/Profile/CandidateForm';
import { ThemeSelector } from '@/src/components/CandiatePortal/Profile/ThemeSelector';
export default function ProfilePage() {
  return (
    <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8'>
      <main className='lg:w-[70%] space-y-6'>
        <CandidateForm />
      </main>
      <aside className='lg:w-[30%] space-y-6'>
        <ThemeSelector />
      </aside>
    </div>
  );
}
