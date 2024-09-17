import { Checkbox } from '@components/ui/checkbox';
import { ButtonFilter } from '@devlink2/ButtonFilter';
import { FilterDropdown } from '@devlink2/FilterDropdown';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import React from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { capitalizeAll, capitalizeFirstLetter } from '@/utils/text/textUtils';

export const Filter = ({
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
      <div className='flex min-w-[100px] flex-col'>
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
            <div className='flex flex-col'>
              {anchorEl ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          }
        />
      </div>

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
            itemList?.length ? (
              itemList?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`flex min-w-[120px] cursor-pointer select-none flex-col items-center rounded-md p-2 ${
                      isSingle && selectedItems === item.value
                        ? 'bg-neutral-100'
                        : ''
                    } hover:bg-neutral-100`}
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
                    {!isSingle && (
                      <Checkbox checked={selectedItems.includes(item.value)} />
                    )}
                    <span className='text-sm'>
                      {capitalizeFirstLetter(item.name)}
                    </span>
                  </div>
                );
              })
            ) : (
              <GlobalEmpty
                iconSlot={<Plus />}
                text={`No ${capitalizeAll(title)}`}
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
