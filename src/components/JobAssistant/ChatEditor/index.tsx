import { Divider, IconButton, Stack } from '@mui/material';
import { Extension } from '@tiptap/core';
import Mention from '@tiptap/extension-mention';
import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import suggestion from '../utils/suggetions';
function ChatEditor({ value, handleChat, onChange, resetText, onKeyDown }) {
  // console.log(value);
  let DisableEnter = Extension.create({
    addKeyboardShortcuts() {
      return {
        Enter: () => false,
      };
    },
  });
  let editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion,
      }),
      Placeholder.configure({
        placeholder: 'Chat with assistant',
        emptyEditorClass: 'is-editor-empty',
      }),
      DisableEnter,
    ],
    onUpdate({ editor }) {
      if (onChange) {
        let value: {
          text: string;
          html: string;
          wordCount: number;
        } = {
          text: '',
          html: '',
          wordCount: 0,
        };
        if (!editor.isEmpty) {
          const text = editor.getText();
          value = {
            text,
            html: editor.getHTML(),
            wordCount: text.length,
          };
        }
        onChange(value);
      }
    },
  });

  if (!editor) {
    return null;
  }

  resetText(() => {
    // console.log('bind');
    editor.commands.clearContent(true);
  });

  return (
    <Stack
      border={`1px solid`}
      borderRadius={'8px'}
      sx={{
        '& div': {
          width: '100%',
        },
        '& .tiptap p': {
          fontSize: '1rem',
          margin: '0px',
          // p: '3px',
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
          maxHeight: `${5}em`,
          overflow: 'auto',
          width: '100%',
          // wordBreak: 'break-word',
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
      <EditorContent content={value} onKeyDown={onKeyDown} editor={editor} />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton
        type='button'
        sx={{ p: '10px' }}
        aria-label='search'
        disabled={!value.trim()}
        onClick={handleChat}
      >
        <SendIcon />
      </IconButton>
    </Stack>
  );
}

export default ChatEditor;

function SendIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      className='iconify iconify--iconoir'
      width='25'
      height='25'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <path
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M22 12L3 20l3.563-8L3 4zM6.5 12H22'
      ></path>
    </svg>
  );
}
