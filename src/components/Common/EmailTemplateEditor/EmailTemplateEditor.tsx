import { Stack } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

import './editor.module.scss';

import AiPrompt from './AiPrompt';
import CandidateLabelSchema from './CandidateLabelSchema';
import Commands from './Commands';
import suggestion from './Suggestion';

const EmailTemplateEditor = ({
  defaultValue,
  onChangeUpdateJson,
  onChangeUpdateHtml,
}: {
  defaultValue: string;
  // eslint-disable-next-line no-unused-vars
  onChangeUpdateJson: (json: any) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeUpdateHtml: (html: any) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      AiPrompt,
      CandidateLabelSchema,
      Commands.configure({
        suggestion,
      }),
    ],
    content: defaultValue,
    onUpdate: (s) => {
      onChangeUpdateJson(s.editor.getJSON());
      onChangeUpdateHtml(s.editor.getHTML());
    },
  });

  return (
    <>
      <Stack
        sx={{
          '& .ProseMirror': {
            minHeight: '250px',
            width: '100%',
            wordBreak: 'break-word',
            px: 0.5,
            py: 0.2,
          },
          '& .ProseMirror *::selection': {
            background: '#b100af30',
          },
          '.tiptap p.is-editor-empty:first-child::before ': {
            color: '#adb5bd',
            content: 'attr(data-placeholder)',
            float: 'left',
            height: 0,
            'pointer-events': 'none',
          },
          '& .ProseMirror-focused': {
            outline: 0,
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
