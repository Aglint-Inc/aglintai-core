'use client';
import { useEffect, useState } from 'react';

import { type candidatePortalProfileType } from '@/src/app/api/candidate_portal/get_profile/route';
import ProfileSkeleton from '@/src/components/CandiatePortal/components/ProfileSkeleton';
import ProfileView from '@/src/components/CandiatePortal/components/ProfileView';
// import { ThemeSelector } from '@/src/components/CandiatePortal/components/ThemeSelector';
// import { ThemeSelector } from '@/src/components/CandiatePortal/Profile/ThemeSelector';
//import Loader from '@/src/components/Common/Loader';


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
    // return <Loader />;
    return(
      <div className='mt-12'>
      <ProfileSkeleton/>
      </div>
    ); ;
  }

  if (data)
    return (
      <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8 mt-12'>
        <main className='lg:w-[70%] space-y-6 mx-auto'>
          {/* <CandidateForm formData={data} application_id={application_id}/> */}
          <ProfileView application_id={application_id} formData={data}/>
        </main>
        {/* <aside className='lg:w-[30%] space-y-6'></aside> */}
      </div>
    );
}
