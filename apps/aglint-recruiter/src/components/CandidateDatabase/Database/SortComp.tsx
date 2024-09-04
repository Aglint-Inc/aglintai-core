import Popover from '@mui/material/Popover';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Sort } from '@/devlink/Sort';
import { SortButton } from '@/devlink/SortButton';

import UISelect from '../../Common/Uiselect';
const sortdisplay = [
  { name: 'Name', value: 'first_name' },
  { name: 'Location', value: 'location' },
  { name: 'Current Job Title', value: 'job_title' },
];
const SortComp = () => {
  const [anchorlEl, setAnchorEl] = useState(null);
  const [sortType, setSortType] = useState('first_name');
  const [sortActive, setSortActive] = useState(true);
  const isDisabled = sortType.length === 0;
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const isDesc = router.query.sort_type === 'desc';
    if (isDesc) {
      setSortActive(false);
    } else {
      setSortActive(true);
    }
  }, [router.isReady, router.query]);
  const applySort = () => {
    router.query.sort_type = sortActive ? 'asc' : 'desc';
    router.query.sort_by_param = sortType;
    router.push(router);
    setAnchorEl(null);
  };

  const sortName = sortdisplay.filter(
    (s) => s.value === (router.query.sort_by_param || 'first_name'),
  )[0].name;

  return (
    <>
      <SortButton
        textSort={`${sortName} ${
          router.query.sort_type === 'asc' ? ' Asc' : ' Desc'
        }`}
        onClickSortby={{
          onClick: (e) => {
            setAnchorEl(e.currentTarget);
          },
        }}
      />
      <Popover
        open={Boolean(anchorlEl)}
        anchorEl={anchorlEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        keepMounted={false}
        sx={{
          '& .MuiPaper-root': {
            overflow: 'hidden',
          },
          top: 35,
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        <Sort
          isAscendingActive={sortActive}
          isDescendingActive={!sortActive}
          slotSortDrop={
            <UISelect
              defaultValue={'first_name'}
              menuOptions={sortdisplay}
              value={sortType}
              onChange={(value) => {
                if (value === '') return;
                setSortType(value as any);
              }}
            />
          }
          onClickAscending={{
            onClick: () => {
              setSortActive(true);
            },
          }}
          onClickDescending={{
            onClick: () => {
              setSortActive(false);
            },
          }}
          slotButton={
            <ButtonSolid
              textButton='Apply Sort'
              size={2}
              isDisabled={isDisabled}
              onClickButton={{
                onClick: () => applySort(),
              }}
            />
          }
        />
      </Popover>
    </>
  );
};

export default SortComp;
