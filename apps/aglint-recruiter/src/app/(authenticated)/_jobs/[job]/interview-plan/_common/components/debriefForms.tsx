/* eslint-disable security/detect-object-injection */
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Switch } from '@components/ui/switch';
import React, {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
} from 'react';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { UITextArea } from '@/components/Common/UITextArea';
import UITextField from '@/components/Common/UITextField';
import MembersAutoComplete, {
  type MemberTypeAutoComplete,
} from '@/components/Scheduling/Common/MembersTextField';
import { useJobInterviewPlan } from '@/job/interview-plan/hooks';
import { type CompanyMember } from '@/queries/company-members';
import { type CreateDebriefSession } from '@/queries/interview-plans';
import { type InterviewSessionType } from '@/queries/interview-plans/types';
import { type Job } from '@/queries/jobs/types';
import { getBreakLabel } from '@/utils/getBreakLabel';
import { getFullName } from '@/utils/jsonResume';
import { capitalize } from '@/utils/text/textUtils';
import { validateString } from '@/utils/validateString';

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
    (data ?? []).filter(
      ({ user_id }) =>
        ![
          ...Object.values(getAttendeesList(job)).map((user_id) => ({
            user_id,
          })),
        ]
          .map(({ user_id }) => user_id)
          .includes(user_id),
    ) ?? [];

  const showMembers = memberRecommendations.length !== 0;

  const handleChange: HandleChange = useCallback((key, value) => {
    setFields((prev) => {
      const result = {
        ...prev,
        [key]: {
          ...prev[key],
          error: false,
          value,
        },
      };
      if (key === 'members_meta') result['members']['error'] = false;
      return result;
    });
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
        <div className='flex flex-col space-y-1'>
          <span className='text-sm font-medium'>Address</span>
          <UITextArea
            name='location'
            rows={5}
            value={location.value}
            error={location.error}
            helperText={location.helper}
            onChange={({ target: { value } }) =>
              handleChange('location', value)
            }
            className='w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      ) : null,
    [location, schedule_type],
  );

  return (
    <div className='flex flex-col space-y-4'>
      <div>{nameField}</div>
      <div>{sessionDurationField}</div>
      <div className='flex flex-col space-y-2'>
        <ScheduleTypeField
          value={schedule_type.value}
          handleTypeChange={handleTypeChange}
        />
        {locationField}
      </div>
      {showMembers && (
        <InterviewersField
          value={members.value}
          memberRecommendations={memberRecommendations}
          handleChange={handleChange}
          error={members.error}
        />
      )}
      <Attendees handleChange={handleChange} value={members_meta.value} />
    </div>
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
      <div className='flex items-center justify-between border-b p-4'>
        <div className='flex items-center space-x-4'>
          <span className='text-sm font-medium'>Previous interviewers</span>
        </div>
        <Switch
          checked={value.previous_interviewers}
          onCheckedChange={() =>
            handleChange('members_meta', {
              ...value,
              previous_interviewers: !value.previous_interviewers,
            })
          }
        />
      </div>
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
    {} as { [_id in keyof DebriefFormProps['members_meta']]: string },
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
  const member = (companyMembers?.data ?? []).find(
    ({ user_id }) => user_id === memberId,
  );
  if (!member) return <></>;
  const name = getFullName(member.first_name, member.last_name);
  return (
    <div className='flex items-center justify-between border-b p-4'>
      <div className='flex items-center space-x-4'>
        <span className='text-sm font-medium'>{capitalize(role)}</span>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={member.profile_image} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className='text-sm'>{name}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onClick} />
    </div>
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

  return (
    <UISelectDropDown
      onValueChange={(value) => {
        const schedule = options.find((m) => m.value === value);
        if (schedule) handleTypeChange(schedule.value);
      }}
      menuOptions={options.map((ele) => ({
        name: ele.name,
        value: ele.value,
      }))}
      value={value}
      placeholder='Select Schedule Type'
    />
  );
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

  return (
    <UISelectDropDown
      placeholder='Select session duration'
      menuOptions={options.map((ele) => ({
        name: ele.name,
        value: ele.value.toString(),
      }))}
      value={value.toString()}
      onValueChange={(value) => {
        if ((value ?? null) && typeof value === 'number')
          handleChange('session_duration', value);
      }}
    />
  );
};

const InterviewersField = ({
  value,
  memberRecommendations,
  handleChange,
  error,
}: {
  value: DebriefFormProps['members'];
  memberRecommendations: CompanyMember[];
  handleChange: HandleChange;
  error?: boolean;
}) => {
  const options: MemberTypeAutoComplete[] = memberRecommendations.map((m) => ({
    name: getFullName(m.first_name, m.last_name),
    email: m.email,
    first_name: m.first_name,
    last_name: m.last_name,
    position: m.position,
    profile_image: m.profile_image,
    user_id: m.user_id,
  }));

  return (
    <MembersAutoComplete
      maxWidth='468px'
      pillColor='bg-neutral-200'
      renderUsers={options}
      selectedUsers={value.map((m) => ({
        user_id: m.user_id,
        first_name: m.first_name,
        last_name: m.last_name,
        email: m.email,
        profile_image: m.profile_image,
        position: m.position,
      }))}
      setSelectedUsers={(users) => {
        const user_ids = users.map((user) => user.user_id);
        const selUsers = memberRecommendations.filter((m) =>
          user_ids.includes(m.user_id),
        );
        handleChange('members', selUsers);
      }}
      error={error}
      helperText='Members cannot be empty'
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
            if (
              (safeValue?.value ?? []).length === 0 &&
              !Object.values(fields?.members_meta?.value ?? {}).find(
                (value) => value === true,
              )
            ) {
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
