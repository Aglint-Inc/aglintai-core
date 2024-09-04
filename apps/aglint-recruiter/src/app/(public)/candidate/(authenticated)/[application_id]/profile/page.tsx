'use client';
import { useEffect, useState } from 'react';

import { type candidatePortalProfileType } from '@/app/api/candidate_portal/get_profile/route';
import ProfileView from '@/components/CandiatePortal/components/ProfileView';
import { ThemeSelector } from '@/components/CandiatePortal/components/ThemeSelector';
// import { ThemeSelector } from '@/components/CandiatePortal/Profile/ThemeSelector';
import Loader from '@/components/Common/Loader';

export default function ProfilePage({ params }) {
  const [data, setData] = useState<candidatePortalProfileType>(null);

  const [isLoading, setIsLoading] = useState(true);
  const application_id = params.application_id;
  // const application_id = '4bbaf6ec-775f-4cfe-8627-553b327bffa9';

  const getProfile = async () => {
    try {
      const response = await fetch('/api/candidate_portal/get_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ application_id: application_id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setData(data);
    } catch (e) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (!data) return <ThemeSelector />;

  if (data)
    return (
      <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8'>
        <main className='lg:w-[70%] space-y-6 mx-auto mt-8'>
          {/* <CandidateForm formData={data} application_id={application_id}/> */}
          <ProfileView application_id={application_id} formData={data} />
        </main>
        {/* <aside className='lg:w-[30%] space-y-6'></aside> */}
      </div>
    );
}
