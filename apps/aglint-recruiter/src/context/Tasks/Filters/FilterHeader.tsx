import { InputAdornment, Popover, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { ReactNode, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonOutlined } from '@/devlink/ButtonOutlined';
import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { TaskDate } from '@/devlink3/TaskDate';
import { ShowCode } from '@/src/components/Common/ShowCode';
import UITextField from '@/src/components/Common/UITextField';
import DateRange from '@/src/components/Tasks/Components/DateRange';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { palette } from '../../Theme/Theme';

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
  sort,
  dateRangeSelector,
}: {
  search?: {
    value: string;
    // eslint-disable-next-line no-unused-vars
    setValue: (x: string) => void;
    placeholder?: string;
  };
  filters: FilterType[];
  sort?: {
    sortOptions: { type: string[]; order: string[] };
    selected: { type: string; order: string };
    // eslint-disable-next-line no-unused-vars
    setOrder: (x: { type?: string; order?: string }) => void;
  };
  dateRangeSelector?: {
    name: string;
    // eslint-disable-next-line no-unused-vars
    setValue: (x: any) => void;
  };
}) => {
  const [selectedDate, setSelectedDate] = useState([]);

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
    >
      {Boolean(search) && (
        <Stack>
          <UITextField
            width='250px'
            value={search.value}
            height={32}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <GlobalIcon iconName='search' size='5' />
                </InputAdornment>
              ),
            }}
            placeholder={search.placeholder}
            onChange={(e) => {
              search.setValue(e.target.value);
            }}
          />
        </Stack>
      )}
      <Stack direction={'row'} justifyContent={'space-between'} flexGrow={1}>
        {/* filters */}
        <Stack direction={'row'} gap={2}>
          {filters
            .filter((item) => Boolean(item))
            .map((filter, index) => (
              <>
                {filter.type === 'filter' ? (
                  <FilterDropDown
                    key={index}
                    title={capitalizeFirstLetter(filter.name)}
                    itemList={filter.options}
                    selectedItems={filter.value}
                    setSelectedItems={(values) => {
                      filter.setValue(values);
                    }}
                    icon={filter.icon}
                  />
                ) : (
                  <ButtonOutlined
                    size={2}
                    textButton={capitalizeFirstLetter(filter.name)}
                    onClickButton={{ onClick: filter.onClick }}
                  />
                )}
              </>
            ))}
          {Boolean(dateRangeSelector) && (
            <>
              <ButtonFilter
                onClickStatus={{
                  onClick: (e) => {
                    setAnchorEl(e.target);
                  },
                }}
                textLabel={'Interview Date'}
                isDotVisible={selectedDate.length > 0}
                isActive={selectedDate.length > 0}
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
                              dayjs(selectedDate[0]).toString() ==
                              'Invalid Date'
                                ? [
                                    dayjs(selectedDate[0]),
                                    dayjs(selectedDate[1]),
                                  ]
                                : [
                                    dayjs(selectedDate[0]),
                                    dayjs(selectedDate[1]),
                                  ]
                            }
                          />
                        </ShowCode.When>
                        <ShowCode.Else>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                              views={['day']}
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
                        spacing={'var(--space-1)'}
                        justifyContent={'space-between'}
                      >
                        <ButtonGhost
                          textButton='Reset'
                          color='accent'
                          size={2}
                          iconName='restart_alt'
                          isLeftIcon={true}
                          onClickButton={{
                            onClick: () => {
                              setSelectedDate([]);
                              dateRangeSelector.setValue([]);
                              setAnchorEl(null);
                            },
                          }}
                        />
                        <Stack
                          direction={'row'}
                          spacing={'var(--space-2)'}
                          alignItems={'center'}
                        >
                          <ButtonGhost
                            textButton='Cancel'
                            color='accent'
                            size={2}
                            onClickButton={{
                              onClick: () => {
                                setAnchorEl(null);
                              },
                            }}
                          />
                          <ButtonGhost
                            textButton='Ok'
                            color='accent'
                            size={2}
                            onClickButton={{
                              onClick: () => {
                                dateRangeSelector.setValue(selectedDate);
                                setAnchorEl(null);
                              },
                            }}
                          />
                        </Stack>
                      </Stack>
                    </>
                  }
                />
              </Popover>
            </>
          )}
        </Stack>
        {/* Sort */}
        {Boolean(sort) && (
          <SortDropDown
            selected={sort.selected}
            setOrder={sort.setOrder}
            sortOptions={sort.sortOptions}
          />
        )}
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
  const [searchText, setSearchText] = useState('');
  const filteredOptions = (
    typeof itemList[0] === 'object'
      ? 'header' in itemList[0]
        ? itemList
        : [{ header: null, options: itemList }]
      : [
          {
            header: null,
            options: itemList.map((item) => ({ id: item, label: item })),
          },
        ]
  ) as {
    header: string | null;
    options: { id: string; label: string }[];
  }[];
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
            borderRadius: 'var(--radius-2)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
            // maxHeight: '400px',
            // overflow: 'hidden',
          },
        }}
      >
        <ShowCode>
          <ShowCode.When isTrue={title === 'Candidate'}>
            <Stack px={'var(--space-2)'} pt={'var(--space-1)'}>
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
                {optionList.options.length === 0 ? (
                  <Stack
                    pt={1}
                    px={1}
                    style={{
                      color: palette.grey[600],
                      fontSize: '14px',
                      fontWeight: 400,
                      fontStyle: 'italic',
                    }}
                  >
                    No options available
                  </Stack>
                ) : (
                  optionList.options
                    .filter((ele) =>
                      ele.label
                        .toLowerCase()
                        .includes(searchText.toLowerCase()),
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
                            {title !== 'Job' &&
                              capitalizeFirstLetter(
                                label.replaceAll('null', '') || '',
                              )}

                            {title === 'Job' &&
                              capitalizeFirstLetter(
                                label.replaceAll('null', '') || '',
                              )}
                          </Typography>
                        </Stack>
                      );
                    })
                )}
              </>
            );
          })}
          onClickReset={{
            onClick: () => {
              //@ts-ignore
              const preData =
                JSON.parse(localStorage.getItem('taskFilters')) || {};
              if (title === 'Job') {
                preData.Job = [];
              }
              if (title === 'Priority') {
                preData.Priority = [];
              }
              if (title === 'Status') {
                preData.Status = [];
              }
              if (title === 'Assignee') {
                preData.Assignee = [];
              }

              localStorage.setItem('taskFilters', JSON.stringify(preData));
              setSelectedItems([]);
            },
          }}
        />
      </Popover>
    </>
  );
}

const SortDropDown = ({
  sortOptions,
  selected,
  setOrder,
}: {
  sortOptions: { type: string[]; order: string[] };
  selected: { type: string; order: string };
  // eslint-disable-next-line no-unused-vars
  setOrder: (x: { type?: string; order?: string }) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const open = Boolean(anchorEl);
  const id = open ? 'sort_dd' : undefined;

  function handleClose() {
    setAnchorEl(null);
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <Typography fontSize={'14px'}>Sort by</Typography>
      <ButtonFilter
        isActive={true}
        isDotVisible={false}
        onClickStatus={{
          onClick: handleClick,
        }}
        textLabel={capitalizeFirstLetter(selected.type)}
        slotRightIcon={
          selected.order == 'desc' ? (
            <GlobalIcon iconName='sort' />
          ) : (
            <GlobalIcon iconName='sort' />
          )
        }
        // <svg
        //   width='14'
        //   height='12'
        //   viewBox='0 0 14 12'
        //   fill='none'
        //   xmlns='http://www.w3.org/2000/svg'
        //   style={{
        //     transform: `rotateX(180deg)`,
        //   }}
        // >
        //   {selected.order == 'desc' ? (
        //     <path
        //       d='M3.00781 0.867188L5.25781 3.11719C5.41406 3.28906 5.41406 3.46094 5.25781 3.63281C5.08594 3.78906 4.91406 3.78906 4.74219 3.63281L3.125 2.03906V10.875C3.10938 11.1094 2.98438 11.2344 2.75 11.25C2.51562 11.2344 2.39062 11.1094 2.375 10.875V2.03906L0.757812 3.63281C0.585938 3.78906 0.414062 3.78906 0.242188 3.63281C0.0859375 3.46094 0.0859375 3.28906 0.242188 3.11719L2.49219 0.867188C2.66406 0.710937 2.83594 0.710937 3.00781 0.867188ZM6.875 1.125H8.375C8.60938 1.14063 8.73438 1.26562 8.75 1.5C8.73438 1.73438 8.60938 1.85937 8.375 1.875H6.875C6.64062 1.85937 6.51562 1.73438 6.5 1.5C6.51562 1.26562 6.64062 1.14063 6.875 1.125ZM6.875 4.125H9.875C10.1094 4.14062 10.2344 4.26562 10.25 4.5C10.2344 4.73438 10.1094 4.85938 9.875 4.875H6.875C6.64062 4.85938 6.51562 4.73438 6.5 4.5C6.51562 4.26562 6.64062 4.14062 6.875 4.125ZM6.875 7.125H11.375C11.6094 7.14062 11.7344 7.26562 11.75 7.5C11.7344 7.73438 11.6094 7.85938 11.375 7.875H6.875C6.64062 7.85938 6.51562 7.73438 6.5 7.5C6.51562 7.26562 6.64062 7.14062 6.875 7.125ZM6.875 10.125H12.875C13.1094 10.1406 13.2344 10.2656 13.25 10.5C13.2344 10.7344 13.1094 10.8594 12.875 10.875H6.875C6.64062 10.8594 6.51562 10.7344 6.5 10.5C6.51562 10.2656 6.64062 10.1406 6.875 10.125Z'
        //       fill='#2F3941'
        //     />
        //   ) : (
        //     <path
        //       d='M3.00781 0.867188L5.25781 3.11719C5.41406 3.28906 5.41406 3.46094 5.25781 3.63281C5.08594 3.78906 4.91406 3.78906 4.74219 3.63281L3.125 2.03906V10.875C3.10938 11.1094 2.98438 11.2344 2.75 11.25C2.51562 11.2344 2.39062 11.1094 2.375 10.875V2.03906L0.757812 3.63281C0.585938 3.78906 0.414062 3.78906 0.242188 3.63281C0.0859375 3.46094 0.0859375 3.28906 0.242188 3.11719L2.49219 0.867188C2.66406 0.710937 2.83594 0.710937 3.00781 0.867188ZM6.875 10.875C6.64062 10.8594 6.51562 10.7344 6.5 10.5C6.51562 10.2656 6.64062 10.1406 6.875 10.125H8.375C8.60938 10.1406 8.73438 10.2656 8.75 10.5C8.73438 10.7344 8.60938 10.8594 8.375 10.875H6.875ZM6.875 7.875C6.64062 7.85938 6.51562 7.73438 6.5 7.5C6.51562 7.26562 6.64062 7.14062 6.875 7.125H9.875C10.1094 7.14062 10.2344 7.26562 10.25 7.5C10.2344 7.73438 10.1094 7.85938 9.875 7.875H6.875ZM6.875 4.875C6.64062 4.85938 6.51562 4.73438 6.5 4.5C6.51562 4.26562 6.64062 4.14062 6.875 4.125H11.375C11.6094 4.14062 11.7344 4.26562 11.75 4.5C11.7344 4.73438 11.6094 4.85938 11.375 4.875H6.875ZM6.875 1.875C6.64062 1.85937 6.51562 1.73438 6.5 1.5C6.51562 1.26562 6.64062 1.14063 6.875 1.125H12.875C13.1094 1.14063 13.2344 1.26562 13.25 1.5C13.2344 1.73438 13.1094 1.85937 12.875 1.875H6.875Z'
        //       fill='#0F3554'
        //     />
        //   )}
        // </svg>
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
        transformOrigin={{ vertical: -10, horizontal: 0 }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: 'var(--radius-2)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
            // maxHeight: '400px',
            // overflow: 'hidden',
          },
        }}
      >
        <Stack p={2} minWidth={'300px'} gap={1}>
          <SortOptionsDropDown
            icon={''}
            itemList={sortOptions.type}
            selectedItem={selected.type}
            setSelectedItem={(values) => {
              setOrder({ type: values });
            }}
          />
          <SortOptionsDropDown
            icon={
              selected.order == 'desc' ? (
                <GlobalIcon iconName='sort' />
              ) : (
                <GlobalIcon iconName='sort' />
              )
            }
            //   <svg
            //     width='14'
            //     height='12'
            //     viewBox='0 0 14 12'
            //     fill='none'
            //     xmlns='http://www.w3.org/2000/svg'
            //     style={{
            //       transform: `rotateX(180deg)`,
            //     }}
            //   >
            //     {selected.order == 'desc' ? (
            //       <path
            //         d='M3.00781 0.867188L5.25781 3.11719C5.41406 3.28906 5.41406 3.46094 5.25781 3.63281C5.08594 3.78906 4.91406 3.78906 4.74219 3.63281L3.125 2.03906V10.875C3.10938 11.1094 2.98438 11.2344 2.75 11.25C2.51562 11.2344 2.39062 11.1094 2.375 10.875V2.03906L0.757812 3.63281C0.585938 3.78906 0.414062 3.78906 0.242188 3.63281C0.0859375 3.46094 0.0859375 3.28906 0.242188 3.11719L2.49219 0.867188C2.66406 0.710937 2.83594 0.710937 3.00781 0.867188ZM6.875 1.125H8.375C8.60938 1.14063 8.73438 1.26562 8.75 1.5C8.73438 1.73438 8.60938 1.85937 8.375 1.875H6.875C6.64062 1.85937 6.51562 1.73438 6.5 1.5C6.51562 1.26562 6.64062 1.14063 6.875 1.125ZM6.875 4.125H9.875C10.1094 4.14062 10.2344 4.26562 10.25 4.5C10.2344 4.73438 10.1094 4.85938 9.875 4.875H6.875C6.64062 4.85938 6.51562 4.73438 6.5 4.5C6.51562 4.26562 6.64062 4.14062 6.875 4.125ZM6.875 7.125H11.375C11.6094 7.14062 11.7344 7.26562 11.75 7.5C11.7344 7.73438 11.6094 7.85938 11.375 7.875H6.875C6.64062 7.85938 6.51562 7.73438 6.5 7.5C6.51562 7.26562 6.64062 7.14062 6.875 7.125ZM6.875 10.125H12.875C13.1094 10.1406 13.2344 10.2656 13.25 10.5C13.2344 10.7344 13.1094 10.8594 12.875 10.875H6.875C6.64062 10.8594 6.51562 10.7344 6.5 10.5C6.51562 10.2656 6.64062 10.1406 6.875 10.125Z'
            //         fill='#2F3941'
            //       />
            //     ) : (
            //       <path
            //         d='M3.00781 0.867188L5.25781 3.11719C5.41406 3.28906 5.41406 3.46094 5.25781 3.63281C5.08594 3.78906 4.91406 3.78906 4.74219 3.63281L3.125 2.03906V10.875C3.10938 11.1094 2.98438 11.2344 2.75 11.25C2.51562 11.2344 2.39062 11.1094 2.375 10.875V2.03906L0.757812 3.63281C0.585938 3.78906 0.414062 3.78906 0.242188 3.63281C0.0859375 3.46094 0.0859375 3.28906 0.242188 3.11719L2.49219 0.867188C2.66406 0.710937 2.83594 0.710937 3.00781 0.867188ZM6.875 10.875C6.64062 10.8594 6.51562 10.7344 6.5 10.5C6.51562 10.2656 6.64062 10.1406 6.875 10.125H8.375C8.60938 10.1406 8.73438 10.2656 8.75 10.5C8.73438 10.7344 8.60938 10.8594 8.375 10.875H6.875ZM6.875 7.875C6.64062 7.85938 6.51562 7.73438 6.5 7.5C6.51562 7.26562 6.64062 7.14062 6.875 7.125H9.875C10.1094 7.14062 10.2344 7.26562 10.25 7.5C10.2344 7.73438 10.1094 7.85938 9.875 7.875H6.875ZM6.875 4.875C6.64062 4.85938 6.51562 4.73438 6.5 4.5C6.51562 4.26562 6.64062 4.14062 6.875 4.125H11.375C11.6094 4.14062 11.7344 4.26562 11.75 4.5C11.7344 4.73438 11.6094 4.85938 11.375 4.875H6.875ZM6.875 1.875C6.64062 1.85937 6.51562 1.73438 6.5 1.5C6.51562 1.26562 6.64062 1.14063 6.875 1.125H12.875C13.1094 1.14063 13.2344 1.26562 13.25 1.5C13.2344 1.73438 13.1094 1.85937 12.875 1.875H6.875Z'
            //         fill='#0F3554'
            //       />
            //     )}
            //   </svg>
            // }
            itemList={sortOptions.order.map((item) =>
              item == 'asc' ? 'ascending' : 'descending',
            )}
            selectedItem={selected.order == 'asc' ? 'ascending' : 'descending'}
            setSelectedItem={(values) => {
              setOrder({ order: values == 'ascending' ? 'asc' : 'desc' });
            }}
          />
        </Stack>
      </Popover>
    </Stack>
  );
};

const SortOptionsDropDown = ({
  itemList,
  setSelectedItem,
  selectedItem,
  icon,
}: {
  itemList: string[];
  selectedItem: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedItem: (x: string) => void;
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
            borderRadius: 'var(--radius-2)',
            borderColor: 'var(--neutral-6)',
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
                  {capitalizeFirstLetter(label)}
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
