import { Button, InputAdornment, Popover, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { capitalize } from 'lodash';
import React, { ReactNode } from 'react';

import { Checkbox } from '@/devlink';
import { ButtonFilter, FilterDropdown } from '@/devlink2';
import Icon from '@/src/components/Common/Icons/Icon';
import UITextField from '@/src/components/Common/UITextField';

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
  return (
    <Stack direction={'row'} gap={1} px={2}>
      {Boolean(search) && (
        <Stack marginRight={5}>
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

  const options = (
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
          slotOption={options?.map((optionList) => {
            return (
              <>
                {optionList.header && (
                  <Typography>{optionList.header}</Typography>
                )}
                {optionList.options.map(({ id, label }) => {
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
                        {capitalize(label)}
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
