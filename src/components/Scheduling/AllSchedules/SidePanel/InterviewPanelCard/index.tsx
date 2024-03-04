import { InterviewPanelCard, InterviewPanelMember } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import { useInterviewStore } from '../../store';
import { useSchedulingStore } from '../../../Modules/store';

function InterviewPanelCardComp() {
  const { members } = useAuthDetails();

  const selectedApplication = useInterviewStore(
    (state) => state.selectedApplication
  );

  const interviewModules = useSchedulingStore(
    (state) => state.interviewModules
  );

  return (
    <>
      <InterviewPanelCard
        textPanelName={
          interviewModules.filter(
            (module) => module.id === selectedApplication?.schedule?.panel_id
          )[0]?.name
        }
        slotInterviewPanelMember={(
          selectedApplication?.schedule?.panel_users as unknown as {
            user_id: string;
            must: string;
          }[]
        )
          .filter((rel) => rel.must === 'selected' || rel.must === 'optional')
          .map((rel) => {
            const member = members.filter(
              (member) => member.user_id === rel.user_id
            )[0];
            return (
              <InterviewPanelMember
                key={rel.user_id}
                textMemberName={getFullName(
                  member.first_name,
                  member.last_name
                )}
                slotMemberAvatar={
                  <MuiAvatar
                    level={getFullName(member.first_name, member.last_name)}
                    src={member.profile_image}
                    variant={'circular'}
                    width={'100%'}
                    height={'100%'}
                    fontSize={'12px'}
                  />
                }
              />
            );
          })}
      />
    </>
  );
}

export default InterviewPanelCardComp;
