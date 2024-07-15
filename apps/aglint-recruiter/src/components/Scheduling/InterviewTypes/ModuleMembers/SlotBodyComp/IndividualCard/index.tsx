import { Collapse } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { MemberListCard } from '@/devlink2/MemberListCard';
import { PanelBlock } from '@/devlink2/PanelBlock';
import { TrainingDetailList } from '@/devlink2/TrainingDetailList';
import { TrainingProgressDetail } from '@/devlink2/TrainingProgressDetail';
import { TrainingStatus } from '@/devlink2/TrainingStatus';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { SessionIcon } from '@/src/components/Scheduling/Common/ScheduleProgress/scheduleProgressPill';
// import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { numberToOrdinalText } from '@/src/utils/number/numberToOrdinalText';
import ROUTES from '@/src/utils/routing/routes';

import { useProgressModuleUsers } from '../../../queries/hooks';
import {
  // setIsDeleteMemberDialogOpen,
  // setIsMovedToQualifiedDialogOpen,
  setIsPauseDialogOpen,
  // setIsResumeDialogOpen,
  setSelUser,
} from '../../../store';
import { MemberType, ModuleType } from '../../../types';
import { getPauseMemberText } from '../utils';

function IndividualCard({
  editModule,
  user,
  member,
  progressDataUser,
}: {
  editModule: ModuleType;
  user: ModuleType['relations'][0] & {
    weekly: number;
    daily: number;
  };
  member: MemberType;
  progressDataUser: ReturnType<typeof useProgressModuleUsers>['data'];
}) {
  const router = useRouter();
  // const { recruiterUser } = useAuthDetails();
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  // const isMoveToQualifierVisible =
  //   recruiterUser.role === 'admin' ||
  //   (editModule.settings.reqruire_approval &&
  //     editModule.settings.approve_users.includes(user.user_id));

  const userSettings = user.recruiter_user.scheduling_settings;

  const shadowProgress = progressDataUser.filter(
    (prog) => prog.training_type == 'shadow',
  );

  const mutatedShadowProgress = Array.from({
    length: editModule.settings.noShadow - shadowProgress.length,
  });

  const reverseShadowProgress = progressDataUser.filter(
    (prog) => prog.training_type == 'reverse_shadow',
  );

  const mutatedReverseShadowProgress = Array.from({
    length: editModule.settings.noReverseShadow - reverseShadowProgress.length,
  });

  return (
    <>
      <MemberListCard
        textWeekInterview={`${user.weekly} / ${userSettings.interviewLoad.dailyLimit.value} ${userSettings.interviewLoad.dailyLimit.type}`}
        textTodayInterview={`${user.daily} / ${userSettings.interviewLoad.dailyLimit.value} ${userSettings.interviewLoad.dailyLimit.type}`}
        onClickCard={{
          onClick: () => {
            router.push(
              ROUTES['/scheduling/interviewer/[member_id]']({
                member_id: user.user_id,
              }),
            );
          },
        }}
        slotTrainingProgressDetail={
          <Collapse in={isCollapseOpen}>
            <TrainingProgressDetail
              slotTrainingDetailList={
                <>
                  {shadowProgress.map((prog, ind) => {
                    return (
                      <TrainingDetailList
                        key={ind}
                        isReverse={false}
                        isShadow={true}
                        textTraining={`${numberToOrdinalText(ind + 1)} Shadow`}
                        slotTrainingStatus={
                          <TrainingStatus
                            isNotCompletedVisible={false}
                            isCompletedVisible={true}
                            isReverseShadow={false}
                            isShadow={true}
                          />
                        }
                        slotPanelBlock={
                          <>
                            <PanelBlock
                              slotPanelIcon={
                                <SessionIcon
                                  session_type={
                                    prog.interview_session.session_type
                                  }
                                />
                              }
                              textPanelName={prog.interview_session.name}
                            />
                          </>
                        }
                      />
                    );
                  })}
                  {mutatedShadowProgress.map((_, index) => {
                    return (
                      <TrainingDetailList
                        key={index}
                        isReverse={false}
                        isShadow={true}
                        textTraining={`${numberToOrdinalText(index + 1 + shadowProgress.length)} Shadow Session`}
                        slotTrainingStatus={
                          <TrainingStatus
                            isNotCompletedVisible={true}
                            isCompletedVisible={false}
                            isReverseShadow={false}
                            isShadow={true}
                          />
                        }
                        slotPanelBlock={''}
                      />
                    );
                  })}
                  {reverseShadowProgress.map((prog, ind) => {
                    return (
                      <TrainingDetailList
                        key={ind}
                        isReverse={true}
                        isShadow={false}
                        textTraining={`${numberToOrdinalText(ind + 1)} Reverse Shadow`}
                        slotTrainingStatus={
                          <TrainingStatus
                            isNotCompletedVisible={false}
                            isCompletedVisible={true}
                            isReverseShadow={true}
                            isShadow={false}
                            isPendingApprovalVisible={false}
                          />
                        }
                        slotPanelBlock={
                          <>
                            <PanelBlock
                              slotPanelIcon={
                                <SessionIcon
                                  session_type={
                                    prog.interview_session.session_type
                                  }
                                />
                              }
                              textPanelName={prog.interview_session.name}
                            />
                          </>
                        }
                      />
                    );
                  })}
                  {mutatedReverseShadowProgress.map((_, index) => {
                    return (
                      <TrainingDetailList
                        key={index}
                        isReverse={true}
                        isShadow={false}
                        textTraining={`${numberToOrdinalText(index + 1 + reverseShadowProgress.length)} Reverse Shadow Session`}
                        slotTrainingStatus={
                          <TrainingStatus
                            isNotCompletedVisible={true}
                            isCompletedVisible={false}
                            isReverseShadow={true}
                            isShadow={false}
                            isPendingApprovalVisible={false}
                          />
                        }
                        slotPanelBlock={''}
                      />
                    );
                  })}
                </>
              }
            />
          </Collapse>
        }
        isDropdownIconVisible={true}
        onClickDropdownIcon={{
          onClick: () => {
            setIsCollapseOpen((pre) => !pre);
          },
        }}
        isTrainingProgressDetailVisible={true}
        // onClickMoveToQualifier={{
        //   onClick: () => {
        //     setSelUser(user);
        //     setIsMovedToQualifiedDialogOpen(true);
        //   },
        // }}
        key={user.user_id}
        // isMoveToQualifierVisible={isMoveToQualifierVisible}
        textPauseResumeDate={getPauseMemberText(user.pause_json)}
        // onClickRemoveModule={{
        //   onClick: () => {
        //     setSelUser(user);
        //     setIsDeleteMemberDialogOpen(true);
        //   },
        // }}
        onClickPauseInterview={{
          onClick: () => {
            setSelUser(user);
            setIsPauseDialogOpen(true);
          },
        }}
        // onClickResumeInterview={{
        //   onClick: () => {
        //     setSelUser(user);
        //     setIsResumeDialogOpen(true);
        //   },
        // }}
        // onHoverDot={false}
        isPauseResumeVisible={Boolean(user.pause_json)}
        // isPauseVisible={!user.pause_json}
        // isResumeVisible={Boolean(user.pause_json)}
        slotProfileImage={
          <MuiAvatar
            src={member.profile_image}
            level={getFullName(member.first_name, member.last_name) || ''}
            variant='rounded-medium'
          />
        }
        textName={getFullName(member.first_name, member.last_name) || ''}
        textRole={member.position || '--'}
      />
    </>
  );
}

export default IndividualCard;
