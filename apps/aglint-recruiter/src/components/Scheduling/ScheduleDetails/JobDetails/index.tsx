import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { type ScheduleDetailsType } from '../hooks';

function JobDetails({
  schedule,
}: {
  schedule: ScheduleDetailsType['schedule_data'];
}) {
  const editor = useEditor({
    editable: false,
    content: schedule?.job.description,
    extensions: [StarterKit],
  });
  return (
    <div className='max-w-[800px] p-5'>
      <EditorContent editor={editor} />
    </div>
  );
}

export default JobDetails;
