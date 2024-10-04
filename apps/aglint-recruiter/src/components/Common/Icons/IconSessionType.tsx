import { type DatabaseTable } from '@aglint/shared-types';
import { FileText, Group, PersonStanding } from 'lucide-react';

function IconSessionType({
  type,
  size = 16,
}: {
  type: DatabaseTable['interview_session']['session_type'];
  size?: number;
}) {
  return (
    <>
      {type === 'debrief' ? (
        <FileText size={size} className='text-muted-foreground' />
      ) : type === 'individual' ? (
        <PersonStanding size={size} className='text-muted-foreground' />
      ) : (
        <Group size={size} className='text-muted-foreground' />
      )}
    </>
  );
}

export default IconSessionType;
