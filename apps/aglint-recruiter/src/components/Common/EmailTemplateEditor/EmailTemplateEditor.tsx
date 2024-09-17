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
    <div className='rounded-[var(--radius-2)] border border-[var(--neutral-6)]'>
      <EditorContent
        editor={editor}
        className='[&_.ProseMirror-focused]:outline-none [&_.ProseMirror]:min-h-[250px] [&_.ProseMirror]:w-full [&_.ProseMirror]:break-words [&_.ProseMirror]:px-3 [&_.ProseMirror]:py-3 [&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:h-0 [&_.tiptap_p.is-editor-empty:first-child::before]:text-[var(--neutral-11)] [&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_span_.mention]:bg-red-500 [&_span_.mention]:text-[var(--error-11)]'
      />
    </div>
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
