import { type ReactNode, useState } from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { type isSectionsActive, type nestedType } from './sharedTypes';
import FilterButton from './UI/filterButton';
import { FilterOptions } from './UI/options';
import { nestedOptionMapper, setValueInNestedObject } from './utils';

export type FilterNestedType = {
  name: string;
  icon?: ReactNode;
  options: nestedType<string[] | { id: string; label: string }[]>;
  value: nestedType<string[]>;
  sectionHeaders: string[];
  // eslint-disable-next-line no-unused-vars
  setValue: (value: nestedType<string[]>) => void;
  isVisible?: boolean;
  showCount?: boolean;
};

type NestedFilterPopoverType = {
  title: string;
  nestedItems: FilterNestedType['options'];
  selectedItems: FilterNestedType['value'];
  // eslint-disable-next-line no-unused-vars
  setSelectedItems: FilterNestedType['setValue'];
  sectionHeaders: string[];
  icon: ReactNode;
  showCount?: boolean;
};

export function NestedPopoverFilter({
  title,
  nestedItems,
  setSelectedItems,
  selectedItems,
  sectionHeaders,
  icon,
  showCount = false,
}: NestedFilterPopoverType) {
  const sectionsArray = nestedOptionMapper(
    sectionHeaders,
    nestedItems,
    selectedItems,
    showCount,
  );

  // const sectionsSelectedArray = Object.entries(selectedItems || {});

  const isSectionsActive = sectionsArray.reduce((acc, curr) => {
    const [key, , count] = curr;
    acc[String(key)] = count;
    return acc;
  }, {} as isSectionsActive);

  const isAnyActive =
    (Object.values(isSectionsActive) as number[]).reduce((a, b) => a + b, 0) >
    0;
  const [search, setSearch] = useState<number[]>([]);
  return (
    <>
      <FilterButton
        isActive={isAnyActive}
        isDotVisible={isAnyActive}
        slotLeftIcon={icon}
        text={title}
        showCaret={true}
        popover={
          <div className='flex flex-row'>
            {sectionsArray?.map(([section, optionList], i) => {
              const searchEnabled = search.includes(i);
              return (
                <>
                  <FilterOptions
                    optionList={optionList}
                    // @ts-ignore can't give a type to this
                    selectedItems={selectedItems?.[String(section)] || []}
                    filterSearch={searchEnabled}
                    searchPlaceholder={section}
                    setSearchOp={() => {
                      if (searchEnabled) {
                        setSearch(search.filter((item) => item !== i));
                      } else setSearch([...search, i]);
                    }}
                    setSelectedItems={(val, path) => {
                      const temp = setValueInNestedObject(
                        structuredClone(selectedItems),
                        path,
                        val,
                        nestedItems,
                      );
                      setSelectedItems(temp);
                    }}
                    sectionHeading={capitalizeFirstLetter(section)}
                    sectionReset={() => {
                      setSelectedItems({
                        ...selectedItems,
                        [section]: [],
                      });
                    }}
                    separator={i !== 0}
                    nested={true}
                  />
                </>
              );
            })}
          </div>
        }
        resetFilter={() => setSelectedItems([])}
      />
    </>
  );
}
