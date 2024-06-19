import { Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { AddJob } from '@/devlink/AddJob';
import { AddJobList } from '@/devlink/AddJobList';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ButtonSurface } from '@/devlink/ButtonSurface';

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
        <>
          <ButtonSurface
            textButton='Add to Job'
            color={'neutral'}
            iconName='keyboard_arrow_down'
            isRightIcon={true}
            size={1}
            onClickButton={{
              onClick: (e) => {
                setAnchorEl(e.currentTarget);
              },
            }}
          />
        </>
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
                horizontal: 'left',
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
              <ButtonSolid
                textButton='Add'
                size={2}
                isLoading={isAdding}
                onClickButton={{
                  onClick: async () => {
                    await handleClickSubmit(
                      checkBox.filter((ch) => ch.checked),
                    );
                    setAnchorEl(null);
                  },
                }}
              />
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
