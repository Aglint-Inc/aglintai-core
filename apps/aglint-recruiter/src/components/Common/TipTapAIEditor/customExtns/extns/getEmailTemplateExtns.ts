import { type DatabaseEnums } from '@aglint/shared-types';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

import { getTempVariables } from '../nodes/suggestion';
import { TempVariable } from '../nodes/TempVariable';
import { EventHandler } from './pasteEventHandler';

export const getEmailTemplateExtns = ({
  placeholder,
  template_type,
}: {
  placeholder: string;
  template_type: DatabaseEnums['email_slack_types'];
}) => {
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
    TempVariable.configure({
      HTMLAttributes: {
        class: 'temp-variable',
      },
      suggestion: getTempVariables(template_type),
    }),
  ];
};

export const getEmailTemplateExtnsNoHeading = ({
  placeholder,
  template_type,
}: {
  placeholder: string;
  template_type: DatabaseEnums['email_slack_types'];
}) => {
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
    Heading.configure({ levels: [] }),
    TextStyle.configure({}),
    TempVariable.configure({
      HTMLAttributes: {
        class: 'temp-variable',
      },
      suggestion: getTempVariables(template_type),
    }),
  ];
};
