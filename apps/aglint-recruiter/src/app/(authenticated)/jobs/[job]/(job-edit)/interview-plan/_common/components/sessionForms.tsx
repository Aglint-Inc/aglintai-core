/* eslint-disable security/detect-object-injection */
import { type DB } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Switch } from '@components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { AlertCircle, User, Users } from 'lucide-react';
import React, {
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import MembersAutoComplete, {
  type MemberTypeAutoComplete,
} from 'src/app/_common/components/MembersTextField';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { UIButton } from '@/components/Common/UIButton';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { UITextArea } from '@/components/Common/UITextArea';
import UITextField from '@/components/Common/UITextField';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type CreateInterviewSession } from '@/queries/interview-plans';
import { type InterviewSessionType } from '@/queries/interview-plans/types';
import { getBreakLabelV2 } from '@/utils/getBreakLabelV2';
import ROUTES from '@/utils/routing/routes';
import { sessionDurations } from '@/utils/scheduling/const';
import { validateString } from '@/utils/validateString';

import { useJobInterviewPlan } from '../hooks';
import { type CompanyMember } from '.';
import { InterviewMode } from './_common/InterviewMode';

export type SessionUser = CompanyMember & {
  module_relation_id: string;
  training_status: DB['public']['Enums']['status_training'];
};

type SessionFormProps = Pick<
  InterviewSessionType,
  | 'name'
  | 'session_duration'
  | 'schedule_type'
  | 'session_type'
  | 'interview_module'
  | 'location'
> &
  CustomSessionFormProps;

type CustomSessionFormProps = {
  training: boolean;
  trainees: SessionUser[];
  interviewers: SessionUser[];
  interviewer_cnt: number;
};

type SessionFormFields = {
  [key in keyof SessionFormProps]: {
    value: SessionFormProps[key];
    error: boolean;
    helper: string;
  };
};

export const getSessionFields = (
  props: SessionFormProps,
): SessionFormFields => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    //@ts-ignore
    acc[key] = {
      value,
      error: false,
      helper: `${getLabel(key as keyof SessionFormProps)} cannot be empty`,
    } as SessionFormFields['name'];
    return acc;
  }, {} as SessionFormFields);
};

const getLabel = (key: keyof SessionFormProps) => {
  switch (key) {
    case 'name':
      return 'Interview name';
    case 'schedule_type':
      return 'Schedule type';
    case 'location':
      return 'Address';
    case 'session_duration':
      return 'Stage duration';
    case 'interview_module':
      return 'Interview module';
    case 'session_type':
      return 'Stage type';
    case 'training':
      return 'Training';
    case 'interviewer_cnt':
      return 'Interviewer count';
    case 'trainees':
      return 'Traninee count';
    case 'interviewers':
      'Interviewer count';
  }
};

export const initialSessionFields: SessionFormProps = {
  name: '',
  schedule_type: 'google_meet',
  session_duration: 30,
  session_type: 'panel',
  interview_module: null,
  interviewers: [],
  interviewer_cnt: null!,
  training: false,
  trainees: [],
  location: null,
};

type HandleChange = <T extends keyof SessionFormProps>(
  // eslint-disable-next-line no-unused-vars
  key: T,
  // eslint-disable-next-line no-unused-vars
  value: SessionFormProps[T],
) => void;

type HandleTypeChange = (
  // eslint-disable-next-line no-unused-vars
  value: SessionFormProps['schedule_type'],
) => void;

type HandleModeChange = (
  // eslint-disable-next-line no-unused-vars
  value: SessionFormProps['session_type'],
) => void;

type HandleTrainingChange = (
  // eslint-disable-next-line no-unused-vars
  value: SessionFormProps['training'],
) => void;

type HandleMemberAdd = <
  T extends keyof Pick<CustomSessionFormProps, 'interviewers' | 'trainees'>,
>(
  // eslint-disable-next-line no-unused-vars
  type: T,
  // eslint-disable-next-line no-unused-vars
  value: SessionFormProps[T],
) => void;

type HandleModuleChange = (
  // eslint-disable-next-line no-unused-vars
  value: SessionFormProps['interview_module'],
) => void;

const SessionForms = ({
  fields,
  setFields,
}: {
  fields: SessionFormFields;
  setFields: Dispatch<SetStateAction<SessionFormFields>>;
}) => {
  const {
    name,
    session_duration,
    schedule_type,
    location,
    interview_module,
    ...rest
  } = fields;

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

  const handleModuleChange: HandleModuleChange = useCallback((value) => {
    setFields(
      (prev) =>
        ({
          ...prev,
          interview_module: {
            ...prev.interview_module,
            error: false,
            value,
          },
          interviewers: {
            ...prev.interviewers,
            error: false,
            value: [],
          },
          interviewer_cnt: {
            ...prev.interviewer_cnt,
            error: false,
            value: null,
          },
          training: {
            ...prev.training,
            error: false,
            value: false,
          },
          trainees: {
            ...prev.trainees,
            error: false,
            value: [],
          },
        }) as unknown as typeof prev,
    );
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
            name={'location'}
            rows={5}
            value={location.value!}
            error={location.error}
            helperText={location.helper}
            onChange={({ target: { value } }) =>
              handleChange('location', value)
            }
          />
        </div>
      ) : null,
    [location, schedule_type],
  );

  return (
    <div className='flex flex-col space-y-4'>
      <div>{nameField}</div>
      <div>{sessionDurationField}</div>
      <div>
        <InterviewModulesField
          value={interview_module.value}
          handleModuleChange={handleModuleChange}
          error={rest.interviewers.error}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <ScheduleTypeField
          value={schedule_type.value}
          handleTypeChange={handleTypeChange}
        />
        {locationField}
      </div>
      {interview_module.value ? (
        <Interview
          setFields={setFields}
          interview_module={interview_module}
          {...rest}
        />
      ) : null}
    </div>
  );
};

export default SessionForms;

type InterviewProps = {
  training: SessionFormFields['training'];
  interviewer_cnt: SessionFormFields['interviewer_cnt'];
  session_type: SessionFormFields['session_type'];
  interviewers: SessionFormFields['interviewers'];
  trainees: SessionFormFields['trainees'];
  interview_module: SessionFormFields['interview_module'];
  setFields: Dispatch<SetStateAction<SessionFormFields>>;
};
const Interview = ({
  training,
  interviewer_cnt,
  interviewers,
  session_type,
  trainees,
  interview_module,
  setFields,
}: InterviewProps) => {
  const {
    interviewModules: { data: modules },
  } = useJobInterviewPlan();

  const currentModuleMembers =
    modules?.find(({ id }) => id === interview_module?.value?.id)?.members ??
    [];

  const currentQualifiedModuleMembers = (currentModuleMembers ?? []).filter(
    ({ training_status }) => training_status === 'qualified',
  );

  const moduleMemberRecommendations = currentModuleMembers ?? [];

  const {
    qualified: qualifiedModuleMemberRecommendations,
    training: trainingModuleMemberRecommendations,
  } = moduleMemberRecommendations.reduce(
    (acc, curr) => {
      acc[curr.training_status].push(curr as SessionUser);
      return acc;
    },
    { qualified: [], training: [] } as {
      [_key in SessionUser['training_status']]: SessionUser[];
    },
  );

  const showTrainingMembers = trainingModuleMemberRecommendations.length !== 0;
  const showTraining = !!currentModuleMembers.find(
    ({ training_status }) => training_status === 'training',
  );

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
  const handleModeChange: HandleModeChange = useCallback((value) => {
    setFields(
      (prev) =>
        ({
          ...prev,
          session_type: {
            ...prev.schedule_type,
            error: false,
            value,
          },
          interviewer_cnt: {
            ...prev.interviewer_cnt,
            error: false,
            value: prev.interviewer_cnt.value === null ? null : 1,
          },
        }) as typeof prev,
    );
  }, []);
  const handleTrainingChange: HandleTrainingChange = useCallback((value) => {
    setFields((prev) => ({
      ...prev,
      training: {
        ...prev.schedule_type,
        error: false,
        value,
      },
      trainees: {
        ...prev.trainees,
        error: false,
        value: [],
      },
    }));
  }, []);
  const handleMemberAdd: HandleMemberAdd = useCallback(
    (type, value) => {
      setFields((prev) => {
        const newFields: SessionFormFields = {
          ...prev,
          [type]: { ...prev[type], error: false, value },
          interviewer_cnt: {
            ...prev.interviewer_cnt,
            error: false,
            value:
              type === 'interviewers' &&
              (prev.interviewer_cnt.value === null ||
                prev.interviewer_cnt.value === 0)
                ? value.length
                : prev.interviewer_cnt.value,
          },
        };
        return newFields;
      });
    },
    [session_type.value],
  );

  const handleCountChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (e) => {
      const entry = e.target.value as any;
      const safeEntry = +entry;
      if (entry === null || entry === '')
        handleChange('interviewer_cnt', null!);
      else if (safeEntry < 1) handleChange('interviewer_cnt', 1);
      else if (safeEntry > interviewers.value.length)
        handleChange('interviewer_cnt', interviewers.value.length);
      else handleChange('interviewer_cnt', safeEntry);
    },
    [interviewers.value.length],
  );

  const countField = useMemo(
    () => (
      <UITextField
        fieldSize='small'
        name={'interviewer_cnt'}
        type='number'
        style={{
          width: '60px',
        }}
        value={interviewer_cnt?.value ?? ''}
        error={interviewer_cnt.error}
        helperText={interviewer_cnt.helper}
        onChange={handleCountChange}
      />
    ),
    [interviewer_cnt, interviewers.value.length],
  );

  const trainingSwitch = useMemo(
    () => (
      <Switch
        checked={training.value}
        onCheckedChange={() => handleTrainingChange(!training.value)}
      />
    ),
    [training],
  );

  const { push } = useRouterPro();

  return (
    <>
      <InterviewMode
        isIndividual={session_type.value === 'individual'}
        isPanel={
          interviewers.value.length > 1 && session_type.value === 'panel'
        }
        isTraining={training.value}
        textToggleLabel={`Training ${training.value ? 'On' : 'Off'}`}
        slotToggle={trainingSwitch}
        slotInterviewModePill={
          <InterviewModePills
            session_type={session_type.value}
            handleModeChange={handleModeChange}
          />
        }
        slotMemberCountDropdown={countField}
        slotInterviewersDropdown={
          <div className='flex flex-col gap-1'>
            {(currentQualifiedModuleMembers ?? []).length === 0 && (
              <Alert variant='error'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Interview type has no interviewers</AlertTitle>
                <AlertDescription>
                  Please add members to the selected interview type
                </AlertDescription>
                <UIButton
                  variant='destructive'
                  size={'sm'}
                  onClick={() =>
                    interview_module?.value?.id &&
                    push(
                      ROUTES['/interview-pool/[pool]']({
                        type_id: interview_module.value.id,
                      }),
                    )
                  }
                >
                  Go to interview type
                </UIButton>
              </Alert>
            )}
            <InterviewersField
              value={interviewers.value}
              error={interviewers.error}
              type='interviewers'
              moduleMemberRecommendations={qualifiedModuleMemberRecommendations}
              handleMemberAdd={handleMemberAdd}
            />
          </div>
        }
        isTrainingVisible={showTraining}
        slotInterviewersAvatarSelectionPill={<></>}
        slotTraineeAvatarSelectionPill={<></>}
        isTraineesDropVisible={showTrainingMembers}
        slotTraineesDropdown={
          showTrainingMembers && (
            <InterviewersField
              value={trainees.value}
              type='trainees'
              moduleMemberRecommendations={trainingModuleMemberRecommendations}
              handleMemberAdd={handleMemberAdd}
            />
          )
        }
      />
    </>
  );
};

export const ScheduleTypeField = ({
  value,
  handleTypeChange,
}: {
  value: SessionFormProps['schedule_type'];
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
    value: SessionFormProps['schedule_type'];
    icon: React.JSX.Element;
  }[];
  // eslint-disable-next-line no-unused-vars
  const _onChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const schedule = options.find((m) => m.value === e.target.value);
    if (schedule) handleTypeChange(schedule.value);
  };
  return (
    <UISelectDropDown
      label='Schedule type'
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

export const SessionDurationField = ({
  value,
  handleChange,
}: {
  value: SessionFormProps['session_duration'];
  handleChange: HandleChange;
}) => {
  const options = sessionDurations.reduce(
    (acc, curr) => {
      acc.push({ name: getBreakLabelV2(curr), value: curr });
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
  moduleMemberRecommendations,
  type,
  handleMemberAdd,
  error,
}: {
  value: SessionFormProps['interviewers'];
  type: Parameters<HandleMemberAdd>['0'];
  moduleMemberRecommendations: SessionUser[];
  handleMemberAdd: HandleMemberAdd;
  error?: boolean;
}) => {
  const options: MemberTypeAutoComplete[] = moduleMemberRecommendations.map(
    (m) => ({
      name: getFullName(m.first_name, m.last_name),
      email: m.email,
      first_name: m.first_name,
      last_name: m.last_name,
      position: m.position,
      profile_image: m.profile_image,
      user_id: m.user_id,
    }),
  );

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
        const selUsers = moduleMemberRecommendations.filter((m) =>
          user_ids.includes(m.user_id),
        );
        handleMemberAdd(type, selUsers);
      }}
      error={error || value.length === 0}
      helperText='Interviewers cannot be empty'
    />
  );
};

const InterviewModulesField = ({
  value,
  handleModuleChange,
  error,
}: {
  value: SessionFormProps['interview_module'];
  handleModuleChange: HandleModuleChange;
  error?: boolean;
}) => {
  const {
    interviewModules: { data },
  } = useJobInterviewPlan();
  const options = (data ?? []).map((m) => ({
    name: m.name,
    value: m.id,
    start_icon_url: m.members.map(
      ({ first_name, last_name, profile_image }) => ({
        name: getFullName(first_name!, last_name!),
        url: profile_image,
      }),
    ),
  }));

  return (
    <UISelectDropDown
      placeholder='Select interview type'
      onValueChange={(value) => {
        const interview_module = (data ?? []).find((m) => m.id === value);
        if (interview_module)
          handleModuleChange(
            interview_module as SessionFormProps['interview_module'],
          );
      }}
      value={value?.id}
      menuOptions={options.map((ele) => ({
        name: ele.name,
        value: ele.value,
      }))}
      error={error && !value?.id}
      helperText='Interview Type cannot be empty'
    />
  );
};

type InterviewModePillsProps = Pick<SessionFormProps, 'session_type'> & {
  handleModeChange: HandleModeChange;
};
const InterviewModePills = ({
  session_type,
  handleModeChange,
}: InterviewModePillsProps) => {
  return (
    <>
      <Tabs value={session_type === 'individual' ? 'individual' : 'panel'}>
        <TabsList>
          <TabsTrigger
            value='individual'
            onClick={() => {
              handleModeChange('individual');
            }}
          >
            <div className='flex flex-row justify-center gap-1'>
              <IndividualIcon size={16} /> Individual
            </div>
          </TabsTrigger>
          <TabsTrigger
            value='panel'
            onClick={() => {
              handleModeChange('panel');
            }}
          >
            <div className='flex flex-row justify-center gap-1'>
              <PanelIcon size={16} /> Panel
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export const PanelIcon = ({ size = 24 }: { size?: number }) => (
  <Users size={size} className='text-muted-foreground' />
);

export const IndividualIcon = ({ size = 24 }: { size?: number }) => (
  <User size={size} className='text-muted-foreground' />
);

export const validateSessionFields = (fields: SessionFormFields) => {
  const safeFields = Object.entries(fields).reduce(
    (acc, [key, value]) => {
      //@ts-ignore
      acc.newFields[key] = structuredClone(value);
      const safeKey = key as keyof SessionFormFields;
      switch (safeKey) {
        case 'name':
          {
            const safeValue = value as SessionFormFields['name'];
            if (validateString(safeValue?.value ?? null)) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
        case 'schedule_type':
          {
            const safeValue = value as SessionFormFields['schedule_type'];
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
            const safeValue = value as SessionFormFields['session_type'];
            if (validateString(safeValue?.value ?? null)) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
        case 'interview_module':
          {
            const safeValue = value as SessionFormFields['interview_module'];
            if (!(safeValue?.value ?? null)) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
        case 'interviewer_cnt':
        case 'session_duration':
          {
            const safeValue = value as SessionFormFields['interviewer_cnt'];
            if ((safeValue?.value ?? 0) <= 0) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
        case 'interviewers':
          {
            const safeValue = value as SessionFormFields['interviewers'];
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
      newFields: {} as SessionFormFields,
    },
  );
  return safeFields;
};

export const getSessionPayload = (
  fields: SessionFormFields,
  session_order: number,
  interview_plan_id: string,
): Omit<CreateInterviewSession, 'recruiter_id'> => {
  const {
    interview_module,
    interviewer_cnt,
    interviewers,
    name,
    schedule_type,
    location,
    session_duration,
    session_type,
    trainees,
  } = Object.entries(fields).reduce(
    (acc, [key, value]) => {
      //@ts-ignore
      acc[key] = value.value;
      return acc;
    },
    {} as { [key in keyof SessionFormFields]: SessionFormFields[key]['value'] },
  );
  const safeInterviewers: CreateInterviewSession['interview_module_relation_entries'] =
    interviewers.map(({ module_relation_id }) => ({
      id: module_relation_id,
      interviewer_type: 'qualified',
      training_type: 'qualified',
    }));
  const safeTrainees: CreateInterviewSession['interview_module_relation_entries'] =
    trainees.map(({ module_relation_id }) => ({
      id: module_relation_id,
      interviewer_type: 'training',
      training_type: null,
    }));
  return {
    session_type,
    session_duration,
    interviewer_cnt,
    name,
    schedule_type,
    location: location!,
    break_duration: 0,
    module_id: interview_module!.id,
    interview_module_relation_entries: [...safeInterviewers, ...safeTrainees],
    session_order,
    interview_plan_id,
  };
};
