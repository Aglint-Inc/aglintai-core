import { CdSavedList } from '@devlink/CdSavedList';
import { SavedList } from '@devlink/SavedList';
import { SavedListMenu } from '@devlink/SavedListMenu';
import { Popover } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  setIsSelectAll,
  setSelectedCandidate,
  setSelectedCandidates,
  useCandidateStore,
} from '../store';

function ViewSavedList() {
  const router = useRouter();
  const candidateLists = useCandidateStore((state) => state.lists);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CdSavedList
        onClickViewSavedList={{
          onClick: (e) => {
            handleClick(e);
          },
        }}
      />
      <Popover
        id='add-job'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{ vertical: -14, horizontal: 0 }}
        slotProps={{
          paper: {
            style: {
              border: 'none',
              borderRadius: 'var(--radius-4)',
              boxShadow: 'var(--shadow-3)',
            },
          },
        }}
      >
        <SavedListMenu
          isBottomWrapVisible={false}
          isCreateListVisible={false}
          isInputVisible={false}
          slotSavedList={
            <>
              {candidateLists.map((list) => (
                <SavedList
                  key={list.id}
                  textRole={list.name}
                  textCountCandidate={`(${list.candidates.length} candidates)`}
                  onClickList={{
                    onClick: () => {
                      router.push(`/candidates/aglintdb?list=${list.id}`);
                      setSelectedCandidates([]);
                      setIsSelectAll(false);
                      setSelectedCandidate(null);
                    },
                  }}
                />
              ))}
              {candidateLists.length === 0 && "You don't have any saved list"}
            </>
          }
        />
      </Popover>
    </>
  );
}

export default ViewSavedList;
