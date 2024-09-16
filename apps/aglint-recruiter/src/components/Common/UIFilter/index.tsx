import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { ChevronDown, ChevronUp, Repeat, Search } from 'lucide-react';
import React from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

export type dynamicOptionsTypes =
  | string[]
  | { id: string; label: string }[]
  | { header: string; options: { id: string; label: string }[] }[]
  | {
      header: string;
      path: string[];
      options: { id: string; label: string }[];
    }[];

interface ButtonFilterInterface {
  isActive: boolean;
  isDotVisible: boolean;
  textLabel: string;
  slotLeftIcon?: React.ReactNode;
  slotRightIcon?: React.ReactNode;
  options: React.ReactNode;
  showCaret?: boolean;
  caretPosition?: 'left' | 'right';
  resetFilter?: () => void;
}

export default function UIFilter({
  textLabel,
  isActive,
  isDotVisible,
  slotLeftIcon,
  slotRightIcon,
  options,
  showCaret = false,
  caretPosition = 'right',
  resetFilter,
}: ButtonFilterInterface) {
  const [caret, setCaret] = React.useState<boolean>(false);
  const Caret = showCaret ? (
    caret ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    )
  ) : (
    <></>
  );
  return (
    <Popover
      onOpenChange={() => {
        showCaret && setCaret(!caret);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant='outline' className='relative'>
          <div className='flex row gap-2 items-center'>
            {caretPosition === 'left' && Caret}
            {slotLeftIcon ? slotLeftIcon : false}
            {textLabel}
            {slotRightIcon ? slotRightIcon : false}
            {caretPosition === 'right' && Caret}
          </div>
          {isDotVisible && isActive && (
            <span className='absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-1 w-max'>
        {options}
        <Button
          variant='ghost'
          className='gap-1 justify-start'
          onClick={resetFilter}
        >
          <Repeat size={15} /> <p>Reset</p>
        </Button>
      </PopoverContent>
    </Popover>
  );
}

type FilterOptionsType = {
  selectedItems: string[];
  searchFilter: boolean;
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
);

export function FilterOptions({
  selectedItems,
  optionList,
  searchFilter,
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
            if (searchFilter) {
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
        <div className='px-2 border-b flex flex-row justify-between items-center'>
          <Label className='font-bold text-base'>{sectionHeading}</Label>
          <div className='flex row items-center'>
            <Button variant='ghost' className='px-3' onClick={setSearchOp}>
              <Search size={14} />
            </Button>
            {/* <Button variant='ghost' className='px-3' onClick={sectionReset}>
              <Repeat size={14} />
            </Button> */}
          </div>
        </div>
      )}
      {Boolean(searchFilter) && (
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
      <div className='max-h-[300px] overflow-auto'>
        {filtered.length > 0 ? (
          filtered.map((optionList, i) => (
            <div key={`OPS_${i}`}>
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
        className='flex items-center space-x-2 group hover:bg-muted p-2 rounded-md transition-colors'
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
          onCheckedChange={() => setSelectedItems(option.id, path)}
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
              <RadioGroupItem
                value={option.id}
                id={option.id}
                // className='group-hover:border-primary'
              />
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
