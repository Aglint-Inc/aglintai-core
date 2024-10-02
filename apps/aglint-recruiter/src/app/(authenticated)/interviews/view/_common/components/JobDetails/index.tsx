import {
  Section,
  SectionHeader,
  SectionTitle,
} from '@components/layouts/sections-header';
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
    <Section>
      <SectionHeader>
        <SectionTitle>Job Details</SectionTitle>
      </SectionHeader>
      <EditorContent editor={editor} />
    </Section>
  );
}

export default JobDetails;
