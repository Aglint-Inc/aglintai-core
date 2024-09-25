'use client';

import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import { useRequestSetupProgress } from '@requests/hooks/useRequestSetupProgress';
import { AlertCircle, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';
interface StepType {
  title: string;
  description: string;
  navLink: string;
  completed: boolean;
}

export default function LandingProgress() {
  const { data } = useRequestSetupProgress();
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<StepType[]>([]);

  useEffect(() => {
    if (data) {
      const newSteps = [
        {
          title: 'Set Interview Pool',
          description: 'Add at least one interviewer',
          completed: data.intervieModules,
          navLink: ROUTES['/interview-pool'](),
        },
        {
          title: 'Create Job',
          description: 'At least one job must be present',
          completed: data.jobs,
          navLink: ROUTES['/jobs/create'](),
        },
        {
          title: 'Add Candidate',
          description: 'Add at least one candidate/application',
          completed: data.candidates,
          navLink: ROUTES['/jobs'](),
        },
        {
          title: 'Set Interview Plan',
          description: 'Create an interview plan for the job',
          completed: data.interviewPlan,
          navLink: ROUTES['/jobs'](),
        },
      ];
      setSteps(newSteps);
      const completedSteps = newSteps.filter((step) => step.completed).length;
      setProgress((completedSteps / newSteps.length) * 100);
    }
  }, [data]);

  if (steps?.length > 0)
    return (
      <Card className='mx-auto max-h-fit w-full max-w-3xl'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold'>
            Welcome to Your Recruitment Dashboard!
          </CardTitle>
          <CardDescription className='text-center'>
            Let&apos;s get you set up to create your first request. Complete
            these steps to unlock the &quot;Create Request&quot; button.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Progress value={progress} className='w-full' />
          {steps.map((step) => (
            <List key={step.title} step={step} />
          ))}
        </CardContent>
      </Card>
    );
}

const List = ({ step }: { step: StepType }) => {
  const router = useRouterPro();
  return (
    <div className='flex items-center space-x-4'>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`}
      >
        {step.completed ? (
          <Check className='text-white' size={20} />
        ) : (
          <AlertCircle className='text-gray-500' size={20} />
        )}
      </div>
      <div className='flex-grow'>
        <h3 className='font-semibold'>{step.title}</h3>
        <p className='text-sm text-gray-600'>{step.description}</p>
      </div>
      <Button
        variant={step.completed ? 'outline' : 'default'}
        size='sm'
        onClick={() => router.push(step.navLink)}
        disabled={step.completed}
      >
        {step.completed ? 'Completed' : 'Complete'}
      </Button>
    </div>
  );
};
