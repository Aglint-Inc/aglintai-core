import {
  List,
  ListItemButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import React, { ReactNode } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

export type sortComponentType = {
  sortOptions: {
    options: string[] | { id: string; label: string }[];
    order: string[] | { id: string; label: string }[];
  };
  selected: { option: string; order: string };
  // eslint-disable-next-line no-unused-vars
  setOrder: (x: { type?: string; order?: string }) => void;
};
function SortComponent({ selected, setOrder, sortOptions }: sortComponentType) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  if (!sortOptions.options || !sortOptions.order) return null;

  const open = Boolean(anchorEl);
  const id = open ? 'sort_dd' : undefined;

  const sortOptionList = (
    typeof sortOptions.options[0] === 'object'
      ? sortOptions.options
      : sortOptions.options.map((item) => ({ id: item, label: item }))
  ) as { id: string; label: string }[];

  const orderOptionList = (
    typeof sortOptions.order[0] === 'object'
      ? sortOptions.order
      : sortOptions.order.map((item) => ({ id: item, label: item }))
  ) as { id: string; label: string }[];

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
        textLabel={capitalizeFirstLetter(selected.option)}
        slotRightIcon={
          <svg
            width='14'
            height='12'
            viewBox='0 0 14 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{
              transform: `rotateX(180deg)`,
            }}
          >
            {selected.order == 'descending' || selected.order == 'desc' ? (
              <path
                d='M3.00781 0.867188L5.25781 3.11719C5.41406 3.28906 5.41406 3.46094 5.25781 3.63281C5.08594 3.78906 4.91406 3.78906 4.74219 3.63281L3.125 2.03906V10.875C3.10938 11.1094 2.98438 11.2344 2.75 11.25C2.51562 11.2344 2.39062 11.1094 2.375 10.875V2.03906L0.757812 3.63281C0.585938 3.78906 0.414062 3.78906 0.242188 3.63281C0.0859375 3.46094 0.0859375 3.28906 0.242188 3.11719L2.49219 0.867188C2.66406 0.710937 2.83594 0.710937 3.00781 0.867188ZM6.875 1.125H8.375C8.60938 1.14063 8.73438 1.26562 8.75 1.5C8.73438 1.73438 8.60938 1.85937 8.375 1.875H6.875C6.64062 1.85937 6.51562 1.73438 6.5 1.5C6.51562 1.26562 6.64062 1.14063 6.875 1.125ZM6.875 4.125H9.875C10.1094 4.14062 10.2344 4.26562 10.25 4.5C10.2344 4.73438 10.1094 4.85938 9.875 4.875H6.875C6.64062 4.85938 6.51562 4.73438 6.5 4.5C6.51562 4.26562 6.64062 4.14062 6.875 4.125ZM6.875 7.125H11.375C11.6094 7.14062 11.7344 7.26562 11.75 7.5C11.7344 7.73438 11.6094 7.85938 11.375 7.875H6.875C6.64062 7.85938 6.51562 7.73438 6.5 7.5C6.51562 7.26562 6.64062 7.14062 6.875 7.125ZM6.875 10.125H12.875C13.1094 10.1406 13.2344 10.2656 13.25 10.5C13.2344 10.7344 13.1094 10.8594 12.875 10.875H6.875C6.64062 10.8594 6.51562 10.7344 6.5 10.5C6.51562 10.2656 6.64062 10.1406 6.875 10.125Z'
                fill='#2F3941'
              />
            ) : (
              <path
                d='M3.00781 0.867188L5.25781 3.11719C5.41406 3.28906 5.41406 3.46094 5.25781 3.63281C5.08594 3.78906 4.91406 3.78906 4.74219 3.63281L3.125 2.03906V10.875C3.10938 11.1094 2.98438 11.2344 2.75 11.25C2.51562 11.2344 2.39062 11.1094 2.375 10.875V2.03906L0.757812 3.63281C0.585938 3.78906 0.414062 3.78906 0.242188 3.63281C0.0859375 3.46094 0.0859375 3.28906 0.242188 3.11719L2.49219 0.867188C2.66406 0.710937 2.83594 0.710937 3.00781 0.867188ZM6.875 10.875C6.64062 10.8594 6.51562 10.7344 6.5 10.5C6.51562 10.2656 6.64062 10.1406 6.875 10.125H8.375C8.60938 10.1406 8.73438 10.2656 8.75 10.5C8.73438 10.7344 8.60938 10.8594 8.375 10.875H6.875ZM6.875 7.875C6.64062 7.85938 6.51562 7.73438 6.5 7.5C6.51562 7.26562 6.64062 7.14062 6.875 7.125H9.875C10.1094 7.14062 10.2344 7.26562 10.25 7.5C10.2344 7.73438 10.1094 7.85938 9.875 7.875H6.875ZM6.875 4.875C6.64062 4.85938 6.51562 4.73438 6.5 4.5C6.51562 4.26562 6.64062 4.14062 6.875 4.125H11.375C11.6094 4.14062 11.7344 4.26562 11.75 4.5C11.7344 4.73438 11.6094 4.85938 11.375 4.875H6.875ZM6.875 1.875C6.64062 1.85937 6.51562 1.73438 6.5 1.5C6.51562 1.26562 6.64062 1.14063 6.875 1.125H12.875C13.1094 1.14063 13.2344 1.26562 13.25 1.5C13.2344 1.73438 13.1094 1.85937 12.875 1.875H6.875Z'
                fill='#0F3554'
              />
            )}
          </svg>
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
        <Stack p={2} minWidth={'max-content'} gap={1}>
          <SortOptionsDropDown
            icon={''}
            itemList={sortOptionList}
            selectedItem={selected.option}
            setSelectedItem={(values) => {
              setOrder({ type: values });
            }}
          />
          <SortOptionsDropDown
            icon={
              <svg
                width='14'
                height='12'
                viewBox='0 0 14 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                style={{
                  transform: `rotateX(180deg)`,
                }}
              >
                {selected.order == 'descending' || selected.order == 'desc' ? (
                  <path
                    d='M3.00781 0.867188L5.25781 3.11719C5.41406 3.28906 5.41406 3.46094 5.25781 3.63281C5.08594 3.78906 4.91406 3.78906 4.74219 3.63281L3.125 2.03906V10.875C3.10938 11.1094 2.98438 11.2344 2.75 11.25C2.51562 11.2344 2.39062 11.1094 2.375 10.875V2.03906L0.757812 3.63281C0.585938 3.78906 0.414062 3.78906 0.242188 3.63281C0.0859375 3.46094 0.0859375 3.28906 0.242188 3.11719L2.49219 0.867188C2.66406 0.710937 2.83594 0.710937 3.00781 0.867188ZM6.875 1.125H8.375C8.60938 1.14063 8.73438 1.26562 8.75 1.5C8.73438 1.73438 8.60938 1.85937 8.375 1.875H6.875C6.64062 1.85937 6.51562 1.73438 6.5 1.5C6.51562 1.26562 6.64062 1.14063 6.875 1.125ZM6.875 4.125H9.875C10.1094 4.14062 10.2344 4.26562 10.25 4.5C10.2344 4.73438 10.1094 4.85938 9.875 4.875H6.875C6.64062 4.85938 6.51562 4.73438 6.5 4.5C6.51562 4.26562 6.64062 4.14062 6.875 4.125ZM6.875 7.125H11.375C11.6094 7.14062 11.7344 7.26562 11.75 7.5C11.7344 7.73438 11.6094 7.85938 11.375 7.875H6.875C6.64062 7.85938 6.51562 7.73438 6.5 7.5C6.51562 7.26562 6.64062 7.14062 6.875 7.125ZM6.875 10.125H12.875C13.1094 10.1406 13.2344 10.2656 13.25 10.5C13.2344 10.7344 13.1094 10.8594 12.875 10.875H6.875C6.64062 10.8594 6.51562 10.7344 6.5 10.5C6.51562 10.2656 6.64062 10.1406 6.875 10.125Z'
                    fill='#2F3941'
                  />
                ) : (
                  <path
                    d='M3.00781 0.867188L5.25781 3.11719C5.41406 3.28906 5.41406 3.46094 5.25781 3.63281C5.08594 3.78906 4.91406 3.78906 4.74219 3.63281L3.125 2.03906V10.875C3.10938 11.1094 2.98438 11.2344 2.75 11.25C2.51562 11.2344 2.39062 11.1094 2.375 10.875V2.03906L0.757812 3.63281C0.585938 3.78906 0.414062 3.78906 0.242188 3.63281C0.0859375 3.46094 0.0859375 3.28906 0.242188 3.11719L2.49219 0.867188C2.66406 0.710937 2.83594 0.710937 3.00781 0.867188ZM6.875 10.875C6.64062 10.8594 6.51562 10.7344 6.5 10.5C6.51562 10.2656 6.64062 10.1406 6.875 10.125H8.375C8.60938 10.1406 8.73438 10.2656 8.75 10.5C8.73438 10.7344 8.60938 10.8594 8.375 10.875H6.875ZM6.875 7.875C6.64062 7.85938 6.51562 7.73438 6.5 7.5C6.51562 7.26562 6.64062 7.14062 6.875 7.125H9.875C10.1094 7.14062 10.2344 7.26562 10.25 7.5C10.2344 7.73438 10.1094 7.85938 9.875 7.875H6.875ZM6.875 4.875C6.64062 4.85938 6.51562 4.73438 6.5 4.5C6.51562 4.26562 6.64062 4.14062 6.875 4.125H11.375C11.6094 4.14062 11.7344 4.26562 11.75 4.5C11.7344 4.73438 11.6094 4.85938 11.375 4.875H6.875ZM6.875 1.875C6.64062 1.85937 6.51562 1.73438 6.5 1.5C6.51562 1.26562 6.64062 1.14063 6.875 1.125H12.875C13.1094 1.14063 13.2344 1.26562 13.25 1.5C13.2344 1.73438 13.1094 1.85937 12.875 1.875H6.875Z'
                    fill='#0F3554'
                  />
                )}
              </svg>
            }
            itemList={orderOptionList}
            selectedItem={
              orderOptionList.find((item) => item.id == selected.order).label
            }
            setSelectedItem={(values) => {
              setOrder({ order: values });
            }}
          />
        </Stack>
      </Popover>
    </Stack>
  );
}

const SortOptionsDropDown = ({
  itemList,
  setSelectedItem,
  selectedItem,
  icon,
}: {
  itemList: { id: string; label: string }[];
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
            {/* <svg
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
            </svg> */}
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
            borderRadius: 'none',
            borderColor: 'none',
            minWidth: '176px',
          },
        }}
      >
        <List sx={{ padding: 0 }}>
          {newFunction(itemList, id, setSelectedItem, handleClose)}
        </List>
      </Popover>
    </>
  );
};

export default SortComponent;
function newFunction(
  itemList: { id: string; label: string }[],
  id: string,
  // eslint-disable-next-line no-unused-vars
  setSelectedItem: (x: string) => void,
  handleClose: () => void,
) {
  return (
    <FilterDropdown
      isRemoveVisible={false}
      isResetVisible={false}
      slotOption={itemList.map((item) => {
        return (
          <ListItemButton
            key={item.id}
            onClick={() => {
              setSelectedItem(item.id);
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
              {capitalizeFirstLetter(item.label)}
            </Typography>
          </ListItemButton>
        );
      })}
      onClickReset={{
        onClick: () => {
          setSelectedItem(itemList[0].id);
        },
      }}
    />
  );
}
