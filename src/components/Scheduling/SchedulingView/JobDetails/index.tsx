import { Stack } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

import { TransformSchedule } from '../../Modules/types';

function JobDetails({ schedule }: { schedule: TransformSchedule }) {
  const editor = useEditor({
    editable: false,
    content: schedule?.job.description,
    extensions: [StarterKit],
  });
  return (
    <Stack p={'20px'} maxWidth={'800px'}>
      <EditorContent editor={editor} />
    </Stack>
  );
}

export default JobDetails;
