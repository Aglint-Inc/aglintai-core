import { dayjsLocal } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
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
} from '@components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Skeleton } from '@components/ui/skeleton';
import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Edit,
  FileText,
  Minus,
  Phone,
  Plus,
  SquarePen,
  Trash2,
  Trophy,
  UserCircle,
  Users,
} from 'lucide-react';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITextField from '@/components/Common/UITextField';
import { supabase } from '@/utils/supabase/client';

import {
  type ProgressSteps,
  useInterviewPlanProgress,
} from '../hooks/useInterviewPlanProgress';

const iconOptions = { UserCircle, Phone, Users, FileText, Trophy };

export default function ReorderableInterviewPlan({
  jobId,
  applicationId,
}: {
  jobId: string;
  applicationId: string;
}) {
  const { isLoading, data, refetch } = useInterviewPlanProgress({
    job_id: jobId!,
    application_id: applicationId!,
  });

  const [steps, setSteps] = useState<ProgressSteps>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isOrderChanging, setIsOrderChanging] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newStep, setNewStep] = useState<ProgressSteps[number]>({
    icon: '',
    job_id: jobId,
    application_id: applicationId,
    name: '',
    order: null,
    id: null!,
    description: '',
    is_completed: null,
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((data ?? []).length > 0) {
      setSteps(data);
    } else setSteps([]);
    if ((data ?? [])?.length === 0) setIsAddOpen(true);
  }, [data]);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            style={{
              width: '100%',
              height: '20px',
            }}
          />
        ))}
      </>
    );
  }

  const renderStep = (step: ProgressSteps[number], index: number) => {
    const isEditing = editingId === step.id;
    const isNewStep = step.id === null;

    let Icon;

    if (Object.prototype.hasOwnProperty.call(iconOptions, step.icon!)) {
      Icon = iconOptions[step.icon as keyof typeof iconOptions];
    } else if (isNewStep) {
      if (isAddOpen) {
        Icon = steps.length > 0 ? Minus : Plus;
      } else {
        Icon = Plus;
      }
    } else {
      Icon = Edit;
    }

    return (
      <div
        key={step.id}
        className='grid gap-4'
        style={{ gridTemplateColumns: 'max-content 1fr' }}
      >
        <div className='flex h-full flex-col items-stretch'>
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
              className={`${step.is_completed ? 'bg-lime-100' : 'bg-muted'} flex h-10 w-10 items-center justify-center rounded-md p-0`}
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
          {index < steps.length && (
            <div
              className='mx-auto h-full bg-gray-300'
              style={{ width: '1px' }}
            ></div>
          )}
        </div>
        <Block
          isEditing={isEditing}
          isNewStep={isNewStep}
          setNewStep={setNewStep}
          isAddOpen={isAddOpen}
          newStep={newStep}
          step={step}
          steps={steps}
          applicationId={applicationId}
          refetch={refetch}
          jobId={jobId}
          setIsAddOpen={setIsAddOpen}
          setEditingId={setEditingId}
          isOrderChanging={isOrderChanging}
          setIsOrderChanging={setIsOrderChanging}
          setSteps={setSteps}
          index={index}
        />
      </div>
    );
  };

  return (
    <div className='max-w-2xl'>
      <div
        className={`relative ${isOrderChanging ? 'opacity-25' : ''} `}
        ref={timelineRef}
      >
        {steps
          .sort((a, b) => a.order! - b.order!)
          .map((step, index) => renderStep(step, index))}
        {renderStep(newStep, steps.length)}
      </div>
    </div>
  );
}

const Block = ({
  isEditing,
  isNewStep,
  setNewStep,
  isAddOpen,
  newStep,
  step,
  steps,
  applicationId,
  refetch,
  jobId,
  setIsAddOpen,
  setEditingId,
  isOrderChanging,
  setIsOrderChanging,
  setSteps,
  index,
}: {
  isEditing: boolean;
  isNewStep: boolean;
  newStep: ProgressSteps[number];
  setNewStep: Dispatch<SetStateAction<ProgressSteps[number]>>;
  isAddOpen: boolean;
  step: ProgressSteps[number];
  steps: ProgressSteps[number][];
  applicationId: string;
  refetch: () => void;
  jobId: string;
  setIsAddOpen: Dispatch<SetStateAction<boolean>>;
  setEditingId: Dispatch<SetStateAction<number | null>>;
  isOrderChanging: boolean;
  setIsOrderChanging: Dispatch<SetStateAction<boolean>>;
  setSteps: Dispatch<SetStateAction<ProgressSteps[number][]>>;
  index: number;
}) => {
  const [isHover, setIsHover] = useState(false);
  const handleDown = async (selectIndex: number) => {
    try {
      setIsOrderChanging(true);
      setIsHover(false);
      // update order in db
      const selectedStep = steps[selectIndex];
      const lowerStep = steps[selectIndex + 1];

      const updates = [
        { id: lowerStep.id, order: selectedStep?.order },
        { id: selectedStep.id, order: lowerStep?.order },
      ];

      const promises = updates.map((item) =>
        supabase
          .from('interview_progress')
          .update({ order: item.order })
          .eq('id', item.id),
      );
      await Promise.all(promises);
      setSteps((pre) =>
        pre.map((step) =>
          step.id === selectedStep.id
            ? { ...step, order: lowerStep?.order }
            : step.id === lowerStep.id
              ? { ...step, order: selectedStep?.order }
              : step,
        ),
      );
    } catch (e) {
      //
    } finally {
      setIsOrderChanging(false);
    }
  };
  const handleUp = async (selectIndex: number) => {
    try {
      setIsOrderChanging(true);
      setIsHover(false);
      const selectedStep = steps[selectIndex];
      const upperStep = steps[selectIndex - 1];

      const updates = [
        { id: upperStep.id, order: selectedStep?.order },
        { id: selectedStep.id, order: upperStep?.order },
      ];

      const promises = updates.map((item) =>
        supabase
          .from('interview_progress')
          .update({ order: item.order })
          .eq('id', item.id),
      );
      await Promise.all(promises);

      setSteps((pre) =>
        pre.map((step) =>
          step.id === selectedStep.id
            ? { ...step, order: upperStep?.order }
            : step.id === upperStep.id
              ? { ...step, order: selectedStep?.order }
              : step,
        ),
      );
    } catch (e) {
      //
    } finally {
      setIsOrderChanging(false);
    }
  };
  const completeHandle = async (id: number, status: boolean) => {
    try {
      const { error } = await supabase
        .from('interview_progress')
        .update({
          is_completed: status,
          update_at: dayjsLocal().toISOString(),
        })
        .eq('id', id);

      if (error) {
        toast({ title: error.message, variant: 'destructive' });
      }

      await refetch();
      toast({ title: 'update successfully' });
      setEditingId(null);
    } catch (e: any) {
      toast({ title: e.message, variant: 'destructive' });
    }
  };

  const handleDeleteStep = async (id: number) => {
    try {
      setIsOrderChanging(true);
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
        toast({ title: error.message, variant: 'destructive' });
      }

      await refetch();
      toast({ title: 'Deleted successfully' });
    } catch (e: any) {
      toast({ title: e.message, variant: 'destructive' });
    } finally {
      setIsOrderChanging(false);
    }
  };
  const handleAddStep = async () => {
    if (newStep.name && newStep.description) {
      const order_id = (steps ?? []).length
        ? (steps ?? []).sort((a, b) => a.order! - b.order!)[
            (steps ?? []).length - 1
          ].order! + 1
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
        toast({ title: 'something went wrong', variant: 'destructive' });
      }

      await refetch();
      toast({ title: 'Added successfully' });

      setNewStep({
        id: null!,
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
  const handleChange = (
    id: number,
    field: keyof ProgressSteps[number],
    value: string,
  ) => {
    setSteps(
      steps?.map((step) =>
        step.id === id ? { ...step, [field]: value } : step,
      ),
    );
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = async (id: number) => {
    try {
      setIsOrderChanging(true);
      const updatedStep = steps.find((step) => step.id === id)!;
      const { error } = await supabase
        .from('interview_progress')
        .update({
          name: updatedStep.name,
          description: updatedStep.description,
          icon: updatedStep.icon,
        })
        .eq('id', id);

      if (error) {
        toast({ title: error.message, variant: 'destructive' });
      }

      await refetch();
      toast({ title: 'update successfully' });
      setEditingId(null);
    } catch (e: any) {
      toast({ title: e.message, variant: 'destructive' });
    } finally {
      setIsOrderChanging(false);
    }
  };
  return (
    <div
      className='relative mb-8 flex flex-grow space-y-2 rounded-sm border px-2'
      onMouseEnter={() => setIsHover(true)}
      onFocus={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onBlur={() => setIsHover(false)}
    >
      {(isEditing && !isNewStep) || (isAddOpen && isNewStep) ? (
        //edit step
        <div className='flex flex-1 flex-col gap-2 py-2'>
          <UITextField
            value={(isNewStep ? newStep.name : step.name)!}
            onChange={(e) =>
              isNewStep
                ? setNewStep({ ...newStep, name: e.target.value })
                : handleChange(step.id, 'name', e.target.value)
            }
            placeholder='Stage Title'
          />
          <UITextField
            value={(isNewStep ? newStep.description : step.description)!}
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
            value={(isNewStep ? newStep.icon : step.icon)!}
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
            <UIButton
              onClick={() =>
                isNewStep ? handleAddStep() : handleSave(step.id)
              }
              size='sm'
            >
              {isNewStep ? 'Add' : 'Save'}
            </UIButton>

            {steps.length > 0 && (
              <UIButton
                onClick={() => {
                  if (isNewStep)
                    setNewStep({
                      id: null!,
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
              </UIButton>
            )}
          </div>
        </div>
      ) : !isNewStep ? (
        //details
        <div className='flex flex-1 flex-col gap-2 p-2'>
          <h3 className='text-lg font-semibold'>{step.name}</h3>
          <p className='text-sm'>{step.description}</p>
          <div className='flex space-x-2'>
            {step.application_id && (
              <UIButton
                size='sm'
                variant='secondary'
                onClick={() => completeHandle(step.id, !step.is_completed)}
              >
                {step.is_completed ? 'Mark not complete' : 'Mark as complete'}
              </UIButton>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className='text-md cursor-pointer p-2 font-semibold'
            onClick={() => {
              setIsAddOpen((pre) => !pre);
            }}
          >
            Add New Stage
          </div>
        </>
      )}

      {!isNewStep && !isEditing && (
        <div
          className={`mt-0 flex gap-1 transition-opacity ${isHover ? 'opacity-100' : 'opacity-0'} `}
        >
          <UIButton
            variant='secondary'
            disabled={isOrderChanging}
            onClick={() => handleEdit(step.id)}
            size='sm'
            icon={<SquarePen />}
          />

          <AlertDialog>
            <AlertDialogTrigger className='h-fit' disabled={isOrderChanging}>
              <UIButton
                variant='destructive'
                disabled={isOrderChanging}
                className='text-muted-foreground'
                icon={<Trash2 />}
                size={'sm'}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure to delete this Stage ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this stage. This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteStep(step.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      {!isNewStep && (
        <div className='absolute right-0 top-[-10px] flex translate-x-[120%] flex-col gap-2'>
          {index !== 0 && (
            <UIButton
              className='m-0'
              size={'sm'}
              icon={<ChevronUp />}
              disabled={isOrderChanging}
              variant={'secondary'}
              onClick={() => handleUp(index)}
            />
          )}
          {steps.length - 1 !== index && (
            <UIButton
              className='m-0'
              disabled={isOrderChanging}
              size={'sm'}
              icon={<ChevronDown />}
              onClick={() => handleDown(index)}
              variant={'secondary'}
            />
          )}
        </div>
      )}
    </div>
  );
};
