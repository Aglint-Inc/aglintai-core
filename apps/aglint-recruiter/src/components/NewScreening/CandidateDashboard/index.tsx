import { InputAdornment, Popover, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { AddFilter } from '@/devlink2/AddFilter';
import { AllInterviewFilter } from '@/devlink2/AllInterviewFilter';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { FilterItem } from '@/devlink2/FilterItem';
import { InviteStatus } from '@/devlink2/InviteStatus';
import { PageLayout } from '@/devlink2/PageLayout';
import { RefreshButton } from '@/devlink2/RefreshButton';
import { ScreeningCards } from '@/devlink2/ScreeningCards';
import { ScreeningTable } from '@/devlink2/ScreeningTable';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import MuiAvatar from '../../Common/MuiAvatar';
import UITextField from '../../Common/UITextField';
import SideBar from '../SideBar/SideBar';
import { CandidateScreeningType } from '../types';

const CandidateDashboard = () => {
  const { recruiter_id } = useAuthDetails();
  const [details, setDetails] = useState<CandidateScreeningType[]>([]);
  const [filterDetails, setFilterDetails] = useState<CandidateScreeningType[]>(
    [],
  );
  const [isloader, setIsLoader] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const [filterId, setFilterId] = useState<string[]>([]); // to show filters on dashboard
  const [selectFilter, setFilter] = useState<string>(''); // to check which filter is clicked to show dropdown;
  const [selectedScreeningTypes, setSelectedScreeningTypes] = useState<any>([]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [anchor2El, set2AnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handleClose = () => {
    setAnchorEl(null);
    set2AnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchor2El);
  const appId = open ? 'add-filter' : undefined;
  const apId = open2 ? 'add-filter' : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handle2Click = (event: React.MouseEvent<HTMLButtonElement>) => {
    set2AnchorEl(event.currentTarget);
  };

  const SearchBar = () => {
    return (
      <>
        <UITextField
          width='250px'
          height={32}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <GlobalIcon iconName='search' size='5'/>
              </InputAdornment>
            ),
          }}
          placeholder='Search by name.'
          onChange={() => {
            // let input = e.target.value;
            // setSearch(input);
          }}
        />
      </>
    );
  };

  const fetchApplicantsId = async () => {
    const { data, error } = await supabase.rpc('get_screening_candidates', {
      p_recruiter_id: recruiter_id,
    });

    if (error) {
      toast.error('Failed to fetch details. Please try again.');
    } else {
      setDetails(data as any);
      setFilterDetails(data as any);
      setIsLoader(false);
    }

    return data;
  };

  const FilterStatus = (scheduleType: string, label: string) => {
    const handleCheckClick = (scheduleType: any) => {
      const isScheduled = selectedScreeningTypes.includes(scheduleType);
      let updatedStatus = [];
      if (isScheduled) {
        updatedStatus = selectedScreeningTypes.filter(
          (item) => item !== scheduleType,
        );
      } else {
        updatedStatus = [...selectedScreeningTypes, scheduleType];
      }
      setSelectedScreeningTypes(updatedStatus);
      let filteredData = [];
      if (updatedStatus.length > 0) {
        updatedStatus.forEach((filter) => {
          filteredData = details.filter((data) => {
            if (filter.includes('submitted')) {
              if (data.created_at !== null) {
                return true;
              }
            }
            if (filter.includes('invited')) {
              if (
                data.status_emails_sent.phone_screening !== undefined &&
                data.created_at === null
              )
                return true;
            }
            if (filter.includes('not')) {
              if (
                data.created_at === null &&
                data.status_emails_sent.phone_screening === undefined
              )
                return true;
            }
            if (filter.includes(data.screening_title)) {
              return true;
            }
            if (filter.includes(data.job_title)) {
              return true;
            }
            return false;
          });
          setFilterDetails(filteredData);
        });
      } else {
        fetchApplicantsId();
      }
    };
    return (
      <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={1}>
        <Checkbox
          key={`${scheduleType}-checkbox`}
          isChecked={selectedScreeningTypes.includes(scheduleType)}
          onClickCheck={{
            onClick: () => {
              handleCheckClick(scheduleType);
            },
          }}
        />
        <Typography
          key={`${scheduleType}-label`}
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onClick={() => {
            handleCheckClick(scheduleType);
          }}
        >
          {label}
        </Typography>
      </Stack>
    );
  };

  const uniqueScreeningTitles = Array.from(
    new Set(filterDetails.map((data) => data.screening_title)),
  );

  const filteredScreeningNames = uniqueScreeningTitles.map((title) => {
    return FilterStatus(title, title);
  });

  const uniqueJobTitles = Array.from(
    new Set(filterDetails.map((data) => data.job_title)),
  );
  const filteredJobs = uniqueJobTitles.map((title) => {
    return FilterStatus(title, title);
  });

  useEffect(() => {
    fetchApplicantsId();
  }, []);

  return (
    <>
      {isloader ? (
        <Stack
          direction={'row'}
          alignItems={'center'}
          width={'100%'}
          height={'100vh'}
          justifyContent={'center'}
        >
          <LoaderSvg />
        </Stack>
      ) : (
        <PageLayout
          slotTopbarLeft={<ScreeningDashboardBreadCrumbs />}
          slotBody={
            <ScreeningTable
              slotRefreshButton={
                <RefreshButton
                  buttonProps={{
                    onClick: () => {
                      setIsLoader(true);
                      fetchApplicantsId();
                    },
                  }}
                />
              }
              slotFilterButton={
                <>
                  <SearchBar />
                  {filterId.map((data) => {
                    return (
                      <>
                        <ButtonFilter
                          key={data}
                          slotLeftIcon={
                            filter.find((icon) => icon.id === data)?.icon
                          }
                          slotRightIcon={<RightIcon />}
                          onClickStatus={{
                            onClick: (e) => {
                              handle2Click(e);
                              setFilter(data);
                            },
                          }}
                          textLabel={
                            filter.find((title) => title.id === data)?.title
                          }
                        />
                        <Popover
                          id={apId}
                          open={open2}
                          anchorEl={anchor2El}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          transformOrigin={{ vertical: -10, horizontal: 0 }}
                          sx={{
                            '& .MuiPopover-paper': {
                              borderRadius: 'var(--radius-4)',
                              borderColor: 'var(--neutral-6)',
                              minWidth: '176px',
                            },
                          }}
                        >
                          {selectFilter === '1' ? (
                            <FilterDropdown
                              key={selectFilter}
                              slotOption={
                                <>
                                  {FilterStatus('submitted', 'Submitted')}
                                  {FilterStatus('not', 'Not Invited')}
                                  {FilterStatus('invited', 'Invited')}
                                </>
                              }
                              onClickDelete={{
                                onClick: () => {
                                  setFilterId((prevFilters) =>
                                    prevFilters.filter(
                                      (filter) => filter !== '1',
                                    ),
                                  );
                                  set2AnchorEl(null);
                                  setSelectedScreeningTypes([]);
                                  fetchApplicantsId();
                                },
                              }}
                              onClickReset={{
                                onClick: () => {
                                  setSelectedScreeningTypes([]);
                                  fetchApplicantsId();
                                },
                              }}
                            />
                          ) : selectFilter === '2' ? (
                            <FilterDropdown
                              key={selectFilter}
                              slotOption={<>{filteredScreeningNames}</>}
                              onClickDelete={{
                                onClick: () => {
                                  setFilterId((prevFilters) =>
                                    prevFilters.filter(
                                      (filter) => filter !== '2',
                                    ),
                                  );
                                  set2AnchorEl(null);
                                  setSelectedScreeningTypes([]);
                                },
                              }}
                              onClickReset={{
                                onClick: () => {
                                  setSelectedScreeningTypes([]);
                                },
                              }}
                            />
                          ) : (
                            <FilterDropdown
                              key={selectFilter}
                              slotOption={<>{filteredJobs}</>}
                              onClickDelete={{
                                onClick: () => {
                                  setFilterId((prevFilters) =>
                                    prevFilters.filter(
                                      (filter) => filter !== '3',
                                    ),
                                  );
                                  set2AnchorEl(null);
                                  setSelectedScreeningTypes([]);
                                },
                              }}
                              onClickReset={{
                                onClick: () => {
                                  setSelectedScreeningTypes([]);
                                },
                              }}
                            />
                          )}
                        </Popover>
                      </>
                    );
                  })}
                </>
              }
              isAddFilterVisible={filterId.length < 3}
              slotAddFilter={
                <>
                  <AddFilter
                    onClickAddFilter={{
                      onClick: (e) => {
                        handleClick(e);
                      },
                    }}
                  />
                  <Popover
                    id={appId}
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
                    <AllInterviewFilter
                      isCoordinatorVisible={false}
                      isCustomSlot={true}
                      slotCustom={filter
                        .filter((item) => !filterId.includes(item.id))
                        .map((title) => (
                          <FilterItem
                            key={title.id}
                            textFilter={title.title}
                            slotIcon={title.icon}
                            onClickFIlter={{
                              onClick: () => {
                                setFilterId([...filterId, title.id]);
                                setAnchorEl(null);
                              },
                            }}
                          />
                        ))}
                      isStatusVisible={false}
                      isScheduleTypeVisible={false}
                      isDurationVisible={false}
                      isDataRangeVisible={false}
                      isInterviewPanelVisible={false}
                      isRelatedJobVisible={false}
                    />
                  </Popover>
                </>
              }
              slotSidebar={<SideBar appId={id} openDrawer={drawerOpen} />}
              slotScreeningCards={
                filterId.length > 0
                  ? filterDetails.map((data) => {
                      const isSubmitted =
                        data.created_at === null ? false : true;
                      const isInvited =
                        data.status_emails_sent?.phone_screening === undefined
                          ? false
                          : true;
                      const isNotInvited =
                        data.status_emails_sent?.phone_screening === undefined
                          ? true
                          : false;
                      const textStatus = isSubmitted
                        ? 'Submitted'
                        : isNotInvited
                          ? 'Not Invited'
                          : 'Invited';
                      return (
                        <ScreeningCards
                          onClickCard={{
                            onClick: () => {
                              setId(data.id);
                              setDrawerOpen(true);
                            },
                          }}
                          textName={
                            data.first_name +
                            ' ' +
                            (data.last_name === null ? '' : data.last_name)
                          }
                          key={data.id}
                          textScreeningName={data.screening_title}
                          textRelatedJob={data.job_title}
                          slotImage={
                            <MuiAvatar
                              src={data.avatar}
                              level='avatar'
                              variant='rounded-xs'
                            />
                          }
                          isCheckboxVisible={true}
                          slotInviteStatus={
                            <InviteStatus
                              textStatus={textStatus}
                              isNotInvited={isSubmitted ? false : isNotInvited}
                              isInvited={isSubmitted ? false : isInvited}
                              isSubmitted={isSubmitted ? true : false}
                              isStatusTimeVisible={
                                isSubmitted || isInvited ? true : false
                              }
                              textStatusTime={
                                isSubmitted
                                  ? dayjs(data.created_at).fromNow()
                                  : dayjs(
                                      data.status_emails_sent
                                        .phone_screening_resend ||
                                        data.status_emails_sent.phone_screening,
                                    ).fromNow()
                              }
                            />
                          }
                        />
                      );
                    })
                  : details.map((data) => {
                      const isSubmitted =
                        data.created_at === null ? false : true;
                      const isInvited =
                        data.status_emails_sent?.phone_screening === undefined
                          ? false
                          : true;
                      const isNotInvited =
                        data.status_emails_sent?.phone_screening === undefined
                          ? true
                          : false;
                      const textStatus = isSubmitted
                        ? 'Submitted'
                        : isNotInvited
                          ? 'Not Invited'
                          : 'Invited';
                      return (
                        <ScreeningCards
                          onClickCard={{
                            onClick: () => {
                              setId(data.id);
                              setDrawerOpen(true);
                            },
                          }}
                          textName={
                            data.first_name +
                            ' ' +
                            (data.last_name === null ? '' : data.last_name)
                          }
                          key={data.id}
                          textScreeningName={data.screening_title}
                          textRelatedJob={data.job_title}
                          slotImage={
                            <MuiAvatar
                              src={data.avatar}
                              height='16.26px'
                              width='16px'
                              level='avatar'
                              variant='circular'
                            />
                          }
                          isCheckboxVisible={true}
                          slotInviteStatus={
                            <InviteStatus
                              textStatus={textStatus}
                              isNotInvited={isSubmitted ? false : isNotInvited}
                              isInvited={isSubmitted ? false : isInvited}
                              isSubmitted={isSubmitted ? true : false}
                              isStatusTimeVisible={
                                isSubmitted || isInvited ? true : false
                              }
                              textStatusTime={
                                isSubmitted
                                  ? dayjs(data.created_at).fromNow()
                                  : dayjs(
                                      data.status_emails_sent
                                        .phone_screening_resend ||
                                        data.status_emails_sent.phone_screening,
                                    ).fromNow()
                              }
                            />
                          }
                        />
                      );
                    })
              }
            />
          }
        />
      )}
    </>
  );
};

export default CandidateDashboard;

const ScreeningDashboardBreadCrumbs = () => {
  const router = useRouter();
  return (
    <>
      <Breadcrum
        textName={`Screening`}
        onClickLink={{
          onClick: () => {
            router.push('/screening');
          },
        }}
        isLink={true}
      />
      <Breadcrum textName={`All Candidates`} showArrow={true} />
    </>
  );
};

const RightIcon = () => {
  return (
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
  );
};

const StatusIcon = () => {
  return (
    <Stack>
      <svg
        width='15'
        height='16'
        viewBox='0 0 15 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M2.15625 7.4375C1.98438 7.4375 1.84375 7.375 1.73438 7.25C1.625 7.14062 1.58594 7 1.61719 6.82812C1.77344 6.03125 2.07031 5.3125 2.50781 4.67188C2.60156 4.53125 2.72656 4.46094 2.88281 4.46094C3.03906 4.44531 3.1875 4.5 3.32812 4.625C3.51562 4.85938 3.53125 5.11719 3.375 5.39844C3.07812 5.86719 2.86719 6.38281 2.74219 6.94531C2.64844 7.24219 2.45312 7.40625 2.15625 7.4375ZM4.89844 3.875C4.61719 4.03125 4.35938 4.01562 4.125 3.82812C4 3.70313 3.94531 3.55469 3.96094 3.38281C3.96094 3.22656 4.03125 3.10156 4.17188 3.00781C4.8125 2.57031 5.53125 2.27344 6.32812 2.11719C6.5 2.08594 6.64062 2.125 6.75 2.23438C6.875 2.34375 6.9375 2.48438 6.9375 2.65625C6.90625 2.96875 6.74219 3.16406 6.44531 3.24219C5.88281 3.36719 5.36719 3.57812 4.89844 3.875ZM8.0625 13.3438C8.09375 13.0312 8.25781 12.8359 8.55469 12.7578C9.11719 12.6328 9.64062 12.4219 10.125 12.125C10.3906 11.9688 10.6406 11.9844 10.875 12.1719C11 12.3125 11.0547 12.4609 11.0391 12.6172C11.0391 12.7734 10.9688 12.8984 10.8281 12.9922C10.1875 13.4297 9.46875 13.7266 8.67188 13.8828C8.5 13.9141 8.35938 13.875 8.25 13.7656C8.125 13.6562 8.0625 13.5156 8.0625 13.3438ZM11.625 10.625C11.9219 10.1406 12.1328 9.61719 12.2578 9.05469C12.3359 8.75781 12.5312 8.59375 12.8438 8.5625C13.0156 8.5625 13.1562 8.625 13.2656 8.75C13.375 8.85938 13.4141 9 13.3828 9.17188C13.2266 9.96875 12.9297 10.6875 12.4922 11.3281C12.3984 11.4688 12.2734 11.5391 12.1172 11.5391C11.9453 11.5547 11.7969 11.5 11.6719 11.375C11.4688 11.1406 11.4531 10.8906 11.625 10.625ZM4.125 12.1719C4.35938 11.9688 4.61719 11.9531 4.89844 12.125C5.36719 12.4219 5.88281 12.6328 6.44531 12.7578C6.74219 12.8359 6.90625 13.0312 6.9375 13.3438C6.9375 13.5156 6.875 13.6562 6.75 13.7656C6.64062 13.875 6.5 13.9141 6.32812 13.8828C5.53125 13.7266 4.8125 13.4297 4.17188 12.9922C4.03125 12.8984 3.96094 12.7656 3.96094 12.5938C3.94531 12.4375 4 12.2969 4.125 12.1719ZM2.50781 11.3281C2.07031 10.6875 1.77344 9.96875 1.61719 9.17188C1.58594 9 1.625 8.85938 1.73438 8.75C1.84375 8.625 1.98438 8.5625 2.15625 8.5625C2.46875 8.59375 2.66406 8.75781 2.74219 9.05469C2.86719 9.61719 3.07812 10.1406 3.375 10.625C3.53125 10.8906 3.51562 11.1406 3.32812 11.375C3.20312 11.5 3.05469 11.5547 2.88281 11.5391C2.72656 11.5391 2.60156 11.4688 2.50781 11.3281ZM10.875 3.82812C10.6406 4.03125 10.3906 4.04688 10.125 3.875C9.64062 3.57812 9.11719 3.36719 8.55469 3.24219C8.25781 3.16406 8.09375 2.96875 8.0625 2.65625C8.0625 2.48438 8.125 2.34375 8.25 2.23438C8.35938 2.125 8.5 2.08594 8.67188 2.11719C9.46875 2.27344 10.1875 2.57031 10.8281 3.00781C10.9688 3.10156 11.0391 3.22656 11.0391 3.38281C11.0547 3.55469 11 3.70313 10.875 3.82812ZM11.625 5.375C11.4688 5.10938 11.4844 4.85156 11.6719 4.60156C11.7969 4.49219 11.9453 4.44531 12.1172 4.46094C12.2734 4.46094 12.3984 4.53125 12.4922 4.67188C12.9297 5.3125 13.2266 6.03125 13.3828 6.82812C13.4141 6.98438 13.375 7.125 13.2656 7.25C13.1562 7.375 13.0156 7.4375 12.8438 7.4375C12.5312 7.40625 12.3359 7.24219 12.2578 6.94531C12.1328 6.38281 11.9219 5.85938 11.625 5.375Z'
          fill='#2F3941'
        />
      </svg>
    </Stack>
  );
};

const ScreeningIcon = () => {
  return (
    <Stack>
      <svg
        width='15'
        height='16'
        viewBox='0 0 15 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.25 2.75C5.03125 2.75 4.85156 2.82031 4.71094 2.96094C4.57031 3.10156 4.5 3.28125 4.5 3.5V12.5C4.5 12.7188 4.57031 12.8984 4.71094 13.0391C4.85156 13.1797 5.03125 13.25 5.25 13.25H9.75C9.96875 13.25 10.1484 13.1797 10.2891 13.0391C10.4297 12.8984 10.5 12.7188 10.5 12.5V3.5C10.5 3.28125 10.4297 3.10156 10.2891 2.96094C10.1484 2.82031 9.96875 2.75 9.75 2.75H5.25ZM3.75 3.5C3.76562 3.07812 3.91406 2.72656 4.19531 2.44531C4.47656 2.16406 4.82812 2.01563 5.25 2H9.75C10.1719 2.01563 10.5234 2.16406 10.8047 2.44531C11.0859 2.72656 11.2344 3.07812 11.25 3.5V12.5C11.2344 12.9219 11.0859 13.2734 10.8047 13.5547C10.5234 13.8359 10.1719 13.9844 9.75 14H5.25C4.82812 13.9844 4.47656 13.8359 4.19531 13.5547C3.91406 13.2734 3.76562 12.9219 3.75 12.5V3.5ZM6.75 11.375H8.25C8.48438 11.3906 8.60938 11.5156 8.625 11.75C8.60938 11.9844 8.48438 12.1094 8.25 12.125H6.75C6.51562 12.1094 6.39062 11.9844 6.375 11.75C6.39062 11.5156 6.51562 11.3906 6.75 11.375Z'
          fill='#2F3941'
        />
      </svg>
    </Stack>
  );
};

const JobIcon = () => {
  return (
    <Stack>
      <svg
        width='15'
        height='16'
        viewBox='0 0 15 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.25 3.125V4.25H9.75V3.125C9.73438 2.89062 9.60938 2.76563 9.375 2.75H5.625C5.39062 2.76563 5.26562 2.89062 5.25 3.125ZM4.5 4.25V3.125C4.51562 2.8125 4.625 2.54687 4.82812 2.32812C5.04688 2.125 5.3125 2.01563 5.625 2H9.375C9.6875 2.01563 9.95312 2.125 10.1719 2.32812C10.375 2.54687 10.4844 2.8125 10.5 3.125V4.25H12C12.4219 4.26562 12.7734 4.41406 13.0547 4.69531C13.3359 4.97656 13.4844 5.32812 13.5 5.75V11.75C13.4844 12.1719 13.3359 12.5234 13.0547 12.8047C12.7734 13.0859 12.4219 13.2344 12 13.25H3C2.57812 13.2344 2.22656 13.0859 1.94531 12.8047C1.66406 12.5234 1.51562 12.1719 1.5 11.75V5.75C1.51562 5.32812 1.66406 4.97656 1.94531 4.69531C2.22656 4.41406 2.57812 4.26562 3 4.25H4.5ZM10.125 5H4.875H3C2.78125 5 2.60156 5.07031 2.46094 5.21094C2.32031 5.35156 2.25 5.53125 2.25 5.75V8H5.625H6.375H8.625H9.375H12.75V5.75C12.75 5.53125 12.6797 5.35156 12.5391 5.21094C12.3984 5.07031 12.2188 5 12 5H10.125ZM12.75 8.75H9.375V9.875C9.375 10.0938 9.30469 10.2734 9.16406 10.4141C9.02344 10.5547 8.84375 10.625 8.625 10.625H6.375C6.15625 10.625 5.97656 10.5547 5.83594 10.4141C5.69531 10.2734 5.625 10.0938 5.625 9.875V8.75H2.25V11.75C2.25 11.9688 2.32031 12.1484 2.46094 12.2891C2.60156 12.4297 2.78125 12.5 3 12.5H12C12.2188 12.5 12.3984 12.4297 12.5391 12.2891C12.6797 12.1484 12.75 11.9688 12.75 11.75V8.75ZM6.375 8.75V9.875H8.625V8.75H6.375Z'
          fill='#2F3941'
        />
      </svg>
    </Stack>
  );
};

const filter = [
  { id: '1', title: 'Status', icon: <StatusIcon /> },
  { id: '2', title: 'Screening Name', icon: <ScreeningIcon /> },
  { id: '3', title: 'Related Jobs', icon: <JobIcon /> },
];
