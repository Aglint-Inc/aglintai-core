import { useRouter } from 'next/router';

import {
  Breadcrum,
  InterviewMemberList,
  MemberListCard,
  PageLayout
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';

import DeleteMemberDialog from '../DeleteDialog';
import PauseDialog from '../PauseDialog';
import {
  setIsDeleteDialogOpen,
  setIsPauseDialogOpen,
  setSelUser,
  useSchedulingStore
} from '../store';

function ModuleMembersComp() {
  const router = useRouter();
  const { members } = useAuthDetails();
  const { selectedUsers, moduleName } = useSchedulingStore();

  return (
    <>
      <DeleteMemberDialog />
      <PauseDialog />
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
              slotMemberList={selectedUsers.map((user) => {
                const member = members.filter(
                  (member) => member.user_id === user.user_id
                )[0];
                return (
                  <MemberListCard
                    key={user.user_id}
                    // onClickClose={{
                    //   onClick: () => {
                    //     if (isCreatePanelOpen == 'edit') {
                    //       checkCandidate(user);
                    //     } else {
                    //       setSelectedUsers(
                    //         selectedUsers.filter(
                    //           (us) => us.user_id !== user.user_id
                    //         )
                    //       );
                    //     }
                    //   }
                    // }}
                    textPauseResumeDate={user.pause_json?.end_date || '--'}
                    onClickRemoveModule={{
                      onClick: () => {
                        setSelUser(user);
                        setIsDeleteDialogOpen(true);
                      }
                    }}
                    onClickPauseInterview={{
                      onClick: () => {
                        setSelUser(user);
                        setIsPauseDialogOpen(true);
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
            />
          </>
        }
        slotTopbarRight={<></>}
      />
    </>
  );
}

export default ModuleMembersComp;
