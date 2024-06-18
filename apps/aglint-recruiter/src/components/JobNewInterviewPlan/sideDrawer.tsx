/* eslint-disable security/detect-object-injection */
import { Drawer } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { InterviewPlanEmpty } from '@/devlink2/InterviewPlanEmpty';
import { SideDrawerBlock } from '@/devlink2/SideDrawerBlock';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobInterviewPlan } from '@/src/context/JobInterviewPlanContext';
import { CompanyMember } from '@/src/queries/company-members';
import toast from '@/src/utils/toast';

import { DrawerType } from '.';
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
  SessionUser,
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
        <InterviewPlanEmpty
          onClickCreateInterviewPlan={{
            onClick: () => push('/scheduling?tab=interviewtypes'),
          }}
        />
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
    const { order } = createValue;
    switch (createKey) {
      case 'session':
        return <CreateSession handleClose={handleClose} order={order} />;
      case 'debrief':
        return <CreateDebrief handleClose={handleClose} order={order} />;
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
  id?: string;
};
const CreateSession = ({ handleClose, order }: DrawerProps) => {
  const {
    interviewPlans: { data },
    handleCreateSession,
  } = useJobInterviewPlan();
  const [fields, setFields] = useState(getSessionFields(initialSessionFields));
  const [sessionCreation, setSessionCreation] = useState(false);
  const interview_plan_id = data.id;
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
      toast.warning('Session under creation. Please wait.');
    }
  };

  return (
    <SideDrawerBlock
      onClickClose={{ onClick: () => handleClose() }}
      onClickPrimaryButton={{ onClick: () => handleAdd() }}
      isLoading={false}
      textPrimaryButton='Add'
      textTitle='Create Session'
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
    interview_module,
    interview_session_relation,
    interviewer_cnt,
  } = data.interview_session.find((session) => id === session.id);
  const { interviewers, trainees } = interview_session_relation.reduce(
    (acc, curr) => {
      if (curr.interviewer_type === 'qualified')
        acc.interviewers.push({
          ...curr.interview_module_relation.recruiter_user,
          moduleUserId: curr.interview_module_relation.id,
          training_status: curr.interview_module_relation.training_status,
        });
      else
        acc.trainees.push({
          ...curr.interview_module_relation.recruiter_user,
          moduleUserId: curr.interview_module_relation.id,
          training_status: curr.interview_module_relation.training_status,
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
    session_duration,
    session_type,
    interview_module,
    interviewers,
    training,
    trainees,
  };
  const isLoading = getLoadingState(id);
  const [fields, setFields] = useState(getSessionFields(initialFields));
  const interview_plan_id = data.id;
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
      toast.warning('Session under updation. Please wait.');
    }
  };

  return (
    <SideDrawerBlock
      onClickClose={{ onClick: () => handleClose() }}
      onClickPrimaryButton={{ onClick: () => handleEdit() }}
      isLoading={false}
      textPrimaryButton='Save'
      textTitle='Edit Session'
      slotSidedrawerBody={
        <SessionForms fields={fields} setFields={setFields} />
      }
    />
  );
};

const CreateDebrief = ({ handleClose, order }: DrawerProps) => {
  const { recruiter } = useAuthDetails();
  const {
    interviewPlans: { data },
    handleCreateDebriefSession,
  } = useJobInterviewPlan();
  const [fields, setFields] = useState(
    getDebriefFields(initialDebriefFields, {
      members_meta: recruiter?.scheduling_settings?.debrief_defaults,
    }),
  );
  const [debriefCreation, setDebriefCreation] = useState(false);
  const interview_plan_id = data.id;
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
      toast.warning('Session under creation. Please wait.');
    }
  };
  return (
    <SideDrawerBlock
      onClickClose={{ onClick: () => handleClose() }}
      onClickPrimaryButton={{ onClick: () => handleAdd() }}
      isLoading={false}
      textPrimaryButton='Add'
      textTitle='Create Debrief'
      slotSidedrawerBody={
        <DebriefForms fields={fields} setFields={setFields} />
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
    interview_session_relation,
    members_meta,
  } = data.interview_session.find((session) => id === session.id);
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
    interview_session_relation,
    members,
    members_meta,
  };
  const isLoading = getLoadingState(id);
  const [fields, setFields] = useState(getDebriefFields(initialFields));
  const interview_plan_id = data.id;
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
      toast.warning('Session under updation. Please wait.');
    }
  };

  return (
    <SideDrawerBlock
      onClickClose={{ onClick: () => handleClose() }}
      onClickPrimaryButton={{ onClick: () => handleEdit() }}
      isLoading={false}
      textPrimaryButton='Save'
      textTitle='Edit Debrief'
      slotSidedrawerBody={
        <DebriefForms fields={fields} setFields={setFields} />
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
  const { break_duration } = data.interview_session.find(
    (session) => id === session.id,
  );
  const initialFields = {
    break_duration:
      break_duration === 0 ? initialBreakFields.break_duration : break_duration,
  };
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
      toast.warning('Session under updation. Please wait.');
    }
  };
  return (
    <SideDrawerBlock
      onClickClose={{ onClick: () => handleClose() }}
      onClickPrimaryButton={{ onClick: () => handleUpdate() }}
      isLoading={false}
      textPrimaryButton={break_duration === 0 ? 'Add' : 'Save'}
      textTitle={break_duration === 0 ? 'Create Break' : 'Edit Break'}
      slotSidedrawerBody={<BreakForms fields={fields} setFields={setFields} />}
    />
  );
};
