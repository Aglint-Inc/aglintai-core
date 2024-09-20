/* eslint-disable security/detect-object-injection */
import { useToast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { DialogDescription, DialogTitle } from '@components/ui/dialog';
import { FileQuestion } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDrawer from '@/components/Common/UIDrawer';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { useJobInterviewPlan } from '@/job/interview-plan/hooks';
import { type CompanyMember } from '@/queries/company-members';

import { type DrawerType } from '.';
import BreakForms, {
  getBreakFields,
  getBreakSessionPayload,
  initialBreakFields,
  validateBreakSessionFields,
} from './breakForms';
import DebriefForms, {
  getDebriefFields,
  getDebriefSessionPayload,
  initialDebriefFields,
  validateDebriefSessionFields,
} from './debriefForms';
import SessionForms, {
  getSessionFields,
  getSessionPayload,
  initialSessionFields,
  type SessionUser,
  validateSessionFields,
} from './sessionForms';

type InterviewDrawersProps = {
  open: boolean;
  drawers: DrawerType;
  handleClose: () => void;
};
const InterviewDrawers = ({
  open,
  drawers,
  handleClose,
}: InterviewDrawersProps) => {
  const { push } = useRouterPro();
  const {
    interviewModules: { data },
  } = useJobInterviewPlan();

  let drawerTitle = '';

  const [createKey, createValue] = (Object.entries(drawers.create).find(
    ([, value]) => value.open,
  ) ?? [null, null]) as [
    keyof DrawerType['create'],
    DrawerType['create'][keyof DrawerType['create']],
  ];

  if (createKey && createValue) {
    switch (createKey) {
      case 'session':
        drawerTitle = 'Create Interview';
        break;
      case 'debrief':
        drawerTitle = 'Create Debrief';
        break;
    }
  }
  const [editKey, editValue] = (Object.entries(drawers.edit).find(
    ([, value]) => value.open,
  ) ?? [null, null]) as [
    keyof DrawerType['edit'],
    DrawerType['edit'][keyof DrawerType['edit']],
  ];
  if (editKey && editValue) {
    switch (editKey) {
      case 'session':
        drawerTitle = 'Update Interview';
        break;
      case 'debrief':
        drawerTitle = 'Edit Debrief';
        break;
      case 'break':
        drawerTitle = 'Edit Break';
        break;
    }
  }

  return (
    <UIDrawer title={drawerTitle} size='sm' open={open} onClose={handleClose}>
      {data.length ? (
        <InterviewSideDrawer
          drawers={drawers}
          handleClose={() => handleClose()}
        />
      ) : (
        <div className='flex flex-col items-center justify-center p-8 text-center'>
          <div className='mb-2'>
            <FileQuestion size={80} />
          </div>
          <DialogTitle className='mb-2 text-lg font-semibold'>
            No Interview Plan
          </DialogTitle>
          <DialogDescription className='mb-4 text-sm text-gray-600'>
            Create an interview plan to get started
          </DialogDescription>
          <Button
            onClick={() => push('/scheduling?tab=interviewtypes')}
            className='hover:bg-primary-dark bg-primary text-white'
          >
            Create Interview Plan
          </Button>
        </div>
      )}
    </UIDrawer>
  );
};

export default InterviewDrawers;

const InterviewSideDrawer = ({
  drawers,
  handleClose,
}: Omit<InterviewDrawersProps, 'open'>) => {
  const [createKey, createValue] = (Object.entries(drawers.create).find(
    ([, value]) => value.open,
  ) ?? [null, null]) as [
    keyof DrawerType['create'],
    DrawerType['create'][keyof DrawerType['create']],
  ];

  if (createKey && createValue) {
    const { order, plan_id } = createValue;
    switch (createKey) {
      case 'session':
        return (
          <CreateSession
            handleClose={handleClose}
            interview_plan_id={plan_id}
            order={order}
          />
        );
      case 'debrief':
        return (
          <CreateDebrief
            handleClose={handleClose}
            interview_plan_id={plan_id}
            order={order}
          />
        );
    }
  }
  const [editKey, editValue] = (Object.entries(drawers.edit).find(
    ([, value]) => value.open,
  ) ?? [null, null]) as [
    keyof DrawerType['edit'],
    DrawerType['edit'][keyof DrawerType['edit']],
  ];
  if (editKey && editValue) {
    const { id, order } = editValue;
    switch (editKey) {
      case 'session':
        return <EditSession handleClose={handleClose} id={id} order={order} />;
      case 'debrief':
        return <EditDebrief handleClose={handleClose} id={id} order={order} />;
      case 'break':
        return <BreakSession handleClose={handleClose} id={id} order={order} />;
    }
  }
};

type DrawerProps = {
  handleClose: InterviewDrawersProps['handleClose'];
  order: number;
  interview_plan_id?: string;
  id?: string;
};

const CreateSession = ({
  handleClose,
  interview_plan_id,
  order,
}: DrawerProps) => {
  const { toast } = useToast();
  const { handleCreateSession } = useJobInterviewPlan();
  const [fields, setFields] = useState(getSessionFields(initialSessionFields));
  const [sessionCreation, setSessionCreation] = useState(false);
  const handleAdd = async () => {
    if (!sessionCreation) {
      setSessionCreation(true);
      const { error, newFields } = validateSessionFields(fields);
      if (error) setFields(newFields);
      else {
        const payload = getSessionPayload(fields, order + 1, interview_plan_id);
        await handleCreateSession(payload);
        handleClose();
      }
      setSessionCreation(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Interview under creation. Please wait.',
      });
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex-1 overflow-y-auto'>
        <div className='p-4'>
          <SessionForms fields={fields} setFields={setFields} />
        </div>
      </div>
      <div className='flex justify-end space-x-2 p-4'>
        <UIButton
          size='sm'
          variant='secondary'
          onClick={() => handleClose()}
          disabled={sessionCreation}
        >
          Cancel
        </UIButton>
        <UIButton
          size='sm'
          variant='default'
          isLoading={sessionCreation}
          onClick={() => handleAdd()}
        >
          Add
        </UIButton>
      </div>
    </div>
  );
};

const EditSession = ({ handleClose, id, order }: DrawerProps) => {
  const {
    interviewPlans: { data },
    handleEditSession,
    getLoadingState,
  } = useJobInterviewPlan();
  const {
    name,
    schedule_type,
    session_duration,
    session_type,
    location,
    interview_module,
    interview_session_relation,
    interviewer_cnt,
    interview_plan_id,
  } = data
    .flatMap((item) => item.interview_session)
    .find((session) => id === session.id);
  const { interviewers, trainees } = interview_session_relation.reduce(
    (acc, curr) => {
      if (curr.interviewer_type === 'qualified')
        acc.interviewers.push({
          ...curr.interview_module_relation.recruiter_user,
          module_relation_id: curr.interview_module_relation.id,
          training_status: curr.interview_module_relation.training_status,
          paused: !!curr?.interview_module_relation?.pause_json,
        });
      else
        acc.trainees.push({
          ...curr.interview_module_relation.recruiter_user,
          module_relation_id: curr.interview_module_relation.id,
          training_status: curr.interview_module_relation.training_status,
          paused: !!curr?.interview_module_relation?.pause_json,
        });
      return acc;
    },
    {
      interviewers: [] as SessionUser[],
      trainees: [] as SessionUser[],
    },
  );
  const training = trainees.length !== 0;
  const initialFields = {
    name,
    interviewer_cnt,
    schedule_type,
    location,
    session_duration,
    session_type,
    interview_module,
    interviewers,
    training,
    trainees,
  };
  const { toast } = useToast();
  const isLoading = getLoadingState(id);
  const [fields, setFields] = useState(getSessionFields(initialFields));
  const handleEdit = () => {
    if (!isLoading) {
      const { error, newFields } = validateSessionFields(fields);
      if (error) setFields(newFields);
      else {
        const { ...rest } = getSessionPayload(
          fields,
          order + 1,
          interview_plan_id,
        );
        handleEditSession({ ...rest, session_id: id });
        handleClose();
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Interview under updation. Please wait.',
      });
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex-1 overflow-y-auto'>
        <div className='border-none p-4'>
          <SessionForms fields={fields} setFields={setFields} />
        </div>
      </div>
      <div className='flex justify-end space-x-2 p-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={handleClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant='default'
          size='sm'
          onClick={handleEdit}
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </div>
  );
};

const CreateDebrief = ({
  handleClose,
  interview_plan_id,
  order,
}: DrawerProps) => {
  const { recruiter } = useAuthDetails();
  const { handleCreateDebriefSession } = useJobInterviewPlan();
  const [fields, setFields] = useState(
    getDebriefFields(initialDebriefFields, {
      members_meta: recruiter?.scheduling_settings?.debrief_defaults,
    }),
  );
  const { toast } = useToast();
  const [debriefCreation, setDebriefCreation] = useState(false);
  const handleAdd = async () => {
    if (!debriefCreation) {
      setDebriefCreation(true);
      const { error, newFields } = validateDebriefSessionFields(fields);
      if (error) setFields(newFields);
      else {
        const payload = getDebriefSessionPayload(
          fields,
          order + 1,
          interview_plan_id,
        );
        await handleCreateDebriefSession(payload);
        handleClose();
      }
      setDebriefCreation(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Interview under creation. Please wait.',
      });
    }
  };
  return (
    <div className='flex flex-col'>
      <div className='flex-1 overflow-y-auto'>
        <div className='p-4'>
          <DebriefForms fields={fields} setFields={setFields} />
        </div>
      </div>
      <div className='flex justify-end space-x-2 p-4'>
        <UIButton
          variant='secondary'
          disabled={debriefCreation}
          size='sm'
          onClick={() => handleClose()}
        >
          Cancel
        </UIButton>
        <UIButton
          size='sm'
          variant='default'
          isLoading={debriefCreation}
          onClick={() => handleAdd()}
        >
          Add
        </UIButton>
      </div>
    </div>
  );
};

const EditDebrief = ({ handleClose, id, order }: DrawerProps) => {
  const {
    interviewPlans: { data },
    handleEditDebriefSession,
    getLoadingState,
  } = useJobInterviewPlan();
  const {
    name,
    schedule_type,
    session_duration,
    session_type,
    location,
    interview_session_relation,
    members_meta,
    interview_plan_id,
  } = data
    .flatMap((item) => item.interview_session)
    .find((session) => id === session.id);
  const { members } = interview_session_relation.reduce(
    (acc, curr) => {
      if (curr.recruiter_user) acc.members.push(curr.recruiter_user);
      return acc;
    },
    { members: [] as CompanyMember[] },
  );
  const initialFields = {
    name,
    schedule_type,
    session_duration,
    session_type,
    location,
    interview_session_relation,
    members,
    members_meta,
  };
  const { toast } = useToast();
  const isLoading = getLoadingState(id);
  const [fields, setFields] = useState(getDebriefFields(initialFields));
  const handleEdit = () => {
    if (!isLoading) {
      const { error, newFields } = validateDebriefSessionFields(fields);
      if (error) setFields(newFields);
      else {
        const {
          // eslint-disable-next-line no-unused-vars
          ...rest
        } = getDebriefSessionPayload(fields, order + 1, interview_plan_id);
        handleEditDebriefSession({ ...rest, session_id: id });
        handleClose();
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Interview under updation. Please wait.',
      });
    }
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex-1 overflow-y-auto'>
        <div className='p-4'>
          <DebriefForms fields={fields} setFields={setFields} />
        </div>
      </div>
      <div className='flex justify-end space-x-2 p-4'>
        <UIButton
          variant='secondary'
          disabled={isLoading}
          size='sm'
          onClick={() => handleClose()}
        >
          Cancel
        </UIButton>
        <UIButton
          variant='default'
          size='sm'
          isLoading={isLoading}
          onClick={() => handleEdit()}
        >
          Update
        </UIButton>
      </div>
    </div>
  );
};

const BreakSession = ({ handleClose, id }: DrawerProps) => {
  const {
    handleUpdateSession,
    interviewPlans: { data },
    getLoadingState,
  } = useJobInterviewPlan();
  const { break_duration } = data
    .flatMap((item) => item.interview_session)
    .find((session) => id === session.id);
  const initialFields = {
    break_duration:
      break_duration === 0 ? initialBreakFields.break_duration : break_duration,
  };
  const { toast } = useToast();
  const isLoading = getLoadingState(id);
  const [fields, setFields] = useState(getBreakFields(initialFields));
  const handleUpdate = async () => {
    if (!isLoading) {
      const { error, newFields } = validateBreakSessionFields(fields);
      if (error) setFields(newFields);
      else {
        const payload = getBreakSessionPayload(fields, id);
        handleUpdateSession(payload);
        handleClose();
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Interview under updation. Please wait.',
      });
    }
  };
  return (
    <div className='flex h-screen flex-col'>
      <div className='flex-1 overflow-y-auto'>
        <div className='p-4'>
          <h2 className='mb-4 text-lg font-semibold'>Edit Break</h2>
          <BreakForms fields={fields} setFields={setFields} />
        </div>
      </div>
      <div className='flex justify-end space-x-2 border-t p-4'>
        <UIButton
          disabled={isLoading}
          variant='secondary'
          size='sm'
          onClick={() => handleClose()}
        >
          Cancel
        </UIButton>
        <UIButton
          variant='default'
          size='sm'
          isLoading={isLoading}
          onClick={() => handleUpdate()}
        >
          {break_duration === 0 ? 'Add' : 'Update'}
        </UIButton>
      </div>
    </div>
  );
};
