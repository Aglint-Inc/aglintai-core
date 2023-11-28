import { Collapse } from '@mui/material';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  ButtonOutlinedRegular,
  ButtonPrimaryRegular,
  CandidateDatabaseRow,
  CandidateDatabaseTable,
  Pagination,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { useCandFilter } from './CandDbProvider';
import { getFilteredCands } from './utils';
import CandidateDrawer from '../CandidateDetailsDrawer';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

const CandDatabase = () => {
  const { jobsData } = useJobs();
  const [isLoading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCand] = useState(-1);
  const { recruiter } = useAuthDetails();
  const [candsCount, setCandsCount] = useState(0);
  const { updateState, candState } = useCandFilter();
  const router = useRouter();

  useEffect(() => {
    if (!jobsData.jobs) return;

    if (router.isReady) {
      const { page_no } = router.query;
      if (typeof page_no !== 'string') {
        router.replace('/candidates?page_no=1');
        return;
      }

      (async () => {
        try {
          setLoading(true);
          const candidates = await getFilteredCands(
            jobsData.jobs.map((j) => j.id),
            Number(page_no),
          );
          const allCands = supabaseWrap(
            await supabase
              .from('candidates')
              .select('id')
              .eq('recruiter_id', recruiter.id),
          ) as string[];

          setCandsCount(allCands.length);
          updateState({
            path: 'candidates',
            value: candidates,
          });
        } catch (err) {
          // console.log(err);
          toast.error(API_FAIL_MSG);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [jobsData.jobs, router.isReady, router.query]);

  const candidates = candState.candidates;
  const counts =
    candidates.length.toString() +
    ' ' +
    (candidates.length === 1 ? 'candidate' : 'candidates');
  const isAnyRowSelected =
    candidates.findIndex((cand) => cand.is_checked) !== -1;

  const checkCandidates = (candId) => {
    const updatedCands = candidates.map((cand) => {
      if (cand.candidate_id === candId) {
        cand.is_checked = !cand.is_checked;
      }
      return cand;
    });

    updateState({
      path: 'candidates',
      value: updatedCands,
    });
  };

  const totalPageCount = Math.ceil(candsCount / 100);
  const currPageNo = Number(router.query.page_no);
  return (
    <>
      <CandidateDatabaseTable
        isChecked={isAnyRowSelected}
        textCandidateCount={counts}
        slotCandidateRows={
          <>
            {isLoading && (
              <Stack sx={{ width: '100%', height: '50vh' }}>
                <Loader />
              </Stack>
            )}
            {!isLoading &&
              candidates.map((detail, index) => {
                return (
                  <CandidateDatabaseRow
                    key={detail.candidate_id}
                    slotNameAvatar={
                      <MuiAvatar
                        level={getFullName(detail.first_name, detail.last_name)}
                        src={detail.profile_image}
                        fontSize={'12px'}
                        variant={'rounded'}
                        width={'100%'}
                        height={'100%'}
                      />
                    }
                    textName={getFullName(detail.first_name, detail.last_name)}
                    textAppliedJob={detail.job_title}
                    textEmail={detail.email}
                    textLocation={detail.json_resume.basics.location}
                    textPhone={detail.json_resume.basics.phone}
                    onClickCheck={{
                      onClick: (e) => {
                        e.stopPropagation();
                        checkCandidates(detail.candidate_id);
                      },
                    }}
                    isChecked={detail.is_checked}
                    onClickList={{
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedCand(index);
                      },
                    }}
                  />
                );
              })}
          </>
        }
        onClickCheck={{
          onClick: () => {
            updateState({
              path: 'candidates',
              value: candidates.map((c) => {
                c.is_checked = isAnyRowSelected ? false : true;
                return c;
              }),
            });
          },
        }}
        slotButtonOutlinedPrimary={
          <ButtonOutlinedRegular
            onClickButton={{ onClick: () => {} }}
            textLabel={'Import Candidates'}
          />
        }
        slotButtonPrimaryRegular={
          <ButtonPrimaryRegular
            onClickButton={{
              onClick: () => {
                router.push('/candidates/history');
              },
            }}
            textLabel={'Search'}
          />
        }
        slotCandidateDetails={
          <>
            <Collapse
              in={selectedCandidate !== -1 && !isLoading}
              unmountOnExit
              translate='yes'
            >
              {selectedCandidate !== -1 && (
                <CandidateDrawer
                  candidate={{
                    ...candidates[Number(selectedCandidate)],
                    is_bookmarked: false,
                  }}
                  eligibleJobs={[]}
                  handleAddApplications={() => {}}
                  onClickClose={() => {
                    setSelectedCand(-1);
                  }}
                  onClickNext={() => {
                    if (candidates.length - 1 > selectedCandidate) {
                      setSelectedCand((p) => p + 1);
                    }
                  }}
                  onClickPrev={() => {
                    if (selectedCandidate > 0) {
                      setSelectedCand((p) => p + 1);
                    }
                  }}
                  toggleBookMark={() => {}}
                />
              )}
            </Collapse>
          </>
        }
        slotPagination={
          <>
            {candidates.length !== 0 && !isLoading && (
              <Pagination
                textCurrentPageCount={currPageNo}
                textCurrentCandidateCount={candidates.length}
                textTotalPageCount={totalPageCount}
                textTotalCandidateCount={candsCount}
                onClickNext={{
                  onClick: () => {
                    if (currPageNo < totalPageCount) {
                      router.push(`/candidates?page_no=${currPageNo + 1}`);
                    }
                  },
                }}
                onClickPrev={{
                  onClick: () => {
                    if (currPageNo > 1) {
                      router.push(`/candidates?page_no=${currPageNo - 1}`);
                    }
                  },
                }}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default CandDatabase;
