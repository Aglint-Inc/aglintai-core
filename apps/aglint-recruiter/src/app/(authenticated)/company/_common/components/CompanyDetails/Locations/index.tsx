import { Plus } from 'lucide-react';
import { useState } from 'react';

import { SectionCard } from '@/authenticated/components/SectionCard';
import { UIButton } from '@/components/Common/UIButton';
import { useAllOfficeLocations } from '@/queries/officeLocations';
import timeZone from '@/utils/timeZone';

import AddAndEditLocation from './Dialog/AddAndEditLocationDialog';
import DeleteLocationDialog from './Dialog/DeleteLocationDialog';
import LocationCard from './ui/LocationCard';

export const Location = () => {
  const { data: locations } = useAllOfficeLocations();
  const [AddEditDialog, setAddEditDialog] = useState({
    open: false,
    edit: -1,
  });
  const [DeleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
  });

  return (
    <>
      <AddAndEditLocation
        open={AddEditDialog.open}
        edit={AddEditDialog.edit}
        handleClose={() => {
          setAddEditDialog({ open: false, edit: -1 });
        }}
      />
      <DeleteLocationDialog dialog={DeleteDialog} setDialog={setDeleteDialog} />
      <SectionCard
        title=' Office Locations'
        description='Include office locations to organize data, schedule effectively,
      and identify correct time zones'
        topAction={
          <UIButton
            variant='outline'
            size='sm'
            onClick={() => {
              setAddEditDialog({ open: true, edit: -1 });
            }}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add
          </UIButton>
        }
      >
        <div className='grid grid-cols-1 gap-4'>
          {locations.map((loc) => {
            const selectedTimeZone = timeZone.find(
              (item) => item.tzCode === loc.timezone,
            );
            return (
              <LocationCard
                key={loc.id}
                id={loc.id}
                city={loc.city}
                region={loc.region}
                country={loc.country}
                address={loc.line1}
                timeZone={selectedTimeZone?.label}
                isHeadquarter={loc.is_headquarter}
                onEdit={() => {
                  setAddEditDialog({ open: true, edit: loc.id });
                }}
                onDelete={() => {
                  setDeleteDialog({ open: true, id: loc.id });
                }}
              />
            );
          })}
        </div>
      </SectionCard>
    </>
  );
};
