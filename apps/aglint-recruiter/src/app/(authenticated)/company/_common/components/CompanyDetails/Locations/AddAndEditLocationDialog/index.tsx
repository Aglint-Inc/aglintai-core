import { toast } from '@components/hooks/use-toast';
import { Checkbox } from '@components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { useTenantOfficeLocations } from '@/company/hooks';
import TimezonePicker from '@/common/TimezonePicker';
import { UIButton } from '@/common/UIButton';
import { manageOfficeLocation } from '@/context/AuthContext/utils';
import { api } from '@/trpc/client';
import timeZone from '@/utils/timeZone';

type TimeZoneType = (typeof timeZone)[number];

interface LocationProps {
  handleClose: () => void;
  open: boolean;
  edit: number;
}

const AddAndEditLocationDialog: React.FC<LocationProps> = ({
  handleClose,
  open,
  edit,
}) => {
  const { recruiter } = useTenant();
  const { data: office_locations, refetch } = useTenantOfficeLocations();
  const address1Ref = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);

  const [selectedTimeZone, setSelectedTimeZone] = useState<TimeZoneType | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState<
    (typeof office_locations)[number] | null
  >(null);

  const hasHeadquarter = office_locations?.some(
    (location) => location.is_headquarter === true,
  );

  const [isHeadQ, setHeadQ] = useState(false);

  const handleAddLocation = async () => {
    setLoading(true);
    if (
      !address1Ref.current?.value ||
      !cityRef.current?.value ||
      !regionRef.current?.value ||
      !countryRef.current?.value ||
      !zipRef.current?.value ||
      !selectedTimeZone
    ) {
      toast({ title: 'Please fill in all required fields.' });
      setLoading(false);
      return;
    }
    const { error } = handleValidate();
    if (!error) {
      await manageOfficeLocation({
        type: edit === -1 ? 'insert' : 'update',
        data: {
          id: edit !== -1 ? edit : undefined,
          city: cityRef.current.value,
          country: countryRef.current.value,
          is_headquarter: Boolean(isHeadQ),
          line1: address1Ref.current.value,
          line2: address2Ref.current?.value || '',
          region: regionRef.current.value,
          timezone: selectedTimeZone.tzCode,
          zipcode: zipRef.current.value,
          recruiter_id: recruiter.id,
          name: '',
        },
      });
      refetch();
      handleClose();
    }
    setLoading(false);
  };
  useEffect(() => {
    if (recruiter && office_locations?.length) {
      const initialValue = office_locations.find((item) => item.id === edit);
      if (initialValue) {
        setHeadQ(initialValue.is_headquarter);
        const initialTimeZone = timeZone.find(
          (item) => item.tzCode === initialValue?.timezone,
        );
        setInitialValue(initialValue);
        setSelectedTimeZone(initialTimeZone || null);
      }
    }
  }, [recruiter, office_locations, edit]);

  const isCheckboxVisiable = hasHeadquarter && isHeadQ ? true : !hasHeadquarter;
  const apiUtil = api.useUtils();

  const getCountryAndRegion = async (city: string) => {
    const result = await apiUtil.utility.geoCodeLocation.fetch({
      address: city,
    });
    if (!result) throw new Error('Failed to process location data');
    if (result.timeZoneId) {
      const tz = timeZone.find((t) => t.tzCode === result.timeZoneId);
      if (!tz) throw new Error('Failed to find timezone data');
      setSelectedTimeZone(tz);
    }
    if (result.add.region && regionRef.current) {
      regionRef.current.value = result?.add?.region || regionRef.current.value;
    }
    if (result.add.country && countryRef.current) {
      countryRef.current.value =
        result?.add?.country || countryRef.current.value;
    }
    // if (result.add.zipcode) {
    //   zipRef.current.value = result?.add?.zipcode || zipRef.current.value;
    // }
  };

  const debouncedUpsertRequestNotes = useCallback(
    debounce(async (city) => {
      await getCountryAndRegion(city);
    }, 500),
    [],
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {edit === -1 ? 'Add Location' : 'Edit Location'}
          </DialogTitle>
          <DialogDescription>
            Enter the details for the office location. Click{' '}
            {edit === -1 ? 'Add' : 'Save'} when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-[0.4fr_1.6fr] items-center justify-start gap-4'>
              <Label htmlFor='address1' className='text-left'>
                Address 1
              </Label>
              <Input
                id='address1'
                ref={address1Ref}
                placeholder='123 Example St'
                defaultValue={initialValue?.line1}
              />
            </div>
            <div className='grid grid-cols-[0.4fr_1.6fr] items-center justify-start gap-4'>
              <Label htmlFor='address2' className='text-left'>
                Address 2
              </Label>
              <Input
                id='address2'
                ref={address2Ref}
                placeholder='Suite 456 (Optional)'
                defaultValue={initialValue?.line2 || ''}
              />
            </div>
            <div className='grid grid-cols-[0.4fr_1.6fr] items-center justify-start gap-4'>
              <Label htmlFor='city' className='text-left'>
                City
              </Label>
              <Input
                id='city'
                onChange={(e) => {
                  debouncedUpsertRequestNotes(e.target.value);
                }}
                ref={cityRef}
                name='city'
                placeholder='San Francisco'
                required
                defaultValue={initialValue?.city}
              />
            </div>
            <div className='grid grid-cols-[0.4fr_1.6fr] items-center justify-start gap-4'>
              <Label htmlFor='region' className='text-left'>
                Region
              </Label>
              <Input
                id='region'
                ref={regionRef}
                // onChange={(e) =>
                //   setAddress((pre) => ({ ...pre, region: e.target.value }))
                // }
                name='region'
                placeholder='CA'
                required
                defaultValue={initialValue?.region}
              />
            </div>
            <div className='grid grid-cols-[0.4fr_1.6fr] items-center justify-start gap-4'>
              <Label htmlFor='country' className='text-left'>
                Country
              </Label>
              <Input
                id='country'
                // onChange={(e) =>
                //   setAddress((pre) => ({ ...pre, country: e.target.value }))
                // }
                ref={countryRef}
                required={true}
                name='country'
                placeholder='Please enter country name'
                defaultValue={initialValue?.country}
              />
            </div>
            <div className='grid grid-cols-[0.4fr_1.6fr] items-center justify-start gap-4'>
              <Label htmlFor='zipcode' className='text-left'>
                Zip Code
              </Label>
              <Input
                id='zipcode'
                ref={zipRef}
                // onChange={(e) =>
                //   setAddress((pre) => ({ ...pre, zip_code: e.target.value }))
                // }
                placeholder='Please enter the zip code or postal code'
                defaultValue={initialValue?.zipcode || undefined}
              />
            </div>
            <div className='grid grid-cols-[0.4fr_1.6fr] items-center justify-start gap-4'>
              <Label htmlFor='zipcode' className='text-left'>
                Time Zone
              </Label>
              <TimezonePicker
                value={selectedTimeZone?.tzCode || null}
                onChange={(value) => setSelectedTimeZone(value)}
              />
            </div>
          </div>
          {isCheckboxVisiable && (
            <div className='col-span-2 flex items-center justify-end space-x-2'>
              <Checkbox
                id='isHeadquarter'
                checked={isHeadQ}
                onCheckedChange={(checked) => setHeadQ(!!checked)}
              />
              <Label
                htmlFor='isHeadquarter'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Is this the headquarter
              </Label>
            </div>
          )}
        </div>
        <DialogFooter>
          <UIButton variant='outline' onClick={handleClose}>
            Cancel
          </UIButton>
          <UIButton onClick={handleAddLocation} isLoading={loading}>
            {edit === -1 ? 'Add' : 'Save'}
          </UIButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAndEditLocationDialog;

// why this function exists how wrote it?
const handleValidate = () => {
  return Object.entries(location).reduce(
    (acc, [tempKey, curr]) => {
      const key = tempKey as keyof typeof location;
      let value = curr.value as any;
      let error = false;
      switch (curr.validation) {
        case 'string':
          {
            if (curr.required && value.trim().length === 0) {
              error = true;
            } else {
              value = value.trim();
            }
          }
          break;
        case 'boolean': {
          if (typeof value !== 'boolean') {
            error = true;
          }
        }
      }
      return {
        newLocation: {
          ...acc.newLocation,
          // @ts-ignore
          [key]: { ...acc.newLocation[key], value, error },
        },
        error: error && !acc.error ? true : acc.error,
      };
    },
    { newLocation: location, error: false },
  );
};
