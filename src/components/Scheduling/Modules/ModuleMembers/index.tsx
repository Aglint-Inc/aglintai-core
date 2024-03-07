import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';

import { ButtonPrimarySmall } from '@/devlink';
import {
  AllInterviewEmpty,
  Breadcrum,
  EmptyState,
  InterviewMemberList,
  InterviewMemberSide,
  MemberListCard,
  PageLayout
} from '@/devlink2';
import { MoreButton } from '@/devlink3';
import Icon from '@/src/components/Common/Icons/Icon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { pageRoutes } from '@/src/utils/pageRouting';

import AddMemberDialog from './AddMemberDialog';
import DeleteMemberDialog from './DeleteMemberDialog';
import DeleteModuleDialog from './DeleteModuleDialog';
import PauseDialog from './PauseDialog';
import ResumeMemberDialog from './ResumeMemberDialog';
import {
  setIsAddMemberDialogOpen,
  setIsDeleteMemberDialogOpen,
  setIsDeleteModuleDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  useSchedulingStore
} from '../store';

function ModuleMembersComp() {
  const router = useRouter();
  const { members } = useSchedulingContext();
  const moduleName = useSchedulingStore((state) => state.moduleName);
  const allUsers = useSchedulingStore(
    useShallow((state) => state.editModule.relations)
  );
  const { loading } = useSchedulingContext();

  return (
    <>
      <AddMemberDialog />
      <DeleteMemberDialog />
      <PauseDialog />
      <DeleteModuleDialog />
      <ResumeMemberDialog />
      <PageLayout
        onClickBack={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=interviewModules`);
          }
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum textName={moduleName} />
          </>
        }
        slotBody={
          <>
            <InterviewMemberList
              slotInterviewCard={
                <InterviewMemberSide
                  slotInterviewCard={
                    <>
                      <AllInterviewEmpty />
                    </>
                  }
                />
              }
              slotMemberList={
                <>
                  {!loading && allUsers.length === 0 && (
                    <EmptyState textDescription={'No Members Added Yet'} />
                  )}
                  {!loading &&
                    allUsers.map((user) => {
                      const member = members.filter(
                        (member) => member.user_id === user.user_id
                      )[0];
                      return (
                        <MemberListCard
                          key={user.user_id}
                          textPauseResumeDate={
                            !user.pause_json?.isManual
                              ? user.pause_json?.end_date
                                ? 'Till ' +
                                  dayjs(user.pause_json.end_date).format(
                                    'DD MMMM YYYY'
                                  )
                                : '--'
                              : 'Till you resume'
                          }
                          onClickRemoveModule={{
                            onClick: () => {
                              setSelUser(user);
                              setIsDeleteMemberDialogOpen(true);
                            }
                          }}
                          onClickPauseInterview={{
                            onClick: () => {
                              setSelUser(user);
                              setIsPauseDialogOpen(true);
                            }
                          }}
                          onClickResumeInterview={{
                            onClick: () => {
                              setSelUser(user);
                              setIsResumeDialogOpen(true);
                            }
                          }}
                          onHoverDot={false}
                          isPauseResumeVisible={Boolean(user.pause_json)}
                          isPauseVisible={!user.pause_json}
                          isResumeVisible={Boolean(user.pause_json)}
                          slotProfileImage={
                            <MuiAvatar
                              src={member.profile_image}
                              level={member.first_name}
                              variant='circular'
                              height='60px'
                              width='60px'
                              fontSize='24px'
                            />
                          }
                          textName={member.first_name}
                          textRole={member.position || '--'}
                        />
                      );
                    })}
                </>
              }
            />
          </>
        }
        slotTopbarRight={
          <Stack spacing={2} direction={'row'} alignItems={'center'}>
            <ButtonPrimarySmall
              isStartIcon={true}
              slotStartIcon={
                <Stack>
                  <Icon
                    variant='PlusThin'
                    height='12'
                    width='12'
                    color='#fff'
                  />
                </Stack>
              }
              textLabel={'Add Member'}
              onClickButton={{
                onClick: () => {
                  setIsAddMemberDialogOpen(true);
                }
              }}
            />
            <MoreButton
              onClickDelete={{
                onClick: () => {
                  setIsDeleteModuleDialogOpen(true);
                }
              }}
            />
          </Stack>
        }
      />
    </>
  );
}

export default ModuleMembersComp;
