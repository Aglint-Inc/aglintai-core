import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useRequests } from '@/src/context/RequestsContext';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import FilterHeader from '../../Common/FilterHeader';

function FilterAndSorting() {
  const { requests, setFilteredRequest, filteredRequest } = useRequests();
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');

  const [selectedSort, setSelectedSort] = useState({
    option: 'created_at',
    order: 'desc',
  });

  const jobs =
    requests.status === 'success' &&
    requests.data.length &&
    requests.data
      .map((request) => ({
        id: request.applications.public_jobs.id,
        label: request.applications.public_jobs.job_title,
      }))
      .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);

  const status =
    requests.status === 'success' &&
    requests.data.length &&
    requests.data
      .map((request) => ({
        id: request.status,
        label: capitalizeFirstLetter(request.status),
      }))
      .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);

  const handleSearchChange = useCallback(
    debounce((query) => {
      setSearchText(query);
    }, 500),
    [],
  );

  useEffect(() => {
    if (requests.status === 'success') {
      const filtered = requests.data.filter((request) => {
        const jobMatch =
          selectedJobs.length === 0 ||
          selectedJobs.includes(request.applications.public_jobs.id);
        const statusMatch =
          selectedStatus.length === 0 ||
          selectedStatus.includes(request.status);
        const searchMatch =
          searchText === '' ||
          request.title.toLowerCase().includes(searchText.toLowerCase()) ||
          request.applications.public_jobs.job_title
            .toLowerCase()
            .includes(searchText.toLowerCase());
        return jobMatch && statusMatch && searchMatch;
      });

      setFilteredRequest(filtered);
    }
  }, [
    selectedJobs,
    selectedStatus,
    searchText,
    requests.data,
    setFilteredRequest,
  ]);

  // function handleSort(value) {
  //   const { option, order } = value;
  //   console.log(option, order);
  //   const sortedRequests = [...requests.data].sort((a, b) => {
  //     if (order === 'asc') {
  //       if (a[option] < b[option]) return -1;
  //       if (a[option] > b[option]) return 1;
  //       return 0;
  //     } else {
  //       if (a[option] > b[option]) return -1;
  //       if (a[option] < b[option]) return 1;
  //       return 0;
  //     }
  //   });

  //   setFilteredRequest(sortedRequests);
  // }

  const sortedRequest = useMemo(() => {
    return [...filteredRequest].sort((a, b) => {
      const valueA = a[selectedSort.option] || '';
      const valueB = b[selectedSort.option] || '';

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        if (selectedSort.order === 'asc') return valueA.localeCompare(valueB);
        else return valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        if (selectedSort.order === 'asc') return valueA - valueB;
        else return valueB - valueA;
      } else {
        return valueA.toString().localeCompare(valueB.toString());
      }
    });
  }, [selectedSort.option, selectedSort.order, requests.data]);
  useEffect(() => {
    if (sortedRequest.length) setFilteredRequest(sortedRequest);
  }, [sortedRequest]);
  return (
    <FilterHeader
      search={{
        setValue: (value) => {
          setSearchQuery(value);
          handleSearchChange(value);
        },
        value: searchQuery,
        placeholder: 'Search Requests',
      }}
      filters={[
        {
          type: 'filter',
          name: 'Job',
          iconname: 'work',
          options: jobs,
          setValue: (value) => {
            setSelectedJobs(value);
          },
          value: [...selectedJobs],
        },
        {
          type: 'filter',
          name: 'Status',
          iconname: 'filter_tilt_shift',
          options: status,
          setValue: (value) => {
            setSelectedStatus(value);
          },
          value: [...selectedStatus],
        },
      ]}
      sort={{
        sortOptions: {
          options: [
            { id: 'created_at', label: 'created at' },
            // { id: 'due_date', label: 'due date' },
          ],

          order: [
            {
              id: 'asc',
              label: 'Ascending',
            },
            {
              id: 'desc',
              label: 'Descending',
            },
          ],
        },
        selected: selectedSort,
        setOrder: (payload) => {
          const temp = {
            option: payload.type || selectedSort.option,
            order: payload.order || selectedSort.order,
          };
          setSelectedSort({ ...temp });
        },
      }}
    />
  );
}

export default FilterAndSorting;
