import { Checkbox } from '@components/ui/checkbox';
import { ButtonFilter } from '@devlink2/ButtonFilter';
import { FilterDropdown } from '@devlink2/FilterDropdown';
import { ChevronDown, Info } from 'lucide-react';
import React, { type ReactNode } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { capitalizeAll, capitalizeFirstLetter } from '@/utils/text/textUtils';
type ItemType = string;

function FilterDropDown({
  title,
  itemList,
  setSelectedItems,
  selectedItems,
  icon,
}: {
  title: string;
  itemList: any[];
  selectedItems: ItemType[];
  setSelectedItems: any;
  icon: ReactNode;
  iconname?: string;
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

  return (
    <>
      <ButtonFilter
        isActive={Boolean(selectedItems.length)}
        isDotVisible={Boolean(selectedItems.length)}
        slotLeftIcon={<div className='flex flex-col'>{icon}</div>}
        onClickStatus={{
          onClick: handleClick,
        }}
        textLabel={title}
        slotRightIcon={
          <div className='flex flex-col'>
            <ChevronDown
              size={20}
              className={`${anchorEl ? 'rotate-180' : ''}`}
            />
          </div>
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
      >
        <FilterDropdown
          isRemoveVisible={false}
          isResetVisible={itemList.length !== 0}
          slotOption={
            itemList.length ? (
              itemList?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className='flex cursor-pointer flex-col items-center rounded-md p-2 px-3 hover:bg-neutral-100'
                  >
                    <Checkbox
                      checked={selectedItems.includes(item)}
                      onClick={() => {
                        if (selectedItems.includes(item)) {
                          setSelectedItems((ele: ItemType[]) =>
                            ele.filter(
                              (innerEle: ItemType) => innerEle !== item,
                            ),
                          );
                        } else {
                          setSelectedItems((ele: ItemType[]) => [...ele, item]);
                        }
                      }}
                    />
                    <span
                      className='cursor-pointer text-sm'
                      onClick={() => {
                        if (selectedItems.includes(item)) {
                          setSelectedItems((ele: ItemType[]) =>
                            ele.filter(
                              (innerEle: ItemType) => innerEle !== item,
                            ),
                          );
                        } else {
                          setSelectedItems((ele: ItemType[]) => [...ele, item]);
                        }
                      }}
                    >
                      {capitalizeFirstLetter(item)}
                    </span>
                  </div>
                );
              })
            ) : (
              <GlobalEmpty
                text={`No ${capitalizeAll(title)}`}
                iconSlot={<Info className='text-gray-500' />}
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
}

export default FilterDropDown;
