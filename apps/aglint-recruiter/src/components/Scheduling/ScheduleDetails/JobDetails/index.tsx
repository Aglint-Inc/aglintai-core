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
    <div className='p-5 max-w-[800px]'>
      <EditorContent editor={editor} />
    </div>
  );
}

export default JobDetails;
