import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { CdAglintDb } from '@/devlink/CdAglintDb';
import { Checkbox } from '@/devlink/Checkbox';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';

import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import AddToListComp from './AddToList';
import CandidateDetail from './CdDetails';
import CdTableRecords from './CdTableRecords';
import EditFilter from './EditFilter';
import EmailOutReachComp from './EmailOutReach';
import ListDropdown from './ListDropdown';
import {
  resetCandidateStore,
  setCandidateHistory,
  setCandidates,
  setEmailOutReach,
  setFilters,
  setIsFilterOpen,
  setIsSelectAll,
  setList,
  setLists,
  setSelectedCandidate,
  setSelectedCandidates,
  useCandidateStore,
} from './store';
import {
  type Candidate,
  type CandidateSearchHistoryType,
  type FetchCandidatesParams,
} from './types';
import { processCandidatesInBatches } from './utils';
import ViewSavedList from './ViewSavedList';

function AppoloSearch() {
  const { toast } = useToast();
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const list = useCandidateStore((state) => state.list);
  const lists = useCandidateStore((state) => state.lists);
  const selectedCandidates = useCandidateStore(
    (state) => state.selectedCandidates,
  );
  const isSelectAll = useCandidateStore((state) => state.isSelectAll);
  const candidateHistory = useCandidateStore((state) => state.candidateHistory);
  const candidates = useCandidateStore((state) => state.candidates);
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
      resetCandidateStore();
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
      toast({
        variant: 'destructive',
        title: 'Something went wrong. Please try again.',
      });
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
      const { data: cdLists, error: cdError } = await supabase
        .from('candidate_list')
        .select()
        .eq('recruiter_id', recruiter.id);
      if (!cdError) {
        setLists(cdLists);
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
      setLists(data.filter((l) => l.id !== id));
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
      toast({
        variant: 'destructive',
        title: 'Something went wrong. Please try again.',
      });
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
              toast({
                variant: 'destructive',
                title: 'Please select at least one candidate.',
              });
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
                {list?.name || '--'}
              </UITypography>
              <UITypography fontBold='normal' type='small' variant='caption'>
                {`(${list?.candidates.length || 0} candidates)`}
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
            router.push(ROUTES['/candidates/history']());
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
            height={'calc(100vh - 96px)'}
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
