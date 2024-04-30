/* eslint-disable security/detect-object-injection */
import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';

import { SelectedMemberPill, SidedrawerBodyDebrief } from '@/devlink2';
import { validateString } from '@/src/context/JobDashboard/hooks';
import { useJobInterviewPlan } from '@/src/context/JobInterviewPlanContext';
import { CreateDebriefSession } from '@/src/queries/interview-plans';
import {
  InterviewCoordinatorType,
  InterviewSessionType,
} from '@/src/queries/interview-plans/types';
import { getFullName } from '@/src/utils/jsonResume';

import MuiAvatar from '../Common/MuiAvatar';
import UITextField from '../Common/UITextField';
import IconScheduleType from '../Scheduling/AllSchedules/ListCard/Icon';
import { DepartmentIcon, RoleIcon } from '.';
import { DropDown } from './sessionForms';
import { getBreakLabel } from './utils';

type DebriefFormProps = Pick<
  InterviewSessionType,
  'name' | 'session_duration' | 'schedule_type' | 'session_type'
> &
  CustomDebriefFormProps;

type CustomDebriefFormProps = {
  members: InterviewCoordinatorType[];
};

type DebriefFormFields = {
  [key in keyof DebriefFormProps]: {
    value: DebriefFormProps[key];
    error: boolean;
    helper: string;
  };
};

export const getDebriefFields = (
  props: DebriefFormProps,
): DebriefFormFields => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    acc[key] = {
      value,
      error: false,
      helper: `${getLabel(key as keyof DebriefFormProps)} cannot be empty`,
    } as DebriefFormFields['name'];
    return acc;
  }, {} as DebriefFormFields);
};

const getLabel = (key: keyof DebriefFormProps) => {
  switch (key) {
    case 'name':
      return 'Session name';
    case 'schedule_type':
      return 'Schedule type';
    case 'session_duration':
      return 'Session duration';
    case 'session_type':
      return 'Session type';
  }
};
export const initialDebriefFields: DebriefFormProps = {
  name: '',
  schedule_type: 'google_meet',
  session_duration: 30,
  session_type: 'debrief',
  members: [],
};

type HandleChange = <T extends keyof DebriefFormProps>(
  // eslint-disable-next-line no-unused-vars
  key: T,
  // eslint-disable-next-line no-unused-vars
  value: DebriefFormProps[T],
) => void;

const DebriefForms = ({
  fields,
  setFields,
}: {
  fields: DebriefFormFields;
  setFields: Dispatch<SetStateAction<DebriefFormFields>>;
}) => {
  const {
    companyMembers: { data },
  } = useJobInterviewPlan();

  const { name, session_duration, schedule_type, members } = fields;
  const memberRecommendations =
    data.filter(
      ({ user_id }) =>
        !(members?.value ?? []).map(({ user_id }) => user_id).includes(user_id),
    ) ?? [];

  const showMembers = memberRecommendations.length !== 0;

  const handleChange: HandleChange = useCallback((key, value) => {
    setFields((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        error: false,
        value,
      },
    }));
  }, []);

  // const handleSessionDuration: ChangeEventHandler<
  //   HTMLInputElement | HTMLTextAreaElement
  // > = useCallback((e) => {
  //   const entry = e.target.value as any;
  //   const safeEntry = +entry;
  //   if (entry === null || entry === '') handleChange('session_duration', null);
  //   else if (safeEntry < 0) handleChange('session_duration', 0);
  //   else handleChange('session_duration', safeEntry);
  // }, []);

  const nameField = useMemo(
    () => (
      <UITextField
        name={'name'}
        placeholder={'Session name'}
        value={name.value}
        error={name.error}
        helperText={name.helper}
        onChange={({ target: { value } }) => handleChange('name', value)}
      />
    ),
    [name],
  );

  const sessionDurationField = useMemo(
    () => (
      <SessionDurationField
        value={session_duration.value}
        handleChange={handleChange}
      />
      // <UITextField
      //   name={'session_duration'}
      //   type='number'
      //   placeholder={'Session duration'}
      //   value={session_duration.value}
      //   error={session_duration.error}
      //   helperText={session_duration.helper}
      //   onChange={handleSessionDuration}
      // />
    ),
    [session_duration],
  );

  return (
    <SidedrawerBodyDebrief
      slotSessionNameInput={nameField}
      slotDurationDropdown={sessionDurationField}
      slotMemberAvatarSelectionPill={
        <InterviewerPills value={members.value} handleChange={handleChange} />
      }
      slotScheduleTypeDropdown={
        <ScheduleTypeField
          value={schedule_type.value}
          handleChange={handleChange}
        />
      }
      slotMembersDropdown={
        showMembers && (
          <InterviewersField
            value={members.value}
            memberRecommendations={memberRecommendations}
            handleChange={handleChange}
          />
        )
      }
    />
  );
};

const ScheduleTypeField = ({
  value,
  handleChange,
}: {
  value: DebriefFormProps['schedule_type'];
  handleChange: HandleChange;
}) => {
  const options = [
    {
      name: 'Google meet',
      value: 'google_meet',
      icon: <IconScheduleType type={'google_meet'} />,
    },
    {
      name: 'Zoom',
      value: 'zoom',
      icon: <IconScheduleType type={'zoom'} />,
    },
    {
      name: 'In person ',
      value: 'in_person_meeting',
      icon: <IconScheduleType type={'in_person_meeting'} />,
    },
    {
      name: 'Phone call',
      value: 'phone_call',
      icon: <IconScheduleType type={'phone_call'} />,
    },
  ] as {
    name: string;
    value: DebriefFormProps['schedule_type'];
    icon: React.JSX.Element;
  }[];
  // eslint-disable-next-line no-unused-vars
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) => {
    const schedule = options.find((m) => m.value === e.target.value);
    if (schedule) handleChange('schedule_type', schedule.value);
  };
  return (
    <DropDown
      onChange={onChange}
      options={options}
      value={value}
      placeholder='Select schedule type'
    />
  );
};

const InterviewerPills = ({
  value,
  handleChange,
}: {
  value: DebriefFormProps['members'];
  handleChange: HandleChange;
}) => {
  const onChange = (id: string) => {
    handleChange(
      'members',
      value.filter((interviewer) => interviewer.user_id !== id),
    );
  };
  return value.map((interviewer) => {
    const name = getFullName(interviewer.first_name, interviewer.last_name);
    return (
      <SelectedMemberPill
        key={interviewer.user_id}
        onClickRemove={{ onClick: () => onChange(interviewer.user_id) }}
        textMemberName={name}
        slotMemberAvatar={
          <MuiAvatar
            src={interviewer.profile_image}
            level={name}
            variant='circular'
            fontSize='10px'
            height='100%'
            width='100%'
          />
        }
      />
    );
  });
};

const SessionDurationField = ({
  value,
  handleChange,
}: {
  value: DebriefFormProps['session_duration'];
  handleChange: HandleChange;
}) => {
  const options = [30, 45, 60, 120].reduce(
    (acc, curr) => {
      acc.push({ name: getBreakLabel(curr), value: curr });
      return acc;
    },
    [] as { name: string; value: number }[],
  );
  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    if ((e?.target?.value ?? null) && typeof e.target.value === 'number')
      handleChange('session_duration', e.target.value);
  }, []);

  return (
    <DropDown
      placeholder='Select session duration'
      showIcons={false}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

const InterviewersField = ({
  value,
  memberRecommendations,
  handleChange,
}: {
  value: DebriefFormProps['members'];
  memberRecommendations: InterviewCoordinatorType[];
  handleChange: HandleChange;
}) => {
  const options = memberRecommendations.map((m) => ({
    name: getFullName(m.first_name, m.last_name),
    value: m.user_id,
    start_icon_url: m.profile_image,
    meta: [
      { title: m.position, icon: <RoleIcon /> },
      { title: m.department, icon: <DepartmentIcon /> },
    ],
  }));
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) => {
    const member = memberRecommendations.find(
      (m) => m.user_id === e.target.value,
    );
    if (member) handleChange('members', [...value, member]);
  };

  return (
    <DropDown
      placeholder='Select Interviewers'
      onChange={onChange}
      options={options}
      value=''
    />
  );
};

export default DebriefForms;

export const validateDebriefSessionFields = (fields: DebriefFormFields) => {
  const safeFields = Object.entries(fields).reduce(
    (acc, [key, value]) => {
      acc.newFields[key] = structuredClone(value);
      const safeKey = key as keyof DebriefFormFields;
      switch (safeKey) {
        case 'name':
          {
            const safeValue = value as DebriefFormFields['name'];
            if (validateString(safeValue?.value ?? null)) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
        case 'schedule_type':
          {
            const safeValue = value as DebriefFormFields['schedule_type'];
            if (validateString(safeValue?.value ?? null)) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
        case 'session_type':
          {
            const safeValue = value as DebriefFormFields['session_type'];
            if (validateString(safeValue?.value ?? null)) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
        case 'session_duration':
          {
            const safeValue = value as DebriefFormFields['session_duration'];
            if ((safeValue?.value ?? 0) <= 0) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
        case 'members':
          {
            const safeValue = value as DebriefFormFields['members'];
            if ((safeValue?.value ?? []).length === 0) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
      }
      return acc;
    },
    {
      error: false,
      newFields: {} as DebriefFormFields,
    },
  );
  return safeFields;
};

export const getDebriefSessionPayload = (
  fields: DebriefFormFields,
  session_order: number,
  interview_plan_id: string,
): CreateDebriefSession => {
  const { name, schedule_type, session_duration, members } = Object.entries(
    fields,
  ).reduce(
    (acc, [key, value]) => {
      acc[key] = value.value;
      return acc;
    },
    {} as { [key in keyof DebriefFormFields]: DebriefFormFields[key]['value'] },
  );
  const safeMembers: CreateDebriefSession['members'] = members.map(
    ({ user_id }) => ({
      id: user_id,
    }),
  );
  return {
    session_duration,
    name,
    schedule_type,
    location: null,
    break_duration: 0,
    members: safeMembers,
    session_order,
    interview_plan_id,
  };
};
