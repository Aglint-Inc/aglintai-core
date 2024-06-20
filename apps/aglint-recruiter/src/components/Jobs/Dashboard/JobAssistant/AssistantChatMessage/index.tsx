import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

function AssistantChatMessage({ message }) {
  const editor = useEditor({
    editable: false,
    content: message,
    extensions: [StarterKit],
  });
  return <EditorContent editor={editor} />;
}

export default AssistantChatMessage;
