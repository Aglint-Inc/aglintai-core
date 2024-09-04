import { supabaseWrap } from '@aglint/shared-utils';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { IconButtonGhost } from '@devlink/IconButtonGhost';
import { JobDescriptionModal } from '@devlink/JobDescriptionModal';
import { Stack } from '@mui/material';
import { isEmpty } from 'lodash';
import router from 'next/router';
import React, { useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useJobs } from '@/context/JobsContext';
import { searchJdToJson } from '@/utils/prompts/candidateDb/jdToJson';
import { supabase } from '@/utils/supabase/client';

import UITextField from '../../Common/UITextField';
import { getRelevantCndidates } from '../utils';

export const JDSearchModal = ({ setJdPopup }) => {
  const { toast } = useToast();
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
      toast({
        variant: 'destructive',
        title: 'Something went wrong. Please try again.',
      });
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
      slotClose={
        <IconButtonGhost
          iconName='close'
          color={'neutral'}
          size={1}
          onClickButton={{
            onClick: () => {
              setJdPopup(false);
            },
          }}
        />
      }
      slotButtonPrimaryRegular={
        <>
          <ButtonSoft
            textButton='Cancel'
            size={2}
            color={'neutral'}
            onClickButton={{
              onClick: () => {
                setJdPopup(false);
              },
            }}
          />
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
        </>
      }
    />
  );
};
