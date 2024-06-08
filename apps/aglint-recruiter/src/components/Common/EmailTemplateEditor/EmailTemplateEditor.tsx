import { Stack } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

import Commands from './Commands';
import { AiPromptNodeSchema } from './CustomNodes/AiPromptNodeSchema';
import { CandName } from './CustomNodes/CandName';
import { RecruiterFirstName } from './CustomNodes/RecruiterFirstName';
import suggestion from './Suggestion';

const EmailTemplateEditor = ({
  defaultValue,
  onChangeUpdateJson,
  onChangeUpdateHtml,
  defaultJson,
}: {
  defaultValue?: string;
  defaultJson?: any;
  // eslint-disable-next-line no-unused-vars
  onChangeUpdateJson?: (json: any) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeUpdateHtml?: (html: any) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      AiPromptNodeSchema,
      RecruiterFirstName.configure({
        HTMLAttributes: {
          class: 'rec-name',
        },
      }),
      CandName.configure({
        HTMLAttributes: {
          class: 'cand-name',
        },
      }),
      Commands.configure({
        suggestion,
      }),
    ],
    content: defaultValue,
    onUpdate: (s) => {
      onChangeUpdateJson && onChangeUpdateJson(s.editor.getJSON());
      onChangeUpdateHtml && onChangeUpdateHtml(s.editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && defaultJson) editor.commands.setContent(defaultJson);
  }, [editor, defaultJson]);

  return (
    <>
      <Stack
        sx={{
          border: `1px solid var(--neutral-6)`,
          borderRadius: 'var(--radius-2)',
          '& .ProseMirror': {
            minHeight: '250px',
            width: '100%',
            wordBreak: 'break-word',
            px: '12px',
            py: '12px',
          },
          '.tiptap p.is-editor-empty:first-child::before ': {
            color: 'var(--neutral-11)',
            content: 'attr(data-placeholder)',
            float: 'left',
            height: 0,
            'pointer-events': 'none',
          },
          '& .ProseMirror-focused': {
            outline: 0,
          },
          '&  span .mention': {
            backgroundColor: 'red',
            color: 'var(--error-11)',
          },
        }}
      >
        <EditorContent editor={editor} />
      </Stack>
    </>
  );
};

export default EmailTemplateEditor;

// <p>
//   This is still the text editor you’re used to, but enriched with node views.
// </p>
// <candidate-name></candidate-name>
// <candidate-name></candidate-name>
// <ai-prompt count="0"></ai-prompt>
// <p>
//   Did you see that? That’s a React component. We are really living in the future.
// </p>
