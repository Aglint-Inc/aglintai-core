import { Drawer, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';

import { PanelDetailTable, PanelDetailTitle } from '@/devlink2';

import CalenderHeaderRow from './CalenderHeaderRow';
import InterviewerRow from './InterviewRow';
import PanelRowDialog from './PanelRowDialog';
import { setDateRangeTableView, useAvailableStore } from './store';

const PanelRow = () => {
  const [editedIntId, setEditedIntId] = useState('');
  const interviewers = useAvailableStore((state) => state.interviewers);
  const dateRangeTableView = useAvailableStore(
    (state) => state.dateRangeTableView,
  );
  const dateRangeView = useAvailableStore((state) => state.dateRangeView);

  const handleClickNext = () => {
    const dateRange = cloneDeep(dateRangeTableView);
    if (dayjs(dateRange.endDate).isBefore(dateRangeView.endDate)) {
      let d1 = dayjs(dateRangeView.endDate).format('YYYY-MM-DD');
      let d2 = dayjs(dateRange.endDate).format('YYYY-MM-DD');
      const diffDay = dayjs(d1).diff(d2, 'day');
      if (diffDay > 0) {
        dateRange.startDate = dayjs(d2).add(1, 'day').toDate();
        if (diffDay >= 5) {
          dateRange.endDate = dayjs(d2).add(5, 'day').toDate();
        } else {
          dateRange.endDate = dayjs(d1).toDate();
        }
      }
    }
    setDateRangeTableView(dateRange);
  };

  const handleClickPrev = () => {
    const dateRange = cloneDeep(dateRangeTableView);
    let d1 = dayjs(dateRangeView.startDate).format('YYYY-MM-DD');
    let d2 = dayjs(dateRange.startDate).format('YYYY-MM-DD');
    if (dayjs(d2).isAfter(d1)) {
      const diffDay = dayjs(d2).diff(d1, 'day');
      if (diffDay > 0) {
        dateRange.endDate = dayjs(dateRange.startDate)
          .subtract(1, 'day')
          .toDate();
        if (diffDay >= 5) {
          dateRange.startDate = dayjs(d2).subtract(5, 'day').toDate();
        } else {
          dateRange.startDate = dayjs(d1).toDate();
        }
      }
    }
    setDateRangeTableView(dateRange);
  };

  const tableLabel = `${dayjs(dateRangeTableView.startDate).format(
    'DD MMMM',
  )} - ${dayjs(dateRangeTableView.endDate).format('DD MMMM')}`;

  return (
    <>
      <PanelDetailTitle
        textYearMonth={tableLabel}
        onClickNext={{ onClick: handleClickNext }}
        onClickPrev={{ onClick: handleClickPrev }}
      />

      <PanelDetailTable
        slotPanelMemberRow={
          <>
            <CalenderHeaderRow />
            {interviewers
              .filter((i) => i.isMailConnected)
              .map((int, intIdx) => {
                return (
                  <InterviewerRow
                    key={int.interviewerId}
                    interviewer={int}
                    interviewIdx={intIdx}
                    setEditedIntId={setEditedIntId}
                  />
                );
              })}
            {interviewers
              .filter((i) => !i.isMailConnected)
              .map((int, intIdx) => {
                return (
                  <InterviewerRow
                    key={int.interviewerId}
                    interviewer={int}
                    interviewIdx={intIdx}
                    setEditedIntId={setEditedIntId}
                  />
                );
              })}
          </>
        }
      />
      <Drawer
        anchor='right'
        open={editedIntId.length !== 0}
        onClose={() => {
          setEditedIntId('');
        }}
      >
        <Stack width={'400px'}>
          {editedIntId && (
            <PanelRowDialog
              onClose={() => {
                setEditedIntId('');
              }}
              intId={editedIntId}
            />
          )}
        </Stack>
      </Drawer>
    </>
  );
};

export default PanelRow;
