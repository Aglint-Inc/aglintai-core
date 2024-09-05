import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { BasicInfo } from '@devlink/BasicInfo';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import ImageUpload from '@/components/Common/ImageUpload';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { supabase } from '@/utils/supabase/client';

import SocialComp from './SocialComp';

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

const EditBasicInfoDialog = ({ editDialog, setEditDialog }) => {
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
  const handleUpdate = async () => {
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

  return (
    <Dialog open={editDialog} onOpenChange={setEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Basic Info</DialogTitle>
        </DialogHeader>
        <div className='mt-6 flex justify-end space-x-2'>
          <Button variant='outline' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={IsLoading}>
            {IsLoading ? 'Updating...' : 'Update'}
          </Button>
        </div>
        <BasicInfo
          isWarningVisible={isError}
          slotWarning={
            <p className='text-sm text-destructive'>
              The file you uploaded exceeds the maximum allowed size. Please
              ensure that the file size is less than 5 MB
            </p>
          }
          isChangeLogoVisible={!isFormDisabled}
          slotCompanyLogo={
            <>
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
                  if (e) {
                    setError(true);
                  } else {
                    setError(false);
                  }
                }}
              />
            </>
          }
          onClickChangeLogo={{
            onClick: () => {
              document.getElementById('image-upload').click();
            },
          }}
          slotBasicForm={
            <div className='space-y-4 w-full max-w-sm'>
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
                <Select
                  value={recruiterLocal.employee_size}
                  onValueChange={(value) => {
                    handleChange({
                      ...recruiterLocal,
                      employee_size: value,
                    });
                  }}
                  disabled={isFormDisabled}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select employee size' />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <SocialComp
                disabled={isFormDisabled}
                handleChange={handleChange}
                recruiterLocal={recruiterLocal}
              />
            </div>
          }
          textLogoUpdate={'Update Logo'}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditBasicInfoDialog;
