import { Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';

import { JobDescriptionModal } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import toast from '@/src/utils/toast';

import { useCandidateSearchCtx } from './context/CandidateSearchProvider';
import CandidateSearchHistory from './Search/History';
import CandidatesSearch from './Search/Search';
import { candidateSearchByJD } from './utils';
import AUIButton from '../Common/AUIButton';
import MuiPopup from '../Common/MuiPopup';
import { API_FAIL_MSG } from '../JobsDashboard/JobPostCreateUpdate/utils';

const CandidateDatabasePage = () => {
  const { candidateSearchState, updatenewSearchRes } = useCandidateSearchCtx();
  const [jdPopupOpen, setJdPopup] = useState(false);
  const [jdText, setJdText] = useState('');
  const { jobsData } = useJobs();
  const { recruiter } = useAuthDetails();
  const [isJdSearchLoading, setIsJdSearchLoading] = useState(false);
  const handleSetPopup = (isOpen: boolean) => {
    setJdPopup(isOpen);
  };

  const handleSearchByJd = async () => {
    try {
      setIsJdSearchLoading(true);
      const newSearchState = await candidateSearchByJD(
        jdText,
        jobsData.jobs.map((j) => j.id),
        recruiter.id,
        candidateSearchState.maxProfiles,
      );
      updatenewSearchRes(newSearchState);
    } catch (err) {
      // console.log(err);
      toast.error(API_FAIL_MSG);
    } finally {
      setIsJdSearchLoading(false);
      setJdPopup(false);
    }
  };

  return (
    <>
      {candidateSearchState.componentinView === 'history' ? (
        <CandidateSearchHistory handleSetPopup={handleSetPopup} />
      ) : (
        <CandidatesSearch
          handleSetJdPopUp={() => {
            setJdPopup(true);
          }}
        />
      )}
      <MuiPopup
        props={{
          open: jdPopupOpen,
          onClose: () => {
            setJdPopup(false);
          },
        }}
      >
        <Paper>
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
                  handleSearchByJd();
                }}
                endIcon={
                  isJdSearchLoading && (
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
        </Paper>
      </MuiPopup>
    </>
  );
};

export default CandidateDatabasePage;
