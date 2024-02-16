import { AvatarGroup, MenuItem, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import {
  setSelectedPanel,
  setSelectedUsers,
  useInterviewStore,
} from '../../store';
import { useSchedulingStore } from '../../../Panels/store';

function TeamAutoComplete() {
  const { members } = useAuthDetails();
  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);
  const selectedPanel = useInterviewStore((state) => state.selectedPanel);

  const [panelId, setPanelId] = useState('');

  useEffect(() => {
    if (selectedPanel) {
      setPanelId(selectedPanel.id);
    }
    return () => {
      setPanelId(null);
    };
  }, [selectedPanel]);

  return (
    <Stack position={'relative'}>
      {!selectedPanel && (
        <Stack
          zIndex={2}
          position={'absolute'}
          p={'10px'}
          sx={{ pointerEvents: 'none' }}
        >
          <Typography variant='body2' color='#C2C8CC'>
            Choose interview panel from the list
          </Typography>
        </Stack>
      )}

      <UITextField
        placeholder='Choose interview panel from the list'
        select
        onChange={(e) => {
          setPanelId(e.target.value);
        }}
        value={panelId}
      >
        {interviewPanels.map((option) => {
          return (
            <MenuItem value={option.id} key={option.id}>
              <Stack
                key={option.id}
                direction='row'
                alignItems='center'
                justifyContent={'space-between'}
                sx={{ width: '100%' }}
                spacing={2}
                onClick={() => {
                  setSelectedPanel(option);
                  setSelectedUsers(
                    option.relations.map((user) => {
                      return { user_id: user.user_id, must: 'selected' };
                    }),
                  );
                }}
              >
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Typography
                    variant='subtitle2'
                    className='one-line-clamp'
                    width={'220px'}
                  >
                    {option.name}
                  </Typography>
                  <Typography variant='body2' className='one-line-clamp'>
                    {`( ${option.relations.length} Members )`}
                  </Typography>
                </Stack>

                <AvatarGroup
                  sx={{
                    '& .MuiAvatar-root': {
                      width: '24px',
                      height: '24px',
                      fontSize: '12px',
                    },
                  }}
                  total={option.relations.length}
                >
                  {option.relations.slice(0, 3).map((rel) => {
                    const member = members.filter(
                      (member) => member.user_id === rel.user_id,
                    )[0];
                    return (
                      <MuiAvatar
                        key={rel.id}
                        src={member?.profile_image}
                        level={member?.first_name}
                        variant='circular'
                        height='24px'
                        width='24px'
                        fontSize='8px'
                      />
                    );
                  })}
                </AvatarGroup>
              </Stack>
            </MenuItem>
          );
        })}
      </UITextField>
    </Stack>
  );
}

export default TeamAutoComplete;
