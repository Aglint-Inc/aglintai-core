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
import type * as Icons from 'lucide-react';
import { useState } from 'react';

import { useFlags } from '@/company/hooks/useFlags';
import UITabs from '@/components/Common/UITabs';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { useJob } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';

type IconName = keyof typeof Icons;

const JobsSideNavV2 = () => {
  const router = useRouterPro();
  const { job, manageJob } = useJob();
  const { isScoringEnabled } = useRolesAndPermissions();
  const [isCloseJobDialogOpen, setIsCloseJobDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const { isShowFeature } = useFlags();
  const handlePush = (route: string) => {
    router.push(ROUTES[route as '/jobs/[job]']({ job: (job?.id ?? null)! }));
  };

  const currentTab = router.pathName.split('/').filter((job) => job)[2];

  const navItems: {
    name: string;
    id: string;
    show: boolean;
    icon: IconName;
  }[] = [
    {
      name: 'Job Details',
      id: 'job-details',
      show: true,
      icon: 'FileText',
    },
    {
      name: 'Profile Score',
      id: 'profile-score',
      show: isScoringEnabled,
      icon: 'CircleDashed',
    },
    {
      name: 'Hiring Team',
      id: 'hiring-team',
      show: true,
      icon: 'UserPlus',
    },
    {
      name: 'Interview Plan',
      id: 'interview-plan',
      show: isShowFeature('SCHEDULING'),
      icon: 'Calendar',
    },
    {
      name: 'Automations',
      id: 'workflows',
      show: isShowFeature('WORKFLOW'),
      icon: 'Workflow',
    },
    {
      name: 'Candidate Plan',
      id: 'candidate-plan',
      show: isShowFeature('CANDIDATE_PORTAL'),
      icon: 'CircleUser',
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
        <UITabs
          vertical
          tabs={navItems.map((tab) => ({
            icon: tab.icon,
            name: tab.name,
            id: tab.id,
          }))}
          defaultValue={currentTab}
          onClick={(value) => {
            handlePush(`/jobs/[job]/${value}`);
          }}
        />
      </nav>

      {manageJob && (
        <div className='absolute bottom-0 left-0 items-start gap-2 border-t border-red-100 bg-red-50 p-4'>
          <h4 className='mb-1 text-sm font-semibold'>Danger Zone</h4>
          <div className='flex flex-row items-end gap-4'>
            <p className='mb-2 text-sm text-muted-foreground'>
              {job?.status !== 'published'
                ? 'Permanently remove this job and all related data.'
                : 'Stop all activities and remove the job from the company page.'}
            </p>
            <Button
              variant='destructive'
              size='sm'
              onClick={() => setIsCloseJobDialogOpen(true)}
            >
              <span>
                {job?.status !== 'published' ? 'Delete' : 'Close'} Job
              </span>
            </Button>
          </div>
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
