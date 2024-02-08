import { Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createToast } from 'vercel-toast';

import {
  AddToList,
  ButtonPrimarySmall,
  CdSavedList,
  Checkbox,
  SavedList,
  SavedListMenu,
} from '@/devlink';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { CandidateListTypeDB } from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import {
  setIsSelectAll,
  setLists,
  setSelectedCandidate,
  setSelectedCandidates,
  useCandidateStore,
} from '../store';

function AddToListComp({ isSaveToList = false }: { isSaveToList: boolean }) {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const candidateLists = useCandidateStore((state) => state.lists);
  const selectedCandidate = useCandidateStore(
    (state) => state.selectedCandidate,
  );

  const selectedCandidates = useCandidateStore(
    (state) => state.selectedCandidates,
  );

  const isSelectAll = useCandidateStore((state) => state.isSelectAll);
  const [text, setText] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [selectedList, setSelectedList] = useState<CandidateListTypeDB[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const submitHandler = async () => {
    const { data, error } = await supabase
      .from('candidate_list')
      .insert({ name: text, recruiter_id: recruiter.id })
      .select();
    if (!error) {
      setText('');
      setLists([...candidateLists, data[0]]);
      setIsInputVisible(false);
    } else {
      toast.error('Something went wrong! Please try again later.');
    }
  };

  const addToListHandler = async () => {
    const dbList = selectedList.map((list) => {
      return {
        ...list,
        candidates: [...list.candidates, selectedCandidate.id],
      };
    });

    const { data, error } = await supabase
      .from('candidate_list')
      .upsert(dbList)
      .select();
    if (!error) {
      const oldList = candidateLists.filter((list) => {
        return !selectedList.find((l) => l.id === list.id);
      });
      setLists([...oldList, ...data]);
      setSelectedList([]);
    } else {
      toast.error('Something went wrong! Please try again later.');
    }
  };

  const addMultipleToListHandler = async () => {
    try {
      setIsSaving(true);
      let candIds = selectedCandidates.map((c) => c.id);
      const dbList = selectedList.map((list) => {
        return {
          ...list,
          candidates: [...new Set([...list.candidates, ...candIds])],
        };
      });

      const { data, error } = await supabase
        .from('candidate_list')
        .upsert(dbList)
        .select();
      if (!error) {
        const oldList = candidateLists.filter((list) => {
          return !selectedList.find((l) => l.id === list.id);
        });
        setLists([...oldList, ...data]);
        setSelectedCandidates([]);
        setSelectedList([]);
        if (isSelectAll) {
          setIsSelectAll(false);
        }
        createToast('Candidates added to list successfully', {
          type: 'success',
          action: {
            text: 'View',
            callback(toast) {
              setSelectedCandidate(null);
              router.push(pageRoutes.AGLINTDB + `?list=${data[0].id}`);
              toast.destroy();
            },
          },
          timeout: 3000,
        });
      } else {
        toast.error('Something went wrong! Please try again later.');
      }
    } catch {
      toast.error('Something went wrong! Please try again later.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateListHandler = async (list: CandidateListTypeDB) => {
    if (selectedList.find((l) => l.id === list.id)) {
      setSelectedList(selectedList.filter((l) => l.id !== list.id));
    } else {
      setSelectedList([...selectedList, list]);
    }
  };

  const checkboxHandler = async (list: CandidateListTypeDB) => {
    const oldList = candidateLists.find((l) => l.id === list.id);
    if (isSaveToList) {
      updateListHandler(list);
    } else {
      if (!oldList.candidates.includes(selectedCandidate.id)) {
        updateListHandler(list);
      } else {
        toast.error('Candidate already added to this list.');
      }
    }
  };

  return (
    <>
      {isSaveToList ? (
        <CdSavedList
          isSavetoListVisible={true}
          isViewSavedVisible={false}
          onClickViewSavedList={{
            onClick: (e) => {
              e.stopPropagation();
              handleClick(e);
            },
          }}
        />
      ) : (
        <AddToList
          onClickAddtoList={{
            onClick: (e) => {
              e.stopPropagation();
              handleClick(e);
            },
          }}
        />
      )}

      <Popover
        id={selectedCandidate?.id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{ vertical: -10, horizontal: 0 }}
        slotProps={{
          paper: {
            style: {
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0px 4px 8px 0px rgba(4, 68, 77, 0.15)',
            },
          },
        }}
      >
        <SavedListMenu
          slotAddButton={
            <ButtonPrimarySmall
              isStartIcon={isSaving}
              slotStartIcon={
                <Stack
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'100%'}
                >
                  <LoaderGrey />
                </Stack>
              }
              textLabel={'Save'}
              isDisabled={selectedList.length == 0}
              onClickButton={{
                onClick: () => {
                  if (!isSaveToList) {
                    addToListHandler();
                  } else {
                    addMultipleToListHandler();
                  }
                },
              }}
            />
          }
          onClickSubmit={{
            onClick: async () => {
              await submitHandler();
            },
          }}
          onClickCreateList={{
            onClick: () => {
              setIsInputVisible(true);
            },
          }}
          onClickClose={{
            onClick: () => {
              setText('');
              setIsInputVisible(false);
            },
          }}
          isCreateListVisible={isInputVisible}
          isInputVisible={isInputVisible}
          slotInput={
            <UITextField
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          }
          slotSavedList={
            <>
              {candidateLists.length === 0 && (
                <Stack
                  sx={{
                    background: '#F7F9FB',
                    p: '30px 96px 30px 96px',
                    width: '100%',
                    borderRadius: '10px',
                    color: '#68737D',
                  }}
                >
                  You dont have any saved list.
                </Stack>
              )}
              {candidateLists.map((list) => (
                <SavedList
                  slotCheckbox={
                    <Checkbox
                      isChecked={Boolean(
                        selectedList.find((l) => l.id === list.id),
                      )}
                      onClickCheck={{
                        onClick: async (e) => {
                          e.stopPropagation();
                          checkboxHandler(list);
                        },
                      }}
                    />
                  }
                  key={list.id}
                  textRole={list.name}
                  textCountCandidate={`(${list.candidates.length} candidates)`}
                  onClickList={{
                    onClick: () => {
                      checkboxHandler(list);
                    },
                  }}
                />
              ))}
            </>
          }
        />
      </Popover>
    </>
  );
}

export default AddToListComp;
