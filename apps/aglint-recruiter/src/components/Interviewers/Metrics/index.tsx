import { DatabaseTable } from '@aglint/shared-types';
import { Checkbox, Popover, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { InterviewerMetricList } from '@/devlink3/InterviewerMetricList';
import { InterviewerMetrics } from '@/devlink3/InterviewerMetrics';
import { useAllDepartments } from '@/src/queries/departments';
import {
  capitalizeAll,
  capitalizeFirstLetter,
} from '@/src/utils/text/textUtils';

import Loader from '../../Common/Loader';
import { useLeaderBoard } from '../Hook';
import { LeaderAnalyticsFilterType } from '../types';

function Metrics() {
  const [leaderboardType, setLeaderboardType] =
    useState<LeaderAnalyticsFilterType['type']>('all_time');

  const [departments, setDepartments] = useState<
    DatabaseTable['departments']['id'][]
  >([]);

  const { data: interviewers, isLoading } = useLeaderBoard({
    departments,
    type: leaderboardType,
  });

  const { data: departmentList } = useAllDepartments();
  const leaderTypeFilterList: {
    name: string;
    value: LeaderAnalyticsFilterType['type'];
  }[] = [
    { name: 'All Time', value: 'all_time' },
    { name: 'Year', value: 'year' },
    { name: 'Month', value: 'month' },
    { name: 'Week', value: 'week' },
  ];

  const departmentFilterList = departmentList.map((dep) => ({
    name: dep.name,
    value: dep.id,
  }));

  const departmentForDes = departmentFilterList
    .filter((dep) => departments.includes(dep.value))
    .map((dep) => dep.name);

  if (isLoading)
    return (
      <Stack
        height={'100%'}
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Loader />
      </Stack>
    );

  return (
    <>
      <InterviewerMetrics
        slotFilter={
          <Stack direction={'row'} gap={2}>
            <Filter
              setSelectedItems={setDepartments}
              selectedItems={departments}
              itemList={departmentFilterList}
              title='Department'
            />
            <Filter
              setSelectedItems={setLeaderboardType}
              selectedItems={leaderboardType}
              itemList={leaderTypeFilterList}
              isSingle={true}
              nameIsTitle={true}
            />
          </Stack>
        }
        textDescription={`Metrics showing for the ${leaderTypeFilterList.find((item) => item.value === leaderboardType).name}  ${departmentForDes.length ? 'for ' + departmentForDes.join(', ') : ''} `}
        slotInterviewerMetricsList={
          interviewers?.length > 0 ? (
            interviewers.map((interviewer) => {
              return (
                <InterviewerMetricList
                  key={interviewer.user_id}
                  countHours={interviewer.duration}
                  countInterviews={interviewer.interviews}
                  textName={interviewer.name}
                  textRole={interviewer.position}
                  countDeclines={0}
                />
              );
            })
          ) : (
            <GlobalEmptyState
              iconName={'monitoring'}
              size={9}
              textDesc={'No Data Available'}
            />
          )
        }
      />
    </>
  );
}

export default Metrics;

const Filter = ({
  selectedItems,
  setSelectedItems,
  itemList,
  title,
  isSingle = false,
  nameIsTitle = false,
}: {
  title?: string;
  itemList: { name: string; value: any }[];
  selectedItems: any[] | any;
  setSelectedItems: any;
  isSingle?: boolean;
  nameIsTitle?: boolean;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const open = Boolean(anchorEl);
  const id = open ? 'jobs-filter' : undefined;
  function handleClose() {
    setAnchorEl(null);
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Stack minWidth={'100px'}>
        <ButtonFilter
          isActive={Boolean(selectedItems.length)}
          isDotVisible={isSingle ? false : Boolean(selectedItems.length)}
          onClickStatus={{
            onClick: handleClick,
          }}
          textLabel={
            nameIsTitle
              ? itemList.find((item) => item.value === selectedItems).name
              : title
          }
          slotRightIcon={
            <Stack>
              <GlobalIcon
                iconName={
                  anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                }
              />
            </Stack>
          }
        />
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{ vertical: -10, horizontal: 0 }}
      >
        <FilterDropdown
          isRemoveVisible={false}
          isResetVisible={isSingle ? false : itemList.length !== 0}
          slotOption={
            itemList.length ? (
              itemList?.map((item, i) => {
                return (
                  <Stack
                    key={i}
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      userSelect: 'none',
                      ':hover': { bgcolor: 'var(--neutral-2)' },
                      borderRadius: 'var(--radius-2)',
                      cursor: 'pointer',
                      minWidth: '120px',
                    }}
                    spacing={1}
                    padding={'var(--space-2) var(--space-2)'}
                    onClick={() => {
                      if (isSingle) setSelectedItems(item.value);
                      else
                        setSelectedItems(() =>
                          selectedItems.includes(item.value)
                            ? selectedItems.filter((pre) => pre !== item.value)
                            : [...selectedItems, item.value],
                        );
                    }}
                  >
                    <Checkbox
                      checked={
                        isSingle
                          ? selectedItems === item.value
                          : selectedItems.includes(item.value)
                      }
                    />
                    <Typography>{capitalizeFirstLetter(item.name)}</Typography>
                  </Stack>
                );
              })
            ) : (
              <GlobalEmptyState
                textDesc={`No ${capitalizeAll(title)}`}
                iconName={'add'}
              />
            )
          }
          onClickReset={{
            onClick: () => {
              setSelectedItems(() => []);
            },
          }}
        />
      </Popover>
    </>
  );
};
