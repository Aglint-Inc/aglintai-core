import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import Component from './CandidateLabelComp';

const CandidateLabelSchema = Node.create({
  name: 'CandidateLabel',
  group: 'inline',
  inline: true,

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [
      {
        tag: 'candidate-label',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['candidate-label', mergeAttributes(HTMLAttributes), 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

export default CandidateLabelSchema;
