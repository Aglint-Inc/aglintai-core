import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';

import { emailTemplateCopy } from '@/src/types/companyEmailTypes';
import { supabase } from '@/src/utils/supabase/client';

const RealTimeCrons: React.FC = () => {
  const [cronEntries, setCronEntries] = useState<
    DatabaseTable['workflow_action_logs'][]
  >([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] =
    useState<DatabaseTable['workflow_action_logs']['status']>(null);

  const fetchEntries = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      }
      const entries = supabaseWrap(
        await supabase
          .from('workflow_action_logs')
          .select('*,workflow_action(*)'),
        false,
      );
      setCronEntries(entries);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  };

  useEffect(() => {
    // Add CSS for hover effect
    const styles = `
      .MuiDataGrid-cell:hover .MuiButtonBase-root {
        display: block !important;
      }
    `;

    document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

    fetchEntries();
    const channelA = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workflow_action_logs',
        },
        (payload) => {
          if (!payload.new) {
            console.error('unknown change', payload);
            return;
          }

          const updatedEntry =
            payload.new as DatabaseTable['workflow_action_logs'];
          setCronEntries((prevEntries) => {
            const entryIndex = prevEntries.findIndex(
              (e) => e.id === updatedEntry.id,
            );
            if (entryIndex !== -1) {
              const updatedEntries = [...prevEntries];
              updatedEntries[entryIndex] = updatedEntry;
              return updatedEntries;
            } else {
              return [...prevEntries, updatedEntry];
            }
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelA);
    };
  }, []);

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(
      event.target.value as DatabaseTable['workflow_action_logs']['status'],
    );
  };

  let filteredEntries = cronEntries.filter(
    (entry) => !statusFilter || (statusFilter && entry.status === statusFilter),
  );

  if (isArray(filteredEntries)) {
    filteredEntries = filteredEntries.sort((r1, r2) => r1.id - r2.id);
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant='h6' gutterBottom>
        Realtime Workflow Logs
      </Typography>
      <FormControl variant='outlined' sx={{ minWidth: 200, marginBottom: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          label='Status'
        >
          <MenuItem value=''>
            <em>All</em>
          </MenuItem>
          <MenuItem value='not_started'>Not Started</MenuItem>
          <MenuItem value='failed'>Failed</MenuItem>
          <MenuItem value='processing'>Processing</MenuItem>
          <MenuItem value='success'>Success</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant='contained'
        color='primary'
        onClick={() => fetchEntries(true)}
        sx={{ mb: 2 }}
      >
        {isRefreshing ? 'Refreshing' : 'Refresh'}
      </Button>
      <DataGrid rows={filteredEntries} columns={columns} />
    </Box>
  );
};

export default RealTimeCrons;

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'not started':
      return <Chip label='Not Started' color='default' />;
    case 'failed':
      return <Chip label='Failed' color='error' />;
    case 'processing':
      return <Chip label='Processing' color='warning' />;
    case 'success':
      return <Chip label='Success' color='success' />;
    default:
      return <Chip label='Unknown' color='default' />;
  }
};

const handleExecuteAction = async (id: number) => {
  try {
    supabaseWrap(
      await supabase
        .from('workflow_action_logs')
        .update({
          status: 'not started',
          execute_at: dayjsLocal().toISOString(),
          tries: 0,
        })
        .eq('id', id),
    );
    await axios.post('/api/workflow-cron/execute');
  } catch (err) {
    console.error(err);
  }
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'meta',
    headerName: 'Action',
    width: 250,
    renderCell: (params) => {
      return (
        <>
          <p>
            <Chip label={params.value.email_type.split('_')[1]} />
            <span style={{ marginLeft: '10px' }}>
              {emailTemplateCopy[params.value.email_type]?.heading}
            </span>
          </p>
        </>
      );
    },
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    renderCell: (params) =>
      dayjsLocal(params.value).format('DD MMMM YYYY, hh:mm ss A'),
  },

  {
    field: 'execute_at',
    headerName: 'Execute At',
    width: 200,
    renderCell: (params) =>
      dayjsLocal(params.value).format('DD MMMM YYYY, hh:mm ss A'),
  },

  {
    field: 'completed_at',
    headerName: 'Completed At',
    width: 200,
    renderCell: (params) =>
      params.value
        ? dayjsLocal(params.value).format('DD MMMM YYYY, hh:mm ss A')
        : 'NA',
  },
  { field: 'tries', headerName: 'Tries', width: 100 },

  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    renderCell: (params) => {
      return (
        <div style={{ position: 'relative' }}>
          {getStatusBadge(params.value)}
          <Button
            variant='contained'
            size='small'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateY(-50%)',
              display: 'none',
            }}
            onClick={() => handleExecuteAction(params.row.id)}
          >
            Execute
          </Button>
        </div>
      );
    },
  },
];
