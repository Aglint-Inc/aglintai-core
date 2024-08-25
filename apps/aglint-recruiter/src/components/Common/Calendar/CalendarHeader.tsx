import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Grid, Stack, Typography } from '@mui/material';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { TaskSwitchButton } from '@/devlink3/TaskSwitchButton';

function CalendarHeader({
  handleMode,
  mode,
  calendarApi,
  currentDate,
  handleType,
  type,
}) {
  const dateFormat = {
    timeGridWeek: 'DD',
    timeGridDay: 'DD MMM YYYY',
    dayGridMonth: 'MMMM YYYY',
    listWeek: 'DD',
    listDay: 'DD MMM YYYY',
    listMonth: 'MMMM YYYY',
  };
  const checkDate = dayjsLocal();

  const isThisWeekrMonth =
    checkDate.isAfter(currentDate?.startStr) &&
    checkDate.isBefore(currentDate?.endStr);

  const currentViewType = calendarApi?.view?.type;

  return (
    <Stack>
      <Grid
        container
        spacing={2}
        alignItems='center'
        justifyContent='space-between'
      >
        <Grid item xs={4}>
          <TaskSwitchButton
            isIconVisible={false}
            isJobCandActive={mode === 'calendar'}
            isListActive={mode === 'list'}
            onClickJobCand={{
              onClick: () => {
                if (mode !== 'calendar') handleMode('calendar');
              },
            }}
            onClickList={{
              onClick: () => {
                if (mode !== 'list') handleMode('list');
              },
            }}
            textFirst={'Calendar'}
            textSecond={'List'}
          />
        </Grid>
        <Grid item xs={4} container justifyContent='center'>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            spacing={2}
            alignItems={'center'}
            minWidth={'200px'}
          >
            <IconButtonSoft
              size={1}
              iconSize={2}
              color={'neutral'}
              iconName='arrow_back_ios'
              onClickButton={{ onClick: () => calendarApi.prev() }}
            />
            <Typography fontWeight={500}>
              {/* {currentViewType === 'listWeek' ||
        currentViewType === 'dayGridWeek' */}
              {currentViewType === 'listWeek' ||
              currentViewType === 'timeGridWeek'
                ? `${dayjsLocal(currentDate?.startStr).format('MMM DD ')} - ${dayjsLocal(currentDate?.endStr).format('DD YYYY')}`
                : dayjsLocal(currentDate?.startStr).format(
                    // eslint-disable-next-line security/detect-object-injection
                    dateFormat[currentViewType],
                  )}
            </Typography>
            <IconButtonSoft
              size={1}
              iconSize={2}
              color={'neutral'}
              iconName='arrow_forward_ios'
              onClickButton={{
                onClick: () => {
                  calendarApi.next();
                },
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={4} container justifyContent={'end'}>
          <Stack
            minWidth={'250px'}
            direction={'row'}
            justifyContent={'flex-end'}
            spacing={1}
          >
            {!dayjsLocal(currentDate?.startStr).isToday() &&
              !isThisWeekrMonth && (
                <ButtonSoft
                  size={1}
                  color={'neutral'}
                  textButton='Today'
                  onClickButton={{
                    onClick: () => calendarApi?.today(),
                  }}
                />
              )}
            <ButtonSoft
              textButton='Day'
              size={1}
              color={type === 'day' ? 'accent' : 'neutral'}
              onClickButton={{ onClick: () => handleType('day') }}
            />
            <ButtonSoft
              textButton='Week'
              color={type === 'week' ? 'accent' : 'neutral'}
              size={1}
              onClickButton={{ onClick: () => handleType('week') }}
            />
            <ButtonSoft
              textButton='Month'
              color={type === 'month' ? 'accent' : 'neutral'}
              size={1}
              onClickButton={{ onClick: () => handleType('month') }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default CalendarHeader;
