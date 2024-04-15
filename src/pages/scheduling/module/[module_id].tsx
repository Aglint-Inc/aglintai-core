import { Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { useState } from 'react';

import {
  Breadcrum,
  EmptyGeneral,
  InterviewMembersCard,
  MutedShadowSession,
  PageLayout,
  ShadowSession,
  StatusBadge,
} from '@/devlink2';
import { DarkPill, InterviewerPage } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import Seo from '@/src/components/Common/Seo';
import SessionCard from '@/src/components/Scheduling/Modules/ModuleMembers/ProgressDrawer/SessionCard';
import { ProgressUser } from '@/src/components/Scheduling/Modules/ModuleMembers/SlotBodyComp/SlotTrainingMembers';
import TopRightButtons from '@/src/components/Scheduling/Modules/ModuleMembers/TopRightButtons';
import {
  // useGetMeetingsByModuleId,
  useModuleAndUsers,
  useProgressModuleUsers,
} from '@/src/components/Scheduling/Modules/queries/hooks';
import { ModuleType } from '@/src/components/Scheduling/Modules/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import SchedulingProvider, {
  useSchedulingContext,
} from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { getFullName } from '@/src/utils/jsonResume';
import { numberToOrdinalText } from '@/src/utils/numberToText/numberToOrdinalText';

import IProgressDrawer from './IProgressDrawer';

const ModuleMembers = () => {
  return (
    <>
      <ModuleMembersComp />
    </>
  );
};

ModuleMembers.getProvider = function getProvider(page) {
  return <SchedulingProvider>{page}</SchedulingProvider>;
};
export default ModuleMembers;

const subTabs: ('training history' | 'instructions' | 'members')[] = [
  'training history',
  'instructions',
  'members',
];

function ModuleMembersComp() {
  const {
    data: editModule,
    isLoading: fetchingModule,
    isFetching,
  } = useModuleAndUsers();
  const { recruiterUser, recruiter } = useAuthDetails();
  const [subTab, setSubTab] =
    useState<(typeof subTabs)[number]>('training history');

  const { members, loading } = useSchedulingContext();
  // const { data: meetingData } = useGetMeetingsByModuleId({
  //   schedulesLoading: false,
  //   user_ids: editModule?.relations?.map((user) => user.user_id) || [],
  // });
  const { data: progress } = useProgressModuleUsers({
    // trainer_ids: [
    //   editModule?.relations.find(
    //     (user) => user.user_id === recruiterUser.user_id,
    //   ).id,
    // ],
    trainer_ids: editModule?.relations.map((user) => user.id) || [],
  });

  return (
    <>
      <Seo
        title={`${recruiter.name} | Scheduling`}
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
            <Breadcrum textName={editModule?.name} />
          </>
        }
        slotTopbarRight={
          <Stack direction={'row'} justifyItems={'center'} gap={'10px'}>
            {/* <Instructions editModule={editModule} /> */}
            <TopRightButtons editModule={editModule} />
          </Stack>
        }
        slotBody={
          <>
            {fetchingModule || loading || (!module && isFetching) ? (
              <Stack height={'100%'} width={'100%'}>
                <Loader />
              </Stack>
            ) : (
              <InterviewerPage
                textInterviewDetail={editModule?.description}
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
                      {editModule && (
                        <TrainingDetails
                          id={recruiterUser.user_id}
                          members={members}
                          module={editModule}
                          progress={
                            progress.filter(
                              (item) => item.user_id === recruiterUser.user_id,
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
                            __html: editModule?.instructions,
                          }}
                        />
                      </Stack>
                    </>
                  ) : (
                    <ModuleMembersX module={editModule} progress={progress} />
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
              textSessionHeader={`${numberToOrdinalText(index + 1 + shadowProgress.length)} Shadow Session`}
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
              textSessionHeader={`${numberToOrdinalText(index + 1 + reverseShadowProgress.length)} Reverse Shadow Session`}
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
}: {
  module: ModuleType;
  progress: any;
}) => {
  return (
    <>
      <Stack gap={1} p={'20px'} maxWidth={'800px'}>
        <SlotQualifiedMembers editModule={module} progress={progress} />
        {/* <SlotTrainingMembers editModule={module} meetingData={meetingData} /> */}
      </Stack>
    </>
  );
};

function SlotQualifiedMembers({
  editModule,
  // meetingData,
  progress,
}: {
  editModule: ModuleType;
  // meetingData: ReturnType<typeof useGetMeetingsByModuleId>['data'];
  progress: any;
}) {
  const { members } = useSchedulingContext();

  const allQualified = editModule.relations;

  const [progressUser, setProgressUser] = useState<ProgressUser>({
    user: null,
    progress: [],
  });

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
            <InterviewMembersCard
              isTrainingVisible={user.training_status === 'training'}
              isTrainingProgressVisible={true}
              isTrainingCompletedVisible={false}
              onClickViewHistory={{
                onClick: () => {
                  setProgressUser({
                    progress: progress.filter(
                      (prog) => prog.interview_module_relation_id === user.id,
                    ),
                    user: members.filter(
                      (member) => member.user_id === user.user_id,
                    )[0],
                  });
                },
              }}
              onClickViewProgress={{
                onClick: () => {
                  setProgressUser({
                    progress: progress.filter(
                      (prog) => prog.interview_module_relation_id === user.id,
                    ),
                    user: members.filter(
                      (member) => member.user_id === user.user_id,
                    )[0],
                  });
                },
              }}
              onClickApproveCandidate={{ onClick: () => {} }}
              key={user.user_id}
              slotMemberImage={
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
            />
          </>
        );
      })}
    </>
  );
}
