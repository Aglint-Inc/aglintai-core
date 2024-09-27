'use client';

import { Calendar, Clock, User, UserCheck, Users } from 'lucide-react';
import { useState } from 'react';

import { useWorkflowQuery } from '@/queries/workflow';

import Main from './Main/Main';
import { Summary } from './Summary';
import { type AutomationCategory } from './type';

export default function EnhancedAutomationPage() {
  const { data, status } = useWorkflowQuery();
  console.log('data', status);

  const [automationCategories, setAutomationCategories] = useState<
    AutomationCategory[]
  >([
    {
      name: 'Candidate Experience',
      icon: <User className='h-4 w-4' />,
      automations: [
        {
          id: 'candidate1',
          question: 'What happens when a candidate books a meeting?',
          enabled: false,
          actions: [],
        },
        {
          id: 'candidate2',
          question: 'How do we respond if a candidate cancels?',
          enabled: false,
          actions: [],
        },
        {
          id: 'candidate3',
          question: 'What our process for rescheduling requests?',
          enabled: false,
          actions: [],
        },
      ],
    },
    {
      name: 'Interviewer Management',
      icon: <UserCheck className='h-4 w-4' />,
      automations: [
        {
          id: 'interviewer1',
          question:
            'How do we confirm when an interviewer accepts an invitation?',
          enabled: false,
          actions: [],
        },
        {
          id: 'interviewer2',
          question: 'What our follow-up when an interviewer confirms?',
          enabled: false,
          actions: [],
        },
        {
          id: 'interviewer3',
          question: 'How do we handle declined interview invitations?',
          enabled: false,
          actions: [],
        },
      ],
    },
    {
      name: 'Trainee Onboarding',
      icon: <Users className='h-4 w-4' />,
      automations: [
        {
          id: 'trainee1',
          question: 'What happens when a trainee qualifies?',
          enabled: false,
          actions: [],
        },
        {
          id: 'trainee2',
          question: 'How do we celebrate training completion?',
          enabled: false,
          actions: [],
        },
      ],
    },
    {
      name: 'Scheduling Management',
      icon: <Calendar className='h-4 w-4' />,
      automations: [
        {
          id: 'organizer1',
          question: 'What our process after sending an availability request?',
          enabled: false,
          actions: [],
        },
        {
          id: 'organizer2',
          question: 'How do we follow up on self-schedule requests?',
          enabled: false,
          actions: [],
        },
      ],
    },
    {
      name: 'Interview Process',
      icon: <Clock className='h-4 w-4' />,
      automations: [
        {
          id: 'shared1',
          question: 'What preparations do we make before an interview starts?',
          enabled: false,
          actions: [],
        },
        {
          id: 'shared2',
          question: 'How do we wrap up after an interview ends?',
          enabled: false,
          actions: [],
        },
      ],
    },
  ]);

  const [editingActions, setEditingActions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleActionEdit = (actionId: string) => {
    setEditingActions((prev) => ({ ...prev, [actionId]: !prev[actionId] }));
  };

  return (
    <div className='container mx-auto py-10'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Main
            automationCategories={automationCategories}
            editingActions={editingActions}
            setAutomationCategories={setAutomationCategories}
            toggleActionEdit={toggleActionEdit}
          />
        </div>
        <div className='md:col-span-1'>
          <Summary
            automationCategories={automationCategories}
            toggleActionEdit={toggleActionEdit}
          />
        </div>
      </div>
    </div>
  );
}
