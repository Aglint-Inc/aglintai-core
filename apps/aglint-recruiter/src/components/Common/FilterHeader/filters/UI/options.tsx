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
    filteredOptions?.[0]?.options.length > 0
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
      className={`flex max-h-[280px] min-w-56 flex-col gap-1 ${separator && 'border-l'} border-b`}
    >
      {sectionHeading && (
        <div className='flex flex-row items-center justify-between border-b px-2 py-1'>
          <Label className='text-base font-bold'>{sectionHeading}</Label>
          <div className='row flex items-center'>
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
        <div className='w-full p-1'>
          <Input
            className='w-full rounded border p-1 pl-2 transition-colors duration-200'
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </div>
      )}
      <div className='max-h-[300px] overflow-auto p-1'>
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
          <div className='flex h-[150px] flex-col items-center justify-center'>
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
        className='group flex cursor-pointer items-center space-x-2 rounded-md p-2 transition-colors hover:bg-muted'
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
          className='cursor-pointer text-sm font-medium leading-none group-hover:text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
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
        className='group flex flex-col gap-2'
      >
        {filtered.map((option) => {
          return (
            <div
              key={option.id}
              className='flex w-full items-center space-x-2 rounded-md p-2 transition-colors hover:bg-muted'
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
