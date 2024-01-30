import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { CdAglintDb, Checkbox } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useBoundStore } from '@/src/store';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import AddToListComp from './AddToList';
import CandidateDetail from './CdDetails';
import CdTableRecords from './CdTableRecords';
import EditFilter from './EditFilter';
import EmailOutReachComp from './EmailOutReach';
import ListDropdown from './ListDropdown';
import {
  Candidate,
  CandidateSearchHistoryType,
  FetchCandidatesParams,
} from './types';
import { processCandidatesInBatches } from './utils';
import ViewSavedList from './ViewSavedList';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';

function AppoloSearch() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const setCandidateLists = useBoundStore((state) => state.setLists);
  const list = useBoundStore((state) => state.list);
  const setList = useBoundStore((state) => state.setList);
  const lists = useBoundStore((state) => state.lists);
  const setLists = useBoundStore((state) => state.setLists);
  const setIsFilterOpen = useBoundStore((state) => state.setIsFilterOpen);
  const setFilters = useBoundStore((state) => state.setFilters);
  const setEmailOutReach = useBoundStore((state) => state.setEmailOutReach);
  const setSelectedCandidate = useBoundStore(
    (state) => state.setSelectedCandidate,
  );
  const selectedCandidates = useBoundStore((state) => state.selectedCandidates);
  const setSelectedCandidates = useBoundStore(
    (state) => state.setSelectedCandidates,
  );
  const isSelectAll = useBoundStore((state) => state.isSelectAll);
  const setIsSelectAll = useBoundStore((state) => state.setIsSelectAll);
  const candidateHistory = useBoundStore((state) => state.candidateHistory);
  const setCandidateHistory = useBoundStore(
    (state) => state.setCandidateHistory,
  );
  const candidates = useBoundStore((state) => state.candidates);
  const setCandidates = useBoundStore((state) => state.setCandidates);

  const [text, setText] = useState('');
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  useEffect(() => {
    if (router.isReady && recruiter?.id) {
      initialFetch();
    }
    return () => {
      setFilters(null);
      setList(null);
      setCandidateHistory(null);
      setSelectedCandidates([]);
      setIsSelectAll(false);
      setSelectedCandidate(null);
    };
  }, [router, recruiter]);

  const initialFetch = async () => {
    try {
      if (!loading) {
        setLoading(true);
      }
      if (router.query.id) {
        await fetchCandidates(Number(router.query.id));
      }
      if (router.query.list) {
        await fetchList(String(router.query.list));
      }
    } catch (e) {
      toast.error('Something went wrong! Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  // this is the function that is called on candidate search
  const fetchCandidates = async (id: number): Promise<boolean> => {
    const { data, error } = await supabase
      .from('candidate_search_history')
      .select('*')
      .eq('id', id);
    if (!error) {
      setFilters(data[0].query_json as unknown as FetchCandidatesParams);
      setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
      const cand = [...data[0].candidates, ...data[0].bookmarked_candidates];
      const uniqueCand = [...new Set(cand)];
      const resCand = await processCandidatesInBatches(uniqueCand);
      setCandidates(resCand as unknown as Candidate[]);
      const { data: cdList, error: cdError } = await supabase
        .from('candidate_list')
        .select()
        .eq('recruiter_id', recruiter.id);
      if (!cdError) {
        setCandidateLists(cdList);
      }
    }
    return true;
  };
  // this is the function that is called on candidate search

  // this is the function that is called on list page
  const fetchList = async (id: string) => {
    const { data, error } = await supabase
      .from('candidate_list')
      .select('*')
      .eq('recruiter_id', recruiter.id);
    if (!error) {
      setCandidateLists(data.filter((l) => l.id !== id));
      const list = data.find((l) => l.id === id);
      setList(list);
      const uniqueCand = [...new Set(list.candidates)];
      const resCand = await processCandidatesInBatches(uniqueCand);
      setCandidates(resCand as unknown as Candidate[]);
    }
  };
  // this is the function that is called on list page

  const updateHandler = async () => {
    const { data, error } = await supabase
      .from('candidate_list')
      .update({ name: text })
      .eq('id', list.id)
      .select();
    if (!error) {
      setList(data[0]);
      setLists(
        lists.map((l) => {
          if (l.id === list.id) {
            return data[0];
          }
          return l;
        }),
      );
      setText('');
      setIsEditVisible(false);
    } else {
      toast.error('Something went wrong! Please try again later.');
    }
  };

  const handleOpenDropdownList = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdownList = () => {
    setAnchorEl(null);
  };

  return (
    <Stack overflow={'hidden'}>
      <EditFilter />
      <EmailOutReachComp />

      {/* Dropdown of all the list in List Page */}
      {router.query.list && (
        <ListDropdown
          anchorEl={anchorEl}
          handleClose={handleCloseDropdownList}
          setAnchorEl={setAnchorEl}
        />
      )}

      <CdAglintDb
        onClickList={{
          onClick: (e) => {
            handleOpenDropdownList(e);
          },
        }}
        isSubmitVisible={isEditVisible}
        isEditVisible={!isEditVisible}
        onClickEdit={{
          onClick: () => {
            setText(list.name);
            setIsEditVisible(true);
          },
        }}
        onClickClose={{
          onClick: () => {
            setIsEditVisible(false);
          },
        }}
        onClickSubmit={{
          onClick: () => {
            updateHandler();
          },
        }}
        onClickEmailOutReach={{
          onClick: () => {
            if (selectedCandidates.length === 0) {
              toast.warning('Please select atleast one candidate');
              return;
            } else {
              setEmailOutReach('multiple');
            }
          },
        }}
        onClickBack={{
          onClick: () => {
            window.history.back();
            setSelectedCandidates([]);
            setIsSelectAll(false);
            setSelectedCandidate(null);
          },
        }}
        slotInput={
          isEditVisible ? (
            <UITextField
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          ) : (
            <Stack direction={'row'} spacing={1} pr={1}>
              <UITypography fontBold='normal' type='small'>
                {list?.name}
              </UITypography>
              <UITypography fontBold='normal' type='small' variant='caption'>
                {`(${list?.candidates.length} candidates)`}
              </UITypography>
            </Stack>
          )
        }
        isCdHeaderVisible={Boolean(router.query.id)}
        isListHeaderVisible={Boolean(router.query.list)}
        slotSavetoList={<AddToListComp isSaveToList={true} />}
        isEditQueryVisible={router.query.id ? true : false}
        slotViewSaveList={<ViewSavedList />}
        textNoCandidateSelected={`${selectedCandidates.length} candidate selected`}
        textHeader={
          (router.query.id ? candidateHistory?.search_query : list?.name) || ''
        }
        onClickCloseSelected={{
          onClick: () => {
            setSelectedCandidates([]);
            setIsSelectAll(false);
          },
        }}
        isHeaderVisible={!isSelectAll && selectedCandidates.length === 0}
        slotCheckbox={
          <Checkbox
            isChecked={isSelectAll}
            onClickCheck={{
              onClick: () => {
                if (candidates.length > 0) {
                  setIsSelectAll(!isSelectAll);
                  if (isSelectAll) {
                    setSelectedCandidates([]);
                  } else {
                    setSelectedCandidates(candidates);
                  }
                }
              },
            }}
          />
        }
        isSelectedVisible={selectedCandidates.length > 0}
        onClickCandidateData={{
          onClick: () => {
            router.push('/candidates/history?currentTab=aglint+candidates');
            setSelectedCandidates([]);
            setIsSelectAll(false);
            setFilters(null);
            setList(null);
            setCandidateHistory(null);
            setSelectedCandidate(null);
          },
        }}
        onClickEditQuery={{
          onClick: () => {
            setIsFilterOpen(true);
          },
        }}
        slotEmailOut={<CandidateDetail />}
        slotCdTableAglint={
          <Stack
            overflow={'auto'}
            height={'calc(100vh - 112px)'}
            width={'100%'}
            pt={'2px'}
          >
            <CdTableRecords loading={loading} />
          </Stack>
        }
      />
    </Stack>
  );
}

export default AppoloSearch;
