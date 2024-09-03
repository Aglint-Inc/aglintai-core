/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import Mention from '@tiptap/extension-mention';
import { Placeholder } from '@tiptap/extension-placeholder';
import {
  type Editor,
  EditorContent,
  mergeAttributes,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { useTaskStatesContext } from '../../TaskStatesContext';
import { type assigneeType } from '../../utils';
// import { useTaskStatesContext } from '../../../TaskStatesContext';
// import { assigneeType } from '../../UpdateSubTask';
import suggetion from './utils/suggetions';

let shiftEnabled = false;
// let isPopUpOpen = null;
function TextArea({
  value,
  onClick,
  onChange,
  dataList,
  getEditorRef,
  setEditor,
}: {
  value: string;
  onClick: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange: (x: { text: string; html: string; wordCount: number }) => void;
  dataList: assigneeType[];
  getEditorRef: any;
  setEditor: (x: Editor) => void;
}) {
  let { isPopUpOpen, setIsPopUpOpen, setTaskId } = useTaskStatesContext();

  let editor = useEditor({
    // autofocus: 0,
    extensions: [
      StarterKit,

      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },

        suggestion: {
          ...suggetion,
          items: ({ query }) => {
            return dataList.filter((item) =>
              String(item.first_name + ' ' + (item?.last_name ?? ''))
                .toLowerCase()
                .includes(query.toLowerCase()),
            );
          },
          char: '@',
        },
        renderHTML({ node, options }) {
          const { HTMLAttributes } = options;
          return [
            'span',
            mergeAttributes(this.options?.HTMLAttributes, {
              'data-id': node.attrs.id,
              ...HTMLAttributes,
            }),
            `@${node.attrs.label}`, // <----
          ];
        },
      }),
      Placeholder.configure({
        placeholder: 'Enter task description',
        emptyEditorClass: 'is-editor-empty',
      }),

      // DisableEnter,
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
            text: text.trim(),
            html: editor.getHTML().trim(),
            wordCount: text.length,
          };
        }
        onChange(value);
      }
    },
    content: value,
    onBlur() {
      setTimeout(() => {
        setEditor({ ...editor } as Editor);
      }, 300);
    },
    onFocus() {
      setEditor({ ...editor } as Editor);
    },
  });

  if (!editor) {
    return null;
  }

  const resetText = () => {
    editor.commands.clearContent(true);
  };
  getEditorRef(() => editor);
  return (
    <Stack
      border={`1px solid`}
      borderRadius={'var(--space-1)'}
      sx={{
        '& div': {
          width: '100%',
        },
        '& .tiptap p': {
          fontSize: '1rem',
          margin: '10px',
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
          maxHeight: `${3}em`,
          overflow: 'auto',
          width: '100%',
          // wordBreak: 'break-word',
          whiteSpace: 'nowrap !important',
        },
      }}
      borderColor='var(--neutral-6)'
      padding={'1px'}
      direction={'row'}
      alignItems={'center'}
      maxHeight={`${3}rem`}
      px={'var(--space-1)'}
    >
      <EditorContent
        inputMode='text'
        onKeyDown={(e) => {
          if (e.key === '@') {
            setIsPopUpOpen(true);
          }
          if (e.key === 'Enter' && isPopUpOpen) {
            setIsPopUpOpen(false);
            return null;
          }
          if (e.key === 'Shift') {
            shiftEnabled = true;
          }
          if (!shiftEnabled && e.key === 'Enter' && value.trim().length !== 0) {
            // console.log('message sent');
            onClick();
            resetText();

            if (!shiftEnabled) {
              e.preventDefault();
            }
          }

          if (e.key === 'Backspace') {
            const pop_id = document.getElementById('list-popup');
            if (pop_id) {
              setIsPopUpOpen(false);
            }
          }

          if (e.key === 'Escape') {
            setTaskId(null);
          }
        }}
        onKeyUp={(e) => {
          if (e.key === 'Shift') {
            shiftEnabled = false;
          }
        }}
        editor={editor}
      />
    </Stack>
  );
}

export default TextArea;
