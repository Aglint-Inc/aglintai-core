import { GlobalIcon } from '@/devlink/GlobalIcon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { EmailAgentIcon } from '@/src/components/Tasks/Components/EmailAgentIcon';
import { PhoneAgentIcon } from '@/src/components/Tasks/Components/PhoneAgentIcon';
import { getFullName } from '@/src/utils/jsonResume';

import { useAllActivities } from '../hooks';
import IconCandidate from './IconCandidate';

function IconApplicationLogs({
  act,
}: {
  act: ReturnType<typeof useAllActivities>['data'][0];
}) {
  return (
    <>
      {act.logged_by === 'email_agent' ? (
        <EmailAgentIcon />
      ) : act.logged_by === 'phone_agent' ? (
        <PhoneAgentIcon />
      ) : act.logged_by == 'candidate' ? (
        <IconCandidate />
      ) : act.logged_by == 'user' ? (
        <MuiAvatar
          level={getFullName(
            act.recruiter_user?.first_name,
            act.recruiter_user?.last_name,
          )}
          src={act.recruiter_user?.profile_image}
          variant={'rounded-small'}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default IconApplicationLogs;
