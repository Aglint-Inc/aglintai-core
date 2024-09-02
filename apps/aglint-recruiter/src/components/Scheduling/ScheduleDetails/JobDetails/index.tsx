import { Stack } from '@mui/material';
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
    <Stack p={'var(--space-5)'} maxWidth={'800px'}>
      <EditorContent editor={editor} />
    </Stack>
  );
}

export default JobDetails;
