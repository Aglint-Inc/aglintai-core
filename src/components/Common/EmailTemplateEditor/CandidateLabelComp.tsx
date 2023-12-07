import { NodeViewWrapper } from '@tiptap/react';
import React from 'react';

import { CandidateName } from '@/devlink';

const CandidateLabelComp = () => {
  return (
    <NodeViewWrapper className='candidate-label'>
      <span>
        <CandidateName />
      </span>
    </NodeViewWrapper>
  );
};

export default CandidateLabelComp;
