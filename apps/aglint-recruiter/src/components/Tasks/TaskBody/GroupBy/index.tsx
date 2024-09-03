import { Popover, Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterList } from '@/devlink2/FilterList';
import { FilterPill } from '@/devlink2/FilterPill';

import {
  type groupByTextType,
  groupByText,
  useTaskStatesContext,
} from '../../TaskStatesContext';

function GroupBy() {
  const { selectedGroupBy, setSelectedGroupBy } = useTaskStatesContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <ButtonFilter
        slotLeftIcon={<Stack>{selectedGroupBy.icon}</Stack>}
        isActive={false}
        isDotVisible={false}
        onClickStatus={{
          onClick: handleClick,
        }}
        textLabel={
          <FilterPill textFilterName={capitalize(selectedGroupBy.label)} />
        }
        slotRightIcon={
          <Stack>
            <GlobalIcon
              iconName={anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            />
          </Stack>
        }
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 'none',
            marginTop: 'var(--space-4)',
            padding: 'var(--space-1) var(--space-2)',
            bgcolor: 'white',
          },
        }}
      >
        <FilterList
          slotFilterPill={groupByText.map((item: groupByTextType) => {
            return (
              <Stack
                key={item.label}
                direction={'row'}
                alignItems={'center'}
                spacing={'var(--space-1)'}
                padding={'var(--space-2)'}
                sx={{
                  bgcolor:
                    item.label === selectedGroupBy.label
                      ? 'var(--neutral-3)'
                      : '',
                  ':hover': { bgcolor: 'var(--neutral-2)', cursor: 'pointer' },
                }}
                borderRadius={'var(--radius-2)'}
                onClick={() => {
                  setSelectedGroupBy(item);
                  setAnchorEl(null);
                }}
              >
                <Stack>{item.icon}</Stack>
                <FilterPill textFilterName={capitalize(item.label)} />
              </Stack>
            );
          })}
        />
      </Popover>
    </>
  );
}

export default GroupBy;

export function PriorityIcon() {
  return (
    <GlobalIcon iconName='flag' />
    // <svg
    //   width='15'
    //   height='16'
    //   viewBox='0 0 15 16'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M7.5 13.25C8.45312 13.2344 9.32812 13 10.125 12.5469C10.9219 12.0781 11.5625 11.4375 12.0469 10.625C12.5156 9.79688 12.75 8.92188 12.75 8C12.75 7.07812 12.5156 6.20312 12.0469 5.375C11.5625 4.5625 10.9219 3.92188 10.125 3.45312C9.32812 3 8.45312 2.76563 7.5 2.75C6.54688 2.76563 5.67188 3 4.875 3.45312C4.07812 3.92188 3.4375 4.5625 2.95312 5.375C2.48438 6.20312 2.25 7.07812 2.25 8C2.25 8.92188 2.48438 9.79688 2.95312 10.625C3.4375 11.4375 4.07812 12.0781 4.875 12.5469C5.67188 13 6.54688 13.2344 7.5 13.25ZM7.5 2C8.59375 2.01563 9.59375 2.28125 10.5 2.79688C11.4062 3.32813 12.1406 4.0625 12.7031 5C13.2344 5.95312 13.5 6.95312 13.5 8C13.5 9.04688 13.2344 10.0469 12.7031 11C12.1406 11.9375 11.4062 12.6719 10.5 13.2031C9.59375 13.7188 8.59375 13.9844 7.5 14C6.40625 13.9844 5.40625 13.7188 4.5 13.2031C3.59375 12.6719 2.85938 11.9375 2.29688 11C1.76562 10.0469 1.5 9.04688 1.5 8C1.5 6.95312 1.76562 5.95312 2.29688 5C2.85938 4.0625 3.59375 3.32813 4.5 2.79688C5.40625 2.28125 6.40625 2.01563 7.5 2ZM7.5 10.25C7.26562 10.25 7.07031 10.1641 6.91406 9.99219L4.66406 7.57812C4.55469 7.45312 4.5 7.3125 4.5 7.15625C4.5 6.96875 4.5625 6.8125 4.6875 6.6875C4.8125 6.5625 4.96875 6.5 5.15625 6.5H9.86719C10.0391 6.5 10.1875 6.5625 10.3125 6.6875C10.4375 6.8125 10.5 6.96875 10.5 7.15625C10.5 7.3125 10.4453 7.45312 10.3359 7.57812L8.08594 9.99219C7.92969 10.1641 7.73438 10.25 7.5 10.25ZM7.54688 9.47656L9.60938 7.25H5.39062L7.45312 9.47656C7.46875 9.49219 7.48438 9.5 7.5 9.5C7.51562 9.5 7.53125 9.49219 7.54688 9.47656Z'
    //     fill='#0F3554'
    //   />
    // </svg>
  );
}

export function StatusIcon() {
  return (
    <GlobalIcon iconName='priority' />
    // <svg
    //   width='15'
    //   height='16'
    //   viewBox='0 0 15 16'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M1.94531 7.4375C1.69531 7.40625 1.57031 7.26562 1.57031 7.01562C1.74219 6.07812 2.09375 5.24219 2.625 4.50781C2.79688 4.32031 2.97656 4.30469 3.16406 4.46094C3.30469 4.61719 3.32031 4.78906 3.21094 4.97656C2.75781 5.60156 2.46094 6.3125 2.32031 7.10938C2.27344 7.3125 2.14844 7.42188 1.94531 7.4375ZM4.47656 3.71094C4.28906 3.82031 4.11719 3.80469 3.96094 3.66406C3.80469 3.47656 3.82031 3.29687 4.00781 3.125C4.74219 2.59375 5.58594 2.24219 6.53906 2.07031C6.77344 2.07031 6.90625 2.19531 6.9375 2.44531C6.92188 2.64844 6.8125 2.77344 6.60938 2.82031C5.8125 2.96094 5.10156 3.25781 4.47656 3.71094ZM8.0625 13.5547C8.07812 13.3516 8.1875 13.2266 8.39062 13.1797C9.1875 13.0391 9.89844 12.7422 10.5234 12.2891C10.6953 12.1797 10.8672 12.1953 11.0391 12.3359C11.1953 12.5234 11.1797 12.7031 10.9922 12.875C10.2578 13.4062 9.42188 13.7578 8.48438 13.9297C8.23438 13.9297 8.09375 13.8047 8.0625 13.5547ZM11.7891 11.0234C12.2422 10.3984 12.5391 9.6875 12.6797 8.89062C12.7266 8.6875 12.8516 8.57812 13.0547 8.5625C13.3047 8.59375 13.4297 8.73438 13.4297 8.98438C13.2578 9.92188 12.9062 10.7578 12.375 11.4922C12.2031 11.6797 12.0234 11.6953 11.8359 11.5391C11.6953 11.3828 11.6797 11.2109 11.7891 11.0234ZM3.96094 12.3359C4.11719 12.1953 4.28906 12.1797 4.47656 12.2891C5.10156 12.7422 5.8125 13.0391 6.60938 13.1797C6.8125 13.2266 6.92188 13.3516 6.9375 13.5547C6.90625 13.8047 6.76562 13.9297 6.51562 13.9297C5.57812 13.7578 4.74219 13.4062 4.00781 12.875C3.82031 12.7031 3.80469 12.5234 3.96094 12.3359ZM2.625 11.4922C2.09375 10.7578 1.74219 9.92188 1.57031 8.98438C1.57031 8.73438 1.69531 8.59375 1.94531 8.5625C2.14844 8.57812 2.27344 8.6875 2.32031 8.89062C2.46094 9.6875 2.75781 10.3984 3.21094 11.0234C3.32031 11.2109 3.30469 11.3828 3.16406 11.5391C2.97656 11.6953 2.79688 11.6797 2.625 11.4922ZM11.0391 3.66406C10.8828 3.80469 10.7109 3.82031 10.5234 3.71094C9.89844 3.25781 9.1875 2.96094 8.39062 2.82031C8.1875 2.77344 8.07812 2.64844 8.0625 2.44531C8.09375 2.19531 8.23438 2.07031 8.48438 2.07031C9.42188 2.24219 10.2578 2.59375 10.9922 3.125C11.1797 3.29687 11.1953 3.47656 11.0391 3.66406ZM11.7891 4.97656C11.6797 4.78906 11.6953 4.61719 11.8359 4.46094C12.0234 4.30469 12.2031 4.32031 12.375 4.50781C12.9062 5.24219 13.2578 6.07812 13.4297 7.01562C13.4297 7.26562 13.3047 7.40625 13.0547 7.4375C12.8516 7.42188 12.7266 7.3125 12.6797 7.10938C12.5391 6.3125 12.2422 5.60156 11.7891 4.97656Z'
    //     fill='#0F3554'
    //   />
    // </svg>
  );
}

export function JobIcon() {
  return (
    <GlobalIcon iconName='business_center' />
    // <svg
    //   width='15'
    //   height='16'
    //   viewBox='0 0 15 16'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M5.25 3.125V4.25H9.75V3.125C9.73438 2.89062 9.60938 2.76563 9.375 2.75H5.625C5.39062 2.76563 5.26562 2.89062 5.25 3.125ZM4.5 4.25V3.125C4.51562 2.8125 4.625 2.54687 4.82812 2.32812C5.04688 2.125 5.3125 2.01563 5.625 2H9.375C9.6875 2.01563 9.95312 2.125 10.1719 2.32812C10.375 2.54687 10.4844 2.8125 10.5 3.125V4.25H12C12.4219 4.26562 12.7734 4.41406 13.0547 4.69531C13.3359 4.97656 13.4844 5.32812 13.5 5.75V11.75C13.4844 12.1719 13.3359 12.5234 13.0547 12.8047C12.7734 13.0859 12.4219 13.2344 12 13.25H3C2.57812 13.2344 2.22656 13.0859 1.94531 12.8047C1.66406 12.5234 1.51562 12.1719 1.5 11.75V5.75C1.51562 5.32812 1.66406 4.97656 1.94531 4.69531C2.22656 4.41406 2.57812 4.26562 3 4.25H4.5ZM10.125 5H4.875H3C2.78125 5 2.60156 5.07031 2.46094 5.21094C2.32031 5.35156 2.25 5.53125 2.25 5.75V8H5.625H6.375H8.625H9.375H12.75V5.75C12.75 5.53125 12.6797 5.35156 12.5391 5.21094C12.3984 5.07031 12.2188 5 12 5H10.125ZM12.75 8.75H9.375V9.875C9.375 10.0938 9.30469 10.2734 9.16406 10.4141C9.02344 10.5547 8.84375 10.625 8.625 10.625H6.375C6.15625 10.625 5.97656 10.5547 5.83594 10.4141C5.69531 10.2734 5.625 10.0938 5.625 9.875V8.75H2.25V11.75C2.25 11.9688 2.32031 12.1484 2.46094 12.2891C2.60156 12.4297 2.78125 12.5 3 12.5H12C12.2188 12.5 12.3984 12.4297 12.5391 12.2891C12.6797 12.1484 12.75 11.9688 12.75 11.75V8.75ZM6.375 8.75V9.875H8.625V8.75H6.375Z'
    //     fill='#0F3554'
    //   />
    // </svg>
  );
}
export function CandidateIcon() {
  return (
    <GlobalIcon iconName='account_circle' />
    // <svg
    //   width='15'
    //   height='16'
    //   viewBox='0 0 15 16'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M10.5 13.25C10.7188 13.25 10.8984 13.1797 11.0391 13.0391C11.1797 12.8984 11.25 12.7188 11.25 12.5V6.5H8.625C8.3125 6.48438 8.04688 6.375 7.82812 6.17188C7.625 5.95312 7.51562 5.6875 7.5 5.375V2.75H4.5C4.28125 2.75 4.10156 2.82031 3.96094 2.96094C3.82031 3.10156 3.75 3.28125 3.75 3.5V12.5C3.75 12.7188 3.82031 12.8984 3.96094 13.0391C4.10156 13.1797 4.28125 13.25 4.5 13.25H4.875V12.875C4.89062 12.3438 5.07031 11.8984 5.41406 11.5391C5.77344 11.1953 6.21875 11.0156 6.75 11H8.25C8.78125 11.0156 9.22656 11.1953 9.58594 11.5391C9.92969 11.8984 10.1094 12.3438 10.125 12.875V13.25H10.5ZM9.375 12.875C9.35938 12.5625 9.25 12.2969 9.04688 12.0781C8.82812 11.875 8.5625 11.7656 8.25 11.75H6.75C6.4375 11.7656 6.17188 11.875 5.95312 12.0781C5.75 12.2969 5.64062 12.5625 5.625 12.875V13.25H9.375V12.875ZM8.625 5.75H11.25C11.2188 5.6875 11.1797 5.63281 11.1328 5.58594L8.41406 2.86719C8.36719 2.82031 8.3125 2.78906 8.25 2.77344V5.375C8.26562 5.60938 8.39062 5.73438 8.625 5.75ZM4.5 2H8.15625C8.46875 2 8.73438 2.10938 8.95312 2.32812L11.6719 5.04688C11.8906 5.26562 12 5.53125 12 5.84375V12.5C11.9844 12.9219 11.8359 13.2734 11.5547 13.5547C11.2734 13.8359 10.9219 13.9844 10.5 14H4.5C4.07812 13.9844 3.72656 13.8359 3.44531 13.5547C3.16406 13.2734 3.01562 12.9219 3 12.5V3.5C3.01562 3.07812 3.16406 2.72656 3.44531 2.44531C3.72656 2.16406 4.07812 2.01563 4.5 2ZM7.5 8C7.28125 8 7.10156 8.07031 6.96094 8.21094C6.82031 8.35156 6.75 8.53125 6.75 8.75C6.75 8.96875 6.82031 9.14844 6.96094 9.28906C7.10156 9.42969 7.28125 9.5 7.5 9.5C7.71875 9.5 7.89844 9.42969 8.03906 9.28906C8.17969 9.14844 8.25 8.96875 8.25 8.75C8.25 8.53125 8.17969 8.35156 8.03906 8.21094C7.89844 8.07031 7.71875 8 7.5 8ZM7.5 10.25C6.9375 10.2344 6.50781 9.98438 6.21094 9.5C5.92969 9 5.92969 8.5 6.21094 8C6.50781 7.51562 6.9375 7.26562 7.5 7.25C8.0625 7.26562 8.49219 7.51562 8.78906 8C9.07031 8.5 9.07031 9 8.78906 9.5C8.49219 9.98438 8.0625 10.2344 7.5 10.25Z'
    //     fill='#68737D'
    //   />
    // </svg>
  );
}

export function AssigneeIcon() {
  return (
    <GlobalIcon iconName='person' />
    // <svg
    //   width='15'
    //   height='16'
    //   viewBox='0 0 15 16'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M11.1562 11.7734C11.6562 11.2891 12.0469 10.7266 12.3281 10.0859C12.6094 9.44531 12.75 8.75 12.75 8C12.7344 7.01562 12.4922 6.13281 12.0234 5.35156C11.5703 4.55469 10.9453 3.92969 10.1484 3.47656C9.36719 3.00781 8.48438 2.76563 7.5 2.75C6.51562 2.76563 5.63281 3.00781 4.85156 3.47656C4.05469 3.92969 3.42969 4.55469 2.97656 5.35156C2.50781 6.13281 2.26562 7.01562 2.25 8C2.25 8.75 2.39062 9.44531 2.67188 10.0859C2.95312 10.7266 3.34375 11.2891 3.84375 11.7734C4.01562 11.1016 4.36719 10.5547 4.89844 10.1328C5.41406 9.72656 6.03125 9.51562 6.75 9.5H8.25C8.96875 9.51562 9.58594 9.72656 10.1016 10.1328C10.6328 10.5547 10.9844 11.1016 11.1562 11.7734ZM10.5 12.3125C10.4375 11.7188 10.1953 11.2344 9.77344 10.8594C9.36719 10.4688 8.85938 10.2656 8.25 10.25H6.75C6.14062 10.2656 5.63281 10.4688 5.22656 10.8594C4.80469 11.2344 4.5625 11.7188 4.5 12.3125C5.375 12.9219 6.375 13.2344 7.5 13.25C8.625 13.2344 9.625 12.9219 10.5 12.3125ZM7.5 14C6.40625 13.9844 5.40625 13.7188 4.5 13.2031C3.59375 12.6719 2.85938 11.9375 2.29688 11C1.76562 10.0469 1.5 9.04688 1.5 8C1.5 6.95312 1.76562 5.95312 2.29688 5C2.85938 4.0625 3.59375 3.32813 4.5 2.79688C5.40625 2.28125 6.40625 2.01563 7.5 2C8.59375 2.01563 9.59375 2.28125 10.5 2.79688C11.4062 3.32813 12.1406 4.0625 12.7031 5C13.2344 5.95312 13.5 6.95312 13.5 8C13.5 9.04688 13.2344 10.0469 12.7031 11C12.1406 11.9375 11.4062 12.6719 10.5 13.2031C9.59375 13.7188 8.59375 13.9844 7.5 14ZM7.5 8C7.92188 7.98438 8.25 7.79688 8.48438 7.4375C8.67188 7.0625 8.67188 6.6875 8.48438 6.3125C8.25 5.95312 7.92188 5.76562 7.5 5.75C7.07812 5.76562 6.75 5.95312 6.51562 6.3125C6.32812 6.6875 6.32812 7.0625 6.51562 7.4375C6.75 7.79688 7.07812 7.98438 7.5 8ZM5.625 6.875C5.64062 6.17188 5.95312 5.63281 6.5625 5.25781C7.1875 4.91406 7.8125 4.91406 8.4375 5.25781C9.04688 5.63281 9.35938 6.17188 9.375 6.875C9.35938 7.57812 9.04688 8.11719 8.4375 8.49219C7.8125 8.83594 7.1875 8.83594 6.5625 8.49219C5.95312 8.11719 5.64062 7.57812 5.625 6.875Z'
    //     fill='#68737D'
    //   />
    // </svg>
  );
}

export function ListIcon() {
  return (
    <GlobalIcon iconName='filter_list' />
    // <svg
    //   width='15'
    //   height='16'
    //   viewBox='0 0 15 16'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M3 3.5C3.21875 3.5 3.39844 3.57031 3.53906 3.71094C3.67969 3.85156 3.75 4.03125 3.75 4.25C3.75 4.46875 3.67969 4.64844 3.53906 4.78906C3.39844 4.92969 3.21875 5 3 5C2.78125 5 2.60156 4.92969 2.46094 4.78906C2.32031 4.64844 2.25 4.46875 2.25 4.25C2.25 4.03125 2.32031 3.85156 2.46094 3.71094C2.60156 3.57031 2.78125 3.5 3 3.5ZM5.625 3.875H13.125C13.3594 3.89063 13.4844 4.01562 13.5 4.25C13.4844 4.48438 13.3594 4.60938 13.125 4.625H5.625C5.39062 4.60938 5.26562 4.48438 5.25 4.25C5.26562 4.01562 5.39062 3.89063 5.625 3.875ZM5.625 7.625H13.125C13.3594 7.64062 13.4844 7.76562 13.5 8C13.4844 8.23438 13.3594 8.35938 13.125 8.375H5.625C5.39062 8.35938 5.26562 8.23438 5.25 8C5.26562 7.76562 5.39062 7.64062 5.625 7.625ZM5.625 11.375H13.125C13.3594 11.3906 13.4844 11.5156 13.5 11.75C13.4844 11.9844 13.3594 12.1094 13.125 12.125H5.625C5.39062 12.1094 5.26562 11.9844 5.25 11.75C5.26562 11.5156 5.39062 11.3906 5.625 11.375ZM3.75 8C3.75 8.21875 3.67969 8.39844 3.53906 8.53906C3.39844 8.67969 3.21875 8.75 3 8.75C2.78125 8.75 2.60156 8.67969 2.46094 8.53906C2.32031 8.39844 2.25 8.21875 2.25 8C2.25 7.78125 2.32031 7.60156 2.46094 7.46094C2.60156 7.32031 2.78125 7.25 3 7.25C3.21875 7.25 3.39844 7.32031 3.53906 7.46094C3.67969 7.60156 3.75 7.78125 3.75 8ZM3 11C3.21875 11 3.39844 11.0703 3.53906 11.2109C3.67969 11.3516 3.75 11.5312 3.75 11.75C3.75 11.9688 3.67969 12.1484 3.53906 12.2891C3.39844 12.4297 3.21875 12.5 3 12.5C2.78125 12.5 2.60156 12.4297 2.46094 12.2891C2.32031 12.1484 2.25 11.9688 2.25 11.75C2.25 11.5312 2.32031 11.3516 2.46094 11.2109C2.60156 11.0703 2.78125 11 3 11Z'
    //     fill='#0F3554'
    //   />
    // </svg>
  );
}