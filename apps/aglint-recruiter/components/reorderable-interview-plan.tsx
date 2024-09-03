'use client';

import { useQuery } from '@tanstack/react-query';
import { FileText, Phone, Trophy, UserCircle, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

type Step = Awaited<ReturnType<typeof fetchProgress>>;

const iconOptions = { UserCircle, Phone, Users, FileText, Trophy };

const useInterviewPlanProgress = ({ job_id }: { job_id: string }) => {
  const result = useQuery({
    queryKey: ['interview_plan_progress', job_id],
    queryFn: () => fetchProgress({ job_id }),
    retry: false,
  });

  return result;
};

const fetchProgress = async ({ job_id }: { job_id: string }) => {
  const { data, error } = await supabase
    .from('interview_progress')
    .select('icon,id,job_id,name,order,icon,description')
    .eq('job_id', job_id);
  if (error) throw new Error(error.message);
  return data;
};

export default function ReorderableInterviewPlan({ jobId }: { jobId: string }) {
  const { isLoading, data, refetch } = useInterviewPlanProgress({
    job_id: jobId,
  });

  const [steps, setSteps] = useState<Step>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newStep, setNewStep] = useState<Step[number]>({
    icon: '',
    job_id: jobId,
    name: '',
    order: null,
    id: null,
    description: '',
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setSteps(data);
    }
    if (data?.length === 0) setIsAddOpen(true);
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = async (id: number) => {
    const updatedStep = steps.find((step) => step.id === id);
    const { error } = await supabase
      .from('interview_progress')
      .update({
        name: updatedStep.name,
        description: updatedStep.description,
        icon: updatedStep.icon,
      })
      .eq('id', id);

    if (error) {
      toast.error('something went wrong');
    }

    await refetch();
    toast.success('update successfully');
    setEditingId(null);
  };

  const handleChange = (
    id: number,
    field: keyof Step[number],
    value: string,
  ) => {
    setSteps(
      steps?.map((step) =>
        step.id === id ? { ...step, [field]: value } : step,
      ),
    );
  };

  const handleAddStep = async () => {
    if (newStep.name && newStep.description) {
      const order_id = data?.length ? data[data?.length - 1].order + 1 : 1;

      const { error } = await supabase.from('interview_progress').insert({
        name: newStep.name,
        job_id: jobId,
        icon: newStep.icon,
        order: order_id,
      });

      if (error) {
        toast.error('something went wrong');
      }

      await refetch();
      toast.success('Added successfully');
      setNewStep({
        id: null,
        name: '',
        description: '',
        icon: 'FileText',
        job_id: jobId,
        order: null,
      });
    }
  };

  const handleDeleteStep = async (id: number) => {
    try {
      const { error } = await supabase
        .from('interview_progress')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error(error.message);
      }

      await refetch();
      toast.success('Deleted successfully');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const renderStep = (step: Step[number], index: number) => {
    // const Icon = iconOptions[step.icon];
    const isEditing = editingId === step.id;
    const isNewStep = step.id === null;

    return (
      <div
        key={step.id}
        className='grid gap-4'
        style={{ gridTemplateColumns: 'max-content 1fr' }}
      >
        <div className='flex h-full items-stretch flex-col'>
          {/*eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            className={``}
            onClick={() => {
              if (isNewStep && steps.length > 0) {
                setIsAddOpen(false);
              }
            }}
          >
            <div className='bg-muted p-2 w-10 h-10 rounded-md'>
              {/* <Icon className='h-5 w-5 text-primary' /> */}
              {isNewStep && (steps.length > 0 ? '-' : '')}
            </div>
            {/* {step.order} */}
          </div>
          {index < steps.length && (
            <div
              className='h-full mx-auto bg-gray-300'
              style={{ width: '1px' }}
            ></div>
          )}
          {index === steps.length - 1 && !isAddOpen && (
            <>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions*/}
              <div className={``} onClick={() => setIsAddOpen((pre) => !pre)}>
                <div className='bg-muted p-2 w-10 h-10 rounded-md'>+</div>
              </div>
            </>
          )}
        </div>

        <div className='flex-grow space-y-2 pb-4'>
          {isEditing || isNewStep ? (
            <>
              <Input
                value={isNewStep ? newStep.name : step.name}
                onChange={(e) =>
                  isNewStep
                    ? setNewStep({ ...newStep, name: e.target.value })
                    : handleChange(step.id, 'name', e.target.value)
                }
                placeholder='Stage Title'
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
                  {/* <Save className='w-4 h-4 mr-2' /> */}
                  {isNewStep ? 'Add' : 'Save'}
                </Button>

                {steps.length > 0 && (
                  <Button
                    onClick={() => {
                      if (isNewStep)
                        setNewStep({
                          id: null,
                          name: '',
                          description: '',
                          icon: 'FileText',
                          job_id: jobId,
                          order: null,
                        });
                      else setEditingId(null);

                      if (isAddOpen && isNewStep) setIsAddOpen(false);
                    }}
                    variant='outline'
                    size='sm'
                  >
                    {/* <X className='w-4 h-4 mr-2' /> */}
                    Cancel
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className='flex flex-col mb-4 gap-2'>
              <h3 className='font-semibold text-md'>{step.name}</h3>
              <p className='text-sm'>{step.description}</p>
              <div className='flex space-x-2'>
                <Button variant='secondary' onClick={() => handleEdit(step.id)}>
                  Edit
                </Button>
                <Button
                  variant='outline'
                  onClick={() => handleDeleteStep(step.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const interviewStages = steps?.length
    ? steps.sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <div className='relative' ref={timelineRef}>
        {interviewStages.map((step, index) => renderStep(step, index))}
        {isAddOpen && renderStep(newStep, steps.length)}
      </div>
    </div>
  );
}
