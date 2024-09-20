import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

import { EventHandler } from './pasteEventHandler';

export const getRegularEditorConfigs = ({ placeholder }) => {
  return [
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
    Heading.configure({ levels: [] }),
  ];
};

export const getRegularEditorNoHeadingsConfigs = ({ placeholder }) => {
  return [
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
    Heading.configure({ levels: [] }),
  ];
};
