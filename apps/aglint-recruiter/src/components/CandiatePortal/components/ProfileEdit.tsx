import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { useState } from 'react';

import CandidateForm from '../Profile/CandidateForm';

export function ProfileEdit() {
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
        <CandidateForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
