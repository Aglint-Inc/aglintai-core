import { Drawer, Stack } from '@mui/material';
import React, { useState } from 'react';

import { PanelDetailTable } from '@/devlink2';

import CalenderHeaderRow from './CalenderHeaderRow';
import InterviewerRow from './InterviewRow';
import PanelRowDialog from './PanelRowDialog';
import { useAvailableStore } from './store';

const PanelRow = () => {
  const [editedIntId, setEditedIntId] = useState('');
  const interviewers = useAvailableStore((state) => state.interviewers);

  return (
    <>
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
