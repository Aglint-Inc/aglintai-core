import { Drawer } from '@mui/material';

import { MutedShadowSession, ShadowSession } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';
import { numberToOrdinalText } from '@/src/utils/numberToText/numberToOrdinalText';

import SessionCard from './SessionCard';
import { ProgressType } from '..';
import { setIsProgressDialaogOpen, useSchedulingStore } from '../../store';
import { MemberType, ModuleType } from '../../types';

function ProgressDrawer({
  module,
  progressUser
}: {
  module: ModuleType;
  progressUser: {
    user: MemberType;
    progress: ProgressType[];
  } | null;
}) {
  const isProgressDialogOpen = useSchedulingStore(
    (state) => state.isProgressDialaogOpen
  );

  const shadowProgress = progressUser?.progress.filter(
    (prog) => prog.interviewer_type == 'shadow'
  );

  const mutatedShadowProgress = Array.from({
    length: module.settings.noShadow - shadowProgress.length
  });

  const reverseShadowProgress = progressUser?.progress.filter(
    (prog) => prog.interviewer_type == 'reverse_shadow'
  );

  const mutatedReverseShadowProgress = Array.from({
    length: module.settings.noReverseShadow - reverseShadowProgress.length
  });

  return (
    <Drawer
      anchor={'right'}
      open={isProgressDialogOpen}
      onClose={() => {
        setIsProgressDialaogOpen(false);
      }}
    >
      <ShadowSession
        textName={progressUser.user?.first_name}
        slotProfileImage={
          progressUser.user && (
            <MuiAvatar
              src={progressUser.user.profile_image}
              level={getFullName(
                progressUser.user.first_name,
                progressUser.user.last_name
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
                  session_name={numberToOrdinalText(ind + 1)}
                />
              );
            })}
            {mutatedShadowProgress.map((_, index) => (
              <MutedShadowSession
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

export default ProgressDrawer;
