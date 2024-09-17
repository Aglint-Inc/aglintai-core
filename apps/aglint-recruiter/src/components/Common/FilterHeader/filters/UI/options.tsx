import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Search } from 'lucide-react';
import React from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { type dynamicOptionsTypes } from '../sharedTypes';

type FilterOptionsType = {
  selectedItems: string[];
  filterSearch?: boolean;
  searchPlaceholder?: string;
  multiSelect?: boolean;
  separator?: boolean;
  sectionHeading?: string;
  sectionReset?: () => void;
  setSearchOp?: () => void;
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
      nested?: true;
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
);

export function FilterOptions({
  selectedItems,
  optionList,
  filterSearch = false,
  searchPlaceholder,
  setSelectedItems,
  nested = false,
  multiSelect = true,
  separator = false,
  sectionHeading,
  // eslint-disable-next-line no-unused-vars
  sectionReset,
  setSearchOp,
}: FilterOptionsType) {
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
        // @ts-expect-error
        .map(({ header, path, options }) => {
          return {
            header,
            path: path || [],
            options: options.map((item) => {
              return {
                ...item,
                label: capitalizeFirstLetter(item.label || ''),
              };
            }),
          };
        })
    : [];

  const filtered =
    filteredOptions[0].options.length > 0
      ? filteredOptions
          ?.map((optionList) => {
            let filteredOp = optionList.options;
            if (filterSearch) {
              filteredOp = optionList.options.filter((item) =>
                item.label.toLowerCase().includes(search.toLowerCase()),
              );
            }
            return { ...optionList, options: filteredOp };
          })
          .filter((item) => item.options?.length)
      : [];
  return (
    <div
      className={`max-h-[280px] flex flex-col gap-1 min-w-56 ${separator && 'border-l'} border-b`}
    >
      {sectionHeading && (
        <div className='px-2 py-1  border-b flex flex-row justify-between items-center'>
          <Label className='font-bold text-base'>{sectionHeading}</Label>
          <div className='flex row items-center'>
            <Button
              variant='ghost'
              className='px-3'
              size='sm'
              onClick={setSearchOp}
            >
              <Search size={14} />
            </Button>
            {/* <Button variant='ghost' className='px-3' onClick={sectionReset}>
              <Repeat size={14} />
            </Button> */}
          </div>
        </div>
      )}
      {Boolean(filterSearch) && (
        <div className='w-full p-1 '>
          <Input
            className='w-full border rounded p-1 pl-2 transition-colors duration-200'
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </div>
      )}
      <div className='max-h-[300px] p-1 overflow-auto'>
        {filtered.length > 0 ? (
          filtered.map((optionList, i) => (
            <div key={`OPS_${optionList.header}${i}`}>
              {Boolean(optionList.header) && (
                <div className='pl-2 pt-1'>
                  <Label className='font-bold'>{optionList.header}</Label>
                </div>
              )}
              <FilterSubOptions
                filtered={optionList.options}
                multiSelect={multiSelect}
                selectedItems={selectedItems}
                path={optionList.path}
                setSelectedItems={setSelectedItems}
                nested={nested}
              />
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center h-[150px]'>
            <p className='text-sm text-gray-500'>
              No {sectionHeading || 'Options'} found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSubOptions({
  filtered,
  multiSelect,
  selectedItems,
  setSelectedItems,
  path = [],
  nested,
}: {
  filtered: {
    label: any;
    id: string;
  }[];
  path: string[];
  setSelectedItems: any;
  multiSelect: boolean;
  selectedItems: string[];
  nested: boolean;
}) {
  if (multiSelect) {
    return filtered.map((option) => (
      <div
        key={option.id}
        className='flex items-center space-x-2 group hover:bg-muted p-2 rounded-md transition-colors cursor-pointer'
        onClick={(e) => {
          e.preventDefault();
          setSelectedItems(option.id, path);
        }}
      >
        <Checkbox
          id='terms'
          // className='group-hover:border-primary'
          checked={
            nested
              ? (option as { status?: string }).status === 'active'
                ? true
                : (option as { status?: string }).status === 'partial'
                  ? 'indeterminate'
                  : false
              : selectedItems.includes(option.id)
          }
        />
        <label
          htmlFor='terms'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-primary cursor-pointer'
        >
          {option.label}
        </label>
      </div>
    ));
  } else {
    return (
      <RadioGroup
        value={selectedItems[0]}
        onValueChange={(id) => setSelectedItems(id, path)}
        className='flex group flex-col gap-2 '
      >
        {filtered.map((option) => {
          return (
            <div
              key={option.id}
              className='flex items-center space-x-2 hover:bg-muted p-2 rounded-md transition-colors w-full'
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className='w-full cursor-pointer'>
                {option.label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    );
  }
}
