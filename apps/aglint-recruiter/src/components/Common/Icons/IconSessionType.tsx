import { type DatabaseTable } from '@aglint/shared-types';
import { Box } from '@mui/material';
import { FileText, Group, PersonStanding } from 'lucide-react';

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
          <FileText size={size} color={'var(--neutral-2)'} />
        </Box>
      ) : type === 'individual' ? (
        <PersonStanding size={size} color={'var(--neutral-2)'} />
      ) : (
        <Group size={size} color={'var(--neutral-2)'} />
      )}
    </>
  );
}

export default IconSessionType;
