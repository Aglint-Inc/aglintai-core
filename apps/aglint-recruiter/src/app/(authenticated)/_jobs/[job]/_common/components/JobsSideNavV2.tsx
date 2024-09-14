import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import {
  BarChart,
  Calendar,
  FileText,
  UserPlus,
  Workflow,
  XCircle,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useJob } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';

const JobsSideNavV2 = () => {
  const router = useRouter();
  const { job, manageJob } = useJob();
  const { isScoringEnabled } = useRolesAndPermissions();
  const [isCloseJobDialogOpen, setIsCloseJobDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handlePush = (route: string) => {
    router.push(ROUTES[route]({ job: job?.id }));
  };

  const navItems = [
    {
      icon: <FileText className='w-5 h-5' />,
      label: 'Job Details',
      route: '/jobs/[job]/job-details',
      show: true,
    },
    {
      icon: <BarChart className='w-5 h-5' />,
      label: 'Profile Score',
      route: '/jobs/[job]/profile-score',
      show: isScoringEnabled,
    },
    {
      icon: <UserPlus className='w-5 h-5' />,
      label: 'Hiring Team',
      route: '/jobs/[job]/hiring-team',
      show: true,
    },
    {
      icon: <Calendar className='w-5 h-5' />,
      label: 'Interview Plan',
      route: '/jobs/[job]/interview-plan',
      show: true,
    },
    {
      icon: <Workflow className='w-5 h-5' />,
      label: 'Workflows',
      route: '/jobs/[job]/workflows',
      show: true,
    },
  ];

  const handleCloseJob = () => {
    if (confirmText === job?.job_title) {
      // Implement close/delete job logic here
      // console.log('Closing/Deleting job:', job?.id);
      setIsCloseJobDialogOpen(false);
    }
  };

  return (
    <>
      <nav className='p-4 w-64 space-y-2'>
        {navItems.map(
          (item, index) =>
            item.show && (
              <Button
                key={index}
                variant='ghost'
                className='w-full justify-start'
                onClick={() => handlePush(item.route)}
              >
                {item.icon}
                <span className='ml-2'>{item.label}</span>
              </Button>
            ),
        )}
        {manageJob && (
          <Button
            variant='destructive'
            className='w-full justify-start mt-4'
            onClick={() => setIsCloseJobDialogOpen(true)}
          >
            <XCircle className='mr-2 h-5 w-5' />
            <span>{job?.status !== 'published' ? 'Delete' : 'Close'} Job</span>
          </Button>
        )}
      </nav>

      <Dialog
        open={isCloseJobDialogOpen}
        onOpenChange={setIsCloseJobDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {job?.status !== 'published' ? 'Delete' : 'Close'} This Job
            </DialogTitle>
            <DialogDescription>
              {job?.status !== 'published'
                ? 'Deleting this job will permanently remove all related data and make the job inaccessible. Candidate data will remain unaffected.'
                : 'Closing this job will permanently stop all activities, including tasks and scheduled interviews. It will also remove the job from the company page and prevent any new applications or candidate imports.'}
            </DialogDescription>
          </DialogHeader>
          <p>
            Confirm by typing the job title{' '}
            <span className='font-semibold text-destructive'>
              {job?.job_title}
            </span>{' '}
            below.
          </p>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder='Type job title here'
          />
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsCloseJobDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleCloseJob}
              disabled={confirmText !== job?.job_title}
            >
              {job?.status !== 'published' ? 'Delete' : 'Close'} Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobsSideNavV2;