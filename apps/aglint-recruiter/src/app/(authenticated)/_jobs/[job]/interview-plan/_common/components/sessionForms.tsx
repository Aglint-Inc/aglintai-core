/* eslint-disable security/detect-object-injection */
import { type DB } from '@aglint/shared-types';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Switch } from '@components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import React, {
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
} from 'react';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { UIButton } from '@/components/Common/UIButton';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { UITextArea } from '@/components/Common/UITextArea';
import UITextField from '@/components/Common/UITextField';
import MembersAutoComplete, {
  type MemberTypeAutoComplete,
} from '@/components/Scheduling/Common/MembersTextField';
import { useJobInterviewPlan } from '@/job/interview-plan/hooks';
import { type CreateInterviewSession } from '@/queries/interview-plans';
import { type InterviewSessionType } from '@/queries/interview-plans/types';
import { getBreakLabelV2 } from '@/utils/getBreakLabelV2';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';
import { sessionDurations } from '@/utils/scheduling/const';
import { validateString } from '@/utils/validateString';

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
  interviewer_cnt: null,
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
    setFields((prev) => ({
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
            name={'location'}
            rows={5}
            value={location.value}
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
      acc[curr.training_status].push(curr);
      return acc;
    },
    { qualified: [], training: [] } as {
      // eslint-disable-next-line no-unused-vars
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
    setFields((prev) => ({
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
    }));
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
      if (entry === null || entry === '') handleChange('interviewer_cnt', null);
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

  const { push } = useRouter();

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
                      ROUTES['/interview-pool/[type_id]']({
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
      pillColor='var(--neutral-3)'
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
  const options = data.map((m) => ({
    name: m.name,
    value: m.id,
    start_icon_url: m.members.map(
      ({ first_name, last_name, profile_image }) => ({
        name: getFullName(first_name, last_name),
        url: profile_image,
      }),
    ),
  }));

  return (
    <UISelectDropDown
      placeholder='Select interview type'
      onValueChange={(value) => {
        const interview_module = data.find((m) => m.id === value);
        if (interview_module) handleModuleChange(interview_module);
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
              <IndividualIcon /> Individual
            </div>
          </TabsTrigger>
          <TabsTrigger
            value='panel'
            onClick={() => {
              handleModeChange('panel');
            }}
          >
            <div className='flex flex-row justify-center gap-1'>
              <PanelIcon /> Panel
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export const PanelIcon = ({ size = 24 }: { size?: number }) => (
  // <GlobalIcon iconName='groups' />
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4.5 4H19.5C20.2083 4.02083 20.8021 4.26042 21.2812 4.71875C21.7396 5.19792 21.9792 5.79167 22 6.5V17.5C21.9792 18.2083 21.7396 18.8021 21.2812 19.2812C20.8021 19.7396 20.2083 19.9792 19.5 20H4.5C3.79167 19.9792 3.19792 19.7396 2.71875 19.2812C2.26042 18.8021 2.02083 18.2083 2 17.5V6.5C2.02083 5.79167 2.26042 5.19792 2.71875 4.71875C3.19792 4.26042 3.79167 4.02083 4.5 4ZM3 6.5V17.5C3.02083 17.9167 3.16667 18.2708 3.4375 18.5625C3.72917 18.8333 4.08333 18.9792 4.5 19H19.5C19.9167 18.9792 20.2708 18.8333 20.5625 18.5625C20.8333 18.2708 20.9792 17.9167 21 17.5V6.5C20.9792 6.08333 20.8333 5.72917 20.5625 5.4375C20.2708 5.16667 19.9167 5.02083 19.5 5H4.5C4.08333 5.02083 3.72917 5.16667 3.4375 5.4375C3.16667 5.72917 3.02083 6.08333 3 6.5ZM11 10C11 10.2917 11.0938 10.5312 11.2812 10.7188C11.4688 10.9062 11.7083 11 12 11C12.2917 11 12.5312 10.9062 12.7188 10.7188C12.9062 10.5312 13 10.2917 13 10C13 9.70833 12.9062 9.46875 12.7188 9.28125C12.5312 9.09375 12.2917 9 12 9C11.7083 9 11.4688 9.09375 11.2812 9.28125C11.0938 9.46875 11 9.70833 11 10ZM14 10C13.9792 10.75 13.6458 11.3229 13 11.7188C12.3333 12.0938 11.6667 12.0938 11 11.7188C10.3542 11.3229 10.0208 10.75 10 10C10.0208 9.25 10.3542 8.67708 11 8.28125C11.6667 7.90625 12.3333 7.90625 13 8.28125C13.6458 8.67708 13.9792 9.25 14 10ZM13.25 14H10.75C10.1042 14.0417 9.69792 14.375 9.53125 15H14.4688C14.3021 14.375 13.8958 14.0417 13.25 14ZM10.75 13H12H13.25C13.8958 13.0208 14.4271 13.2396 14.8438 13.6562C15.2604 14.0729 15.4792 14.6042 15.5 15.25C15.4583 15.7083 15.2083 15.9583 14.75 16H9.25C8.79167 15.9583 8.54167 15.7083 8.5 15.25C8.52083 14.6042 8.73958 14.0729 9.15625 13.6562C9.57292 13.2396 10.1042 13.0208 10.75 13ZM7 9.5C7.02083 9.8125 7.1875 9.97917 7.5 10C7.79167 9.97917 7.95833 9.8125 8 9.5C7.95833 9.1875 7.79167 9.02083 7.5 9C7.1875 9.02083 7.02083 9.1875 7 9.5ZM9 9.5C8.97917 10.0625 8.72917 10.5 8.25 10.8125C7.75 11.0625 7.25 11.0625 6.75 10.8125C6.27083 10.5 6.02083 10.0625 6 9.5C6.02083 8.9375 6.27083 8.5 6.75 8.1875C7.25 7.9375 7.75 7.9375 8.25 8.1875C8.72917 8.5 8.97917 8.9375 9 9.5ZM6 13.75V14C5.97917 14.3125 5.8125 14.4792 5.5 14.5C5.1875 14.4792 5.02083 14.3125 5 14V13.75C5.02083 13.25 5.1875 12.8333 5.5 12.5C5.83333 12.1875 6.25 12.0208 6.75 12H8.5C8.8125 12.0208 8.97917 12.1875 9 12.5C8.97917 12.8125 8.8125 12.9792 8.5 13H6.75C6.29167 13.0417 6.04167 13.2917 6 13.75ZM16.5 9C16.2083 9.02083 16.0417 9.1875 16 9.5C16.0417 9.8125 16.2083 9.97917 16.5 10C16.8125 9.97917 16.9792 9.8125 17 9.5C16.9792 9.1875 16.8125 9.02083 16.5 9ZM16.5 11C15.9375 10.9792 15.5104 10.7292 15.2188 10.25C14.9479 9.75 14.9479 9.25 15.2188 8.75C15.5104 8.27083 15.9375 8.02083 16.5 8C17.0625 8.02083 17.5 8.27083 17.8125 8.75C18.0833 9.25 18.0833 9.75 17.8125 10.25C17.5 10.7292 17.0625 10.9792 16.5 11ZM17.25 13H15.5C15.1875 12.9792 15.0208 12.8125 15 12.5C15.0208 12.1875 15.1875 12.0208 15.5 12H17.25C17.75 12.0208 18.1667 12.1875 18.5 12.5C18.8125 12.8333 18.9792 13.25 19 13.75V14C18.9792 14.3125 18.8125 14.4792 18.5 14.5C18.1875 14.4792 18.0208 14.3125 18 14V13.75C17.9583 13.2917 17.7083 13.0417 17.25 13Z'
      fill='#2F3941'
    ></path>
  </svg>
);

export const IndividualIcon = ({ size = 24 }: { size?: number }) => (
  // <GlobalIcon iconName='person' />
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4.5 4H19.5C20.2083 4.02083 20.8021 4.26042 21.2812 4.71875C21.7396 5.19792 21.9792 5.79167 22 6.5V17.5C21.9792 18.2083 21.7396 18.8021 21.2812 19.2812C20.8021 19.7396 20.2083 19.9792 19.5 20H4.5C3.79167 19.9792 3.19792 19.7396 2.71875 19.2812C2.26042 18.8021 2.02083 18.2083 2 17.5V6.5C2.02083 5.79167 2.26042 5.19792 2.71875 4.71875C3.19792 4.26042 3.79167 4.02083 4.5 4ZM3 6.5V17.5C3.02083 17.9167 3.16667 18.2708 3.4375 18.5625C3.72917 18.8333 4.08333 18.9792 4.5 19H19.5C19.9167 18.9792 20.2708 18.8333 20.5625 18.5625C20.8333 18.2708 20.9792 17.9167 21 17.5V6.5C20.9792 6.08333 20.8333 5.72917 20.5625 5.4375C20.2708 5.16667 19.9167 5.02083 19.5 5H4.5C4.08333 5.02083 3.72917 5.16667 3.4375 5.4375C3.16667 5.72917 3.02083 6.08333 3 6.5ZM11 10C11 10.2917 11.0938 10.5312 11.2812 10.7188C11.4688 10.9062 11.7083 11 12 11C12.2917 11 12.5312 10.9062 12.7188 10.7188C12.9062 10.5312 13 10.2917 13 10C13 9.70833 12.9062 9.46875 12.7188 9.28125C12.5312 9.09375 12.2917 9 12 9C11.7083 9 11.4688 9.09375 11.2812 9.28125C11.0938 9.46875 11 9.70833 11 10ZM14 10C13.9792 10.75 13.6458 11.3229 13 11.7188C12.3333 12.0938 11.6667 12.0938 11 11.7188C10.3542 11.3229 10.0208 10.75 10 10C10.0208 9.25 10.3542 8.67708 11 8.28125C11.6667 7.90625 12.3333 7.90625 13 8.28125C13.6458 8.67708 13.9792 9.25 14 10ZM13.25 14H10.75C10.1042 14.0417 9.69792 14.375 9.53125 15H14.4688C14.3021 14.375 13.8958 14.0417 13.25 14ZM10.75 13H13.25C13.8958 13.0208 14.4271 13.2396 14.8438 13.6562C15.2604 14.0729 15.4792 14.6042 15.5 15.25C15.4583 15.7083 15.2083 15.9583 14.75 16H9.25C8.79167 15.9583 8.54167 15.7083 8.5 15.25C8.52083 14.6042 8.73958 14.0729 9.15625 13.6562C9.57292 13.2396 10.1042 13.0208 10.75 13Z'
      fill='#2F3941'
    ></path>
  </svg>
);

export const validateSessionFields = (fields: SessionFormFields) => {
  const safeFields = Object.entries(fields).reduce(
    (acc, [key, value]) => {
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
): CreateInterviewSession => {
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
    location,
    break_duration: 0,
    module_id: interview_module.id,
    interview_module_relation_entries: [...safeInterviewers, ...safeTrainees],
    session_order,
    interview_plan_id,
  };
};
