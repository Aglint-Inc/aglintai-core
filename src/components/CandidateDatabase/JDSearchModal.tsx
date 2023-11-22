import React, { useState } from 'react';

import { JobDescriptionModal } from '@/devlink';

// import { useCandidateSearchCtx } from './context/CandidateSearchProvider';
import AUIButton from '../Common/AUIButton';

export const JDSearchModal = ({ setJdPopup, onClickSubmit }) => {
  // const { candidateSearchState } = useCandidateSearchCtx();
  const defaultValue = '';
  // candidateSearchState.searchInfo.searchType === 'jd'
  //   ? candidateSearchState.searchInfo.searchText
  //   : '';
  const [jdText, setJdText] = useState(defaultValue);

  return (
    <JobDescriptionModal
      slotJobDescription={
        <>
          <textarea
            style={{
              resize: 'vertical',
              borderRadius: '5px',
              width: '100%',
              height: '100%',
              padding: '5px',
              outline: 'none',
            }}
            value={jdText}
            onChange={(e) => {
              setJdText(e.target.value);
            }}
          />
        </>
      }
      onClickClose={{
        onClick: () => {
          setJdPopup(false);
        },
      }}
      slotButtonPrimaryRegular={
        <AUIButton
          variant='primary'
          size='small'
          onClick={() => {
            onClickSubmit(jdText);
          }}
        >
          Search
        </AUIButton>
      }
    />
  );
};
