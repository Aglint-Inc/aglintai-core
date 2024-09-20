import { type ReactNode, useState } from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { type dynamicOptionsTypes } from './sharedTypes';
import FilterButton from './UI/filterButton';
import { FilterOptions } from './UI/options';

export type MultiSectionFilterType = {
  name: string;
  icon?: ReactNode;
  options: { [section: string]: dynamicOptionsTypes };
  value: { [section: string]: string[] };
  // eslint-disable-next-line no-unused-vars
  setValue: (value: { [section: string]: string[] }) => void;
  isVisible?: boolean;
};

type MultiSectionPopoverFilterType = {
  title: string;
  itemListSections: MultiSectionFilterType['options'];
  selectedItems: MultiSectionFilterType['value'];
  // eslint-disable-next-line no-unused-vars
  setSelectedItems: MultiSectionFilterType['setValue'];
  icon: ReactNode;
};

type isSectionsActive = {
  // eslint-disable-next-line no-unused-vars
  [K: string]: number;
};

export default function MultiSectionPopoverFilter({
  title,
  itemListSections,
  setSelectedItems,
  selectedItems,
  icon,
}: MultiSectionPopoverFilterType) {
  const sectionsArray = Object.entries(itemListSections);
  const sectionsSelectedArray = Object.entries(selectedItems || {});

  const isSectionsActive = sectionsSelectedArray.reduce((acc, curr) => {
    const [key, val] = curr;
    acc[String(key)] = val.length;
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
                <FilterOptions
                  key={i}
                  optionList={optionList}
                  selectedItems={selectedItems?.[String(section)] || []}
                  filterSearch={searchEnabled}
                  searchPlaceholder={section[i]}
                  setSearchOp={() => {
                    if (searchEnabled) {
                      setSearch(search.filter((item) => item !== i));
                    } else setSearch([...search, i]);
                  }}
                  setSelectedItems={(val) => {
                    let temp = [...selectedItems[String(section)]];
                    if (temp.includes(val)) {
                      temp = temp.filter((innerEle) => innerEle !== val);
                    } else {
                      temp.push(val);
                    }
                    setSelectedItems({
                      ...selectedItems,
                      [section]: temp,
                    });
                  }}
                  sectionHeading={capitalizeFirstLetter(section)}
                  separator={i !== 0}
                  nested={false}
                />
              );
            })}
          </div>
        }
        resetFilter={() =>
          setSelectedItems(
            sectionsArray.reduce(
              (acc, curr) => {
                acc[curr[0]] = [];
                return acc;
              },
              {} as typeof selectedItems,
            ),
          )
        }
      />
    </>
  );
}
