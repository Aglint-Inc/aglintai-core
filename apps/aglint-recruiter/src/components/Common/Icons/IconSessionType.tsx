import { type DatabaseTable } from '@aglint/shared-types';
import { Box } from '@mui/material';

import { GlobalIcon } from '@/devlink/GlobalIcon';

function IconSessionType({
  type,
  size = 4,
}: {
  type: DatabaseTable['interview_session']['session_type'];
  size?: number;
}) {
  return (
    <>
      {type === 'debrief' ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <GlobalIcon iconName='text_snippet' size={size} />
        </Box>
      ) : type === 'individual' ? (
        <GlobalIcon iconName='person' size={size} />
      ) : (
        <GlobalIcon iconName='group' size={size} />
      )}
    </>
  );
}

export default IconSessionType;
