import { Stack } from '@mui/material';
import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { debounce } from 'lodash';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';
import { supabase } from '@/src/utils/supabase/client';

import suggestion from './suggestion';
import { setUserText, useSchedulingAgentStore } from '../store';

const ChatEditorScheduling = () => {
  const { recruiter } = useAuthDetails();
  const { userText, candidateTipTapOpen } = useSchedulingAgentStore();
  const { submitHandler } = useSchedulingAgent();

  const fetchCandidates = debounce(async (query) => {
    const { data, error } = await supabase.rpc('search_candidates', {
      recruiter_id_param: recruiter.id,
      name_param: `%${query}%`,
    });
    if (error) {
      return [];
    }
    const filter = (data as any).map(
      (item) => item.candidate.first_name + ' ' + item.candidate.last_name,
    );
    return filter.slice(0, 5);
  }, 300);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: {
          ...suggestion,
          items: async ({ query }) => {
            return await fetchCandidates(query);
          },
        },
      }),
      Placeholder.configure({
        placeholder: 'Chat with Aglint',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    onUpdate({ editor }) {
      const text = editor.getText();
      setUserText(text);
    },
    content: '',
  });

  if (!editor) {
    return null;
  }

  return (
    <Stack
      border={`1px solid`}
      borderRadius={'8px'}
      sx={{
        width: '100%',
        '& div': {
          width: '100%',
        },
        '& .tiptap p': {
          fontSize: '1rem',
        },
        '& .ProseMirror-focused': {
          outline: 0,
        },
        '.tiptap p.is-editor-empty:first-child::before ': {
          color: '#adb5bd',
          content: 'attr(data-placeholder)',
          float: 'left',
          height: 0,
          'pointer-events': 'none',
        },
        '& .ProseMirror': {
          minHeight: `${1}em`,
          maxHeight: `70px`,
          overflow: 'auto',
          width: '100%',
          whiteSpace: 'nowrap !important',
        },
      }}
      borderColor={'grey.400'}
      padding={'1px'}
      direction={'row'}
      alignItems={'center'}
      maxHeight={`${5}rem`}
      px={'15px'}
    >
      <EditorContent
        inputMode='text'
        editor={editor}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !candidateTipTapOpen) {
            e.preventDefault();
            submitHandler({ input: userText });
            editor.commands.clearContent();
          }
        }}
      />
    </Stack>
  );
};

export default ChatEditorScheduling;
