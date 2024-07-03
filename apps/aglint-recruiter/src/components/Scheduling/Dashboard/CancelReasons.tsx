/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { Popover, Stack, Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { NoData } from '@/devlink3/NoData';
import { Reason } from '@/devlink3/Reason';
import { useCancelRescheduleReasons } from '@/src/queries/scheduling-dashboard';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { DoughnutChart } from '../../Jobs/Job/Dashboard/doughnut';
import { getOrderedGraphValues } from '../../Jobs/Job/Dashboard/utils';

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
        processedCancelReasonsData[reasonType] &&
        Object.keys(processedCancelReasonsData[reasonType]).length ? (
          <Stack>
            <Stack
              alignItems={'center'}
              justifyContent={'space-around'}
              gap={3}
            >
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
                            borderRadius: 'var(--radius-full)',
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
        ) : (
          <Stack height={'296px'}>
            <NoData />
          </Stack>
        )
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
            <GlobalIcon iconName='keyboard_arrow_down' />
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
            borderRadius: 'var(--radius-4)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
          },
        }}
      >
        <FilterDropdown
          isRemoveVisible={false}
          slotOption={itemList.map((label, i) => {
            return (
              <Stack
                key={i}
                direction={'row'}
                sx={{ alignItems: 'center', ':hover':{bgcolor:'var(--neutral-2)'}, borderRadius:'var(--radius-2)' }}
                spacing={1}
                padding={'var(--space-2) var(--space-3)'}
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
