
import { Popover } from '@mui/material';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { MemberListCardOption } from 'src/app/(authenticated)/_interview-pool/[pool]/_common/components/Tabs/Training/IndividualRow/MemberListCardOption';

import { UIButton } from '@/components/Common/UIButton';

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
      <UIButton variant='ghost' size='sm' onClick={handleClick}>
        <EllipsisVertical className='h-4 w-4' />
      </UIButton>

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
        onClickMoveToQualifier={null}
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
