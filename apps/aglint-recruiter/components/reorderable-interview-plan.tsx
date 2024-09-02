'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Check,
  UserCircle,
  Phone,
  Users,
  FileText,
  Trophy,
  Plus,
  Edit,
  Save,
  X,
  GripVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Step = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof iconOptions;
  completed: boolean;
};

const initialSteps: Step[] = [
  {
    id: '1',
    title: 'Resume Screening',
    description: "Initial review of candidate's resume and application",
    icon: 'FileText',
    completed: true,
  },
  {
    id: '2',
    title: 'Phone Interview',
    description: 'Brief phone call to assess basic qualifications',
    icon: 'Phone',
    completed: true,
  },
  {
    id: '3',
    title: 'Technical Assessment',
    description: 'Online coding test or take-home project',
    icon: 'UserCircle',
    completed: false,
  },
  {
    id: '4',
    title: 'On-site Interview',
    description: 'In-person or video interviews with team members',
    icon: 'Users',
    completed: false,
  },
  {
    id: '5',
    title: 'Final Decision',
    description: 'Review of feedback and decision making',
    icon: 'Trophy',
    completed: false,
  },
];

const iconOptions = { UserCircle, Phone, Users, FileText, Trophy };

export function ReorderableInterviewPlan() {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStep, setNewStep] = useState<Step>({
    id: '',
    title: '',
    description: '',
    icon: 'FileText',
    completed: false,
  });
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const completedSteps = steps.filter((step) => step.completed).length;
    setProgress((completedSteps / steps.length) * 100);
  }, [steps]);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
  };

  const handleChange = (id: string, field: keyof Step, value: string) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step,
      ),
    );
  };

  const handleAddStep = () => {
    if (newStep.title && newStep.description) {
      setSteps([...steps, { ...newStep, id: `${steps.length + 1}` }]);
      setNewStep({
        id: '',
        title: '',
        description: '',
        icon: 'FileText',
        completed: false,
      });
    }
  };

  const handleToggleComplete = (id: string) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step,
      ),
    );
  };

  const renderStep = (step: Step, index: number) => {
    const Icon = iconOptions[step.icon];
    const isEditing = editingId === step.id;
    const isNewStep = step.id === '';

    return (
      <div key={step.id} className='flex items-start space-x-4 mb-4'>
        <div className='flex flex-col items-center cursor-move'>
          <GripVertical className='w-6 h-6 text-gray-400' />
        </div>
        <div className='relative'>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer z-10 relative ${
              step.completed
                ? 'bg-green-500 text-white'
                : index === steps.findIndex((s) => !s.completed)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-500'
            }`}
            onClick={() => !isNewStep && handleToggleComplete(step.id)}
          >
            {step.completed ? (
              <Check className='w-4 h-4' />
            ) : (
              <Icon className='w-4 h-4' />
            )}
          </div>
          {index < steps.length - 1 && (
            <div className='absolute top-3 left-3 w-0.5 h-full bg-gray-300 -z-10'></div>
          )}
        </div>
        <div className='flex-grow space-y-2 pb-4'>
          {isEditing || isNewStep ? (
            <>
              <Input
                value={isNewStep ? newStep.title : step.title}
                onChange={(e) =>
                  isNewStep
                    ? setNewStep({ ...newStep, title: e.target.value })
                    : handleChange(step.id, 'title', e.target.value)
                }
                placeholder='Stage Title'
                className='font-semibold'
              />
              <Textarea
                value={isNewStep ? newStep.description : step.description}
                onChange={(e) =>
                  isNewStep
                    ? setNewStep({
                        ...newStep,
                        description: e.target.value,
                      })
                    : handleChange(step.id, 'description', e.target.value)
                }
                placeholder='Stage Description'
                className='text-gray-600'
              />
              <Select
                value={isNewStep ? newStep.icon : step.icon}
                onValueChange={(value) =>
                  isNewStep
                    ? setNewStep({
                        ...newStep,
                        icon: value as keyof typeof iconOptions,
                      })
                    : handleChange(step.id, 'icon', value)
                }
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select an icon' />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(iconOptions).map((iconName) => (
                    <SelectItem key={iconName} value={iconName}>
                      {iconName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className='flex space-x-2'>
                <Button
                  onClick={() =>
                    isNewStep ? handleAddStep() : handleSave(step.id)
                  }
                  size='sm'
                >
                  <Save className='w-4 h-4 mr-2' />
                  {isNewStep ? 'Add' : 'Save'}
                </Button>
                <Button
                  onClick={() =>
                    isNewStep
                      ? setNewStep({
                          id: '',
                          title: '',
                          description: '',
                          icon: 'FileText',
                          completed: false,
                        })
                      : setEditingId(null)
                  }
                  variant='outline'
                  size='sm'
                >
                  <X className='w-4 h-4 mr-2' />
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className='font-semibold text-lg'>{step.title}</h3>
              <p className='text-gray-600'>{step.description}</p>
              <Button
                onClick={() => handleEdit(step.id)}
                variant='ghost'
                size='sm'
                className='mt-2'
              >
                <Edit className='w-4 h-4 mr-2' />
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Reorderable Interview Plan</h1>
      <div className='relative mb-8'>
        <div className='w-full h-2 bg-gray-200 rounded-full'>
          <div
            className='h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className='mt-2 text-sm text-gray-600'>
          Progress: {Math.round(progress)}%
        </div>
      </div>
      <div className='relative' ref={timelineRef}>
        <div className='absolute top-0 left-10 w-0.5 h-full bg-gray-300 -z-10'></div>
        <div
          className='absolute top-0 left-10 w-0.5 bg-green-500 transition-all duration-300 ease-in-out -z-10'
          style={{ height: `${progress}%` }}
        ></div>
        {steps.map((step, index) => renderStep(step, index))}
        {renderStep(newStep, steps.length)}
      </div>
    </div>
  );
}
