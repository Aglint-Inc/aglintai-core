import {
  Page,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { useState } from 'react';

import { useTenant } from '@/company/hooks';
import { useDeleteHoliday } from '@/company/hooks/useDeleteHoliday';

import { AddHolidayDialog } from './AddHolidayDialog';
import { HolidayActions } from './ui/HolidayActions';
import { HolidayRow } from './ui/HolidayRow';
import { HolidayTable } from './ui/HolidayTable';
function Holidays() {
  return (
    <Page>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Holidays</PageTitle>
          <PageDescription>
            {' '}
            List company holidays to exclude them from scheduling.
          </PageDescription>
        </PageHeaderText>
        <Actions />
      </PageHeader>
      <div className='flex flex-col gap-4'>
        <HolidayTable>
          <List />
        </HolidayTable>
      </div>
    </Page>
  );
}

export default Holidays;

const Actions = () => {
  const [addDayOffOpen, setDaysOffOpen] = useState(false);
  return (
    <>
      <AddHolidayDialog
        addDayOffOpen={addDayOffOpen}
        setDaysOffOpen={setDaysOffOpen}
      />
      <HolidayActions onClick={() => setDaysOffOpen(true)} />
    </>
  );
};

const List = () => {
  const { recruiter } = useTenant();
  return (
    <>
      {recruiter.scheduling_settings.totalDaysOff
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((day) => {
          return <Row key={day.date} day={day} />;
        })}
    </>
  );
};

const Row = ({
  day,
}: {
  day: ReturnType<
    typeof useTenant
  >['recruiter']['scheduling_settings']['totalDaysOff'][number];
}) => {
  const { mutate, isPending } = useDeleteHoliday();
  return (
    <HolidayRow
      date={day.date}
      locations={day.locations}
      name={day.event_name}
      isLoading={isPending}
      onDelete={() => mutate(day.date)}
    />
  );
};
