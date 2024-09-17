import { type ReactNode } from 'react';

import { type dynamicOptionsTypes } from './sharedTypes';
import FilterButton from './UI/filterButton';
// import FilterButton from '../../UIFilter';
import Loader from './UI/loader';
import { FilterOptions } from './UI/options';

export type SimplePopoverFilterType = {
  name: string;
  icon?: ReactNode;
  options: dynamicOptionsTypes;
  value: string[];
  filterSearch?: boolean;
  searchPlaceholder?: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string[]) => void;
  isVisible?: boolean;
  multiSelect?: boolean;
  loading?: boolean;
};

export function SimplePopoverFilter({
  name: title,
  options: itemList,
  setValue: setSelectedItems,
  value: selectedItems,
  filterSearch = false,
  searchPlaceholder = '',
  multiSelect = true,
  icon,
  loading = false,
}: SimplePopoverFilterType) {
  return (
    <>
      <FilterButton
        isActive={Boolean(selectedItems.length)}
        isDotVisible={Boolean(selectedItems.length)}
        slotLeftIcon={icon}
        // isDotVisible={filter.job_ids.length > 0}
        text={title}
        showCaret
        resetFilter={() => setSelectedItems([])}
        popover={
          loading ? (
            <Loader />
          ) : (
            <FilterOptions
              optionList={itemList}
              selectedItems={selectedItems}
              filterSearch={filterSearch}
              searchPlaceholder={searchPlaceholder}
              multiSelect={multiSelect}
              setSelectedItems={(val) => {
                if (multiSelect) {
                  let temp = [...selectedItems];
                  if (temp.includes(val)) {
                    temp = temp.filter((innerEle) => innerEle !== val);
                  } else {
                    temp.push(val);
                  }
                  setSelectedItems(temp);
                } else {
                  setSelectedItems([val]);
                }
              }}
              nested={false}
            />
          )
        }
      />
    </>
  );
}
