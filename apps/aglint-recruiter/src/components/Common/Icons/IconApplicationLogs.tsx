import { type Type } from '@aglint/shared-types/src/db/utils.types';

import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { EmailAgentIcon } from '@/src/components/Tasks/Components/EmailAgentIcon';
import { PhoneAgentIcon } from '@/src/components/Tasks/Components/PhoneAgentIcon';
import { SystemIcon } from '@/src/components/Tasks/Components/SystemIcon';
import { useAllActivities } from '@/src/queries/activities';
import { getFullName } from '@/src/utils/jsonResume';

import IconCandidate from './IconCandidate';

type Activities = ReturnType<typeof useAllActivities>['data'][0];

function IconApplicationLogs({
  act,
}: {
  act: Type<
    Omit<Activities, 'new_tasks'>,
    {
      recruiter_user: Partial<Activities['recruiter_user']>;
      applications?: Activities['applications'];
    }
  >;
}) {
  return (
    <>
      {act.logged_by === 'email_agent' ? (
        <EmailAgentIcon />
      ) : act.logged_by === 'system' ? (
        <SystemIcon />
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
