import {
  Checkbox,
  List,
  ListItemButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import React, { ReactNode } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { AddFilter } from '@/devlink2/AddFilter';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { FilterItem } from '@/devlink3/FilterItem';
import { MultiFilterLayout } from '@/devlink3/MultiFilterLayout';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import UITextField from '../UITextField';
import {
  nestedOptionMapper,
  nestedType,
  setValueInNestedObject,
} from './utils';

/* eslint-disable no-unused-vars */

type dynamicOptionsTypes =
  | string[]
  | { id: string; label: string }[]
  | { header: string; options: { id: string; label: string }[] }[]
  | {
      header: string;
      path: string[];
      options: { id: string; label: string }[];
    }[];

type FilterMultiSectionFilterType = {
  name: string;
  icon?: ReactNode;
  options: { [section: string]: dynamicOptionsTypes };
  value: { [section: string]: string[] };
  setValue: (value: { [section: string]: string[] }) => void;
  isVisible?: boolean;
};
type FilterNestedType = {
  name: string;
  icon?: ReactNode;
  options: nestedType<string[]>;
  value: nestedType<string[]>;
  sectionHeaders: string[];
  setValue: (value: nestedType<string[]>) => void;
  isVisible?: boolean;
};

export type FilterComponentType = {
  name: string;
  icon?: ReactNode;
  options: dynamicOptionsTypes;
  value: string[];
  filterSearch?: boolean;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string[]) => void;
  isVisible?: boolean;
};
/* eslint-enable no-unused-vars */
export type FilterTypes =
  | ({
      type: 'filter';
    } & FilterComponentType)
  | ({
      type: 'multi-section-filter';
    } & FilterMultiSectionFilterType)
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

export function FiltersComponent({
  filters: tempFilters,
  showFilters,
  setShowFilters = (names) => {
    names;
  },
}: {
  filters: FilterTypes[];
  showFilters?: showFilterMapperType<FilterTypes>[];
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
          filterList={filters
            .map((item, index) => ({
              name: item.name,
              index,
              isVisible: item.isVisible,
            }))
            .filter((item) => !item.isVisible)}
          setVisible={handelSetVisible}
        />
      )}
    </>
  );
}

function FilterSwitcher(filter: FilterTypes, index: number) {
  switch (filter.type) {
    case 'filter':
      return (
        <FilterComponent
          key={index}
          name={capitalizeFirstLetter(filter.name || '')}
          options={filter.options}
          value={filter.value}
          setValue={(values) => {
            filter.setValue(values);
          }}
          icon={filter.icon}
        />
      );
    case 'multi-section-filter': {
      return (
        <MultiSectionFilterComponent
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
        <NestedFilterComponent
          key={index}
          title={capitalizeFirstLetter(filter.name || '')}
          nestedItems={filter.options}
          selectedItems={filter.value}
          sectionHeaders={filter.sectionHeaders}
          setSelectedItems={(values) => {
            filter.setValue(values);
          }}
          icon={filter.icon}
        />
      );
    }
    case 'button':
      return (
        <ButtonFilter
          key={index}
          isActive={filter.isActive}
          isDotVisible={filter.isActive}
          textLabel={capitalizeFirstLetter(filter.name || '')}
          onClickStatus={{ onClick: () => filter.onClick() }}
        />
      );
  }
}

export function FilterComponent({
  name: title,
  options: itemList,
  setValue: setSelectedItems,
  value: selectedItems,
  filterSearch = false,
  icon,
}: FilterComponentType) {
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
        slotLeftIcon={<Stack>{icon}</Stack>}
        // isDotVisible={filter.job_ids.length > 0}
        onClickStatus={{
          onClick: handleClick,
        }}
        textLabel={title}
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
            borderRadius: 'var(--radius-2)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
            backgroundColor:'white'
          },
        }}
      >
        <FilterDropdown
          isRemoveVisible={false}
          slotOption={
            <FilterOptionsList
              optionList={itemList}
              selectedItems={selectedItems}
              searchFilter={filterSearch}
              setSelectedItems={(val) => {
                let temp = [...selectedItems];
                if (temp.includes(val)) {
                  temp = temp.filter((innerEle) => innerEle !== val);
                } else {
                  temp.push(val);
                }
                setSelectedItems(temp);
              }}
              nested={false}
            />
          }
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

export type MultiSectionFilterComponentType = {
  title: string;
  itemListSections: FilterMultiSectionFilterType['options'];
  selectedItems: FilterMultiSectionFilterType['value'];
  // eslint-disable-next-line no-unused-vars
  setSelectedItems: FilterMultiSectionFilterType['setValue'];
  icon: ReactNode;
};

type isSectionsActive = {
  // eslint-disable-next-line no-unused-vars
  [K: string]: number;
};
function MultiSectionFilterComponent({
  title,
  itemListSections,
  setSelectedItems,
  selectedItems,
  icon,
}: MultiSectionFilterComponentType) {
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
  const [search, setSearch] = React.useState<number[]>([]);
  return (
    <>
      <ButtonFilter
        isActive={isAnyActive}
        isDotVisible={isAnyActive}
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
          },
        }}
      >
        <MultiFilterLayout
          slotFilterItem={sectionsArray?.map(([section, optionList], i) => {
            const searchEnabled = search.includes(i);
            return (
              <FilterItem
                key={section}
                textFilterHeading={capitalizeFirstLetter(section)}
                textCount={isSectionsActive[String(section)]}
                isCountVisible={Boolean(isSectionsActive[String(section)])}
                onClickSearch={{
                  onClick: () => {
                    if (searchEnabled) {
                      setSearch(search.filter((item) => item !== i));
                    } else setSearch([...search, i]);
                  },
                }}
                onClickRefresh={{
                  onClick: () => {
                    setSelectedItems({
                      ...selectedItems,
                      [section]: [],
                    });
                  },
                }}
                slotItems={
                  <Stack p={2} gap={2}>
                    <FilterOptionsList
                      optionList={optionList}
                      selectedItems={selectedItems?.[String(section)] || []}
                      searchFilter={searchEnabled}
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
                      nested={false}
                    />
                  </Stack>
                }
              />
            );
          })}
          onClickReset={{
            onClick: () => {
              setSelectedItems(
                sectionsArray.reduce(
                  (acc, curr) => {
                    acc[curr[0]] = [];
                    return acc;
                  },
                  {} as typeof selectedItems,
                ),
              );
            },
          }}
        />
      </Popover>
    </>
  );
}

export type NestedFilterComponentType = {
  title: string;
  nestedItems: FilterNestedType['options'];
  selectedItems: FilterNestedType['value'];
  // eslint-disable-next-line no-unused-vars
  setSelectedItems: FilterNestedType['setValue'];
  sectionHeaders: string[];
  icon: ReactNode;
};

function NestedFilterComponent({
  title,
  nestedItems,
  setSelectedItems,
  selectedItems,
  sectionHeaders,
  icon,
}: NestedFilterComponentType) {
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

  const sectionsArray = nestedOptionMapper(
    sectionHeaders,
    nestedItems,
    selectedItems,
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
  const [search, setSearch] = React.useState<number[]>([]);
  return (
    <>
      <ButtonFilter
        isActive={isAnyActive}
        isDotVisible={isAnyActive}
        slotLeftIcon={<Stack>{icon}</Stack>}
        // isDotVisible={filter.job_ids.length > 0}
        onClickStatus={{
          onClick: handleClick,
        }}
        textLabel={title}
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
            borderRadius: 'var(--radius-2)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
          },
        }}
      >
        <MultiFilterLayout
          slotFilterItem={sectionsArray?.map(([section, optionList], i) => {
            const searchEnabled = search.includes(i);
            return (
              <FilterItem
                key={section}
                textFilterHeading={capitalizeFirstLetter(section)}
                textCount={isSectionsActive[String(section)]}
                isCountVisible={Boolean(isSectionsActive[String(section)])}
                onClickSearch={{
                  onClick: () => {
                    if (searchEnabled) {
                      setSearch(search.filter((item) => item !== i));
                    } else setSearch([...search, i]);
                  },
                }}
                onClickRefresh={{
                  onClick: () => {
                    // setSelectedItems({
                    //   ...selectedItems,
                    //   [section]: [],
                    // });
                  },
                }}
                slotItems={
                  <Stack p={2} gap={2}>
                    <FilterOptionsList
                      optionList={optionList}
                      // selectedItems={selectedItems?.[String(section)] || []}
                      selectedItems={[]}
                      searchFilter={searchEnabled}
                      setSelectedItems={(val, path) => {
                        // console.log(
                        //   structuredClone(selectedItems),
                        //   'selectedItems',
                        // );
                        const temp = setValueInNestedObject(
                          structuredClone(selectedItems),
                          path,
                          val,
                          nestedItems,
                        );
                        setSelectedItems(temp);
                      }}
                      nested={true}
                    />
                  </Stack>
                }
              />
            );
          })}
          onClickReset={{
            onClick: () => {
              // setSelectedItems(
              //   sectionsArray.reduce(
              //     (acc, curr) => {
              //       acc[curr[0]] = [];
              //       return acc;
              //     },
              //     {} as typeof selectedItems,
              //   ),
              // );
            },
          }}
        />
      </Popover>
    </>
  );
}

function FilterOptionsList({
  selectedItems,
  optionList,
  searchFilter,
  setSelectedItems,
  nested = false,
}: {
  selectedItems: string[];
  searchFilter: boolean;
} & (
  | {
      // eslint-disable-next-line no-unused-vars
      setSelectedItems: (options: string) => void;
      nested: false;
      optionList: dynamicOptionsTypes;
    }
  | {
      // eslint-disable-next-line no-unused-vars
      setSelectedItems: (options: string, path: string[]) => void;
      nested: true;
      optionList: {
        header: string;
        path: string[];
        options: {
          id: string;
          status: 'active' | 'partial' | 'inactive';
          label: string;
        }[];
      }[];
    }
)) {
  const [search, setSearch] = React.useState('');
  const filteredOptions = optionList?.[0]
    ? (
        (typeof optionList[0] === 'object'
          ? 'header' in optionList[0]
            ? optionList
            : [{ header: null, options: optionList }]
          : [
              {
                header: null,
                options: optionList.map((item) => ({
                  id: item,
                  label: item,
                })),
              },
            ]) as {
          header: string | null;
          options: { id: string; label: string }[];
        }[]
      )
        // @ts-ignore
        .map(({ header, path, options }) => {
          return {
            header,
            path: path || [],
            options: options.map((item) => ({
              ...item,
              label: capitalizeFirstLetter(item.label),
            })),
          };
        })
    : [];

  return (
    <>
      {Boolean(searchFilter) && (
        <UITextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      {filteredOptions
        ?.map((optionList) => {
          let filteredOp = optionList.options;
          if (searchFilter) {
            filteredOp = optionList.options.filter((item) =>
              item.label.toLowerCase().includes(search.toLowerCase()),
            );
          }
          return { ...optionList, options: filteredOp };
        })
        .filter((item) => item.options?.length)
        .map((optionList) => {
          let filteredOp = optionList.options;
          return (
            <>
              {optionList.header && (
                <Typography>{optionList.header}</Typography>
              )}
              {filteredOp.map((option) => {
                return (
                  <Stack
                    key={option.id}
                    direction={'row'}
                    sx={{ alignItems: 'center' }}
                    spacing={1}
                    onClick={() => {
                      setSelectedItems(option.id, optionList.path || []);
                    }}
                  >
                    <Checkbox
                      checked={
                        nested
                          ? // @ts-ignore
                            option.status === 'active'
                          : selectedItems.includes(option.id)
                      }
                      // @ts-ignore
                      indeterminate={nested && option.status === 'partial'}
                    />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Stack>
                );
              })}
            </>
          );
        })}
    </>
  );
}

function AddFilterComp({
  filterList,
  setVisible,
}: {
  filterList: { name: string; index }[];
  // eslint-disable-next-line no-unused-vars
  setVisible: (index: number) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'add-filter' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AddFilter
        onClickAddFilter={{
          style: {
            'align-items': 'center',
          },
          onClick: (e) => {
            handleClick(e);
          },
        }}
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
            border: 'none',
          },
        }}
      >
        <Stack direction={'column'}>
          {filterList.map((item, i) => {
            return (
              <List key={i}>
                <ListItemButton onClick={() => setVisible(item.index)}>
                  {capitalizeFirstLetter(item.name)}
                </ListItemButton>
              </List>
            );
          })}
        </Stack>
      </Popover>
    </>
  );
}
