import { svgList } from '@components/Common/Icons/svgList';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { supabase } from '@utils/supabaseClient';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { CandidateDatabase, Checkbox } from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import { JdMatchAPIType, JobApplcationDB } from '@/src/types/data.types';

import AlertDialog from '../Common/AlertDialog';
import MuiAvatar from '../Common/MuiAvatar';
import CustomTable, {
  EnhancedCell,
  EnhancedCheckBoxCell,
} from '../Common/Table';
import UITextField from '../Common/UITextField';
import { getGravatar } from '../JobApplicationsDashboard/ApplicationCard';
import ApplicationDetails, {
  giveColorForInterviewScore,
} from '../JobApplicationsDashboard/ApplicationCard/ApplicationDetails';
import { getInterviewScore } from '../JobApplicationsDashboard/utils';

interface HeadCell {
  id: string;
  label: string;
  icon: keyof typeof svgList;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Name',
    icon: 'UserSolo',
  },
  {
    id: 'Company',
    label: 'Company',
    icon: 'Building',
  },
  {
    id: 'Job Title',
    label: 'Job Title',
    icon: 'JobTitle',
  },
  {
    id: 'Email',
    label: 'Email',
    icon: 'Mail',
  },
  {
    id: 'ResumeScore',
    label: 'Resume Score',
    icon: 'ResumeScore',
  },
  {
    id: 'InterviewScore',
    label: 'Interview Score',
    icon: 'InterviewScore',
  },
];

type ExtendedApplication = JobApplcationDB & {
  bgcolor: string;
};

export function CandidateDatabaseComp() {
  const router = useRouter();
  const { jobsData } = useJobs();
  const [search, setSearch] = useState<string>('');
  const [people, setPeople] = useState<ExtendedApplication[]>([]);
  // const { people, setPeople } = useContacts();
  const [deleteDialog, setDeleteDialog] = useState(false);
  // const [detailOpen, setDetailOpen] = useState(false);
  const [peopleDetail, setPeopleDetail] = useState({});
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (jobsData.applications) {
      let addColor = jobsData.applications?.map((app) => {
        return { ...app, bgcolor: getRandomColor() };
      });
      setPeople(addColor);
    }
  }, [jobsData]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = people.map((n) => n.application_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected: string[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const deleteHandler = async () => {
    setDeleteDialog(true);
    const filteredArray = people.filter((f) => {
      return !selected.includes(f.application_id);
    });
    setPeople(filteredArray);
    setSelected([]);
    setDeleteDialog(false);
    await supabase.from('contact_people').delete().in('contact_id', selected);
  };

  function searchContacts(query) {
    const lowercaseQuery = query.toLowerCase().trim();

    if (lowercaseQuery === '') {
      return people; // Return all contacts if query is empty
    }

    return people.filter((contact) => {
      const fullName = `${contact.first_name} ${
        contact.last_name || ''
      }`.toLowerCase();
      const companyName = (contact.company || '').toLowerCase();
      const role = (contact.job_title || '').toLowerCase();

      return (
        fullName.includes(lowercaseQuery) ||
        companyName.includes(lowercaseQuery) ||
        role.includes(lowercaseQuery)
      );
    });
  }

  //filter
  const visibleRows = searchContacts(search);
  const [openSidePanel, setOpenPanelDrawer] = useState(false);

  function viewDetails(row: ExtendedApplication) {
    setPeopleDetail(row);
    router.push(`?contact_id=${row.application_id}`, undefined, {
      shallow: true,
    });
    setOpenPanelDrawer(true);
  }

  return (
    <>
      <ApplicationDetails
        applicationDetails={peopleDetail}
        openSidePanel={openSidePanel}
        setOpenSidePanel={setOpenPanelDrawer}
      />
      <CandidateDatabase
        textShowingResult={`Showing ${visibleRows.length} results`}
        slotDataTable={
          <Box
            sx={{
              width: '100%',
              position: 'relative',
              minHeight: 'calc(100vh - 176px)',
              px: '20px',
            }}
          >
            {deleteDialog && (
              <AlertDialog
                width={434}
                open={deleteDialog}
                setOpen={setDeleteDialog}
                title={
                  selected?.length > 1 ? `Delete contacts` : `Delete contact`
                }
                Subtitle={
                  <Typography>
                    Are you sure you want to delete{' '}
                    {selected?.length > 1 ? `these contacts` : `this contact`} ?
                  </Typography>
                }
                caution={'This action cannot be undone'}
                SecBtntext='Cancel'
                PriBtntext='Delete'
                SecAction={() => {
                  setDeleteDialog(false);
                }}
                PriAction={async () => {
                  await deleteHandler();
                }}
              />
            )}

            {/* {savingToDb && <LoadingBackdrop text={'Enriching your contacts'} />} */}

            <CustomTable
              selected={selected}
              body={visibleRows.map((row, index) => {
                const temp = row.jd_score as unknown as JdMatchAPIType;
                const jdScore = temp?.over_all?.score ?? 0;
                const isItemSelected = isSelected(row.application_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    id={`people-${index}`}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.application_id}
                    selected={isItemSelected}
                    sx={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      viewDetails(row);
                    }}
                  >
                    <EnhancedCheckBoxCell>
                      <Stack sx={{ display: 'none' }}>
                        <Checkbox
                          isChecked={isItemSelected}
                          onClickCheck={{
                            onClick: (event) => {
                              event.stopPropagation();
                              // handleClick(event, row.application_id);
                            },
                            id: labelId,
                          }}
                        />
                      </Stack>
                    </EnhancedCheckBoxCell>
                    <EnhancedCell>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={2}
                      >
                        <MuiAvatar
                          level={row.first_name}
                          src={
                            !row.profile_image
                              ? getGravatar(row.email, row?.first_name)
                              : row.profile_image
                          }
                          variant={''}
                          width={'20px'}
                          height={'20px'}
                          fontSize={'28px'}
                        />
                        <Typography
                          variant='inherit'
                          className='one-line-clamp'
                        >
                          {capitalize(
                            row.last_name
                              ? `${row.first_name}  ${row.last_name}`
                              : row.first_name,
                          )}
                        </Typography>
                      </Stack>
                    </EnhancedCell>
                    <EnhancedCell>{row.company || '--'}</EnhancedCell>
                    <EnhancedCell>
                      {capitalize(row.job_title || '--')}
                    </EnhancedCell>
                    <EnhancedCell> {row.email || '--'}</EnhancedCell>
                    <EnhancedCell>
                      <span
                        style={{
                          color: giveColorForInterviewScore(
                            getInterviewScore(row.feedback),
                          ),
                        }}
                      >
                        {jdScore}
                      </span>
                    </EnhancedCell>
                    <EnhancedCell sx={{ paddingRight: '30px' }}>
                      <span
                        style={{
                          color: giveColorForInterviewScore(
                            getInterviewScore(row.feedback),
                          ),
                        }}
                      >
                        {getInterviewScore(row.feedback)}
                      </span>
                    </EnhancedCell>
                  </TableRow>
                );
              })}
              deleteHandler={() => {
                setDeleteDialog(true);
              }}
              handleSelectAllClick={handleSelectAllClick}
              headCells={headCells}
              rowLength={people.length}
              deselectAll={() => {
                setSelected([]);
              }}
            />
          </Box>
        }
        slotSearch={
          <UITextField
            labelSize='medium'
            fullWidth
            placeholder='Search'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type='search'
          />
        }
      />
    </>
  );
}

export function getRandomColor() {
  const colors = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#e74c3c',
    '#bdc3c7',
    '#7f8c8d',
    '#e67e22',
    '#f39c12',
    '#d35400',
    '#c0392b',
  ]; // A variety of visually pleasing colors
  return colors[Math.floor(Math.random() * colors.length)];
}
