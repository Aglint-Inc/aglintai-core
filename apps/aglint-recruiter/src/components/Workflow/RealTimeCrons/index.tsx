/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { Database } from '@aglint/shared-types/src/db/schema.types';
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
import React, { useEffect, useState } from 'react';

import { emailTemplateCopy } from '@/src/types/companyEmailTypes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

type CronEntryRowType = {
  completed_at: string | null;
  created_at: string;
  execute_at: string;
  id: number;
  meta: any;
  started_at: string;
  status: Database['public']['Enums']['workflow_cron_run_status'];
  tries: number;
  workflow_title: string;
};

const RealTimeCrons: React.FC = () => {
  const [cronEntries, setCronEntries] = useState<CronEntryRowType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [allWorkflows, setAllWorkflows] = useState<DatabaseTable['workflow'][]>(
    [],
  );
  const [statusFilter, setStatusFilter] =
    useState<DatabaseTable['workflow_action_logs']['status']>(null);

  const fetchEntries = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      }

      const fetchedWorkflows = supabaseWrap(
        await supabase.from('workflow').select(),
      );
      const entries = supabaseWrap(
        await supabase.from('workflow_action_logs').select('*'),
        false,
      );
      setCronEntries(
        entries.map((e) => ({
          completed_at: e.completed_at,
          created_at: e.created_at,
          execute_at: e.execute_at,
          id: e.id,
          meta: e.meta,
          started_at: e.started_at,
          status: e.status,
          tries: e.tries,
          workflow_title: fetchedWorkflows.find((w) => w.id === e.workflow_id)
            ?.title,
        })),
      );
      setAllWorkflows(fetchedWorkflows);
    } catch (error) {
      toast.error(error.message);
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
    if (allWorkflows.length === 0) {
      fetchEntries();
    }
    const channelA = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workflow_action_logs',
        },
        async (payload) => {
          if (!payload.new) {
            console.error('unknown change', payload);
            return;
          }
          const updatedEntry =
            payload.new as DatabaseTable['workflow_action_logs'];
          let updatedWorkFlows = [...allWorkflows];
          if (
            !updatedWorkFlows.find((a) => a.id === updatedEntry.workflow_id)
          ) {
            updatedWorkFlows = supabaseWrap(
              await supabase.from('workflow').select(),
            );
            setAllWorkflows(updatedWorkFlows);
          }
          const existingEntryIdx = cronEntries.findIndex(
            (c) => c.id === updatedEntry.id,
          );
          let newCronEnrtries = [...cronEntries];
          if (existingEntryIdx !== -1) {
            newCronEnrtries[existingEntryIdx] = {
              completed_at: updatedEntry.completed_at,
              created_at: updatedEntry.created_at,
              execute_at: updatedEntry.execute_at,
              id: updatedEntry.id,
              meta: updatedEntry.meta,
              started_at: updatedEntry.started_at,
              status: updatedEntry.status,
              tries: updatedEntry.tries,
              workflow_title: allWorkflows.find(
                (w) => w.id === updatedEntry.workflow_id,
              )?.title,
            };
          } else {
            newCronEnrtries.push({
              completed_at: updatedEntry.completed_at,
              created_at: updatedEntry.created_at,
              execute_at: updatedEntry.execute_at,
              id: updatedEntry.id,
              meta: updatedEntry.meta,
              started_at: updatedEntry.started_at,
              status: updatedEntry.status,
              tries: updatedEntry.tries,
              workflow_title: allWorkflows.find(
                (w) => w.id === updatedEntry.workflow_id,
              )?.title,
            });
          }

          setCronEntries(newCronEnrtries);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelA);
    };
  }, [allWorkflows]);

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(
      event.target.value as DatabaseTable['workflow_action_logs']['status'],
    );
  };

  let filteredEntries = cronEntries.filter(
    (entry) => !statusFilter || (statusFilter && entry.status === statusFilter),
  );

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

const getStatusBadge = (status: DatabaseEnums['workflow_cron_run_status']) => {
  switch (status) {
    case 'not_started':
      return <Chip label='Not Started' color='default' />;
    case 'failed':
      return <Chip label='Failed' color='error' />;
    case 'processing':
      return <Chip label='Processing' color='warning' />;
    case 'success':
      return <Chip label='Success' color='success' />;
    case 'stopped':
      return <Chip label='Stopped' color='info' />;
    default:
      return <Chip label='Unknown' color='default' />;
  }
};

const handleExecuteAction = async (id: number) => {
  try {
    await axios.post('/api/workflow-cron/execute', {
      action_id: id,
    });
  } catch (err) {
    toast.error(err.message);
    console.error(err);
  }
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'workflow_title',
    headerName: 'Workflow Title',
    width: 250,
  },
  {
    field: 'meta',
    headerName: 'Action',
    width: 250,
    renderCell: (params) => {
      return (
        <>
          <p>
            <Chip label={params.value.target_api.split('_')[1]} />
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
    width: 170,
    renderCell: (params) =>
      dayjsLocal(params.value).format('DD MMMM YYYY, hh:mm ss A'),
  },

  {
    field: 'execute_at',
    headerName: 'Execute At',
    width: 170,

    renderCell: (params) =>
      dayjsLocal(params.value).format('DD MMMM YYYY, hh:mm ss A'),
  },

  {
    field: 'completed_at',
    headerName: 'Completed At',
    width: 170,
    renderCell: (params) =>
      params.value
        ? dayjsLocal(params.value).format('DD MMMM YYYY, hh:mm ss A')
        : 'NA',
  },
  { field: 'tries', headerName: 'Tries', width: 50 },

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
