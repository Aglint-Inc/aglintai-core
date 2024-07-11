import { Drawer } from '@mui/material';

import { MutedShadowSession } from '@/devlink2/MutedShadowSession';
import { ShadowSession } from '@/devlink2/ShadowSession';
import { StatusBadge } from '@/devlink2/StatusBadge';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import SessionCard from '@/src/components/Scheduling/InterviewTypes/ModuleMembers/ProgressDrawer/SessionCard';
import { ProgressUser } from '@/src/components/Scheduling/InterviewTypes/ModuleMembers/SlotBodyComp/SlotTrainingMembers';
import { ModuleType } from '@/src/components/Scheduling/InterviewTypes/types';
import { getFullName } from '@/src/utils/jsonResume';
import { numberToOrdinalText } from '@/src/utils/number/numberToOrdinalText';

export default function IProgressDrawer({
  module,
  open,
  onClose,
  progressUser,
}: {
  module: ModuleType;
  open: boolean;
  onClose: () => void;
  progressUser: ProgressUser;
}) {
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
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <ShadowSession
        onClickClose={{
          onClick: onClose,
        }}
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
    </Drawer>
  );
}
