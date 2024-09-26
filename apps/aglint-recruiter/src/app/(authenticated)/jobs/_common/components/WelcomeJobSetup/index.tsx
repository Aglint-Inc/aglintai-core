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
import { AlertCircle, Check } from 'lucide-react';

import { useRouterPro } from '@/hooks/useRouterPro';
import { useCompanySetup } from '@/jobs/hooks/useCompanySetup';

export default function WelcomeJobSetup() {
  const { steps, progress, isLoading } = useCompanySetup();
  const router = useRouterPro();
  if (isLoading) return <>Loading</>;
  return (
    <Card className='mx-auto mt-[150px] w-full max-w-4xl'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>
          Welcome to Aglint AI!
        </CardTitle>
        <CardDescription>
          To get started, please complete the following steps to set up your
          company:
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Progress value={progress} className='w-full' />
        {steps.map((step) => (
          <div key={step.title} className='flex items-start space-x-2'>
            <div className='mt-1'>
              {step.completed ? (
                <Check className='h-5 w-5 text-green-500' />
              ) : (
                <AlertCircle className='h-5 w-5 text-yellow-500' />
              )}
            </div>
            <div className='flex w-full items-center justify-between'>
              <div>
                <h3 className='text-lg font-semibold'>{step.title}</h3>
                <p className='mb-2 text-sm text-gray-600'>{step.description}</p>
              </div>
              <Button
                variant={step.completed ? 'outline' : 'default'}
                onClick={() => {
                  router.push(step.navLink);
                }}
              >
                {step.completed ? 'Update' : 'Start'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
