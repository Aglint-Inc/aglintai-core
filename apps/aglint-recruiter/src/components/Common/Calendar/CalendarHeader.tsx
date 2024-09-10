import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Grid, Stack, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { UIButton } from '../UIButton';

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
          <Tabs defaultValue={mode} onValueChange={handleMode}>
            <TabsList>
              <TabsTrigger value='calendar'>Calendar</TabsTrigger>
              <TabsTrigger value='list'>List</TabsTrigger>
            </TabsList>
          </Tabs>
        </Grid>
        <Grid item xs={4} container justifyContent='center'>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            spacing={2}
            alignItems={'center'}
            minWidth={'200px'}
          >
            <UIButton
              variant='outline'
              size='sm'
              icon={<ChevronLeft />}
              onClick={() => calendarApi.prev()}
            />

            <Typography fontWeight={500}>
              {currentViewType === 'listWeek' ||
              currentViewType === 'timeGridWeek'
                ? `${dayjsLocal(currentDate?.startStr).format('MMM DD ')} - ${dayjsLocal(currentDate?.endStr).format('DD YYYY')}`
                : dayjsLocal(currentDate?.startStr).format(
                    // eslint-disable-next-line security/detect-object-injection
                    dateFormat[currentViewType],
                  )}
            </Typography>
            <UIButton
              variant='outline'
              size='sm'
              icon={<ChevronRight />}
              onClick={() => calendarApi.next()}
            />
          </Stack>
        </Grid>
        <Grid item xs={4} container justifyContent={'end'}>
          <Stack
            minWidth={'250px'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            spacing={1}
          >
            {!dayjsLocal(currentDate?.startStr).isToday() &&
              !isThisWeekrMonth && (
                <>
                  {/* <ButtonSoft
                    size={1}
                    color={'neutral'}
                    textButton='Today'
                    onClickButton={{
                      onClick: () => calendarApi?.today(),
                    }}
                  /> */}
                  <UIButton onClick={() => calendarApi?.today()}>
                    Today
                  </UIButton>
                </>
              )}

            <Tabs defaultValue={type} value={type} onValueChange={handleType}>
              <TabsList>
                <TabsTrigger value='day'>Day</TabsTrigger>
                <TabsTrigger value='week'>Week</TabsTrigger>
                <TabsTrigger value='month'>Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default CalendarHeader;
