import { DatabaseTable } from '@aglint/shared-types';
import { Popover, Stack, Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react';

import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { Reason } from '@/devlink3/Reason';
import { useCancelRescheduleReasons } from '@/src/queries/scheduling-dashboard';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { DoughnutChart } from '../../JobsDashboard/Dashboard/Doughnut';
import { getOrderedGraphValues } from '../../JobsDashboard/Dashboard/utils';

const CancelReasons = () => {
  const [reasonType, setReasonType] =
    useState<DatabaseTable['interview_session_cancel']['type']>('reschedule');
  const { data: CancelReasonsData } = useCancelRescheduleReasons();

  const processedCancelReasonsData = (CancelReasonsData || []).reduce(
    (acc, curr) => {
      acc[curr.type][curr.reason] = (acc[curr.type][curr.reason] || 0) + 1;
      return acc;
    },
    { declined: {}, reschedule: {} } as {
      // eslint-disable-next-line no-unused-vars
      [key in DatabaseTable['interview_session_cancel']['type']]: {
        [key: string]: number;
      };
    },
  );
  const totalCount = Object.values(
    processedCancelReasonsData[reasonType],
  ).reduce((acc, curr) => acc + curr, 0);
  const chartData = getOrderedGraphValues(
    processedCancelReasonsData[reasonType],
  );

  return (
    <Reason
      slotReasonDropdown={
        <DropdownSelectButton
          itemList={
            [
              'reschedule',
              'declined',
            ] as unknown as DatabaseTable['interview_session_cancel']['type'][]
          }
          selectedItem={reasonType}
          setSelectedItem={(e) => setReasonType(e)}
        />
      }
      slotReasonGraph={
        <Stack>
          <Stack alignItems={'center'} justifyContent={'space-around'} gap={3}>
            <Stack height={'224px'}>
              <DoughnutChart locations={chartData} fixedHeight={true} />
            </Stack>
            <Stack
              gap={1}
              width={'100%'}
              maxHeight={'48px'}
              overflow={'scroll'}
            >
              {chartData.map(({ color, count, name }, i) => {
                return (
                  <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    gap={2}
                    key={i}
                  >
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                      <Stack
                        sx={{
                          bgcolor: color,
                          width: '10px',
                          aspectRatio: 1,
                          borderRadius: '100%',
                        }}
                      />

                      <Typography
                        variant='body1'
                        sx={{
                          textWrap: 'nowrap',
                          // textTransform: 'capitalize',
                        }}
                      >
                        {name}
                      </Typography>
                    </Stack>
                    <Typography variant='body1'>
                      {((count / totalCount) * 100).toFixed(0)}%
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      }
    />
  );
};

export default CancelReasons;

export const DropdownSelectButton = <T,>({
  itemList,
  setSelectedItem,
  selectedItem,
  icon,
}: {
  itemList: T[];
  selectedItem: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedItem: (x: T) => void;
  icon?: ReactNode;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const open = Boolean(anchorEl);
  const id = open ? 'sort-Options' : undefined;
  function handleClose() {
    setAnchorEl(null);
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <ButtonFilter
        isActive={false}
        isDotVisible={false}
        slotLeftIcon={<Stack>{icon}</Stack>}
        onClickStatus={{
          onClick: handleClick,
          style: {
            padding: '4px',
          },
        }}
        textLabel={capitalizeFirstLetter(selectedItem)}
        slotRightIcon={
          <Stack>
            <svg
              width='15'
              height='16'
              viewBox='0 0 15 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.75781 11.2578C7.58594 11.4141 7.41406 11.4141 7.24219 11.2578L2.74219 6.75781C2.58594 6.58594 2.58594 6.41406 2.74219 6.24219C2.91406 6.08594 3.08594 6.08594 3.25781 6.24219L7.5 10.4609L11.7422 6.24219C11.9141 6.08594 12.0859 6.08594 12.2578 6.24219C12.4141 6.41406 12.4141 6.58594 12.2578 6.75781L7.75781 11.2578Z'
                fill='#0F3554'
              />
            </svg>
          </Stack>
        }
      />

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
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '10px',
            borderColor: '#E9EBED',
            minWidth: '176px',
          },
        }}
      >
        <FilterDropdown
          isRemoveVisible={false}
          slotOption={itemList.map((label) => {
            return (
              <Stack
                key={id}
                direction={'row'}
                sx={{ alignItems: 'center' }}
                spacing={1}
                onClick={() => {
                  setSelectedItem(label);
                  handleClose();
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {capitalizeFirstLetter(String(label))}
                </Typography>
              </Stack>
            );
          })}
          onClickReset={{
            onClick: () => {
              setSelectedItem(itemList[0]);
            },
          }}
        />
      </Popover>
    </>
  );
};
