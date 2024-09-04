/* eslint-disable security/detect-object-injection */
import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { InterviewPlanEmpty } from '@devlink2/InterviewPlanEmpty';
import { SideDrawerBlock } from '@devlink2/SideDrawerBlock';
import { Drawer, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useJobInterviewPlan } from '@/context/JobInterviewPlanContext';
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
  type SessionUser,
  getSessionFields,
  getSessionPayload,
  initialSessionFields,
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
  const { push } = useRouter();
  const {
    interviewModules: { data },
  } = useJobInterviewPlan();
  return (
    <Drawer open={open} onClose={() => handleClose()} anchor='right'>
      {data.length ? (
        <InterviewSideDrawer
          drawers={drawers}
          handleClose={() => handleClose()}
        />
      ) : (
        <Stack px={'80px'}>
          <InterviewPlanEmpty
            onClickCreateInterviewPlan={{
              onClick: () => push('/scheduling?tab=interviewtypes'),
            }}
          />
        </Stack>
      )}
    </Drawer>
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
    <SideDrawerBlock
      slotButton={
        <>
          <ButtonSoft
            textButton='Cancel'
            isDisabled={sessionCreation}
            color={'neutral'}
            size={2}
            onClickButton={{ onClick: () => handleClose() }}
          />
          <ButtonSolid
            textButton='Add'
            isLoading={sessionCreation}
            size={2}
            onClickButton={{ onClick: () => handleAdd() }}
          />
        </>
      }
      onClickClose={{ onClick: () => handleClose() }}
      textTitle='Create Interview'
      slotSidedrawerBody={
        <SessionForms fields={fields} setFields={setFields} />
      }
    />
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
          moduleUserId: curr.interview_module_relation.id,
          training_status: curr.interview_module_relation.training_status,
          paused: !!curr?.interview_module_relation?.pause_json,
        });
      else
        acc.trainees.push({
          ...curr.interview_module_relation.recruiter_user,
          moduleUserId: curr.interview_module_relation.id,
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
        const {
          // eslint-disable-next-line no-unused-vars
          session_order,
          // eslint-disable-next-line no-unused-vars
          interview_plan_id: plan_id,
          ...rest
        } = getSessionPayload(fields, order + 1, interview_plan_id);
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
    <SideDrawerBlock
      textTitle='Update Interview'
      slotSidedrawerBody={
        <SessionForms fields={fields} setFields={setFields} />
      }
      onClickClose={{ onClick: () => handleClose() }}
      slotButton={
        <>
          <ButtonSoft
            textButton='Cancel'
            isDisabled={isLoading}
            color={'neutral'}
            size={2}
            onClickButton={{ onClick: () => handleClose() }}
          />
          <ButtonSolid
            textButton='Update'
            isLoading={isLoading}
            size={2}
            onClickButton={{ onClick: () => handleEdit() }}
          />
        </>
      }
    />
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
    <SideDrawerBlock
      textTitle='Create Debrief'
      slotSidedrawerBody={
        <DebriefForms fields={fields} setFields={setFields} />
      }
      onClickClose={{ onClick: () => handleClose() }}
      slotButton={
        <>
          <ButtonSoft
            textButton='Cancel'
            color={'neutral'}
            isDisabled={debriefCreation}
            size={2}
            onClickButton={{ onClick: () => handleClose() }}
          />
          <ButtonSolid
            textButton='Add'
            isLoading={debriefCreation}
            size={2}
            onClickButton={{ onClick: () => handleAdd() }}
          />
        </>
      }
    />
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
          session_order,
          // eslint-disable-next-line no-unused-vars
          interview_plan_id: plan_id,
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
    <SideDrawerBlock
      textTitle='Edit Debrief'
      slotSidedrawerBody={
        <DebriefForms fields={fields} setFields={setFields} />
      }
      onClickClose={{ onClick: () => handleClose() }}
      slotButton={
        <>
          <ButtonSoft
            textButton='Cancel'
            color={'neutral'}
            isDisabled={isLoading}
            size={2}
            onClickButton={{ onClick: () => handleClose() }}
          />
          <ButtonSolid
            textButton='Update'
            isLoading={isLoading}
            size={2}
            onClickButton={{ onClick: () => handleEdit() }}
          />
        </>
      }
    />
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
    <SideDrawerBlock
      onClickClose={{ onClick: () => handleClose() }}
      textTitle={break_duration === 0 ? 'Create Break' : 'Edit Break'}
      slotSidedrawerBody={<BreakForms fields={fields} setFields={setFields} />}
      slotButton={
        <>
          <ButtonSoft
            textButton='Cancel'
            isDisabled={isLoading}
            color={'neutral'}
            size={2}
            onClickButton={{ onClick: () => handleClose() }}
          />
          <ButtonSolid
            textButton={break_duration === 0 ? 'Add' : 'Update'}
            isLoading={isLoading}
            size={2}
            onClickButton={{ onClick: () => handleUpdate() }}
          />
        </>
      }
    />
  );
};
