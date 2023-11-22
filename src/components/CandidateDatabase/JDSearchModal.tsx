import { CircularProgress } from '@mui/material';
import router from 'next/router';
import React, { useState } from 'react';

import { JobDescriptionModal } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { searchJdToJson } from '@/src/utils/prompts/candidateDb/jdToJson';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import AUIButton from '../Common/AUIButton';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../JobsDashboard/JobPostCreateUpdate/utils';

export const JDSearchModal = ({ setJdPopup }) => {
  const defaultValue = '';
  const { recruiter } = useAuthDetails();
  const [isJdSearching, setIsJdSearching] = useState(false);

  const [jdText, setJdText] = useState(defaultValue);

  const getMatchingCandsFromJd = async () => {
    try {
      if (isJdSearching) return;
      setIsJdSearching(true);
      const p = await searchJdToJson(jdText);

      const [history] = supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .insert({
            recruiter_id: recruiter.id,
            is_search_jd: false,
            query_json: p,
          })
          .select(),
      );
      router.push(`/candidates/search?searchQryId=${history.id}`);
    } catch (err) {
      toast.error(API_FAIL_MSG);
      //
    } finally {
      setJdPopup(false);
      setIsJdSearching(false);
    }
  };

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
            getMatchingCandsFromJd();
          }}
          endIcon={
            isJdSearching && (
              <CircularProgress
                color='inherit'
                size={'15px'}
                sx={{ color: palette.grey[400] }}
              />
            )
          }
        >
          Search
        </AUIButton>
      }
    />
  );
};
