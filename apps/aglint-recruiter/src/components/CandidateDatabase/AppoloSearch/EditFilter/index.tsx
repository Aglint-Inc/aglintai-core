import { Autocomplete, Dialog, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { cloneDeep, set } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CdEditQuerry } from '@/devlink/CdEditQuerry';
import { JobPills } from '@/devlink/JobPills';
import { supabase } from '@/src/utils/supabase/client';

import FilterInput from '../../Search/FilterInput';
import {
  setCandidateHistory,
  setCandidates,
  setFilters,
  setIsFilterLoading,
  setIsFilterOpen,
  setSelectedCandidate,
  setSelectedCandidates,
  useCandidateStore,
} from '../store';
import { type Candidate, type CandidateSearchHistoryType } from '../types';
import { employeeRange, initialQuery, updateCredits } from '../utils';

function EditFilter() {
  const { toast } = useToast();
  const router = useRouter();
  const isfilterOpen = useCandidateStore((state) => state.isfilterOpen);
  const filters = useCandidateStore((state) => state.filters);
  const isFilterLoading = useCandidateStore((state) => state.isFilterLoading);
  const candidateHistory = useCandidateStore((state) => state.candidateHistory);
  const [value, setValue] = useState([]);

  const handleDelete = (index) => {
    setValue(value.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (filters?.person_seniorities) {
      setValue(
        employeeRange.filter((v) =>
          filters.person_seniorities.includes(v.value),
        ),
      );
    }
  }, [filters?.person_seniorities]);

  const handlePillRemove = (path, index) => {
    const updated = cloneDeep(filters);
    updated[String(path)] = filters[String(path)].filter(
      (s, idx) => idx !== index,
    );
    setFilters(updated);
  };

  const handleUpdatePillInput = (path: string, inputText: string) => {
    if (!inputText) return;
    const inputVals = inputText.split(',').filter((s) => Boolean(s.trim()));
    const updated = cloneDeep(filters);
    set(updated, path, [...filters[String(path)], ...inputVals]);
    setFilters(updated);
  };

  const handleApplyFilters = async () => {
    try {
      if (
        filters.person_locations.length === 0 &&
        filters.person_titles.length === 0 &&
        filters.companies.length === 0
      ) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please add at least one filter',
        });
        return;
      }

      setIsFilterLoading(true);
      setSelectedCandidates([]);
      setSelectedCandidate(null);
      let org_ids = [];
      let credits_company = 0;

      if (filters.companies.length > 0) {
        const { data: dbCompanies, error: errorCompanies } = await supabase
          .from('company_search_cache')
          .select()
          .in(
            'company_name',
            filters.companies.map((c) => c.toLowerCase()),
          );

        if (errorCompanies) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Something went wrong. Please try again.',
          });
          setIsFilterLoading(false);
          return;
        }

        const remainingCompanies = filters.companies.filter(
          (c) =>
            !dbCompanies.map((d) => d.company_name).includes(c.toLowerCase()),
        );

        credits_company = remainingCompanies.length;

        org_ids = [
          ...org_ids,
          ...dbCompanies.map((c) => (c.search_result as any).id),
        ];

        await Promise.all(
          remainingCompanies.map(async (company) => {
            const resComp = await axios.post('/api/candidatedb/get-company', {
              name: company,
            });
            if (resComp.data.organizations) {
              const dbCompanies = resComp.data.organizations.map((org) => {
                return {
                  company_name: org.name.toLowerCase(),
                  search_result: org,
                  website_url: org.website_url,
                };
              });
              org_ids = [
                ...org_ids,
                ...resComp.data.organizations.map((c) => c.id),
              ];
              await supabase.from('company_search_cache').insert(dbCompanies);
            }
          }),
        );
      }

      const resCand = await axios.post('/api/candidatedb/search', {
        page: 1,
        per_page: 25,
        person_titles: filters.person_titles,
        person_locations: filters.person_locations,
        organization_ids: org_ids,
        person_seniorities: filters.person_seniorities,
      });

      // update credits for calling both company and people search api
      updateCredits(
        {
          ...candidateHistory.used_credits,
          export_credits:
            candidateHistory.used_credits.export_credits + 1 + credits_company,
        },
        candidateHistory.id,
      );

      if (!resCand.data.people) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
        setIsFilterLoading(false);
      }

      let fetchedCandidates: Candidate[] = resCand.data.people;
      const fetchedIds = fetchedCandidates.map((c) => c.id);

      const { data, error } = await supabase
        .from('candidate_search_history')
        .update({
          query_json: {
            ...filters,
            pagination: resCand.data.pagination,
          },
          candidates: fetchedIds,
          used_credits: {
            export_credits: candidateHistory.used_credits.export_credits + 1,
            ...candidateHistory.used_credits,
          },
        })
        .eq('id', Number(router.query.id))
        .select();

      if (!error) {
        setCandidateHistory(data[0] as unknown as CandidateSearchHistoryType);
        setCandidates(
          fetchedCandidates.map((cand) => ({
            ...cand,
            email_fetch_status: 'not fetched',
          })),
        );
      }
      setIsFilterLoading(false);
      setIsFilterOpen(false);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
      setIsFilterLoading(false);
    }
  };

  return (
    <Dialog
      open={isfilterOpen}
      fullWidth={true}
      maxWidth={'md'}
      onClose={() => {
        setIsFilterOpen(false);
      }}
    >
      {filters && (
        <CdEditQuerry
          onClickResetQuery={{
            onClick: () => {
              setFilters(initialQuery());
            },
          }}
          slotSeniorityInput={
            <>
              <Autocomplete
                multiple
                id='tags-standard'
                options={employeeRange}
                getOptionLabel={(option) => option.display_name}
                value={value}
                onChange={(event, value) => {
                  if (value) {
                    setValue(value);
                    setFilters({
                      ...filters,
                      person_seniorities: value.map((v) => v.value),
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                    }}
                    sx={{
                      '& .MuiFilledInput-root': {
                        padding: '6px 12px 6px 12px !important',
                      },
                    }}
                    placeholder='Choose mutiple seniorities from the list'
                  />
                )}
                renderTags={(value) =>
                  value.map((option, index) => (
                    <Stack key={index} p={'0px 4px 0px 4px'}>
                      <JobPills
                        onClickDelete={{
                          onClick: () => {
                            handleDelete(index);
                            setFilters({
                              ...filters,
                              person_seniorities:
                                filters.person_seniorities.filter(
                                  (v) => v !== option.value,
                                ),
                            });
                          },
                        }}
                        textJob={option.display_name}
                      />
                    </Stack>
                  ))
                }
              />
            </>
          }
          slotPreferredCompanySuggestion={filters.companies.map(
            (title, index) => {
              return (
                <JobPills
                  key={index}
                  onClickDelete={{
                    onClick: () => {
                      handlePillRemove('companies', index);
                    },
                  }}
                  textJob={title}
                />
              );
            },
          )}
          slotJobSuggestion={filters.person_titles.map((title, index) => {
            return (
              <JobPills
                key={index}
                onClickDelete={{
                  onClick: () => {
                    handlePillRemove('person_titles', index);
                  },
                }}
                textJob={title}
              />
            );
          })}
          slotLocationSuggestion={filters.person_locations.map(
            (title, index) => {
              return (
                <JobPills
                  key={index}
                  onClickDelete={{
                    onClick: () => {
                      handlePillRemove('person_locations', index);
                    },
                  }}
                  textJob={title}
                />
              );
            },
          )}
          slotApplyFilterButton={
            <>
              <ButtonSolid
                textButton='Apply'
                iconName='trending_up'
                size={2}
                isRightIcon
                onClickButton={{
                  onClick: () => {
                    !isFilterLoading && handleApplyFilters();
                  },
                }}
                isLoading={isFilterLoading}
              />
            </>
          }
          slotPreferredCompaniesInput={
            <FilterInput
              handleAdd={(s) => {
                handleUpdatePillInput('companies', s);
              }}
              path='excludedCompanies'
            />
          }
          slotJobInput={
            <FilterInput
              handleAdd={(s) => {
                handleUpdatePillInput('person_titles', s);
              }}
              path='jobTitles'
            />
          }
          slotLocationInput={
            <FilterInput
              handleAdd={(s) => {
                handleUpdatePillInput('person_locations', s);
              }}
              path='location'
            />
          }
        />
      )}
    </Dialog>
  );
}

export default EditFilter;
