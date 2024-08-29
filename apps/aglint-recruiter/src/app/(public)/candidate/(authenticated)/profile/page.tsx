import CandidateForm from '@/src/components/CandiatePortal/Profile/CandidateForm';
export default function ProfilePage() {
  return (
    <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8'>
      <main className='lg:w-[70%] space-y-6'>
        <CandidateForm />
      </main>
      <aside className='lg:w-[30%] space-y-6'></aside>
    </div>
  );
}
