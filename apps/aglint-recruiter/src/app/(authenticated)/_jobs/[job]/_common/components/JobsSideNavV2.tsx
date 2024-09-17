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
import { BarChart, Calendar, FileText, UserPlus, Workflow } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useJob } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';

const JobsSideNavV2 = () => {
  const router = useRouter();
  const { job, manageJob } = useJob();
  const { isScoringEnabled } = useRolesAndPermissions();
  const [isCloseJobDialogOpen, setIsCloseJobDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const { isShowFeature } = useAuthDetails();
  const handlePush = (route: string) => {
    router.push(ROUTES[route]({ job: job?.id }));
  };

  const currentTab = router.pathname.split('/').filter((job) => job)[2];

  const navItems = [
    {
      icon: <FileText className='h-5 w-5' />,
      label: 'Job Details',
      route: 'job-details',
      show: true,
    },
    {
      icon: <BarChart className='h-5 w-5' />,
      label: 'Profile Score',
      route: 'profile-score',
      show: isScoringEnabled,
    },
    {
      icon: <UserPlus className='h-5 w-5' />,
      label: 'Hiring Team',
      route: 'hiring-team',
      show: true,
    },
    {
      icon: <Calendar className='h-5 w-5' />,
      label: 'Interview Plan',
      route: 'interview-plan',
      show: isShowFeature('SCHEDULING'),
    },
    {
      icon: <Workflow className='h-5 w-5' />,
      label: 'Workflows',
      route: 'workflows',
      show: isShowFeature('WORKFLOW'),
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
      <nav className='space-y-2 py-4'>
        {navItems.map(
          (item, index) =>
            item.show && (
              <UIButton
                key={index}
                variant={currentTab === item.route ? 'secondary' : 'ghost'}
                className='w-full justify-start'
                onClick={() => handlePush(`/jobs/[job]/${item.route}`)}
              >
                {item.icon}
                <span className='ml-2'>{item.label}</span>
              </UIButton>
            ),
        )}
      </nav>

      {manageJob && (
        <div className='mt-12 max-w-60 rounded-md border p-4'>
          <h4 className='mb-1 text-sm font-semibold'>
            {job?.status !== 'published' ? 'Delete' : 'Close'} Job
          </h4>
          <p className='mb-2 text-xs text-muted-foreground'>
            {job?.status !== 'published'
              ? 'Permanently remove this job and all related data.'
              : 'Stop all activities and remove the job from the company page.'}
          </p>
          <Button
            variant='link'
            className='h-auto p-0 text-destructive'
            onClick={() => setIsCloseJobDialogOpen(true)}
          >
            <span>{job?.status !== 'published' ? 'Delete' : 'Close'} Job</span>
          </Button>
        </div>
      )}

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
