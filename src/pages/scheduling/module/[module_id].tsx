import { Stack, Tooltip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useMemo, useState } from 'react';

import {
  Breadcrum,
  EmptyGeneral,
  MemberListCard,
  MutedShadowSession,
  PageLayout,
  ShadowSession,
  StatusBadge,
} from '@/devlink2';
import { DarkPill, HistoryPill, InterviewerPage } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import Seo from '@/src/components/Common/Seo';
import SessionCard from '@/src/components/Scheduling/Modules/ModuleMembers/ProgressDrawer/SessionCard';
import { ProgressUser } from '@/src/components/Scheduling/Modules/ModuleMembers/SlotBodyComp/SlotTrainingMembers';
import {
  // useGetMeetingsByModuleId,
  useModuleAndUsers,
  useProgressModuleUsers,
} from '@/src/components/Scheduling/Modules/queries/hooks';
import {
  MemberType,
  ModuleType,
} from '@/src/components/Scheduling/Modules/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import SchedulingProvider, {
//   useSchedulingContext,
// } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { DatabaseTableUpdate } from '@/src/types/customSchema';
import { getFullName } from '@/src/utils/jsonResume';
import { numberToOrdinalText } from '@/src/utils/numberToText/numberToOrdinalText';
import toast from '@/src/utils/toast';

import { supabase } from '../../api/invite_user';
import IProgressDrawer from './IProgressDrawer';

const ModuleMembers = () => {
  return (
    <>
      <ModuleMembersComp />
    </>
  );
};

// ModuleMembers.getProvider = function getProvider(page) {
//   return <SchedulingProvider>{page}</SchedulingProvider>;
// };
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
    isFetching,
  } = useModuleAndUsers();
  const { recruiterUser } = useAuthDetails();
  const [subTab, setSubTab] =
    useState<(typeof subTabs)[number]>('training history');

  const { data: members, isFetching: loading } = useInterviewModules();

  let { data: progress } = useProgressModuleUsers({
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
        toast.success('Candidate Qualified as Interviewer for this module');
      },
    );
  };

  return (
    <>
      <Seo
        title={`Scheduling`}
        description='AI Powered Talent Development Platform.'
      />
      <PageLayout
        onClickBack={{
          onClick: () => {
            window.history.back();
          },
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum textName={module?.name} />
          </>
        }
        slotBody={
          <>
            {fetchingModule || loading || (!module && isFetching) ? (
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
                            progress.filter(
                              (item) =>
                                item.interview_module_relation_id ===
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
                      <Stack p={'20px'}>
                        <Typography
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
    user: members.find((item) => item.user_id === id),
  };

  const shadowProgress = progressUser?.progress.filter(
    (prog) => prog.training_type == 'shadow',
  );

  const mutatedShadowProgress = Array.from({
    length: module.settings.noShadow - shadowProgress.length,
  });

  const reverseShadowProgress = progressUser?.progress.filter(
    (prog) => prog.training_type == 'reverse_shadow',
  );

  const mutatedReverseShadowProgress = Array.from({
    length: module.settings.noReverseShadow - reverseShadowProgress.length,
  });
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
            variant='circular'
            height='24px'
            width='24px'
            fontSize='12px'
          />
        )
      }
      slotShadowSessionCard={
        <>
          {shadowProgress.map((prog, ind) => {
            return (
              <SessionCard
                key={ind}
                prog={prog}
                isLineVisible={true}
                session_name={`${numberToOrdinalText(ind + 1)} Shadow`}
              />
            );
          })}
          {mutatedShadowProgress.map((_, index) => (
            <MutedShadowSession
              slotStatusBadge={
                <StatusBadge
                  isNotScheduledVisible={true}
                  isConfirmedVisible={false}
                />
              }
              isReverseShadowIconVisible={false}
              isShadowIconVisible={true}
              textSessionHeader={`${numberToOrdinalText(
                index + 1 + shadowProgress.length,
              )} Shadow Session`}
              key={index}
              isLineVisible={index != mutatedShadowProgress.length - 1}
            />
          ))}

          {reverseShadowProgress.map((prog, ind) => {
            return (
              <SessionCard
                key={ind}
                prog={prog}
                isLineVisible={true}
                session_name={`${numberToOrdinalText(ind + 1)} Reverse Shadow`}
              />
            );
          })}
          {mutatedReverseShadowProgress.map((_, index) => (
            <MutedShadowSession
              slotStatusBadge={
                <StatusBadge
                  isNotScheduledVisible={true}
                  isConfirmedVisible={false}
                />
              }
              isReverseShadowIconVisible={true}
              isShadowIconVisible={false}
              textSessionHeader={`${numberToOrdinalText(
                index + 1 + reverseShadowProgress.length,
              )} Reverse Shadow Session`}
              key={index}
              isLineVisible={index != mutatedReverseShadowProgress.length - 1}
            />
          ))}
        </>
      }
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
      <Stack gap={1} p={'20px'} maxWidth={'1000px'}>
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
  const allQualified = editModule.relations;

  const [progressUser, setProgressUser] = useState<ProgressUser>({
    user: null,
    progress: [],
  });

  return (
    <>
      {progressUser && (
        <IProgressDrawer
          progressUser={progressUser}
          open={Boolean(progressUser.user)}
          onClose={() => {
            setProgressUser({
              user: null,
              progress: [],
            });
          }}
          module={editModule}
        />
      )}
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
            (prog) => prog.interview_module_relation_id === user.id,
          ),
          user: members.filter((member) => member.user_id === user.user_id)[0],
        };
        const isTrainingDone = isTrainingComplete(tempUserProgress);

        const progressDataUser = progress.filter(
          (prog) =>
            prog.interview_module_relation_id === user.id &&
            prog.interview_meeting?.status == 'completed',
        );
        const revShadowCount = progressDataUser.filter(
          (prog) => prog.training_type === 'reverse_shadow',
        ).length;

        const shadowCount = progressDataUser.filter(
          (prog) => prog.training_type == 'shadow',
        ).length;

        let tempMeetingData: { [key: string]: number } = {
          shadow: shadowCount,
          'reverse shadow': revShadowCount,
        };

        let trainingStatusArray: {
          text: 'shadow' | 'reverse shadow';
          state: boolean;
        }[] = [
          ...new Array(
            // @ts-ignore
            editModule.settings?.noShadow || 0,
          ).fill({
            text: 'shadow',
            state: false,
          }),
          ...new Array(
            // @ts-ignore
            editModule.settings?.noReverseShadow || 0,
          ).fill({
            text: 'reverse shadow',
            state: false,
          }),
        ];
        trainingStatusArray = trainingStatusArray.map((item) => {
          if ((tempMeetingData[item.text] || 0) > 0) {
            tempMeetingData[item.text] -= 1;
            return { ...item, state: true };
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
                    <Tooltip key={index} title={'hi'}>
                      <HistoryPill
                        isActive={item.state}
                        isShadow={item.text === 'shadow'}
                        isReverseShadow={item.text === 'reverse shadow'}
                      />
                    </Tooltip>
                  ))}
                </>
              }
              isTrainingCompletedVisible={isTrainingDone}
              // onClickViewHistory={{
              //   onClick: () => {
              //     setProgressUser(tempUserProgress);
              //   },
              // }}
              onClickViewProgress={{
                onClick: () => {
                  setProgressUser(tempUserProgress);
                },
              }}
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
                  variant='circular'
                  height='60px'
                  width='60px'
                  fontSize='24px'
                />
              }
              textName={member.first_name}
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
  for (let item of pro.progress
    .map((item) => {
      return item;
    })
    .filter(
      (item) =>
        item.training_type !== 'qualified' &&
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

const useInterviewModules = () => {
  const { recruiter_id } = useAuthDetails();
  const query = useQuery({
    queryKey: [`InterviewModulesDetails_${recruiter_id}`],
    queryFn: () => {
      return axios
        .post('/api/scheduling/fetchUserDetails', {
          recruiter_id,
        })
        .then((data) => {
          const temp = data.data as unknown as MemberType[];
          return temp;
        });
    },
    enabled: Boolean(recruiter_id),
    initialData: () => [] as unknown as MemberType[],
    refetchOnWindowFocus: false,
  });
  return query;
};
