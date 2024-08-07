import { Box, Stack } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

import { Text } from '@/devlink//Text';
import { ButtonSolid } from '@/devlink/ButtonSolid';

export type ScheduleListProps = {
  time: string;
  date: string;
  title: string;
  link: string;
};

const ScheduleList = ({ schedules }: { schedules: ScheduleListProps[] }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <Stack spacing={1}>
      <Stack color={'var(--neutral-11)'}>
        <Text
          size={2}
          content='Here are the list of urgent requests for today:'
        ></Text>
      </Stack>
      {schedules.map((schedule) => (
        <Link
          target='_blank'
          href={schedule.link}
          passHref
          key={schedule.link}
          onMouseEnter={() => setHovered(schedule.link)}
          onMouseLeave={() => setHovered(null)}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Stack
            direction='row'
            alignItems='center'
            spacing={3}
            position='relative'
          >
            <Box sx={{ width: '136px' }}>
              <Text size={2} content={schedule.time} weight={'medium'}></Text>
              <Stack color={'var(--neutral-11)'}>
                <Text size={2} content={schedule.date}></Text>
              </Stack>
            </Box>
            <Box flex={1}>
              <Stack color={'var(--neutral-11)'}>
                <Text
                  size={2}
                  content={schedule.title}
                  styleProps={{
                    style: {
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                ></Text>
              </Stack>
            </Box>

            {hovered === schedule.link && (
              <Box
                position='absolute'
                right={0}
                top={0}
                bottom={0}
                display='flex'
                alignItems='center'
              >
                <ButtonSolid
                  color='neutral'
                  size={1}
                  textButton={'View Schedule'}
                  isRightIcon={true}
                  iconName='open_in_new'
                />
              </Box>
            )}
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};

export default ScheduleList;
