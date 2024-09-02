import { Popover, Stack } from '@mui/material';
import { useState } from 'react';

import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { MemberListCardOption } from '@/devlink2/MemberListCardOption';

import { type useModuleRelations } from '../hooks';
import {
  setIsPauseDialogOpen,
  setisRemoveModuleDialogOpen,
  setIsResumeDialogOpen,
  setSelRelation,
} from '../store';

const ThreeDot = ({
  relation,
}: {
  relation: ReturnType<typeof useModuleRelations>['data'][0];
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const pause_json = relation.pause_json;

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
      <Stack onClick={handleClick}>
        <IconButtonGhost
          iconName='more_vert'
          size={2}
          iconSize={6}
          color={'neutral'}
        />
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MemberListCardOption
          isMoveToQualifierVisible={false}
          isPauseVisible={!pause_json}
          isRemoveVisible={true}
          isResumeVisible={Boolean(pause_json)}
          onClickRemoveModule={{
            onClick: () => {
              setSelRelation(relation);
              setisRemoveModuleDialogOpen(true);
              handleClose();
            },
          }}
          onClickPauseInterview={{
            onClick: () => {
              setSelRelation(relation);
              setIsPauseDialogOpen(true);
              handleClose();
            },
          }}
          onClickResumeInterview={{
            onClick: () => {
              setSelRelation(relation);
              setIsResumeDialogOpen(true);
              handleClose();
            },
          }}
        />
      </Popover>
    </>
  );
};

export default ThreeDot;
