import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import {
  Breadcrum,
  InterviewMemberList,
  MemberListCard,
  PageLayout
} from '@/devlink2';
import { ButtonPrimaryDefaultRegular, MoreButton } from '@/devlink3';
import Icon from '@/src/components/Common/Icons/Icon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import AddMemberDialog from '../AddMemberDialog';
import DeleteMemberDialog from '../DeleteMemberDialog';
import DeleteModuleDialog from '../DeleteModuleDialog';
import PauseDialog from '../PauseDialog';
import {
  setEditModule,
  setIsAddMemberDialogOpen,
  setIsDeleteMemberDialogOpen,
  setIsDeleteModuleDialogOpen,
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
      <AddMemberDialog />
      <DeleteMemberDialog />
      <PauseDialog />
      <DeleteModuleDialog />
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
        slotTopbarRight={
          <Stack spacing={2} direction={'row'} alignItems={'center'}>
            <ButtonPrimaryDefaultRegular
              startIconSlot={
                <Icon variant='PlusThin' height='12' width='12' color='#fff' />
              }
              buttonText={'Add Member'}
              buttonProps={{
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
