import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import Component from './AIPromptComp';

const AiPrompt = Node.create({
  name: 'AiPrompt',
  group: 'block',
  atom: true,
  selectable: false,
  addAttributes() {
    return {
      aiPrompt: {
        default:
          'Add one sentence on why the candidate is a good fit for this company and also mention candidates strength',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'ai-prompt',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ai-prompt', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

export default AiPrompt;
