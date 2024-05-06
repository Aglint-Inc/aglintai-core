import {
  Button,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IconReload } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { ReactNode, useEffect, useState } from 'react';

import { Checkbox } from '@/devlink';
import { ButtonFilter, FilterDropdown } from '@/devlink2';
import { TaskDate } from '@/devlink3';
import Icon from '@/src/components/Common/Icons/Icon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import UITextField from '@/src/components/Common/UITextField';
import DateRange from '@/src/components/Tasks/Components/DateRange';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { useTasksContext } from '../../TasksContextProvider/TasksContextProvider';

// eslint-disable-next-line no-unused-vars
// type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
//   ? A
//   : never;
// eslint-disable-next-line no-unused-vars
type ArgumentsType<T extends (...args: any[]) => any> = Parameters<T>;

type FilterType =
  | {
      type: 'filter';
      name: string;
      icon?: ReactNode;
      options: ArgumentsType<typeof FilterDropDown>[number]['itemList'];
      value: string[];
      // eslint-disable-next-line no-unused-vars
      setValue: (value: string[]) => void;
    }
  | {
      type: 'button';
      name: string;
      active: boolean;
      onClick: () => void;
    };
export const FilterHeader = ({
  search,
  filters,
}: {
  search?: {
    value: string;
    // eslint-disable-next-line no-unused-vars
    setValue: (x: string) => void;
    placeholder?: string;
  };
  filters: FilterType[];
}) => {
  const { filter, handelFilter } = useTasksContext();

  const [selectedDate, setSelectedDate] = useState([
    dayjs().toString(),
    dayjs().toString(),
  ]);

  const [rangeActive, setRangeActive] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Stack
      direction={'row'}
      width={'100%'}
      justifyContent={'space-between'}
      gap={2}
      pr={1}
    >
      {Boolean(search) && (
        <Stack>
          <UITextField
            width='400px'
            value={search.value}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Icon variant='JobSearch' height='14' />
                </InputAdornment>
              ),
            }}
            placeholder={search.placeholder}
            onChange={(e) => {
              search.setValue(e.target.value);
            }}
            borderRadius={10}
            height={42}
          />
        </Stack>
      )}
      <Stack direction={'row'} gap={2}>
        {filters.map((filter, index) => (
          <>
            {filter.type === 'filter' ? (
              <FilterDropDown
                key={index}
                title={filter.name}
                itemList={filter.options}
                selectedItems={filter.value}
                setSelectedItems={(values) => {
                  filter.setValue(values);
                }}
                icon={filter.icon}
              />
            ) : (
              <Button key={index} variant='outlined' onClick={filter.onClick}>
                {filter.name}
              </Button>
            )}
          </>
        ))}
        <ButtonFilter
          onClickStatus={{
            onClick: (e) => {
              setAnchorEl(e.target);
            },
          }}
          textLabel={'Due Date'}
          isDotVisible={false}
          isActive={false}
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
          <TaskDate
            onClickInDateRange={{
              onClick: () => {
                setRangeActive(true);
              },
            }}
            onClickSpecificDate={{
              onClick: () => {
                setRangeActive(false);
              },
            }}
            isInDateRangeActive={rangeActive}
            isSpecificDateActive={!rangeActive}
            slotDate={
              <>
                <ShowCode>
                  <ShowCode.When isTrue={rangeActive}>
                    <DateRange
                      onChange={(e) => {
                        if (e[1]) {
                          setSelectedDate(e);
                        }
                      }}
                      value={
                        dayjs(selectedDate[0]).toString() == 'Invalid Date'
                          ? [dayjs(selectedDate[0]), dayjs(selectedDate[1])]
                          : [dayjs(selectedDate[0]), dayjs(selectedDate[1])]
                      }
                    />
                  </ShowCode.When>
                  <ShowCode.Else>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        disablePast
                        value={dayjs(selectedDate[0])}
                        onChange={(e) => {
                          setSelectedDate([e]);
                        }}
                      />
                    </LocalizationProvider>
                  </ShowCode.Else>
                </ShowCode>
                <Stack
                  width={'100%'}
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'10px'}
                  justifyContent={'space-between'}
                >
                  <Button
                    onClick={() => {
                      handelFilter({
                        ...filter,
                        date: {
                          values: [],
                        },
                      });
                    }}
                    startIcon={<IconReload size={'16px'} />}
                    variant='text'
                  >
                    Reset
                  </Button>
                  <Stack
                    direction={'row'}
                    spacing={'10px'}
                    alignItems={'center'}
                  >
                    <Button
                      onClick={() => {
                        setAnchorEl(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        handelFilter({
                          ...filter,
                          date: {
                            values: selectedDate,
                          },
                        });

                        setAnchorEl(null);
                      }}
                    >
                      OK
                    </Button>
                  </Stack>
                </Stack>
              </>
            }
          />
        </Popover>
      </Stack>
    </Stack>
  );
};

function FilterDropDown({
  title,
  itemList,
  setSelectedItems,
  selectedItems,
  icon,
}: {
  title: string;
  itemList:
    | string[]
    | { id: string; label: string }[]
    | { header: string; options: { id: string; label: string }[] }[];
  selectedItems: string[];
  // eslint-disable-next-line no-unused-vars
  setSelectedItems: (x: string[]) => void;
  icon: ReactNode;
}) {
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
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFilteredOptions(
      (typeof itemList[0] === 'object'
        ? 'header' in itemList[0]
          ? itemList
          : [{ header: null, options: itemList }]
        : [
            {
              header: null,
              options: itemList.map((item) => ({ id: item, label: item })),
            },
          ]) as {
        header: string | null;
        options: { id: string; label: string }[];
      }[],
    );
  }, [searchText]);
  return (
    <>
      <ButtonFilter
        isActive={Boolean(selectedItems.length)}
        isDotVisible={Boolean(selectedItems.length)}
        slotLeftIcon={<Stack>{icon}</Stack>}
        // isDotVisible={filter.job_ids.length > 0}
        onClickStatus={{
          onClick: handleClick,
        }}
        textLabel={title}
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
            // maxHeight: '400px',
            // overflow: 'hidden',
          },
        }}
      >
        <ShowCode>
          <ShowCode.When isTrue={title === 'Candidate'}>
            <Stack px={'10px'} pt={'5px'}>
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
            </Stack>
          </ShowCode.When>
        </ShowCode>
        <FilterDropdown
          isRemoveVisible={false}
          slotOption={filteredOptions?.map((optionList) => {
            return (
              <>
                {optionList.header && (
                  <Typography>{optionList.header}</Typography>
                )}
                {optionList.options
                  .filter((ele) =>
                    ele.label.toLowerCase().includes(searchText.toLowerCase()),
                  )
                  .map(({ id, label }) => {
                    return (
                      <Stack
                        key={id}
                        direction={'row'}
                        sx={{ alignItems: 'center' }}
                        spacing={1}
                        onClick={() => {
                          let temp = [];
                          if (selectedItems.includes(id)) {
                            temp = selectedItems.filter(
                              (innerEle) => innerEle !== id,
                            );
                          } else {
                            temp = [...selectedItems, id];
                          }
                          //@ts-ignore
                          const preData =
                            JSON.parse(localStorage.getItem('taskFilters')) ||
                            {};
                          if (title === 'Job') {
                            preData.Job = [...temp];
                          }
                          if (title === 'Priority') {
                            preData.Priority = [...temp];
                          }
                          if (title === 'Status') {
                            preData.Status = [...temp];
                          }
                          if (title === 'Assignee') {
                            preData.Assignee = [...temp];
                          }

                          localStorage.setItem(
                            'taskFilters',
                            JSON.stringify(preData),
                          );

                          setSelectedItems(temp);
                        }}
                      >
                        <Checkbox
                          isChecked={selectedItems.includes(id)}
                          onClickCheck={{}}
                        />
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                          // onClick={() => {
                          //   if (selectedItems.includes(item)) {
                          //     setSelectedItems((ele: ItemType[]) =>
                          //       ele.filter((innerEle: ItemType) => innerEle !== item),
                          //     );
                          //   } else {
                          //     setSelectedItems((ele: ItemType[]) => [...ele, item]);
                          //   }
                          // }}
                        >
                          {capitalizeAll(label.replaceAll('null', '') || '')}
                        </Typography>
                      </Stack>
                    );
                  })}
              </>
            );
          })}
          onClickReset={{
            onClick: () => {
              setSelectedItems([]);
            },
          }}
        />
      </Popover>
    </>
  );
}
