import { CircularProgress, Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { AddJob, AddJobButton } from '@/devlink';
import { AddJobList } from '@/devlink/AddJobList';
import { palette } from '@/src/context/Theme/Theme';

import AUIButton from '../../Common/AUIButton';

type newCandJob = {
  title: string;
  id: string;
  checked: boolean;
};

const AddToJobOptions = ({
  isAdding,
  handleClickSubmit,
  isPopupCandidate = false,
  selectedJobIds,
}: {
  isAdding: boolean;
  selectedJobIds: {
    id: string;
    title: string;
  }[];
  // eslint-disable-next-line no-unused-vars
  handleClickSubmit: (t: newCandJob[]) => Promise<any>;
  isPopupCandidate?: boolean;
}) => {
  const [checkBox, setcheckBox] = useState<newCandJob[]>([]);
  const [anchorlEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const newChecks: newCandJob[] = selectedJobIds.map((j) => ({
      ...j,
      checked: false,
    }));
    setcheckBox(newChecks);
  }, [anchorlEl, selectedJobIds]);

  return (
    <>
      {selectedJobIds.length > 0 && (
        <AddJobButton
          onClickAddJob={{
            onClick: (e) => {
              setAnchorEl(e.currentTarget);
            },
          }}
        />
      )}
      <Popover
        open={Boolean(anchorlEl)}
        anchorEl={anchorlEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        keepMounted={false}
        transformOrigin={
          !isPopupCandidate
            ? {
                vertical: 'bottom',
                horizontal: 'center',
              }
            : undefined
        }
        anchorOrigin={
          isPopupCandidate
            ? {
                horizontal: 'center',
                vertical: 'bottom',
              }
            : undefined
        }
        sx={{
          overflow: 'hidden',
          '& .MuiPaper-root': {
            overflow: 'hidden',
          },
        }}
      >
        <AddJob
          slotAddJobList={
            <>
              {checkBox.map((r, index) => {
                return (
                  <>
                    <AddJobList
                      key={r.id}
                      textJob={r.title}
                      isChecked={r.checked}
                      onClickCheck={{
                        onClick: () => {
                          setcheckBox((p) => {
                            let mod = [...p];
                            mod[Number(index)].checked =
                              !mod[Number(index)].checked;
                            return mod;
                          });
                        },
                      }}
                    />
                  </>
                );
              })}
            </>
          }
          slotAddButton={
            <>
              <AUIButton
                variant='outlined'
                size='small'
                onClick={async () => {
                  await handleClickSubmit(checkBox.filter((ch) => ch.checked));
                  setAnchorEl(null);
                }}
                endIcon={
                  isAdding && (
                    <CircularProgress
                      color='inherit'
                      size={'15px'}
                      sx={{ color: palette.grey[400] }}
                    />
                  )
                }
              >
                Add
              </AUIButton>
            </>
          }
          textJobSelected={checkBox.filter((s) => s.checked).length}
          onClickCancel={{
            onClick: () => {
              setAnchorEl(null);
            },
          }}
        />
      </Popover>
    </>
  );
};

export default AddToJobOptions;
