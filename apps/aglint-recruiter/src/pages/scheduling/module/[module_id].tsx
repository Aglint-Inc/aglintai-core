import { type DatabaseTableUpdate } from '@aglint/shared-types';
import { useToast } from '@components/hooks/use-toast';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { EmptyGeneral } from '@devlink2/EmptyGeneral';
import { MemberListCard } from '@devlink2/MemberListCard';
import { PageLayout } from '@devlink2/PageLayout';
import { ShadowSession } from '@devlink2/ShadowSession';

import { DarkPill } from '@devlink3/DarkPill';
import { HistoryPill } from '@devlink3/HistoryPill';
import { HistoryTrainingCard } from '@devlink3/HistoryTrainingCard';
import { InterviewerPage } from '@devlink3/InterviewerPage';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { useMemo, useState } from 'react';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import Loader from '@/components/Common/Loader';
import MuiAvatar from '@/components/Common/MuiAvatar';
import Seo from '@/components/Common/Seo';
import { type ProgressUser } from '@/components/Scheduling/InterviewTypes/DetailPage/SlotBodyComp/SlotTrainingMembers';
import {
  useModuleAndUsers,
  useProgressModuleUsers,
} from '@/components/Scheduling/InterviewTypes/queries/hooks';
import {
  type MemberType,
  type ModuleType,
} from '@/components/Scheduling/InterviewTypes/types';
import { useAllInterviewersDetails } from '@/components/Scheduling/ScheduleDetails/hooks';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { getFullName } from '@/utils/jsonResume';
import { getScheduleType } from '@/utils/scheduling/colors_and_enums';
import { supabase } from '@/utils/supabase/client';
import { StatusBadge } from '@devlink2/StatusBadge';

const ModuleMembers = () => {
  return (
    <>
      <ModuleMembersComp />
    </>
  );
};

export default ModuleMembers;

const subTabs: ('training history' | 'instructions' | 'members')[] = [
  'training history',
  'instructions',
  'members',
];

function ModuleMembersComp() {
  const {
    data: selectedModule,
    isLoading: fetchingModule,
    isPending,
  } = useModuleAndUsers();
  const { recruiterUser } = useAuthDetails();
  const { toast } = useToast();
  const [subTab, setSubTab] =
    useState<(typeof subTabs)[number]>('training history');

  const { data: members, isPending: loading } = useAllInterviewersDetails();

  const { data: progress } = useProgressModuleUsers({
    trainer_ids: selectedModule?.relations.map((user) => user.id) || [],
  });

  const [module, setModule] = useState<typeof selectedModule>(null);
  useMemo(() => {
    if (selectedModule) {
      setModule(selectedModule);
    }
  }, [selectedModule]);

  const updateMemberProgress = ({
    user_id,
    data,
  }: {
    user_id: string;
    data: DatabaseTableUpdate['interview_module_relation'];
  }) => {
    updateMemberRelation({ module_id: module.id, user_id, data }).then(
      (data) => {
        const relations = module.relations.map((item) => {
          if (item.user_id === data.user_id) {
            return data as typeof item;
          }
          return item;
        });
        setModule({ ...module, relations });
        toast({
          variant: 'destructive',
          title: 'Candidate qualified as interviewer for this interview type.',
        });
      },
    );
  };

  return (
    <>
      <Seo title={`Scheduling`} description='AI for People Products' />
      <PageLayout
        onClickBack={{
          onClick: () => {
            window.history.back();
          },
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/scheduling'>Scheduling</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{module?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </>
        }
        slotBody={
          <>
            {fetchingModule || loading || (!module && isPending) ? (
              <Stack height={'100%'} width={'100%'}>
                <Loader />
              </Stack>
            ) : (
              <InterviewerPage
                textInterviewDetail={module?.description}
                slotDarkPill={subTabs.map((tab) => (
                  <DarkPill
                    isActive={subTab === tab}
                    key={tab}
                    textPill={capitalize(tab)}
                    onClickPill={{
                      onClick: () => {
                        setSubTab(tab);
                      },
                    }}
                  />
                ))}
                slotInterviewerDetail={
                  subTab === 'training history' ? (
                    <>
                      {module && (
                        <TrainingDetails
                          id={recruiterUser.user_id}
                          members={members}
                          module={module}
                          progress={
                            progress?.filter(
                              (item) =>
                                item.interview_module_relation.id ===
                                selectedModule.relations.find(
                                  (item) =>
                                    item.user_id === recruiterUser.user_id,
                                ).id,
                            ) || []
                          }
                        />
                      )}
                    </>
                  ) : subTab === 'instructions' ? (
                    <>
                      <Stack p={'var(--space-5)'} maxWidth={'1000px'}>
                        <Typography
                          fontSize={'14px'}
                          dangerouslySetInnerHTML={{
                            __html: module?.instructions,
                          }}
                        />
                      </Stack>
                    </>
                  ) : (
                    <ModuleMembersX
                      module={module}
                      progress={progress}
                      members={members}
                      updateMemberRelation={updateMemberProgress}
                    />
                  )
                }
              />
            )}
          </>
        }
      />
    </>
  );
}

const TrainingDetails = ({
  id,
  // eslint-disable-next-line no-unused-vars
  module,
  members,
  progress,
}: {
  id: string;
  module: any;
  members: any[];
  progress: any;
}) => {
  const progressUser = {
    progress: progress,
    user: members?.find((item) => item.user_id === id),
  };

  return (
    <ShadowSession
      isHeadingCloseVisible={false}
      textName={progressUser.user?.first_name}
      slotProfileImage={
        progressUser.user && (
          <MuiAvatar
            src={progressUser.user.profile_image}
            level={getFullName(
              progressUser.user.first_name,
              progressUser.user.last_name,
            )}
            variant='rounded-small'
          />
        )
      }
      slotShadowSessionCard={<></>}
    />
  );
};

const ModuleMembersX = ({
  module,
  progress,
  members,
  updateMemberRelation,
}: {
  module: ModuleType;
  progress: any;
  members: MemberType[];
  // eslint-disable-next-line no-unused-vars
  updateMemberRelation: (x: {
    user_id: string;
    data: DatabaseTableUpdate['interview_module_relation'];
  }) => void;
}) => {
  return (
    <>
      <Stack gap={1} p={'var(--space-5)'} maxWidth={'1000px'}>
        <SlotQualifiedMembers
          members={members}
          editModule={module}
          progress={progress}
          updateMember={updateMemberRelation}
        />
        {/* <SlotTrainingMembers editModule={module} meetingData={meetingData} /> */}
      </Stack>
    </>
  );
};

function SlotQualifiedMembers({
  editModule,
  // meetingData,
  progress,
  members,
  updateMember,
}: {
  editModule: ModuleType;
  // meetingData: ReturnType<typeof useGetMeetingsByModuleId>['data'];
  progress: ReturnType<typeof useProgressModuleUsers>['data'];
  members: MemberType[];
  // eslint-disable-next-line no-unused-vars
  updateMember: (x: {
    user_id: string;
    module_id: string;
    data: DatabaseTableUpdate['interview_module_relation'];
  }) => void;
}) {
  // const { members } = useSchedulingContext();
  const allQualified = editModule?.relations;

  return (
    <>
      {allQualified.length === 0 && (
        <EmptyGeneral textEmpt={'No Members Added Yet'} />
      )}
      {allQualified.map((user) => {
        const member = members.filter(
          (member) => member.user_id === user.user_id,
        )[0];

        if (!member) return null; //this line added temporarily becasue of data inconsistency

        const tempUserProgress = {
          progress: progress.filter(
            (prog) => prog.interview_module_relation.id === user.id,
          ),
          user: members.filter((member) => member.user_id === user.user_id)[0],
        };
        const isTrainingDone = isTrainingComplete(tempUserProgress);

        const progressDataUser = progress.filter(
          (prog) => prog.interview_module_relation.id === user.id,
        );

        const tempMeetingData: {
          [key: string]: typeof progressDataUser;
        } = {};

        progressDataUser.forEach((prog) => {
          if (prog.interview_session_relation.training_type === 'shadow') {
            tempMeetingData['shadow'] = [
              ...(tempMeetingData['shadow'] || []),
              prog,
            ];
          } else if (
            prog.interview_session_relation.training_type === 'reverse_shadow'
          ) {
            tempMeetingData['reverse shadow'] = [
              ...(tempMeetingData['reverse shadow'] || []),
              prog,
            ];
          }
        });

        let trainingStatusArray: {
          text: 'shadow' | 'reverse shadow';
          state: boolean;
          meeting: (typeof progressDataUser)[number];
        }[] = [
          ...new Array(
            // @ts-ignore
            editModule.settings?.noShadow || 0,
          ).fill({
            text: 'shadow',
            state: false,
            meeting: null,
          }),
          ...new Array(
            // @ts-ignore
            editModule.settings?.noReverseShadow || 0,
          ).fill({
            text: 'reverse shadow',
            state: false,
            meeting: null,
          }),
        ];

        trainingStatusArray = trainingStatusArray.map((item) => {
          if (tempMeetingData[item.text]?.length) {
            // @ts-ignore
            const temp = tempMeetingData[item.text].reverse().pop();
            return { ...item, state: Boolean(temp), meeting: temp };
          }
          return item;
        });

        return (
          <>
            <MemberListCard
              // isTrainingVisible={user.training_status === 'training'}
              isTrainingProgessVisible={
                !isTrainingDone && user.training_status === 'training'
              }
              slotProgressBar={
                <>
                  {trainingStatusArray.map((item, index) => (
                    <HistoryPill
                      key={index}
                      isShadow={item.text === 'shadow'}
                      isReverseShadow={item.text === 'reverse shadow'}
                      isActive={item.state}
                      position={
                        index === 0
                          ? 'start'
                          : trainingStatusArray.length - 1 === index
                            ? 'end'
                            : ''
                      }
                      isHistoryTrainingCardVisible={false}
                      slotHistoryTrainingCard={
                        <HistoryTrainingCard
                          textInterviewType={
                            item.meeting?.interview_session.name
                          }
                          isNotScheduleVisible={!item.meeting}
                          isReverseShadow={item.text === 'reverse shadow'}
                          isShadow={item.text === 'shadow'}
                          slotStatus={
                            <StatusBadge
                              isCancelledVisible={
                                item.meeting?.interview_meeting?.status ===
                                'cancelled'
                              }
                              isConfirmedVisible={
                                item.meeting?.interview_meeting?.status ===
                                'confirmed'
                              }
                              isWaitingVisible={
                                item.meeting?.interview_meeting?.status ===
                                'waiting'
                              }
                              isCompletedVisible={
                                item.meeting?.interview_meeting?.status ===
                                'completed'
                              }
                              isNotScheduledVisible={
                                item.meeting?.interview_meeting?.status ===
                                'not_scheduled'
                              }
                            />
                          }
                          slotMeetingIcon={
                            <IconScheduleType
                              type={
                                item.meeting?.interview_session?.schedule_type
                              }
                            />
                          }
                          textDate={dayjs(
                            item.meeting?.interview_meeting?.start_time,
                          ).format('ddd DD MMM YYYY')}
                          textTime={`${dayjs(
                            item.meeting?.interview_meeting?.start_time,
                          ).format(
                            'HH:mm',
                          )} to ${dayjs(item.meeting?.interview_meeting?.end_time).format('HH:mm')}`}
                          isSchedule={Boolean(
                            item.meeting?.interview_meeting?.status,
                          )}
                          textDuration={
                            <>
                              {`${
                                // @ts-ignore
                                (new Date(
                                  item.meeting?.interview_meeting?.end_time,
                                ) -
                                  // @ts-ignore
                                  new Date(
                                    item.meeting?.interview_meeting?.start_time,
                                  )) /
                                (1000 * 60)
                              } Minutes`}
                            </>
                          }
                          // @ts-ignore
                          textPlatformName={getScheduleType(
                            item.meeting?.interview_session?.schedule_type,
                          )}
                        />
                      }
                    />
                  ))}
                </>
              }
              isTrainingCompletedVisible={isTrainingDone}
              // onClickViewHistory={{
              //   onClick: () => {
              //     setProgressUser(tempUserProgress);
              //   },
              // }}
              // onClickViewProgress={{
              //   onClick: () => {
              //     setProgressUser(tempUserProgress);
              //   },
              // }}
              onClickApproveCandidate={{
                onClick: () => {
                  updateMember({
                    module_id: user.module_id,
                    user_id: user.user_id,
                    data: { training_status: 'qualified' },
                  });
                },
              }}
              key={user.user_id}
              slotProfileImage={
                <MuiAvatar
                  src={member.profile_image}
                  level={getFullName(member.first_name, member.last_name) || ''}
                  variant='rounded-medium'
                />
              }
              textName={getFullName(member.first_name, member.last_name) || ''}
              textRole={member.position || '--'}
              isThreeDotVisible={false}
              isPauseResumeVisible={false}
              // isPauseVisible={!user.pause_json}
              // isResumeVisible={Boolean(user.pause_json)}
            />
          </>
        );
      })}
    </>
  );
}

const isTrainingComplete = (pro: ProgressUser) => {
  let isComplete = false;
  for (const item of pro.progress
    .map((item) => {
      return item;
    })
    .filter(
      (item) =>
        item.interview_session_relation.training_type !== 'qualified' &&
        item.interview_meeting.status !== 'cancelled',
    )) {
    if (item.interview_meeting.status !== 'completed') {
      return false;
    }
    isComplete = true;
  }
  return isComplete;
};

const updateMemberRelation = ({
  user_id,
  module_id,
  data,
}: {
  user_id: string;
  module_id: string;
  data: DatabaseTableUpdate['interview_module_relation'];
}) => {
  return supabase
    .from('interview_module_relation')
    .update(data)
    .eq('module_id', module_id)
    .eq('user_id', user_id)
    .select()
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};
