// import { Color } from '@tiptap/extension-color';
import Icon from '@components/Common/Icons/Icon';
import {
  IconButton,
  IconButtonProps,
  Stack,
  styled,
  Tooltip,
} from '@mui/material';
import { Content } from '@tiptap/core/dist/packages/core/src/types';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import { Placeholder } from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { ReactNode, useCallback, useEffect } from 'react';

export type ToolboxPosition = 'top' | 'bottom';

const RichTextIconButton = styled(IconButton)({
  borderRadius: 'var(--radius-2)',
  padding: '1px',
  '&.is-active': {
    color: 'var(---neutral-12)',
  },
});
const RichTextDividerLine = styled(Stack)({
  // borderRadius: 'var(--radius-2)',
  height: '24px',
  width: '1px',
  backgroundColor: 'var(--neutral-3)',
  margin: '2px 4px',
});

const RichTextIconButtons = ({
  title,
  children,
  ...props
}: { title: string; children: ReactNode } & IconButtonProps) => (
  <Tooltip title={title} placement='top-start'>
    <RichTextIconButton {...props}>{children}</RichTextIconButton>
  </Tooltip>
);

const MenuBar = ({
  editor,
}: //   disableList,
{
  editor: Editor | null;
  //   disableList: boolean;
}) => {
  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href;
      let url = window.prompt('URL', previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      // add https:// prefix if needed
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
  return (
    <Stack
      direction={'row'}
      border={'1px solid'}
      borderRadius={'var(--space-1)'}
      borderColor={'var(--neutral-6)'}
      sx={{
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
      className='richtext-toolbar'
    >
      <Stack
        direction={'row'}
        sx={{
          flexWrap: 'wrap',
        }}
      >
        <RichTextIconButtons
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title={'Bold'}
        >
          <Icon variant={'Bold'} width='24px' height='24px' />
        </RichTextIconButtons>

        <RichTextIconButtons
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title={'Italic'}
        >
          <Icon variant={'Italic'} width='24px' height='24px' />
        </RichTextIconButtons>

        {/* <RichTextIconButtons
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
          title={'Underline'}
        >
          <Icon variant={'Underline'} width='24px' height='24px' />
        </RichTextIconButtons> */}

        {/* <RichTextIconButtons
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <Icon variant={'StrickThought'} width='24px' height='24px' />
        </RichTextIconButtons> */}

        <RichTextDividerLine />

        <RichTextIconButtons
          onClick={setLink}
          className={editor.isActive('link') ? 'is-active' : ''}
          title={'Link'}
        >
          <Icon variant='Link' width='24px' height='24px' />
        </RichTextIconButtons>
        <RichTextIconButtons
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
          title={'Unlink'}
        >
          <Icon variant='Unlink' width='24px' height='24px' />
        </RichTextIconButtons>

        <RichTextDividerLine />

        <RichTextIconButtons
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title={'List'}
        >
          <Icon variant='BulletLint' width='24px' height='24px' />
        </RichTextIconButtons>

        <RichTextIconButtons
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          title={'Align left'}
        >
          <Icon variant='AlignLeft' width='24px' height='24px' />
        </RichTextIconButtons>
        <RichTextIconButtons
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
          }
          title={'Align center'}
        >
          <Icon variant='AlignCenter' width='24px' height='24px' />
        </RichTextIconButtons>
        <RichTextIconButtons
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          title={'Align right'}
        >
          <Icon variant='AlignRight' width='24px' height='24px' />
        </RichTextIconButtons>

        <RichTextDividerLine />

        <RichTextIconButtons
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          title={'Clear style'}
        >
          <Icon variant={'ClearText'} width='24px' height='24px' />
        </RichTextIconButtons>
      </Stack>

      {/* <Stack
        direction={'row'}
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          flexGrow: '1',
        }}
      >
        <RichTextIconButtons
          onClick={() => editor.commands.undo()}
          // onClick={() => editor.commands.keyboardShortcut('ctrl+z')}
          disabled={!editor.can().chain().focus().undo().run()}
          title={'Undo'}
        >
          <Icon variant={'UndoEditorIcon'} width='24px' height='24px' />
        </RichTextIconButtons>
        <RichTextIconButtons
          onClick={() => editor.commands.redo()}
          disabled={!editor.can().chain().focus().redo().run()}
          title={'Redo'}
        >
          <Icon variant={'RedoEditorIcon'} width='24px' height='24px' />
        </RichTextIconButtons>
      </Stack> */}
    </Stack>
  );
};
export type TipTapEditorType = {
  value?: Content;
  options?: Boolean;
  customSend?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: { text: string; html: string; wordCount: number }) => void;
  // eslint-disable-next-line no-unused-vars
  onKeyDown?: (value: React.KeyboardEvent<HTMLDivElement>) => void;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  getValue?: (func: () => string) => void;
  toolboxPosition?: ToolboxPosition;
  borderColor?: string;
  padding?: number | string;
};

const TipTapEditor = ({
  value,
  onChange,
  onKeyDown,
  minRows = 6,
  maxRows = 6,
  placeholder,
  getValue,
  options = true,
  customSend = null,
  toolboxPosition = 'top',
  borderColor = '',
  padding = 1,
}: TipTapEditorType) => {
  const editor = useEditor({
    extensions: [
      // CustomHistory,
      Link.configure({
        openOnClick: false,
        //   target: '_blank',
        validate: (href) => /^https?:\/\//.test(href),
      }),

      TextAlign.configure({
        alignments: ['left', 'right', 'center'],
        types: ['heading', 'paragraph', 'bullet_list', 'ordered_list', 'list'],
      }),
      //   Underline,
      // Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({
        types: [ListItem.name],
      } as Partial<TextStyleOptions>),
      StarterKit.configure({
        history: false,
        code: false,
        // listItem: !disableList,
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      //   Highlight.configure({ multicolor: true }),
    ],
    ...(value ? { content: value } : {}),
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
    // onBlur({ editor }) {
    //   editor
    //     .chain()
    //     .setMeta('excludeFromUndo', true)
    //     .setHighlight({ color: '#bf80f030' })
    //     .run();
    // },
    // onFocus({ editor }) {
    //   // editor.commands.unsetHighlight().setMeta('excludeFromUndo', true)
    //   editor.chain().setMeta('excludeFromUndo', true).unsetHighlight().run();
    //   // editor.chain().selectAll().unsetHighlight().setTextSelection(selectionRange?.from || 1).run()
    // },
    // onSelectionUpdate({ editor }) {
    //   const { view, state } = editor;
    //   const { from, to } = view.state.selection;
    //   const text = state.doc.textBetween(from, to, '');
    //   setSelectionRange({
    //     from: from,
    //     to: to,
    //   });
    //   setSelectedText(text);
    //   if (text) setShowAiOptions(true);
    // },
    // onUpdate({ editor }) {
    //   // The content has changed.
    //   if (editor.isFocused && setUserEdited) {
    //     setUserEdited();
    //   }
    //   onChange(editor.isEmpty ? '' : editor.getHTML());
    // },
  });
  useEffect(() => {
    getValue && getValue(() => editor?.getHTML() || '');
  }, [getValue]);

  useEffect(() => {
    if (value === '' && editor) {
      editor.commands.clearContent();
    }
  }, [value]);
  return (
    <Stack
      border={`1px solid ${borderColor}`}
      borderRadius={'var(--space-2)'}
      sx={{
        '& .ProseMirror': {
          minHeight: `${minRows}em`,
          maxHeight: `${maxRows}em`,
          overflow: 'auto',
          width: customSend ? '95%' : '100%',
          wordBreak: 'break-word',
        },
        '& .ProseMirror *::selection': {
          background: '#b100af30',
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
        position: 'relative',
      }}
      borderColor={'var(--neutral-6)'}
      padding={padding}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          ...(toolboxPosition === 'bottom'
            ? { flexDirection: 'column-reverse' }
            : {}),
        }}
      >
        {options && <MenuBar editor={editor} />}
        {customSend && (
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '4px',
              right: '4px',
            }}
          >
            {customSend}
          </div>
        )}
        <EditorContent editor={editor} onKeyDown={onKeyDown} />
      </div>
    </Stack>
  );
};

export default TipTapEditor;
