import { Card } from '@components/ui/card';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { useScheduleDetails } from '../../hooks/useScheduleDetails';

function JobDetails() {
  const {
    data: { schedule_data: schedule },
  } = useScheduleDetails();
  const editor = useEditor({
    editable: false,
    content: schedule?.job?.description ?? '',
    extensions: [StarterKit],
  });
  return (
    <Card className='p-4 min-h-80'>
      <EditorContent editor={editor} />
    </Card>
  );
}

export default JobDetails;
