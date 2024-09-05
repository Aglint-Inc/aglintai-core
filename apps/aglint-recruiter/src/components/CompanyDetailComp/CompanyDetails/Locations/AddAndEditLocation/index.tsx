import { Button } from '@components/ui/button';
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
import React, { useEffect, useRef, useState } from 'react';

import TimezonePicker from '@/components/Common/TimezonePicker';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { manageOfficeLocation } from '@/context/AuthContext/utils';
import { useAllOfficeLocations } from '@/queries/officeLocations';
import timeZone from '@/utils/timeZone';

import { handleValidate } from './until';
type TimeZoneType = (typeof timeZone)[number];

type initialValueType = {
  line1: string;
  line2: string;
  city: string;
  region: string;
  country: string;
  zipcode: string;
  is_headquarter: boolean;
  timezone: string;
  full_address?: string;
  location_header?: string;
};
interface LocationProps {
  handleClose: () => void;
  open: boolean;
  edit: number;
}

const AddAndEditLocation: React.FC<LocationProps> = ({
  handleClose,
  open,
  edit,
}) => {
  const { recruiter } = useAuthDetails();
  const { data: office_locations, refetch } = useAllOfficeLocations();
  const address1Ref = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);

  const [selectedTimeZone, setSelectedTimeZone] = useState<TimeZoneType>(null);
  const [loading, setLoading] = useState(false);

  const initialValue = office_locations.find((item) => item.id === edit);

  const hasHeadquarter = (office_locations as initialValueType[]).some(
    (location) => location.is_headquarter === true,
  );

  const [isHeadQ, setHeadQ] = useState(
    initialValue?.is_headquarter ? true : false,
  );

  const handleAddLocation = async () => {
    setLoading(true);

    const { error } = handleValidate();
    if (!error) {
      // @ts-ignore
      await manageOfficeLocation({
        type: edit === -1 ? 'insert' : 'update',
        data: {
          id: edit !== -1 ? edit : undefined,
          city: cityRef.current.value,
          country: countryRef.current.value,
          is_headquarter: Boolean(isHeadQ),
          line1: address1Ref.current.value,
          line2: address2Ref.current.value,
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
    if (recruiter) {
      setHeadQ(initialValue?.is_headquarter);
      const initialTimeZone = timeZone.find(
        (item) => item.tzCode === initialValue?.timezone,
      );
      setSelectedTimeZone(initialTimeZone);
    }
  }, [recruiter]);

  const isCheckboxVisiable =
    hasHeadquarter && initialValue?.is_headquarter ? true : !hasHeadquarter;
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {/* <DialogTrigger asChild>{<Button>asdda</Button>}</DialogTrigger> */}
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
                defaultValue={initialValue?.line2}
              />
            </div>
            <div className='grid grid-cols-[0.4fr_1.6fr] items-center justify-start gap-4'>
              <Label htmlFor='city' className='text-left'>
                City
              </Label>
              <Input
                id='city'
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
                placeholder='Please enter the zip code or postal code'
                defaultValue={initialValue?.zipcode}
              />
            </div>
            <div className='grid grid-cols-[0.4fr_1.6fr] items-center justify-start gap-4'>
              <Label htmlFor='zipcode' className='text-left'>
                Time Zone
              </Label>
              <TimezonePicker
                value={selectedTimeZone?.tzCode}
                onChange={(value) => setSelectedTimeZone(value)}
              />
            </div>
          </div>
          {isCheckboxVisiable && (
            <div className='flex items-center space-x-2 col-span-2 justify-end'>
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
          <Button variant='outline' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddLocation} disabled={loading}>
            {edit === -1 ? 'Add' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAndEditLocation;
