import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';

function CalendarFilter({ setFilter, filter }) {
  return (
    <div className='!mt-4 flex flex-row gap-2'>
      <div className='flex flex-row items-center gap-1'>
        <Checkbox
          id='confirmed'
          checked={!!filter?.find((fil) => fil === 'confirmed')}
          onCheckedChange={() => {
            if (filter?.find((fil) => fil === 'confirmed')) {
              setFilter((pre) => pre.filter((p) => p !== 'confirmed'));
            } else {
              setFilter((pre) => [...pre, 'confirmed']);
            }
          }}
        />
        <Label htmlFor='confirmed'>Confirmed</Label>
      </div>
      <div className='flex flex-row items-center gap-1'>
        <Checkbox
          id='completed'
          checked={!!filter?.find((fil) => fil === 'completed')}
          onCheckedChange={() => {
            if (filter?.find((fil) => fil === 'completed')) {
              setFilter((pre) => pre.filter((p) => p !== 'completed'));
            } else {
              setFilter((pre) => [...pre, 'completed']);
            }
          }}
        />
        <Label htmlFor='completed'>Completed</Label>
      </div>
      <div className='flex flex-row items-center gap-1'>
        <Checkbox
          id='cancelled'
          checked={!!filter?.find((fil) => fil === 'cancelled')}
          onCheckedChange={() => {
            if (filter?.find((fil) => fil === 'cancelled')) {
              setFilter((pre) => pre.filter((p) => p !== 'cancelled'));
            } else {
              setFilter((pre) => [...pre, 'cancelled']);
            }
          }}
        />
        <Label htmlFor='cancelled'>Cancelled</Label>
      </div>
    </div>
  );
}

export default CalendarFilter;
