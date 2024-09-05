'use client';

import { supabaseWrap } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Textarea } from '@components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import {
  Edit,
  FileText,
  GripVertical,
  Phone,
  Save,
  Trophy,
  UserCircle,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

type Step = Awaited<ReturnType<typeof fetchProgress>>;

const iconOptions = { UserCircle, Phone, Users, FileText, Trophy };

const useInterviewPlanProgress = ({ job_id }: { job_id: string }) => {
  const result = useQuery({
    queryKey: ['interview_plan_progress', job_id],
    queryFn: () => fetchProgress({ job_id }),
  });

  return result;
};

const fetchProgress = async ({ job_id }: { job_id: string }) => {
  const data = supabaseWrap(
    await supabase
      .from('interview_progress')
      .select('icon,id,job_id,name,order,icon,description')
      .eq('job_id', job_id),
  );
  return data;
};

export default function ReorderableInterviewPlan({ jobId }: { jobId: string }) {
  const { isLoading, data, refetch } = useInterviewPlanProgress({
    job_id: jobId,
  });
  const [isUpdating, setIsUpdating] = useState<Object>({});
  const [isAdding, setIsAdding] = useState<Object>(false);
  const [steps, setSteps] = useState<Step>([]);
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
      const sorted = data.sort((a, b) => a.order - b.order);
      setSteps(sorted);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleEdit = (id: number) => {
    setEditingId(id);
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

  const RenderStep = (step: Step[number], index: number) => {
    const isEditing = editingId === step.id;
    const isNewStep = step.id === null;

    const handleSave = async (id: number) => {
      try {
        setIsUpdating((pre) => ({ ...pre, [id]: true }));
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
          throw new Error(error.message);
        }

        await refetch();
        toast.success('update successfully');
        setEditingId(null);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsUpdating((pre) => ({ ...pre, [id]: false }));
      }
    };

    const handleAddStep = async () => {
      try {
        setIsAdding(true);
        if (newStep.name && newStep.description) {
          const order_id = data?.length ? data[data?.length - 1].order + 1 : 1;

          const { error } = await supabase.from('interview_progress').insert({
            name: newStep.name,
            job_id: jobId,
            icon: newStep.icon,
            order: order_id,
          });

          if (error) {
            throw new Error(error.message);
          }

          await refetch();
          toast.error('Added successfully');

          setNewStep({
            id: null,
            name: '',
            description: '',
            icon: 'FileText',
            job_id: jobId,
            order: null,
          });
        }
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsAdding(false);
      }
    };

    return (
      <div key={step.id} className='flex items-start space-x-4 mb-4'>
        <div className='flex flex-col items-center cursor-move'>
          <GripVertical className='w-6 h-6 text-gray-400' />
        </div>
        <div className='relative'>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer z-10 relative`}
          >
            {/* <Icon className='w-4 h-4' /> */}
            {step.order}
          </div>
          {index < steps.length - 1 && (
            <div className='absolute top-3 left-3 w-0.5 h-full bg-gray-300 -z-10'></div>
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
                  {isNewStep
                    ? isAdding
                      ? 'Adding'
                      : 'Add'
                    : isUpdating[step.id]
                      ? 'Saving...'
                      : 'Save'}
                </Button>
                <Button
                  onClick={() =>
                    isNewStep
                      ? setNewStep({
                          id: null,
                          name: '',
                          description: '',
                          icon: 'FileText',
                          job_id: jobId,
                          order: null,
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
              <h3 className='font-semibold text-lg'>{step.name}</h3>
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

      <div className='relative' ref={timelineRef}>
        {data?.length && steps.map((step, index) => RenderStep(step, index))}
        {RenderStep(newStep, steps.length)}
      </div>
    </div>
  );
}
