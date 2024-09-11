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
        <FileText size={size} className='text-neutral-600' />
      ) : type === 'individual' ? (
        <PersonStanding size={size} className='text-neutral-600' />
      ) : (
        <Group size={size} className='text-neutral-600' />
      )}
    </>
  );
}

export default IconSessionType;
