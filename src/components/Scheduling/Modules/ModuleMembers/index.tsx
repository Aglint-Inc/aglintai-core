import dayjs from 'dayjs';
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
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import DeleteMemberDialog from '../DeleteDialog';
import PauseDialog from '../PauseDialog';
import {
  setEditModule,
  setIsDeleteDialogOpen,
  setIsPauseDialogOpen,
  setSelUser,
  useSchedulingStore
} from '../store';

function ModuleMembersComp() {
  const router = useRouter();
  const { members } = useAuthDetails();
  const { moduleName, editModule } = useSchedulingStore();

  const resumeHandler = async (selUser) => {
    try {
      if (selUser.user_id) {
        const { error } = await supabase
          .from('interview_module_relation')
          .update({ pause_json: null })
          .match({ module_id: editModule.id, user_id: selUser.user_id });
        if (!error) {
          setEditModule({
            ...editModule,
            relations: editModule.relations.map((rel) =>
              rel.user_id === selUser.user_id
                ? { ...rel, pause_json: null }
                : rel
            )
          });
        }
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error resuming user');
    } finally {
      setIsPauseDialogOpen(false);
    }
  };

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
              slotMemberList={editModule?.relations.map((user) => {
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
                    textPauseResumeDate={
                      user.pause_json?.end_date
                        ? 'Till ' +
                          dayjs(user.pause_json.end_date).format('DD MMMM YYYY')
                        : '--'
                    }
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
                    onClickResumeInterview={{
                      onClick: () => {
                        resumeHandler(user);
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
