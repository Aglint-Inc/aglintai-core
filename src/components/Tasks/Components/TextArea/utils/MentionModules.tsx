/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

import { Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { AgentPill } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';

import { useTaskStatesContext } from '../../../TaskStatesContext';
import { assigneeType } from '../../../utils';

// import {assigneeType} from '../../../UpdateSubTask'

export default forwardRef((props: any, ref) => {
  let { setIsPopUpOpen } = useTaskStatesContext();
  let listOfUsers = props.items as assigneeType[];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectItem = (index) => {
    const label =
      listOfUsers[Number(index)]?.first_name +
      ' ' +
      listOfUsers[Number(index)]?.last_name;
    const item = listOfUsers[Number(index)]?.user_id;

    if (item) {
      props.command({ id: item, label });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + listOfUsers.length - 1) % listOfUsers.length,
    );
    if (selectedIndex === 0) {
      document.getElementById('list-popup').scrollTop =
        document.getElementById('list-popup').scrollHeight;
    } else {
      document.getElementById('list-popup').scrollTop -= 28.47;
    }
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % listOfUsers.length);
    if (selectedIndex + 1 === listOfUsers.length) {
      document.getElementById('list-popup').scrollTop = 0;
    } else {
      document.getElementById('list-popup').scrollTop += 28.47;
    }
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));
  return (
    <Stack spacing={'10px'} id='list-popup' className='items'>
      {listOfUsers.length ? (
        listOfUsers.map((item, index) => {
          return (
            <Stack
              className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
              direction={'row'}
              spacing={'8px'}
              key={index}
              onClick={() => {
                selectItem(index);
                setIsPopUpOpen(false);
              }}
              sx={{
                cursor: 'pointer',
              }}
            >
              <ShowCode>
                <ShowCode.When isTrue={item.first_name === 'email'}>
                  <Stack spacing={'5px'} direction={'column'}>
                    {/* <Typography variant='body2'>Agents</Typography> */}
                    <AgentPill
                      isEmailAgentVisible
                      isPhoneAgentVisible={false}
                    />
                  </Stack>
                </ShowCode.When>
                <ShowCode.When isTrue={item.first_name === 'phone'}>
                  <Stack spacing={'5px'} direction={'column'}>
                    <AgentPill
                      isPhoneAgentVisible
                      isEmailAgentVisible={false}
                    />
                    {/* <Typography variant='body2'>Interviewers</Typography> */}
                  </Stack>
                </ShowCode.When>
                <hr
                  style={{
                    width: '100%',
                  }}
                />
                <ShowCode.Else>
                  <MuiAvatar
                    fontSize='12px'
                    width={'25px'}
                    height={'25px'}
                    level={item?.first_name}
                    src={item?.profile_image}
                    variant='circular'
                  />
                  <Typography variant='body1'>
                    {capitalize(
                      item?.first_name +
                        ' ' +
                        (item?.last_name ? item?.last_name : ''),
                    )}
                  </Typography>
                </ShowCode.Else>
              </ShowCode>
            </Stack>
          );
        })
      ) : (
        <div className='item'>No result</div>
      )}
    </Stack>
  );
});

// if (option.first_name === 'email') {
//   return (
//     <Box component='li' {...props}>
//       <AgentPill isEmailAgentVisible isPhoneAgentVisible={false} />
//     </Box>
//   );
// }
// if (option.first_name === 'phone') {
//   return (
//     <Box
//       component='li'
//       sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
//       {...props}
//     >
//       <AgentPill isPhoneAgentVisible isEmailAgentVisible={false} />
//     </Box>
//   );
// }
// return (
//   <Box
//     component='li'
//     sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
//     {...props}
//   >
//     <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
//       <MuiAvatar
//         height={'30px'}
//         width={'30px'}
//         src={option.profile_image}
//         variant='circular'
//         fontSize='14px'
//         level={capitalize(fullName)}
//       />
//       <Typography variant='subtitle2'>
//         {capitalize(fullName)}
//       </Typography>
//     </Stack>
//   </Box>
// );
