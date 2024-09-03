/* eslint-disable no-unused-vars */
import { Popover, Stack, TextField, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import React, { useState } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { EmptyState } from '@/devlink2/EmptyState';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { ListCard } from '@/devlink3/ListCard';
import { ListPop } from '@/devlink3/ListPop';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { type JobCandidatesType } from '../../../utils';

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
          width: '100%',
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
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            // border: 'none',
            height: '300px',
            width: '300px',
          },
        }}
      >
        <Stack bgcolor={'#fff'} p={0.5} overflow={'scroll'} height={'100%'}>
          <ShowCode>
            <ShowCode.When isTrue={!!candidates?.length}>
              <TextField
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={true}
                fullWidth
                sx={{
                  p: '4px',
                }}
                placeholder='Search by name.'
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
                        px={1}
                        py={0.5}
                        borderRadius={'6px'}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'var(--neutral-2)',
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
                <GlobalEmptyState
                  styleEmpty={{
                    style: { background: 'transparent' },
                  }}
                  iconName={'person'}
                  textDesc={'No candidates found.'}
                />
              </ShowCode.When>
            </ShowCode.When>
            <ShowCode.Else>
              <GlobalEmptyState textDesc='No candidates found.' />
            </ShowCode.Else>
          </ShowCode>
        </Stack>
      </Popover>
    </>
  );
}

export default CandidateList;
