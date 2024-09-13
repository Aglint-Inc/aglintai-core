import { Checkbox } from '@components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { ScrollArea } from '@components/ui/scroll-area';
import { ButtonFilter } from '@devlink2/ButtonFilter';
import { FilterDropdown } from '@devlink2/FilterDropdown';
import { ChevronDown } from 'lucide-react';
import React from 'react';

import { useAllDepartments } from '@/queries/departments';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { setDepartments, useFilterModuleStore } from '../../filter-store';

function FilterDepartment() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const departments = useFilterModuleStore((state) => state.departments);
  const query = useAllDepartments();

  const allDepartments = query?.data || [];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const open = Boolean(anchorEl);
  // const id = open ? 'filter-status' : undefined;

  const handleFilterClick = (
    item: ReturnType<typeof useAllDepartments>['data'][0],
  ) => {
    if (departments.some((id) => id === item.id)) {
      setDepartments(departments.filter((id) => id != item.id));
    } else {
      setDepartments([...departments, item.id]);
    }
  };

  const renderStatus = (
    item: ReturnType<typeof useAllDepartments>['data'][0],
  ) => {
    return (
      <div className='flex items-center hover:bg-neutral-2 rounded-[var(--radius-2)] p-[var(--space-2)_var(--space-3)] mt-0 space-x-1'>
        <Checkbox
          checked={!!departments.find((id) => id === item.id)}
          onCheckedChange={() => handleFilterClick(item)}
        />
        <span
          key={item.id}
          className='text-sm cursor-pointer'
          onClick={() => handleFilterClick(item)}
        >
          {capitalizeFirstLetter(item.name)}
        </span>
      </div>
    );
  };

  return (
    <>
      <ButtonFilter
        isActive={departments.length > 0}
        isDotVisible={departments.length > 0}
        onClickStatus={{
          id: 'department' + 'click',
          onClick: handleClick,
          style: {
            whiteSpace: 'nowrap',
            height: '100%',
          },
        }}
        textLabel={'Department'}
        slotRightIcon={
          <ChevronDown
            size={16}
            color={'var(--neutral-2)'}
            className={anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          />
        }
      />

      <Popover>
        <PopoverTrigger asChild>
          <ButtonFilter
            isActive={departments.length > 0}
            isDotVisible={departments.length > 0}
            onClickStatus={{
              id: 'department' + 'click',
              onClick: handleClick,
              style: {
                whiteSpace: 'nowrap',
                height: '100%',
              },
            }}
            textLabel={'Department'}
            slotRightIcon={
              <ChevronDown
                size={16}
                color={'var(--neutral-2)'}
                className={open ? 'rotate-180 transform' : ''}
              />
            }
          />
        </PopoverTrigger>
        <PopoverContent className='w-[176px] p-0' align='start' sideOffset={5}>
          <FilterDropdown
            slotOption={
              <ScrollArea className='h-[50vh]'>
                <div className='space-y-1.5 p-2'>
                  {allDepartments.map((item) => renderStatus(item))}
                </div>
              </ScrollArea>
            }
            isRemoveVisible={false}
            onClickReset={{
              onClick: () => {
                setDepartments([]);
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default FilterDepartment;
