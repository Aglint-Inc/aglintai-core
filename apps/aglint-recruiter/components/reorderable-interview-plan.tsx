'use client';

import { useQuery } from '@tanstack/react-query';
import {
  CircleCheck,
  Edit,
  FileText,
  Minus,
  Phone,
  Plus,
  Trophy,
  UserCircle,
  Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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
import dayjs from '@/src/utils/dayjs';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

type Step =
  | Awaited<ReturnType<typeof fetchProgressByJobId>>
  | Awaited<ReturnType<typeof fetchProgressByApplicationId>>;

const iconOptions = { UserCircle, Phone, Users, FileText, Trophy };

const useInterviewPlanProgress = ({
  job_id,
  application_id,
}: {
  job_id: string;
  application_id: string;
}) => {
  const result = useQuery({
    queryKey: ['interview_plan_progress', job_id],
    queryFn: () => fetchProgress({ job_id, application_id }),
    retry: false,
  });

  return result;
};

const fetchProgress = async ({
  job_id,
  application_id,
}: {
  job_id: string | null;
  application_id: string | null;
}) => {
  let result = [];
  if (job_id) {
    result = await fetchProgressByJobId(job_id);
  }
  if (application_id) {
    result = await fetchProgressByApplicationId(application_id);
  }
  return result as Step;
};

const fetchProgressByJobId = async (job_id) => {
  const { data, error } = await supabase
    .from('interview_progress')
    .select(
      'icon,id,job_id,application_id,name,order,icon,description,is_completed',
    )
    .eq('job_id', job_id);
  if (error) throw new Error(error.message);
  return data;
};
const fetchProgressByApplicationId = async (application_id: string) => {
  const { data, error } = await supabase
    .from('interview_progress')
    .select(
      'icon,id,job_id,application_id,name,order,icon,description,is_completed',
    )
    .eq('application_id', application_id);
  if (error) throw new Error(error.message);
  return data;
};

export default function ReorderableInterviewPlan({
  jobId,
  applicationId,
}: {
  jobId: string | null;
  applicationId: string | null;
}) {
  const { isLoading, data, refetch } = useInterviewPlanProgress({
    job_id: jobId,
    application_id: applicationId,
  });

  const [steps, setSteps] = useState<Step>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [newStep, setNewStep] = useState<Step[number]>({
    icon: '',
    job_id: jobId,
    application_id: applicationId,
    name: '',
    order: null,
    id: null,
    description: '',
    is_completed: null,
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.length > 0) {
      const sorted = data.sort((a, b) => a.order - b.order);

      setSteps(sorted);
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
    try {
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
        toast.error(error.message);
      }

      await refetch();
      toast.success('update successfully');
      setEditingId(null);
    } catch (e) {
      toast.error(e.message);
    }
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
      const order_id = steps?.length
        ? steps.sort((a, b) => a.order - b.order)[steps?.length - 1].order + 1
        : 1;
      const { error } = await supabase.from('interview_progress').insert({
        name: newStep.name,
        job_id: jobId,
        application_id: applicationId,
        icon: newStep.icon,
        order: order_id,
        description: newStep.description,
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
        icon: '',
        application_id: applicationId,
        job_id: jobId,
        order: null,
        is_completed: null,
      });
    }
  };

  const handleDeleteStep = async (id: number) => {
    try {
      const { error } = await supabase
        .from('interview_progress')
        .delete()
        .eq('id', id);

      const updates = steps
        .filter((step) => step.id !== id)
        .map((step, i) => ({ id: step.id, order: i + 1 }));

      const promises = updates.map((item) =>
        supabase
          .from('interview_progress')
          .update({ order: item.order })
          .eq('id', item.id),
      );
      await Promise.all(promises);

      if (error) {
        toast.error(error.message);
      }

      await refetch();
      toast.success('Deleted successfully');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const completeHandle = async (id: number, status: boolean) => {
    try {
      const { error } = await supabase
        .from('interview_progress')
        .update({
          is_completed: status,
          update_at: dayjs().toISOString(),
        })
        .eq('id', id);

      if (error) {
        toast.error(error.message);
      }

      await refetch();
      toast.success('update successfully');
      setEditingId(null);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const renderStep = (step: Step[number], index: number) => {
    const isEditing = editingId === step.id;
    const isNewStep = step.id === null;
    const Icon = Object.prototype.hasOwnProperty.call(iconOptions, step.icon)
      ? iconOptions[step.icon]
      : isNewStep
        ? isAddOpen
          ? steps.length > 0
            ? Minus
            : Plus
          : Plus
        : Edit;

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
                setIsAddOpen((pre) => !pre);
              }
            }}
          >
            <div
              className={`${step.is_completed ? 'bg-lime-100' : 'bg-muted'} p-2 w-10 h-10 flex items-center justify-center rounded-md`}
            >
              {step.is_completed ? (
                <CircleCheck
                  strokeWidth={1.5}
                  className='h-5 w-5 text-primary'
                  color='green'
                />
              ) : (
                <Icon strokeWidth={1.5} className='h-5 w-5 text-primary' />
              )}
            </div>
          </div>
          {index < steps.length && !isDragging && (
            <div
              className='h-full mx-auto bg-gray-300'
              style={{ width: '1px' }}
            ></div>
          )}
        </div>
        {
          <>
            <div className='flex-grow space-y-2 pb-4'>
              {(isEditing && !isNewStep) || (isAddOpen && isNewStep) ? (
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
                              icon: '',
                              job_id: jobId,
                              application_id: applicationId,
                              order: null,
                              is_completed: null,
                            });
                          else setEditingId(null);

                          setIsAddOpen((pre) => !pre);
                        }}
                        variant='outline'
                        size='sm'
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </>
              ) : !isNewStep ? (
                <div className='flex flex-col mb-4 gap-2'>
                  <h3 className='font-semibold text-md'>{step.name}</h3>
                  <p className='text-sm'>{step.description}</p>
                  <div className='flex space-x-2'>
                    <Button
                      variant='secondary'
                      onClick={() => handleEdit(step.id)}
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant='outline'>Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure to delete this Stage ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this stage. This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteStep(step.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    {step.application_id && (
                      <Button
                        variant='secondary'
                        onClick={() =>
                          completeHandle(step.id, !step.is_completed)
                        }
                      >
                        {step.is_completed
                          ? 'Mark as Uncomplete'
                          : 'Mark as Complete'}
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/*eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                  <div
                    className='font-semibold text-md cursor-pointer mt-2'
                    onClick={() => {
                      setIsAddOpen((pre) => !pre);
                    }}
                  >
                    Add New Stage
                  </div>
                </>
              )}
            </div>
          </>
        }
      </div>
    );
  };

  const reorder = ({
    list,
    startIndex,
    endIndex,
  }: {
    list: Step;
    startIndex: number;
    endIndex: number;
  }) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = async (result) => {
    setIsDragging(false);
    if (!result.destination) {
      return;
    }

    const newItems = reorder({
      list: steps,
      startIndex: result.source.index,
      endIndex: result.destination.index,
    });

    setSteps(newItems);

    // update order in db
    const updates = newItems.map((step, i) => ({ id: step.id, order: i + 1 }));

    const promises = updates.map((item) =>
      supabase
        .from('interview_progress')
        .update({ order: item.order })
        .eq('id', item.id),
    );
    await Promise.all(promises);
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  return (
    <div className='max-w-2xl mt-8'>
      <div className='relative' ref={timelineRef}>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? '#ebebeb' : '',
                  marginBlock: snapshot.isDraggingOver ? 5 : 0,
                }}
                ref={provided.innerRef}
              >
                {steps.map((step, index) => (
                  <Draggable
                    key={step.id}
                    draggableId={String(step.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          backgroundColor: isDragging ? 'white' : '',
                          paddingTop: snapshot.isDragging ? 5 : '',
                          borderRadius: 8,
                          boxShadow: snapshot.isDragging
                            ? 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
                            : '',
                          paddingLeft: snapshot.isDragging ? 5 : '',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {renderStep(step, index)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {renderStep(newStep, steps.length)}
      </div>
    </div>
  );
}
