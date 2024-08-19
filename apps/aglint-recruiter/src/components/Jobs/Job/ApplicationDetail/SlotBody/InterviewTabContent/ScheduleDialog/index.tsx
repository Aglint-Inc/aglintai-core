import { DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { Checkbox, Dialog, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { Text } from '@/devlink/Text';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { ScheduleInterviewPop } from '@/devlink2/ScheduleInterviewPop';
import AvatarSelectDropDown from '@/src/components/Common/AvatarSelect/AvatarSelectDropDown';
import { DateIcon } from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/DateSelector';
import IconSessionType from '@/src/components/Scheduling/CandidateDetails/RightPanel/IconSessionType';
import { useApplication } from '@/src/context/ApplicationContext';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useAllMembers } from '@/src/queries/members';
import dayjs from '@/src/utils/dayjs';

import { setIsScheduleOpen, useApplicationDetailStore } from '../../../store';
import { Interviewer } from '../StageSessions/EditDrawer/types';

function DialogSchedule() {
  const { isScheduleOpen, selectedSessionIds, selectedStageId } =
    useApplicationDetailStore();
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();

  const [isCreateRequest, setIsCreateRequest] = React.useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = React.useState('');
  const [requestType, setRequestType] =
    React.useState<DatabaseTable['request']['priority']>('standard');
  const [dateRange, setDateRange] = React.useState({
    start: dayjs().toISOString(),
    end: dayjs().add(7, 'day').toISOString(),
  });
  const [isSaving, setIsSaving] = React.useState(false);

  const { members } = useAllMembers();

  const {
    meta,
    interview,
    handleCreateRequest,
    requests,
    job_id,
    application_id,
  } = useApplication();

  const candidate = meta.data;
  const selectedStage = interview.data.find(
    (stage) => stage.interview_plan.id === selectedStageId,
  );
  const requestSessionIds = requests.data
    .filter(
      (request) =>
        request.type === 'schedule_request' &&
        (request.status === 'to_do' || request.status === 'in_progress'),
    )
    .flatMap((request) => request.request_relation)
    .flatMap((relation) => relation.session_id);

  const sessions = interview.data
    .flatMap((stage) => stage.sessions)
    .filter((session) =>
      selectedSessionIds.includes(session.interview_session.id),
    );

  const sessionHasRequest = sessions.filter((session) =>
    requestSessionIds.includes(session.interview_session.id),
  );

  let optionsInterviewers: Interviewer[] = members.map((member) => {
    return {
      name: getFullName(member.first_name, member.last_name),
      value: member.user_id,
      start_icon_url: member.profile_image,
    };
  });

  useEffect(() => {
    if (optionsInterviewers?.length > 0) {
      setSelectedInterviewer(String(optionsInterviewers[0].value));
    }
  }, [optionsInterviewers?.length]);

  const onClickSubmit = async () => {
    setIsSaving(true);
    await handleCreateRequest({
      sel_user_id: selectedInterviewer,
      isCreateRequest,
      assigned_user_id: recruiterUser.user_id,
      requestType,
      dateRange,
      selectedSessionIds,
      sessionNames: sessions.map((session) => session.interview_session.name),
    });
    setIsSaving(false);
  };

  return (
    <Dialog
      open={isScheduleOpen}
      onClose={() => {
        setIsScheduleOpen(false);
      }}
    >
      <DcPopup
        popupName={'Schedule Interviews'}
        slotBody={
          <>
            {sessionHasRequest.length > 0 && (
              <GlobalBannerShort
                color={'warning'}
                slotButtons={
                  <>
                    <ButtonSoft
                      size={1}
                      textButton='View Request'
                      onClickButton={{
                        onClick: () => {
                          router.push({
                            query: { tab: 'requests' },
                            pathname: `/jobs/${job_id}/application/${application_id}`,
                          });
                          setIsScheduleOpen(false);
                        },
                      }}
                    />
                  </>
                }
                textTitle={`${sessionHasRequest
                  .map((session) => session.interview_session.name)
                  .join(', ')} already has a schedule request.`}
                textDescription={`Please wait for the request to be accepted or rejected before creating a new request.`}
              />
            )}

            <ScheduleInterviewPop
              textName={candidate.name}
              slotStagePill={
                <>
                  {sessions.map((session) => {
                    return (
                      <ButtonSoft
                        key={session.interview_session.id}
                        size={2}
                        textButton={session.interview_session.name}
                        color={'neutral'}
                        isLeftIcon={true}
                        slotIcon={
                          <IconSessionType
                            type={session.interview_session.session_type}
                          />
                        }
                      />
                    );
                  })}
                </>
              }
              slotCheckBox={
                <Stack direction={'row'} spacing={'var(--space-2)'}>
                  <Checkbox
                    checked={isCreateRequest}
                    onChange={() => {
                      setIsCreateRequest(!isCreateRequest);
                    }}
                  />
                  <Text content={'Create a Scheduling Request'} />
                </Stack>
              }
              slotAssignedInput={
                <>
                  <AvatarSelectDropDown
                    menuOptions={optionsInterviewers}
                    onChange={(e) => {
                      setSelectedInterviewer(e.target.value);
                    }}
                    value={selectedInterviewer}
                    showMenuIcons={true}
                  />
                </>
              }
              slotRequestOption={
                <RequestOption
                  requestType={requestType}
                  setRequestType={setRequestType}
                />
              }
              isRequestTypeVisible={isCreateRequest}
              textSelectedSchedule={`Selected Schedules from stage ${selectedStage?.interview_plan.name} `}
              slotPickDateInput={
                <RangePicker
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              }
            />
          </>
        }
        slotButtons={
          <>
            <ButtonSoft
              size={2}
              textButton='Cancel'
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  setIsScheduleOpen(false);
                },
              }}
            />
            <ButtonSolid
              size={2}
              isLoading={isSaving}
              textButton={isCreateRequest ? 'Create Request' : 'Proceed'}
              onClickButton={{
                onClick: async () => {
                  if (isSaving) return;
                  onClickSubmit();
                },
              }}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default DialogSchedule;

const RangePicker = ({
  dateRange,
  setDateRange,
}: {
  dateRange: { start: string; end: string };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ start: string; end: string }>
  >;
}) => {
  return (
    <Stack spacing={2} direction={'row'}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(dateRange.start)}
          onChange={(newValue) => {
            setDateRange((pre) => {
              pre.start = dayjs(newValue).toISOString();
              return pre;
            });
          }}
          minDate={dayjs()}
          slots={{
            openPickerIcon: DateIcon,
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(dateRange.end)}
          minDate={dayjs(dateRange.start)}
          maxDate={dayjs(dateRange.start).add(1, 'month')}
          onChange={(newValue) => {
            setDateRange((pre) => {
              pre.end = dayjs(newValue).toISOString();
              return pre;
            });
          }}
          slots={{
            openPickerIcon: DateIcon,
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
};

const RequestOption = ({
  requestType,
  setRequestType,
}: {
  requestType: DatabaseTable['request']['priority'];
  setRequestType: React.Dispatch<
    React.SetStateAction<DatabaseTable['request']['priority']>
  >;
}) => {
  return (
    <Stack direction={'row'} width={'100%'} spacing={'var(--space-2)'}>
      <ButtonSoft
        size={2}
        textButton={'Urgent Request'}
        color={requestType === 'urgent' ? 'accent' : 'neutral'}
        isLeftIcon={true}
        slotIcon={<GlobalIcon iconName={'flag_2'} />}
        onClickButton={{
          onClick: () => {
            setRequestType('urgent');
          },
        }}
      />
      <ButtonSoft
        size={2}
        color={requestType === 'standard' ? 'accent' : 'neutral'}
        textButton={'Standard Request'}
        onClickButton={{
          onClick: () => {
            setRequestType('standard');
          },
        }}
      />
    </Stack>
  );
};
