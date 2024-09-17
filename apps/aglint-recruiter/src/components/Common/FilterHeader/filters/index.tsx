import { Switch } from '@components/ui/switch';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { AddFilterComp } from './addFilter';
import MultiSectionPopoverFilter, {
  type MultiSectionFilterType,
} from './multiSectionPopoverFilter';
import {
  type FilterNestedType,
  NestedPopoverFilter,
} from './nestedPopoverFilter';
import {
  SimplePopoverFilter,
  type SimplePopoverFilterType,
} from './simplePopoverFilter';
import FilterButton from './UI/filterButton';

export type FiltersTypes =
  | ({
      type: 'filter';
    } & SimplePopoverFilterType)
  | ({
      type: 'multi-section-filter';
    } & MultiSectionFilterType)
  | ({
      type: 'nested-filter';
    } & FilterNestedType)
  | {
      type: 'button';
      name: string;
      onClick: () => void;
      isActive: boolean;
      isVisible?: boolean;
    };
type showFilterMapperType<T> = T extends { name: infer N } ? N : never;

export function Filters({
  filters: tempFilters,
  showFilters,
  setShowFilters = (names) => {
    names;
  },
}: {
  filters: FiltersTypes[];
  showFilters?: showFilterMapperType<FiltersTypes>[];
  // eslint-disable-next-line no-unused-vars
  setShowFilters?: (names: string[]) => void;
}) {
  const filters = !showFilters
    ? tempFilters?.map((filter) => {
        filter.isVisible = true;
        return filter;
      })
    : tempFilters?.map((filter) => {
        filter.isVisible = showFilters.includes(filter.name);
        return filter;
      });

  function handelSetVisible(index: number) {
    const tempSF = [...showFilters];
    tempSF.push(tempFilters[Number(index)].name);
    setShowFilters(tempSF);
  }

  return (
    <>
      {filters
        .filter((item) => {
          return item.isVisible;
        })
        .map((filter, index) => FilterSwitcher(filter, index))}

      {Boolean(showFilters) && (
        <AddFilterComp
          // @ts-ignore
          filters={filters
            .map((item, index) => ({
              label: item.name,
              id: index,
              isVisible: item.isVisible,
            }))
            .filter((item) => !item.isVisible)}
          setVisible={handelSetVisible}
        />
      )}
    </>
  );
}

function FilterSwitcher(filter: FiltersTypes, index: number) {
  switch (filter.type) {
    case 'filter':
      return (
        <SimplePopoverFilter
          key={index}
          name={capitalizeFirstLetter(filter.name || '')}
          searchPlaceholder={filter.searchPlaceholder}
          options={filter.options}
          filterSearch={filter.filterSearch}
          value={filter.value}
          setValue={(values) => {
            filter.setValue(values);
          }}
          icon={filter.icon}
          multiSelect={filter.multiSelect}
          loading={filter.loading}
        />
      );
    case 'multi-section-filter': {
      return (
        <MultiSectionPopoverFilter
          key={index}
          title={capitalizeFirstLetter(filter.name || '')}
          itemListSections={filter.options}
          selectedItems={filter.value}
          setSelectedItems={(values) => {
            filter.setValue(values);
          }}
          icon={filter.icon}
        />
      );
    }
    case 'nested-filter': {
      return (
        <NestedPopoverFilter
          key={index}
          title={capitalizeFirstLetter(filter.name || '')}
          nestedItems={filter.options}
          selectedItems={filter.value}
          sectionHeaders={filter.sectionHeaders}
          setSelectedItems={(values) => {
            filter.setValue(values);
          }}
          icon={filter.icon}
          showCount={filter.showCount}
        />
      );
    }
    case 'button':
      return (
        <FilterButton
          key={index}
          isActive={filter.isActive}
          isDotVisible={false}
          slotLeftIcon={
            <div className='pointer-events-none'>
              <Switch checked={filter.isActive} />
            </div>
          }
          text={capitalizeFirstLetter(filter.name || '')}
          onClick={() => filter.onClick()}
          popover={<></>}
          type='button'
        />
      );
  }
}
