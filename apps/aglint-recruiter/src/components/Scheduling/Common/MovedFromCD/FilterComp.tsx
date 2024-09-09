import { ButtonGhost } from '@devlink/ButtonGhost';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { Filter } from '@devlink/Filter';
import { FilterButton } from '@devlink/FilterButton';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import UISelect from '../../../Common/UISelectDropDown';
import UITextField from '../../../Common/UITextField';
import { Button } from '@components/ui/button';
import { Popover } from '@components/ui/popover';
import { X } from 'lucide-react';

type FilterType = {
  id: string;
  label: 'Name' | 'Location' | 'Current Job Title';
  type: 'name' | 'location' | 'job_role';
  comparision_type: 'equals';
  filterVal: string;
};

const FilterComp = () => {
  const [anchorlEl, setAnchorEl] = useState(null);

  const [ApplyButtonDisable, setApplyButtonDisable] = useState(false);
  const [filters, setFilters] = useState<FilterType[]>([
    {
      id: nanoid(),
      type: 'location',
      comparision_type: 'equals',
      filterVal: '',
      label: 'Location',
    },
  ]);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { location, name, job_role } = router.query;
    const qryFilters: FilterType[] = [];
    if (typeof location === 'string') {
      qryFilters.push({
        type: 'location',
        comparision_type: 'equals',
        filterVal: location,
        id: nanoid(),
        label: 'Location',
      });
    }

    if (typeof name === 'string') {
      qryFilters.push({
        type: 'name',
        comparision_type: 'equals',
        filterVal: name,
        id: nanoid(),
        label: 'Name',
      });
    }

    if (typeof job_role === 'string') {
      qryFilters.push({
        type: 'job_role',
        comparision_type: 'equals',
        filterVal: job_role,
        id: nanoid(),
        label: 'Current Job Title',
      });
    }
    setFilters(qryFilters);
  }, [router.isReady, router.query]);

  const handleApply = () => {
    if (filters.length == 0) router.push('/candidates?page_no=1');
    else
      router.push(
        `/candidates?page_no=1&${filters
          .map((f) => `${f.type}=${f.filterVal}`)
          .join('&')}`,
      );
    setAnchorEl(null);
  };

  const isSubmitDisabled = useMemo(() => {
    let isDisable = false;
    const filtCountType = {
      name: filters.reduce((acc, curr) => {
        if (curr.type === 'name') return acc + 1;
        return acc;
      }, 0),
      location: filters.reduce((acc, curr) => {
        if (curr.type === 'location') return acc + 1;
        return acc;
      }, 0),
      job_role: filters.reduce((acc, curr) => {
        if (curr.type === 'job_role') return acc + 1;
        return acc;
      }, 0),
    };
    if (
      filtCountType.job_role > 1 ||
      filtCountType.name > 1 ||
      filtCountType.location > 1 ||
      filters.filter((filter) => filter.filterVal.length === 0).length > 0
    ) {
      isDisable = true;
    }
    return isDisable;
  }, [filters]);

  useEffect(() => {
    if (filters.length === 0) {
      setApplyButtonDisable(true);
    } else setApplyButtonDisable(false);
  }, [anchorlEl]);

  useEffect(() => {
    setApplyButtonDisable(false);
  }, [filters]);

  return (
    <>
      <FilterButton
        onClickFilter={{
          onClick: (e) => {
            setAnchorEl(e.currentTarget);
          },
        }}
        textFilterCount={filters.length}
        isNotificationVisible={filters.length > 0}
      />
      <Popover
        open={Boolean(anchorlEl)}
        onOpenChange={(open) => {
          if (!open) setAnchorEl(null);
        }}
      >
        <Filter
          isFilterEmpty={filters.length == 0}
          slotButton={
            <>
              <ButtonGhost
                textButton='Add Filter'
                size={2}
                iconName='add'
                isLeftIcon
                onClickButton={{
                  onClick: () => {
                    const remainingFilters = allFilters.filter(
                      (alFil) => !filters.includes(alFil),
                    );
                    if (remainingFilters.length > 0 && filters.length < 3) {
                      setFilters((prev) => [...prev, remainingFilters[0]]);
                    }
                  },
                }}
              />
              <ButtonSolid
                textButton='Apply Filter'
                size={2}
                isDisabled={ApplyButtonDisable || isSubmitDisabled}
                onClickButton={{
                  onClick: () => {
                    handleApply();
                  },
                }}
              />
            </>
          }
          slotFilter={
            <>
              <div className='flex flex-col space-y-2'>
                {filters.map((filt, index) => {
                  return (
                    <FilterField
                      key={index}
                      filter={filt}
                      onChange={(f) => {
                        setFilters((p) => {
                          const upd = [...p];
                          upd[Number(index)] = f;
                          return upd;
                        });
                      }}
                      onCancel={() => {
                        const updatedFilters = filters.filter(
                          (f) => f.id !== filt.id,
                        );
                        setFilters(updatedFilters);
                      }}
                    />
                  );
                })}
              </div>
            </>
          }
          // onClickAddFilter={{
          //   onClick: () => {
          //     const remainingFilters = allFilters.filter(
          //       (alFil) => !filters.includes(alFil),
          //     );
          //     if (remainingFilters.length > 0 && filters.length < 3) {
          //       setFilters((prev) => [...prev, remainingFilters[0]]);
          //     }
          //   },
          // }}
          // onClickApplyFilter={{
          //   onClick: () => {
          //     handleApply();
          //   },
          // }}
        />
      </Popover>
    </>
  );
};

export default FilterComp;
const allFilters: FilterType[] = [
  {
    type: 'name',
    label: 'Name',
    filterVal: '',
    comparision_type: 'equals',
    id: nanoid(),
  },
  {
    type: 'job_role',
    label: 'Current Job Title',
    filterVal: '',
    comparision_type: 'equals',
    id: nanoid(),
  },
  {
    type: 'location',
    label: 'Location',
    filterVal: '',
    comparision_type: 'equals',
    id: nanoid(),
  },
];

const FilterField = ({
  filter,
  onChange,
  onCancel,
}: {
  filter: FilterType;
  // eslint-disable-next-line no-unused-vars
  onChange: (f: FilterType) => void;
  onCancel: () => void;
}) => {
  return (
    <>
      <div className='flex flex-wrap gap-0.5'>
        <div className='w-[35%]'>
          <UISelect
            menuOptions={allFilters.map((a) => ({
              name: a.label,
              value: a.type,
            }))}
            onValueChange={(value) => {
              if (value === '') return;
              const updFilter: FilterType = { ...filter };
              updFilter.type = value as any;
              onChange(updFilter);
            }}
            value={filter.type}
          />
        </div>
        <div className='w-[32%]'>
          <UISelect
            defaultValue={'equal'}
            menuOptions={[{ name: 'Equals', value: 'equals' }]}
            value={'equals'}
          />
        </div>
        <div className='w-[40%]'>
          <UITextField
            onChange={(e) => {
              const updFilter: FilterType = { ...filter };
              updFilter.filterVal = e.target.value;
              onChange(updFilter);
            }}
            value={filter.filterVal}
            defaultValue={''}
            placeholder=''
          />
        </div>

        <div className='w-[10%]'>
          <Button
            onClick={() => {
              onCancel();
            }}
            className='p-1 hover:bg-gray-100 rounded-full'
          >
            <X className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </>
  );
};
