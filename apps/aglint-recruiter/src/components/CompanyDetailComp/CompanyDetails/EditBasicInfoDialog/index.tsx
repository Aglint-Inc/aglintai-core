import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { DialogClose } from '@radix-ui/react-dialog';
import { AlertCircle, Upload } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'sonner';

import ImageUpload from '@/components/Common/ImageUpload';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { supabase } from '@/utils/supabase/client';

import SocialComp from './SocialComp';
import _ from 'lodash';

const employeeSizes = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5001-10000',
  '10000+',
];

const EditBasicInfoDialog = ({
  editDialog,
  setEditDialog,
}: {
  editDialog: boolean;
  setEditDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const [logo, setLogo] = useState<string>();
  const { recruiter, setRecruiter } = useAuthDetails();
  const [isError, setError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const { checkPermissions } = useRolesAndPermissions();
  const isFormDisabled = !checkPermissions(['manage_company']);

  const [recruiterLocal, setRecruiterLocal] = useState<typeof recruiter | null>(
    recruiter,
  );

  useEffect(() => {
    setLogo(recruiter?.logo);
  }, [recruiter]);

  const handleChange = async (recruit: typeof recruiter) => {
    setRecruiterLocal(recruit);
  };

  const handleClose = () => {
    setEditDialog(false);
    //reset a form
    setTimeout(() => {
      setLogo(recruiter?.logo);
      setRecruiterLocal(() => recruiter);
    }, 800);
  };
  const isValidation = () => {
    if (
      recruiterLocal.name === '' ||
      recruiterLocal.industry === '' ||
      recruiterLocal.company_website === '' ||
      recruiterLocal.employee_size === ''
    )
      return false;
    return true;
  };
  const handleUpdate = async () => {
    delete recruiterLocal.recruiter_preferences;

    if (!isValidation()) return;

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('recruiter')
        .update({
          ...recruiterLocal,
          name: recruiterLocal.name ? recruiterLocal.name : recruiter?.name,
          departments: undefined,
          office_locations: undefined,
        })
        .eq('id', recruiter.id)
        .select()
        .throwOnError();

      if (!error) {
        setRecruiter({
          ...recruiterLocal,
          name: recruiterLocal.name ? recruiterLocal.name : recruiter?.name,
        });
        setEditDialog(false);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  function compareObjects(obj1, obj2) {
    const propertiesToCompare: (keyof typeof recruiter)[] = [
      'name',
      'industry',
      'employee_size',
      'company_website',
      'socials',
    ];

    for (const property of propertiesToCompare) {
      if (logo !== recruiter.logo) return false;
      if (!_.isEqual(recruiter['socials'], recruiterLocal['socials']))
        return false;
      if (property === 'socials') continue;
      if (obj1[property] !== obj2[property]) {
        return false;
      }
    }
    return true;
  }

  const isSame = compareObjects(recruiter, recruiterLocal);

  return (
    <Dialog open={editDialog} onOpenChange={setEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Basic Info</DialogTitle>
        </DialogHeader>
        <DialogTitle>
          <div className='space-y-6'>
            {isError && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  The file you uploaded exceeds the maximum allowed size. Please
                  ensure that the file size is less than 5 MB
                </AlertDescription>
              </Alert>
            )}

            <div className='flex items-center space-x-4 '>
              <div className='border border-gray-200 p-4 rounded-md'>
                <ImageUpload
                  image={logo}
                  disabled={isFormDisabled}
                  setImage={(newLogo) => {
                    setLogo(newLogo);
                    if (recruiterLocal) {
                      handleChange({
                        ...recruiterLocal,
                        logo: newLogo,
                      });
                    }
                  }}
                  size={48}
                  table='company-logo'
                  error={(e) => {
                    setError(!!e);
                  }}
                />
              </div>
              {!isFormDisabled && (
                <>
                  <div className='flex flex-col items-start'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        document.getElementById('image-upload').click();
                      }}
                      className='flex items-center gap-2 p-0 hover:bg-transparent hover:text-gray-600 h-auto'
                    >
                      <Upload className='h-4 w-4' />
                      Update Logo
                    </Button>
                    <p className='text-xs text-muted-foreground mt-1 max-w-[350px]'>
                      The file shouldn&apos;t exceed the maximum allowed size.
                      Please ensure that the file size is less than 5 MB
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className='grid grid-cols-2 gap-4 w-full'>
              <div className='space-y-2'>
                <Label htmlFor='company-name'>Company Name</Label>
                <Input
                  id='company-name'
                  placeholder='Ex. Acme Inc.'
                  value={recruiterLocal?.name}
                  onChange={(e) => {
                    handleChange({
                      ...recruiterLocal,
                      name: e.target.value,
                    });
                    setNameError(!e.target.value);
                  }}
                  disabled={isFormDisabled}
                  required
                />
                {nameError && (
                  <p className='text-sm text-destructive'>
                    Company name can&#39;t be empty
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='industry'>Industry</Label>
                <Input
                  id='industry'
                  placeholder='Ex. Healthcare'
                  value={recruiterLocal?.industry}
                  onChange={(e) => {
                    handleChange({
                      ...recruiterLocal,
                      industry: e.target.value,
                    });
                  }}
                  disabled={isFormDisabled}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='employee-size'>Employee Size</Label>
                <UISelectDropDown
                  menuOptions={employeeSizes.map((size) => ({
                    name: size,
                    value: size,
                  }))}
                  value={recruiterLocal?.employee_size}
                  onValueChange={(value) => {
                    handleChange({
                      ...recruiterLocal,
                      employee_size: value,
                    });
                  }}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='company-website'>Company Website</Label>
                <Input
                  id='company-website'
                  placeholder='https://companydomain.com'
                  value={recruiterLocal?.company_website}
                  onChange={(e) => {
                    handleChange({
                      ...recruiterLocal,
                      company_website: e.target.value,
                    });
                  }}
                  disabled={isFormDisabled}
                />
              </div>
              <div className='col-span-2'>
                <SocialComp
                  disabled={isFormDisabled}
                  handleChange={handleChange}
                  recruiterLocal={recruiterLocal}
                />
              </div>
            </div>
          </div>
        </DialogTitle>

        <DialogFooter>
          <Button variant='outline' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={IsLoading || isSame}>
            {IsLoading ? 'Updating...' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBasicInfoDialog;
