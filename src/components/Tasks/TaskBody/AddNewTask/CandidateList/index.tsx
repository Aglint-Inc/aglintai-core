/* eslint-disable no-unused-vars */
import { Popover, Stack, TextField, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import React, { useState } from 'react';

import { EmptyState } from '@/devlink2';
import { AvatarWithName, ListCard, ListPop } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { JobCandidatesType } from '../../../utils';

function CandidateList({
  selectedCandidate,
  setSelectedCandidate,
  candidates,
  isOptionList = true,
}: {
  selectedCandidate: JobCandidatesType;
  setSelectedCandidate: (x: JobCandidatesType) => void;
  candidates: JobCandidatesType[];
  isOptionList?: boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchText, setSearchText] = useState('');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Stack
        sx={{
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <ShowCode>
          <ShowCode.When isTrue={!!selectedCandidate?.id}>
            <ListCard
              isAvatarWithNameVisible={true}
              isListVisible={false}
              slotAvatarWithName={
                selectedCandidate && (
                  <AvatarWithName
                    isAvatarVisible={false}
                    isCandidateIconVisible={true}
                    isRoleVisible={false}
                    isReverseShadowVisible={false}
                    isShadowVisible={false}
                    slotAvatar={<></>}
                    isTickVisible={false}
                    textName={capitalizeAll(
                      selectedCandidate.candidates?.first_name +
                        ' ' +
                        (selectedCandidate.candidates?.last_name ?? ''),
                    )}
                  />
                )
              }
            />
          </ShowCode.When>
          <ShowCode.Else>
            <Typography variant='caption' fontSize={'14px'}>
              Select Candidate
            </Typography>
          </ShowCode.Else>
        </ShowCode>
      </Stack>
      <Popover
        id={id}
        open={open && isOptionList}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 'none',
          },
        }}
      >
        <ListPop
          slotListCard={
            <ShowCode>
              <ShowCode.When isTrue={!!candidates?.length}>
                <TextField
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus={true}
                  fullWidth
                  sx={{
                    p: '4px',
                  }}
                  placeholder='Search candidate'
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                {candidates &&
                  candidates
                    .filter((ele) =>
                      ele.candidates.first_name
                        .toLowerCase()
                        .includes(searchText?.toLowerCase()),
                    )
                    .map((ele, i) => {
                      return (
                        <Stack
                          key={i}
                          width={'100%'}
                          p={'4px'}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: 'grey.100',
                            },
                          }}
                          onClick={() => {
                            setSelectedCandidate(ele);
                            handleClose();
                          }}
                        >
                          <ListCard
                            isAvatarWithNameVisible={true}
                            isListVisible={false}
                            slotAvatarWithName={
                              <AvatarWithName
                                isAvatarVisible={false}
                                isCandidateIconVisible={true}
                                isRoleVisible={false}
                                isReverseShadowVisible={false}
                                isShadowVisible={false}
                                slotAvatar={<></>}
                                isTickVisible={false}
                                textName={capitalizeAll(
                                  ele.candidates?.first_name +
                                    ' ' +
                                    (ele.candidates?.last_name ?? ''),
                                )}
                              />
                            }
                          />
                        </Stack>
                      );
                    })}
                <ShowCode.When
                  isTrue={
                    candidates &&
                    !candidates.filter((ele) =>
                      ele.candidates.first_name.includes(searchText),
                    ).length
                  }
                >
                  <EmptyState textDescription={'No candidates found.'} />
                </ShowCode.When>
              </ShowCode.When>
              <ShowCode.Else>
                <EmptyState textDescription='No candidates found.' />
              </ShowCode.Else>
            </ShowCode>
          }
        />
      </Popover>
    </>
  );
}

export default CandidateList;
