import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { useState } from 'react';

import { candidatePortalProfileType } from '@/app/api/candidate_portal/get_profile/route';

import CandidateForm from '../Profile/CandidateForm';

export function ProfileEdit({
  application_id,
  formData,
  refetchProfile,
}: {
  application_id: string;
  formData: candidatePortalProfileType;
  refetchProfile: any;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={() => setIsDialogOpen(true)}>
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px] p-0'>
        <CandidateForm
          formData={formData}
          application_id={application_id}
          refetchProfile={refetchProfile}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
