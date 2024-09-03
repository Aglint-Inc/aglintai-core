import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Checkbox, MenuItem, Stack } from '@mui/material';
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';

import { Text } from '@/devlink/Text';
import { GlobalIcon } from '@/devlink2/GlobalIcon';
import { RequestSetting } from '@/devlink2/RequestSetting';
import MuiPopup from '@/src/components/Common/MuiPopup';
import SelectionComp from '@/src/components/Common/SelectionComp';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import ToggleBtn from '@/src/components/Common/UIToggle';
function ClockIcon() {
  return <GlobalIcon iconName='schedule' />;
}

function SettingsPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function closePopup() {
    setOpen(false);
  }
  type toolsEnumType =
    | 'schedule_interviews'
    | 're_schedule_interviews'
    | 'schedule_retros';
  const defaultTools = [
    {
      title: 'Schedule Interviews',
      tool: 'schedule_interviews' as toolsEnumType,
      isEnable: true,
    },
    {
      title: 'Reschedule Interviews',
      tool: 're_schedule_interviews' as toolsEnumType,
      isEnable: true,
    },
    {
      title: 'Schedule Retros',
      tool: 'schedule_retros' as toolsEnumType,
      isEnable: true,
    },
  ];

  const [instructions, setInstructions] = useState(defaultValue);
  const [autoPilot, setAutoPilot] = useState(true);
  const [tools, setTools] = useState(defaultTools);
  const [interval, setInterval] = useState({
    intervalTime: 2,
    trigger_time: dayjsLocal().hour(9).minute(0).second(0),
  });

  function handleChange({ tool }: { tool: toolsEnumType }) {
    setTools((pre) => {
      return pre.map((item) => {
        if (item.tool === tool) {
          return {
            ...item,
            isEnable: !item.isEnable,
          };
        }
        return item;
      });
    });
  }
  return (
    <>
      <MuiPopup
        props={{
          open,
          onClose: closePopup,
        }}
      >
        <RequestSetting
          onClickClose={{
            onClick: closePopup,
          }}
          slotToolsEnables={
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              {tools.map(({ isEnable, title, tool }, i) => {
                return (
                  <Stack
                    key={i}
                    direction={'row'}
                    alignItems={'center'}
                    spacing={1}
                  >
                    <Checkbox
                      onChange={() => {
                        handleChange({ tool });
                      }}
                      checked={isEnable}
                    />
                    <Text content={title} />
                  </Stack>
                );
              })}
            </Stack>
          }
          slotCustomize={
            <TipTapAIEditor
              initialValue={instructions}
              handleChange={(value) => {
                setInstructions(value);
              }}
              border={true}
              height='150px'
            />
          }
          slotAutoPilotToggle={
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <ToggleBtn
                isChecked={autoPilot}
                handleChange={(value) => {
                  setAutoPilot(value);
                }}
              />
              <Text content={'Auto Pilot On'} />
            </Stack>
          }
          slotAiFrequency={
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Text content={'Once every'} />
              <Stack position={'relative'} width={'70px'}>
                <SelectionComp
                  height={30}
                  onChange={(event) => {
                    const { value } = event.target;
                    setInterval((prev) => ({
                      ...prev,
                      intervalTime: value,
                    }));
                  }}
                  value={interval?.intervalTime}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </SelectionComp>
              </Stack>
              <Text content={'hours.'} />
              <Text content={'Starting'} />
              <Stack position={'relative'} width={'130px'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopTimePicker
                    value={interval?.trigger_time}
                    onAccept={(value) => {
                      setInterval((prev) => ({
                        ...prev,
                        trigger_time: value,
                      }));
                    }}
                    format='hh:mm A'
                    slots={{
                      openPickerIcon: ClockIcon,
                    }}
                    sx={{
                      width: '100%',
                      '& input': {
                        height: '17px',
                        fontSize: '14px',
                      },
                    }}
                  />
                </LocalizationProvider>{' '}
              </Stack>
              <Text content={'every day.'} />
            </Stack>
          }
        />
      </MuiPopup>
    </>
  );
}

export default SettingsPopup;

var defaultValue = `
<ul><li><p>When scheduling make sure you have candidate availability if there are no availability then request availability from candidate. Use the next 3 days unless otherwise mentioned. </p></li><li><p>Do not request availability from the candidate outside of work hours. </p></li><li><p>Show only slots where interviewers are available.</p></li></ul>
`;
