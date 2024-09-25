import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { isEqual } from 'lodash';
import { AlertCircle } from 'lucide-react';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';

import { useTenant } from '@/company/hooks';
import ImageUploadManual from '@/components/Common/ImageUpload/ImageUploadManual';
import UIDialog from '@/components/Common/UIDialog';
// import ImageUpload from '@/components/Common/ImageUpload';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

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

const EditBasicInfoDialog = ({
  editDialog,
  setEditDialog,
}: {
  editDialog: boolean;
  setEditDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const { recruiter } = useTenant();
  const [isError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [nameError, setNameError] = useState(false);
  const { checkPermissions } = useRolesAndPermissions();
  const isFormDisabled = !checkPermissions(['manage_company']);
  const imageFile = useRef(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

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
      setIsImageChanged(false);
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
      // TODO: CONVERT ALL OF THESE TO A TRPC PRIVATE PROCEDURE
      // setIsLoading(true);
      // let logo = recruiter.logo;
      // if (isImageChanged) {
      //   const { data } = await supabase.storage
      //     .from('recruiter-user')
      //     .upload(`public/${recruiterUser.user_id}`, imageFile.current, {
      //       cacheControl: '3600',
      //       upsert: true,
      //     });
      //   if (data?.path && imageFile?.current?.size) {
      //     logo = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recruiter-user/${data?.path}?t=${new Date().toISOString()}`;
      //     setError(false);
      //   } else {
      //     logo = null;
      //   }
      //   setIsImageChanged(false);
      // }
      // const { error } = await supabase
      //   .from('recruiter')
      //   .update({
      //     ...recruiterLocal,
      //     name: recruiterLocal.name ? recruiterLocal.name : recruiter?.name,
      //     departments: undefined,
      //     office_locations: undefined,
      //     logo: logo,
      //   })
      //   .eq('id', recruiter.id)
      //   .select()
      //   .throwOnError();
      // if (!error) {
      //   setRecruiter({
      //     ...recruiterLocal,
      //     logo: logo,
      //     name: recruiterLocal.name ? recruiterLocal.name : recruiter?.name,
      //   });
      //   setEditDialog(false);
      // }
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
      if (!isEqual(recruiter[property], recruiterLocal[property])) return false;
      if (property === 'socials') continue;
      if (obj1[property] !== obj2[property]) {
        return false;
      }
    }
    return true;
  }

  const isSame = compareObjects(recruiter, recruiterLocal) && !isImageChanged;

  return (
    <UIDialog
      title='Edit Basic Info'
      open={editDialog}
      onClose={handleClose}
      slotButtons={
        <>
          <Button variant='outline' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={IsLoading || isSame}>
            {IsLoading ? 'Updating...' : 'Update'}
          </Button>
        </>
      }
    >
      <div className='space-y-6'>
        {isError && (
          <Alert variant='error'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              The file you uploaded exceeds the maximum allowed size. Please
              ensure that the file size is less than 5 MB
            </AlertDescription>
          </Alert>
        )}

        <div className='flex items-center space-x-4'>
          <div className='max-w-[70px] rounded-md border border-gray-200'>
            <ImageUploadManual
              image={logo}
              size={64}
              imageFile={imageFile}
              setChanges={() => {
                setIsImageChanged(true);
              }}
            />
          </div>
          {!isFormDisabled && (
            <>
              <div className='flex flex-col items-start'>
                <Label htmlFor='company-name'>Update Logo</Label>
                <p className='mt-1 max-w-[350px] text-xs text-muted-foreground'>
                  The file shouldn&apos;t exceed the maximum allowed size.
                  Please ensure that the file size is less than 5 MB
                </p>
              </div>
            </>
          )}
        </div>

        <div className='grid w-full grid-cols-2 gap-4'>
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
    </UIDialog>
  );
};

export default EditBasicInfoDialog;
