import { supabaseWrap } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { isEmpty } from 'lodash';
import router from 'next/router';
import React, { useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { JobDescriptionModal } from '@/devlink/JobDescriptionModal';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { searchJdToJson } from '@/src/utils/prompts/candidateDb/jdToJson';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import UITextField from '../../Common/UITextField';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';
import { getRelevantCndidates } from '../utils';

export const JDSearchModal = ({ setJdPopup }) => {
  const defaultValue = '';
  const { recruiter } = useAuthDetails();
  const { jobs } = useJobs();
  const [isJdSearching, setIsJdSearching] = useState(false);
  const [jobRole, setJobRole] = useState('');
  const [jdText, setJdText] = useState(defaultValue);

  const getMatchingCandsFromJd = async () => {
    try {
      if (isEmpty(jobRole) || isEmpty(jdText)) return;
      if (isJdSearching) return;
      setIsJdSearching(true);
      const fullJd = `
job role ${jobRole}

job description 

${jdText}
`;
      const queryJson = await searchJdToJson(fullJd);
      const cndates = (await getRelevantCndidates(
        queryJson,
        jobs.data.map((j) => j.id),
        25,
      )) as any;
      const [history] = supabaseWrap(
        await supabase
          .from('candidate_search_history')
          .insert({
            recruiter_id: recruiter.id,
            is_search_jd: true,
            query_json: queryJson,
            search_results: cndates,
            search_query: jobRole,
          })
          .select(),
      );
      router.push(
        `/candidates/search?searchQryId=${history.id}&search_title=${jobRole}`,
      );
    } catch (err) {
      toast.error(API_FAIL_MSG);
      //
    } finally {
      setJdPopup(false);
      setIsJdSearching(false);
    }
  };

  const disabled = isEmpty(jobRole) || isEmpty(jdText);

  return (
    <JobDescriptionModal
      slotJobDescription={
        <>
          <Stack gap={2}>
            <UITextField
              onChange={(e) => {
                setJobRole(e.target.value);
              }}
              value={jobRole}
              placeholder='Enter job title'
            />
            <textarea
              style={{
                resize: 'none',
                borderRadius: 'var(--radius-2)',
                width: '100%',
                height: '200px',
                padding: '12px',
                outline: 'none',
                borderColor: 'var(--neutral-6)',
              }}
              placeholder='Enter job description'
              value={jdText}
              onChange={(e) => {
                setJdText(e.target.value);
              }}
            />
          </Stack>
        </>
      }
      onClickClose={{
        onClick: () => {
          setJdPopup(false);
        },
      }}
      slotButtonPrimaryRegular={
        <ButtonSolid
          isLoading={isJdSearching}
          isDisabled={disabled}
          textButton='Search'
          size={2}
          onClickButton={{
            onClick: () => {
              getMatchingCandsFromJd();
            },
          }}
        />
      }
    />
  );
};
