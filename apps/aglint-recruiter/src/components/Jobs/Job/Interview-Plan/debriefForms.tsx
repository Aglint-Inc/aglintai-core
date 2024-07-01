/* eslint-disable security/detect-object-injection */
import { Stack, Typography } from '@mui/material';
import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';

import { Attendee } from '@/devlink2/Attendee';
import { SelectedMemberPill } from '@/devlink2/SelectedMemberPill';
import { SidedrawerBodyDebrief } from '@/devlink2/SidedrawerBodyDebrief';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';
import IconScheduleType from '@/src/components/Scheduling/Candidates/ListCard/Icon';
import { validateString } from '@/src/context/JobDashboard/hooks';
import { useJobInterviewPlan } from '@/src/context/JobInterviewPlanContext';
import { CompanyMember } from '@/src/queries/company-members';
import { CreateDebriefSession } from '@/src/queries/interview-plans';
import { InterviewSessionType } from '@/src/queries/interview-plans/types';
import { Job } from '@/src/queries/jobs/types';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalize } from '@/src/utils/text/textUtils';

import { DepartmentIcon, RoleIcon } from '.';
import { DropDown } from './sessionForms';
import { getBreakLabel } from './utils';

type DebriefFormProps = Pick<
  InterviewSessionType,
  | 'name'
  | 'session_duration'
  | 'schedule_type'
  | 'session_type'
  | 'members_meta'
  | 'location'
> &
  CustomDebriefFormProps;

type CustomDebriefFormProps = {
  members: CompanyMember[];
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
  defaults?: Partial<DebriefFormProps>,
): DebriefFormFields => {
  const safeFields = Object.entries(defaults ?? {}).reduce(
    (acc, [key, value]) => {
      if (value) acc[key] = structuredClone(value);
      return acc;
    },
    structuredClone(props),
  );
  return Object.entries(safeFields).reduce((acc, [key, value]) => {
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
      return 'Stage name';
    case 'schedule_type':
      return 'Schedule type';
    case 'session_duration':
      return 'Stage duration';
    case 'session_type':
      return 'Stage type';
  }
};
export const initialDebriefFields: DebriefFormProps = {
  name: '',
  schedule_type: 'google_meet',
  location: null,
  session_duration: 30,
  session_type: 'debrief',
  members: [],
  members_meta: {
    hiring_manager: false,
    recruiter: false,
    recruiting_coordinator: false,
    sourcer: false,
    previous_interviewers: false,
  },
};

type HandleChange = <T extends keyof DebriefFormProps>(
  // eslint-disable-next-line no-unused-vars
  key: T,
  // eslint-disable-next-line no-unused-vars
  value: DebriefFormProps[T],
) => void;

type HandleTypeChange = (
  // eslint-disable-next-line no-unused-vars
  value: DebriefFormProps['schedule_type'],
) => void;

const DebriefForms = ({
  fields,
  setFields,
}: {
  fields: DebriefFormFields;
  setFields: Dispatch<SetStateAction<DebriefFormFields>>;
}) => {
  const {
    job,
    companyMembers: { data },
  } = useJobInterviewPlan();

  const {
    name,
    session_duration,
    schedule_type,
    location,
    members,
    members_meta,
  } = fields;
  const memberRecommendations =
    data.filter(
      ({ user_id }) =>
        ![
          ...(members?.value ?? []),
          ...Object.values(getAttendeesList(job)).map((user_id) => ({
            user_id,
          })),
        ]
          .map(({ user_id }) => user_id)
          .includes(user_id),
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

  const handleTypeChange: HandleTypeChange = useCallback((value) => {
    setFields((prev) => ({
      ...prev,
      schedule_type: {
        ...prev.schedule_type,
        error: false,
        value,
      },
      location: {
        ...prev.location,
        error: false,
        value: value === 'in_person_meeting' ? '' : null,
      },
    }));
  }, []);

  const nameField = useMemo(
    () => (
      <UITextField
        name={'name'}
        placeholder={getLabel('name')}
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
    ),
    [session_duration],
  );

  const locationField = useMemo(
    () =>
      schedule_type.value === 'in_person_meeting' ? (
        <Stack gap={1}>
          <Typography>Address</Typography>
          <UITextField
            name={'location'}
            multiline
            minRows={5}
            value={location.value}
            error={location.error}
            helperText={location.helper}
            onChange={({ target: { value } }) =>
              handleChange('location', value)
            }
          />
        </Stack>
      ) : null,
    [location, schedule_type],
  );

  return (
    <SidedrawerBodyDebrief
      slotSessionNameInput={nameField}
      slotDurationDropdown={sessionDurationField}
      slotMemberAvatarSelectionPill={
        <InterviewerPills value={members.value} handleChange={handleChange} />
      }
      slotScheduleTypeDropdown={
        <Stack gap={2}>
          <ScheduleTypeField
            value={schedule_type.value}
            handleTypeChange={handleTypeChange}
          />
          {locationField}
        </Stack>
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
      slotAttendee={
        <Attendees handleChange={handleChange} value={members_meta.value} />
      }
    />
  );
};

const Attendees = ({
  value,
  handleChange,
}: {
  value: DebriefFormProps['members_meta'];
  handleChange: HandleChange;
}) => {
  const { job } = useJobInterviewPlan();
  const members = getAttendeesList(job);
  const attendees = Object.entries(members).map(([k, v]) => {
    return (
      <Member
        key={k}
        checked={value[k]}
        role={k as keyof typeof members}
        memberId={v}
        onClick={() =>
          handleChange('members_meta', {
            ...value,
            [k]: !value[k],
          })
        }
      />
    );
  });
  return (
    <>
      {attendees}
      <Attendee
        textRole={'Previous interviewers'}
        slotToggle={
          <AntSwitch
            checked={value.previous_interviewers}
            onClick={() =>
              handleChange('members_meta', {
                ...value,
                previous_interviewers: !value.previous_interviewers,
              })
            }
          />
        }
        slotSelectedMemberPill={<></>}
      />
    </>
  );
};

export const getAttendeesList = (job: Job) => {
  const { hiring_manager, recruiter, recruiting_coordinator, sourcer } = job;
  const roles = { hiring_manager, recruiter, recruiting_coordinator, sourcer };
  return Object.entries(roles).reduce(
    (acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    },
    // eslint-disable-next-line no-unused-vars
    {} as { [id in keyof DebriefFormProps['members_meta']]: string },
  );
};

const Member = ({
  checked,
  memberId,
  role,
  onClick,
}: {
  memberId: string;
  role: keyof DebriefFormProps['members_meta'];
  checked: DebriefFormProps['members_meta']['hiring_manager'];
  onClick: () => void;
}) => {
  const { companyMembers } = useJobInterviewPlan();
  const member = companyMembers.data.find(
    ({ user_id }) => user_id === memberId,
  );
  if (!member) return <></>;
  const name = getFullName(member.first_name, member.last_name);
  return (
    <Attendee
      textRole={capitalize(role)}
      slotToggle={<AntSwitch checked={checked} onClick={onClick} />}
      slotSelectedMemberPill={
        <SelectedMemberPill
          isCloseButton={false}
          isReverseShadow={false}
          isShadow={false}
          onClickRemove={null}
          textMemberName={name}
          slotMemberAvatar={
            <MuiAvatar
              src={member.profile_image}
              level={name}
              variant='rounded-small'
            />
          }
        />
      }
    />
  );
};

const ScheduleTypeField = ({
  value,
  handleTypeChange,
}: {
  value: DebriefFormProps['schedule_type'];
  handleTypeChange: HandleTypeChange;
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
    if (schedule) handleTypeChange(schedule.value);
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
        isCloseButton={true}
        onClickRemove={{ onClick: () => onChange(interviewer.user_id) }}
        textMemberName={name}
        slotMemberAvatar={
          <MuiAvatar
            src={interviewer.profile_image}
            level={name}
            variant='rounded-small'
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
  memberRecommendations: CompanyMember[];
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
        case 'location':
          {
            if (
              fields?.schedule_type?.value === 'in_person_meeting' &&
              validateString(value?.value as string)
            ) {
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
  const {
    name,
    schedule_type,
    location,
    session_duration,
    members,
    members_meta,
  } = Object.entries(fields).reduce(
    (acc, [key, value]) => {
      acc[key] = value.value;
      return acc;
    },
    {} as {
      [key in keyof DebriefFormFields]: DebriefFormFields[key]['value'];
    },
  );
  const safeMembers: CreateDebriefSession['members'] = members.map(
    ({ user_id }) => ({
      id: user_id,
    }),
  );
  return {
    session_duration,
    name,
    members_meta,
    schedule_type,
    location,
    break_duration: 0,
    members: safeMembers,
    session_order,
    interview_plan_id,
  };
};
