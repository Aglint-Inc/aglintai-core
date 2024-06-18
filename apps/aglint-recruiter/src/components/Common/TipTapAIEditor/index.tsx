import { DatabaseEnums } from '@aglint/shared-types';
import { Stack } from '@mui/system';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import React, { useEffect, useState } from 'react';

import { SkeletonParagraph } from '@/devlink2/SkeletonParagraph';

import { TipTapAIEditorCtxType, TipTapCtx } from './context';
import { getEmailTemplateExtns } from './customExtns/extns/getEmailTemplateExtns';
import { getRegularEditorConfigs } from './customExtns/extns/getRegularEditorConfigs';
import MenuBtns from './MenuBtns';

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
  editor_type?: 'email' | 'regular';
  template_type?: DatabaseEnums['email_slack_types'];
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
  editor_type = 'regular',
  template_type,
}: TipTapAIEditorParams) => {
  const [selectionRange, setSelectionRange] = useState<
    TipTapAIEditorCtxType['selectionRange']
  >({ from: 0, to: 0 });

  const [selectedText, setSelectedText] =
    useState<TipTapAIEditorCtxType['selectedText']>('');

  const editor = useEditor({
    extensions:
      editor_type === 'regular'
        ? getRegularEditorConfigs({ placeholder })
        : getEmailTemplateExtns({ placeholder, template_type }),
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
            border: '1px solid',
            borderColor: 'var(--neutral-6)',
            borderRadius: borderRadius || 'var(--radius-2)',
          }),
        }}
      >
        <div>
          {editor && (
            <>
              <Stack
                sx={{
                  pointerEvents: disabled ? 'none' : 'auto',
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                <MenuBtns
                  borderRadius={(border && borderRadius) || 'var(--radius-2)'}
                />
              </Stack>
            </>
          )}
          <Stack
            position={'relative'}
            sx={{
              backgroundColor: 'var(--white)',
              borderRadius: borderRadius || 'var(--radius-2)',
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
                color: 'var(--neutral-9)',
                content: 'attr(data-placeholder)',
                float: 'left',
                height: 0,
                'pointer-events': 'none',
              },
              '& .ProseMirror-focused': {
                outline: 0,
              },
              '& .ProseMirror .temp-variable': {
                backgroundColor: '#f7ebfc',
                paddingLeft: '3px',
                paddingRight: '3px',
                paddingBottom: '3px',
                color: '#B552E2',
                borderRadius: '2px',
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
