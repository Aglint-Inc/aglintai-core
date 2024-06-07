import { Stack } from '@mui/system';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { EditorContent, Extension, useEditor } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';

import { SkeletonParagraph } from '@/devlink2/SkeletonParagraph';

import { TipTapAIEditorCtxType, TipTapCtx } from './context';
import MenuBtns from './MenuBtns';
import styles from './TipTapAIEditor.module.scss';

export type TipTapAIEditorParams = {
  placeholder: string;
  initialValue: string | undefined;
  enablAI?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange: (s: string) => void;
  showWarnOnEdit?: () => void;
  defaultJson?: any;
  loader?: {
    isLoading: boolean;
    count: number;
  };
  disabled?: boolean;
  border?: boolean;
  borderRadius?: React.CSSProperties['borderRadius'];
};

const TipTapAIEditor = ({
  placeholder,
  handleChange,
  initialValue,
  enablAI = false,
  loader = {
    isLoading: false,
    count: 1,
  },
  defaultJson,
  disabled = false,
  border = false,
  borderRadius,
}: TipTapAIEditorParams) => {
  const [selectionRange, setSelectionRange] = useState<
    TipTapAIEditorCtxType['selectionRange']
  >({ from: 0, to: 0 });

  const [selectedText, setSelectedText] =
    useState<TipTapAIEditorCtxType['selectedText']>('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      EventHandler,
      Placeholder.configure({
        placeholder: placeholder || '',
      }),
      Link.configure({
        openOnClick: false,
        validate: (href) => /^https?:\/\//.test(href),
      }),
      TextAlign.configure({
        alignments: ['left', 'right', 'center'],
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle.configure({}),
    ],
    editable: !disabled,
    content: initialValue || '',
    onBlur() {},
    onFocus() {},
    onSelectionUpdate({ editor }) {
      const { view, state } = editor;
      const { from, to } = view.state.selection;
      const text = state.doc.textBetween(from, to, '');
      setSelectionRange({
        from: from,
        to: to,
      });
      setSelectedText(text);
    },
    onUpdate({ editor }) {
      if (editor.isEmpty) {
        handleChange('');
      } else {
        handleChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
  }) as Editor;

  useEffect(() => {
    if (editor && defaultJson) editor.commands.setContent(defaultJson, true);
  }, [defaultJson, editor]);

  return (
    <TipTapCtx.Provider
      value={{
        selectedText,
        selectionRange,
        editor,
        enablAI,
      }}
    >
      <Stack
        sx={{
          ...(border && {
            mt: 'var(--space-2)',
            border: '1px solid',
            borderColor: 'var(--neutral-6)',
            borderRadius: borderRadius || 'var(--space-1)',
          }),
        }}
      >
        <div className={styles.tipTapEditorContainer}>
          {editor && (
            <>
              <Stack
                sx={{
                  pointerEvents: disabled ? 'none' : 'auto',
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                <MenuBtns borderRadius={(border && borderRadius) || 'var(--space-1)'} />
              </Stack>
            </>
          )}
          <Stack
            position={'relative'}
            sx={{
              backgroundColor:'var(--white)',
              borderRadius: borderRadius || 'var(--space-2)',
              '& .ProseMirror': {
                minHeight: '250px',
                width: '100%',
                wordBreak: 'break-word',
                color: disabled ? 'var(--neutral-3)' : 'var(--neutral-12)',
                cursor: disabled ? 'default' : 'auto',
              },
              '& .ProseMirror *::selection': {
                background: 'var(--accent-4)',
              },
              '.tiptap p.is-editor-empty:first-child::before ': {
                color: 'var(--neutral-12)',
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
            <Stack p={2}>
              {loader.isLoading ? (
                <Stack gap={1}>
                  {[...Array(loader.count)].map((e, i) => (
                    <SkeletonParagraph key={i} />
                  ))}
                </Stack>
              ) : (
                <EditorContent editor={editor} />
              )}
            </Stack>
          </Stack>
        </div>
      </Stack>
    </TipTapCtx.Provider>
  );
};

export default TipTapAIEditor;

export const EventHandler = Extension.create({
  name: 'eventHandler',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('tiptapPaste'),
        props: {
          handlePaste(view, event) {
            const pastedHTML = event.clipboardData.getData('text/html');

            if (pastedHTML.includes('•')) {
              const { state, dispatch } = view;
              const json = convertTextToProseMirrorJSON(
                event.clipboardData.getData('text/plain'),
              );
              const content = state.schema.nodeFromJSON(json);
              const newState = state.tr.insert(
                state.doc.content.size - 2,
                content,
              );

              event.preventDefault();
              dispatch(newState);
              return true;
            }
          },
        },
      }),
    ];
  },
});

function convertTextToProseMirrorJSON(text) {
  const lines = text.split('\n');
  let isInBulletList = false;
  let json = { type: 'doc', content: [] };
  let currentListItem = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('•') || trimmedLine.startsWith('●')) {
      if (!isInBulletList) {
        isInBulletList = true;
        json.content.push({ type: 'bulletList', content: [] });
      }

      currentListItem = { type: 'listItem', content: [] };
      json.content[json.content.length - 1].content.push(currentListItem);

      const listItemContent = trimmedLine.slice(1).trim();
      if (listItemContent.length > 0) {
        currentListItem.content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: listItemContent }],
        });
      }
    } else {
      isInBulletList = false;

      if (trimmedLine.length > 0) {
        json.content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: trimmedLine }],
        });
      }
    }
  });

  return json;
}
